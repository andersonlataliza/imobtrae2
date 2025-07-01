import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getProperties(req, res);
      case 'POST':
        return await createProperty(req, res);
      case 'PUT':
        return await updateProperty(req, res);
      case 'DELETE':
        return await deleteProperty(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getProperties(req: VercelRequest, res: VercelResponse) {
  const { 
    page = 1, 
    limit = 10, 
    type, 
    city, 
    minPrice, 
    maxPrice, 
    bedrooms, 
    featured 
  } = req.query;

  let query = supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Apply filters
  if (type) query = query.eq('type', type);
  if (city) query = query.ilike('city', `%${city}%`);
  if (minPrice) query = query.gte('price', Number(minPrice));
  if (maxPrice) query = query.lte('price', Number(maxPrice));
  if (bedrooms) query = query.eq('bedrooms', Number(bedrooms));
  if (featured === 'true') query = query.eq('featured', true);

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

async function createProperty(req: VercelRequest, res: VercelResponse) {
  const propertyData = req.body;

  // Validate required fields
  const requiredFields = ['title', 'price', 'address', 'city', 'bedrooms', 'bathrooms', 'area', 'type'];
  for (const field of requiredFields) {
    if (!propertyData[field]) {
      return res.status(400).json({ error: `Campo obrigatório: ${field}` });
    }
  }

  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ data });
}

async function updateProperty(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const propertyData = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID da propriedade é obrigatório' });
  }

  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Propriedade não encontrada' });
  }

  return res.status(200).json({ data });
}

async function deleteProperty(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID da propriedade é obrigatório' });
  }

  const { error } = await supabase
    .from('properties')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Propriedade removida com sucesso' });
}