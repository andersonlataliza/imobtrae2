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
        return await getTestimonials(req, res);
      case 'POST':
        return await createTestimonial(req, res);
      case 'PUT':
        return await updateTestimonial(req, res);
      case 'DELETE':
        return await deleteTestimonial(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Testimonials API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTestimonials(req: VercelRequest, res: VercelResponse) {
  const { 
    page = 1, 
    limit = 10, 
    approved_only = 'true' 
  } = req.query;

  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Filter by approval status for public view
  if (approved_only === 'true') {
    query = query.not('approved_by', 'is', null);
  }

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

async function createTestimonial(req: VercelRequest, res: VercelResponse) {
  const testimonialData = req.body;

  // Validate required fields
  const requiredFields = ['name', 'content'];
  for (const field of requiredFields) {
    if (!testimonialData[field]) {
      return res.status(400).json({ error: `Campo obrigatório: ${field}` });
    }
  }

  // Validate rating if provided
  if (testimonialData.rating) {
    const rating = Number(testimonialData.rating);
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Avaliação deve ser entre 1 e 5' });
    }
  }

  // Validate content length
  if (testimonialData.content.length < 10) {
    return res.status(400).json({ error: 'Depoimento deve ter pelo menos 10 caracteres' });
  }

  if (testimonialData.content.length > 1000) {
    return res.status(400).json({ error: 'Depoimento deve ter no máximo 1000 caracteres' });
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ 
    data,
    message: 'Depoimento enviado com sucesso! Será analisado antes da publicação.' 
  });
}

async function updateTestimonial(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const testimonialData = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID do depoimento é obrigatório' });
  }

  // Validate rating if provided
  if (testimonialData.rating) {
    const rating = Number(testimonialData.rating);
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Avaliação deve ser entre 1 e 5' });
    }
  }

  // Validate content length if provided
  if (testimonialData.content) {
    if (testimonialData.content.length < 10) {
      return res.status(400).json({ error: 'Depoimento deve ter pelo menos 10 caracteres' });
    }

    if (testimonialData.content.length > 1000) {
      return res.status(400).json({ error: 'Depoimento deve ter no máximo 1000 caracteres' });
    }
  }

  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Depoimento não encontrado' });
  }

  return res.status(200).json({ data });
}

async function deleteTestimonial(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID do depoimento é obrigatório' });
  }

  const { error } = await supabase
    .from('testimonials')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Depoimento removido com sucesso' });
}