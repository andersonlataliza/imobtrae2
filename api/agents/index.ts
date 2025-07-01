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
        return await getAgents(req, res);
      case 'POST':
        return await createAgent(req, res);
      case 'PUT':
        return await updateAgent(req, res);
      case 'DELETE':
        return await deleteAgent(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAgents(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (id) {
    // Get single agent
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }

    return res.status(200).json({ data });
  }

  // Get all agents
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ data });
}

async function createAgent(req: VercelRequest, res: VercelResponse) {
  const agentData = req.body;

  // Validate required fields
  const requiredFields = ['name', 'position', 'email'];
  for (const field of requiredFields) {
    if (!agentData[field]) {
      return res.status(400).json({ error: `Campo obrigatório: ${field}` });
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(agentData.email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Check if email already exists
  const { data: existingAgent } = await supabase
    .from('agents')
    .select('id')
    .eq('email', agentData.email)
    .eq('is_active', true)
    .single();

  if (existingAgent) {
    return res.status(400).json({ error: 'Email já está em uso' });
  }

  const { data, error } = await supabase
    .from('agents')
    .insert([agentData])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ data });
}

async function updateAgent(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const agentData = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID do agente é obrigatório' });
  }

  // If email is being updated, check for duplicates
  if (agentData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(agentData.email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const { data: existingAgent } = await supabase
      .from('agents')
      .select('id')
      .eq('email', agentData.email)
      .neq('id', id)
      .eq('is_active', true)
      .single();

    if (existingAgent) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }
  }

  const { data, error } = await supabase
    .from('agents')
    .update(agentData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Agente não encontrado' });
  }

  return res.status(200).json({ data });
}

async function deleteAgent(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID do agente é obrigatório' });
  }

  const { error } = await supabase
    .from('agents')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Agente removido com sucesso' });
}