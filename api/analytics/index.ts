// Antes
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getAnalytics(req, res);
      case 'POST':
        return await trackView(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Analytics API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAnalytics(req: VercelRequest, res: VercelResponse) {
  const { type = 'dashboard' } = req.query;

  try {
    switch (type) {
      case 'dashboard':
        return await getDashboardStats(req, res);
      case 'properties':
        return await getPropertyStats(req, res);
      case 'views':
        return await getViewStats(req, res);
      case 'messages':
        return await getMessageStats(req, res);
      default:
        return res.status(400).json({ error: 'Tipo de analytics inválido' });
    }
  } catch (error) {
    console.error('Get analytics error:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
}

async function getDashboardStats(req: VercelRequest, res: VercelResponse) {
  // Get total counts
  const [propertiesResult, agentsResult, messagesResult, viewsResult] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('agents').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('property_views').select('*', { count: 'exact', head: true })
  ]);

  // Get recent activity (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [recentPropertiesResult, recentMessagesResult, recentViewsResult] = await Promise.all([
    supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabase
      .from('property_views')
      .select('*', { count: 'exact', head: true })
      .gte('viewed_at', thirtyDaysAgo.toISOString())
  ]);

  // Get properties by type
  const { data: propertiesByType } = await supabase
    .from('properties')
    .select('type')
    .eq('is_active', true);

  const typeStats = propertiesByType?.reduce((acc: any, prop: any) => {
    acc[prop.type] = (acc[prop.type] || 0) + 1;
    return acc;
  }, {}) || {};

  // Get messages by status
  const { data: messagesByStatus } = await supabase
    .from('contact_messages')
    .select('status');

  const statusStats = messagesByStatus?.reduce((acc: any, msg: any) => {
    acc[msg.status] = (acc[msg.status] || 0) + 1;
    return acc;
  }, {}) || {};

  const stats = {
    totals: {
      properties: propertiesResult.count || 0,
      agents: agentsResult.count || 0,
      messages: messagesResult.count || 0,
      views: viewsResult.count || 0
    },
    recent: {
      properties: recentPropertiesResult.count || 0,
      messages: recentMessagesResult.count || 0,
      views: recentViewsResult.count || 0
    },
    breakdown: {
      propertiesByType: typeStats,
      messagesByStatus: statusStats
    }
  };

  return res.status(200).json({ data: stats });
}

async function getPropertyStats(req: VercelRequest, res: VercelResponse) {
  // Get most viewed properties
  const { data: mostViewed } = await supabase
    .from('property_views')
    .select(`
      property_id,
      properties (
        id,
        title,
        price,
        type,
        city
      )
    `)
    .not('properties', 'is', null);

  const viewCounts = mostViewed?.reduce((acc: any, view: any) => {
    const propId = view.property_id;
    if (!acc[propId]) {
      acc[propId] = {
        property: view.properties,
        views: 0
      };
    }
    acc[propId].views++;
    return acc;
  }, {}) || {};

  const topProperties = Object.values(viewCounts)
    .sort((a: any, b: any) => b.views - a.views)
    .slice(0, 10);

  // Get properties by city
  const { data: propertiesByCity } = await supabase
    .from('properties')
    .select('city')
    .eq('is_active', true);

  const cityStats = propertiesByCity?.reduce((acc: any, prop: any) => {
    acc[prop.city] = (acc[prop.city] || 0) + 1;
    return acc;
  }, {}) || {};

  // Get average prices by type
  const { data: priceStats } = await supabase
    .from('properties')
    .select('type, price')
    .eq('is_active', true);

  const avgPrices = priceStats?.reduce((acc: any, prop: any) => {
    if (!acc[prop.type]) {
      acc[prop.type] = { total: 0, count: 0 };
    }
    acc[prop.type].total += prop.price;
    acc[prop.type].count++;
    return acc;
  }, {}) || {};

  Object.keys(avgPrices).forEach(type => {
    avgPrices[type] = Math.round(avgPrices[type].total / avgPrices[type].count);
  });

  return res.status(200).json({
    data: {
      mostViewed: topProperties,
      citiesDistribution: cityStats,
      averagePrices: avgPrices
    }
  });
}

async function getViewStats(req: VercelRequest, res: VercelResponse) {
  const { days = 30 } = req.query;
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - Number(days));

  const { data: views } = await supabase
    .from('property_views')
    .select('viewed_at')
    .gte('viewed_at', daysAgo.toISOString())
    .order('viewed_at');

  // Group views by date
  const viewsByDate = views?.reduce((acc: any, view: any) => {
    const date = new Date(view.viewed_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {}) || {};

  return res.status(200).json({
    data: {
      viewsByDate,
      totalViews: views?.length || 0
    }
  });
}

async function getMessageStats(req: VercelRequest, res: VercelResponse) {
  const { days = 30 } = req.query;
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - Number(days));

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('created_at, status')
    .gte('created_at', daysAgo.toISOString())
    .order('created_at');

  // Group messages by date
  const messagesByDate = messages?.reduce((acc: any, msg: any) => {
    const date = new Date(msg.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {}) || {};

  // Group by status
  const messagesByStatus = messages?.reduce((acc: any, msg: any) => {
    acc[msg.status] = (acc[msg.status] || 0) + 1;
    return acc;
  }, {}) || {};

  return res.status(200).json({
    data: {
      messagesByDate,
      messagesByStatus,
      totalMessages: messages?.length || 0
    }
  });
}

async function trackView(req: VercelRequest, res: VercelResponse) {
  const { property_id, ip_address, user_agent, session_id } = req.body;

  if (!property_id) {
    return res.status(400).json({ error: 'ID da propriedade é obrigatório' });
  }

  // Verify property exists
  const { data: property } = await supabase
    .from('properties')
    .select('id')
    .eq('id', property_id)
    .eq('is_active', true)
    .single();

  if (!property) {
    return res.status(404).json({ error: 'Propriedade não encontrada' });
  }

  // Check for duplicate views (same IP and property within 1 hour)
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  const { data: recentView } = await supabase
    .from('property_views')
    .select('id')
    .eq('property_id', property_id)
    .eq('ip_address', ip_address)
    .gte('viewed_at', oneHourAgo.toISOString())
    .single();

  if (recentView) {
    return res.status(200).json({ message: 'Visualização já registrada recentemente' });
  }

  // Record the view
  const { error } = await supabase
    .from('property_views')
    .insert([
      {
        property_id,
        ip_address,
        user_agent,
        session_id
      }
    ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ message: 'Visualização registrada com sucesso' });
}