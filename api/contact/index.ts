import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getMessages(req, res);
      case 'POST':
        return await createMessage(req, res);
      case 'PUT':
        return await updateMessage(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMessages(req: VercelRequest, res: VercelResponse) {
  const { 
    page = 1, 
    limit = 10, 
    status, 
    property_id,
    agent_id 
  } = req.query;

  let query = supabase
    .from('contact_messages')
    .select(`
      *,
      properties (
        id,
        title,
        address
      ),
      agents (
        id,
        name,
        email
      )
    `)
    .order('created_at', { ascending: false });

  // Apply filters
  if (status) query = query.eq('status', status);
  if (property_id) query = query.eq('property_id', property_id);
  if (agent_id) query = query.eq('agent_id', agent_id);

  // Apply pagination
  const from = (Number(page) - 1) * Number(limit);
  const to = from + Number(limit) - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}

async function createMessage(req: VercelRequest, res: VercelResponse) {
  const messageData = req.body;

  // Validate required fields
  const requiredFields = ['name', 'email', 'message'];
  for (const field of requiredFields) {
    if (!messageData[field]) {
      return res.status(400).json({ error: `Campo obrigatório: ${field}` });
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(messageData.email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Validate phone format if provided
  if (messageData.phone) {
    const phoneRegex = /^[\d\s\(\)\+\-]+$/;
    if (!phoneRegex.test(messageData.phone)) {
      return res.status(400).json({ error: 'Telefone inválido' });
    }
  }

  // Validate property exists if property_id is provided
  if (messageData.property_id) {
    const { data: property } = await supabase
      .from('properties')
      .select('id')
      .eq('id', messageData.property_id)
      .eq('is_active', true)
      .single();

    if (!property) {
      return res.status(400).json({ error: 'Propriedade não encontrada' });
    }
  }

  // Validate agent exists if agent_id is provided
  if (messageData.agent_id) {
    const { data: agent } = await supabase
      .from('agents')
      .select('id')
      .eq('id', messageData.agent_id)
      .eq('is_active', true)
      .single();

    if (!agent) {
      return res.status(400).json({ error: 'Agente não encontrado' });
    }
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      ...messageData,
      status: 'new'
    }])
    .select(`
      *,
      properties (
        id,
        title,
        address
      ),
      agents (
        id,
        name,
        email
      )
    `)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // TODO: Send email notification to admin/agent
  // await sendEmailNotification(data);

  return res.status(201).json({ 
    data,
    message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
  });
}

async function updateMessage(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const { status, handled_by } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID da mensagem é obrigatório' });
  }

  if (!status) {
    return res.status(400).json({ error: 'Status é obrigatório' });
  }

  // Validate status
  const validStatuses = ['new', 'read', 'replied', 'closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  const updateData: any = { status };
  if (handled_by) {
    updateData.handled_by = handled_by;
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      properties (
        id,
        title,
        address
      ),
      agents (
        id,
        name,
        email
      )
    `)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Mensagem não encontrada' });
  }

  return res.status(200).json({ data });
}

// Helper function for email notifications (to be implemented)
async function sendEmailNotification(messageData: any) {
  // TODO: Implement email notification using a service like SendGrid, Nodemailer, etc.
  console.log('Email notification would be sent for:', messageData);
}