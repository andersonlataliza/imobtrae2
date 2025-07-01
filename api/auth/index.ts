import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'POST':
        return await handleAuth(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleAuth(req: VercelRequest, res: VercelResponse) {
  const { action, email, password, name, role } = req.body;

  switch (action) {
    case 'login':
      return await login(req, res);
    case 'register':
      return await register(req, res);
    case 'verify':
      return await verifyToken(req, res);
    default:
      return res.status(400).json({ error: 'Ação inválida' });
  }
}

async function login(req: VercelRequest, res: VercelResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Get user from database
  const { data: user, error } = await supabase
    .from('admin_users')
    .select(`
      id,
      name,
      email,
      password_hash,
      role,
      is_active,
      user_permissions (
        permission_id,
        permissions (
          id,
          name,
          category
        )
      )
    `)
    .eq('email', email)
    .eq('is_active', true)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    jwtSecret,
    { expiresIn: '24h' }
  );

  // Format user permissions
  const permissions = user.user_permissions?.map((up: any) => ({
    id: up.permissions.id,
    name: up.permissions.name,
    category: up.permissions.category
  })) || [];

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions,
    lastLogin: new Date().toISOString()
  };

  return res.status(200).json({
    user: userData,
    token
  });
}

async function register(req: VercelRequest, res: VercelResponse) {
  const { name, email, password, role = 'viewer' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
  }

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'Email já está em uso' });
  }

  // Hash password
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const { data: newUser, error } = await supabase
    .from('admin_users')
    .insert([
      {
        name,
        email,
        password_hash: passwordHash,
        role
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: newUser.id, 
      email: newUser.email, 
      role: newUser.role 
    },
    jwtSecret,
    { expiresIn: '24h' }
  );

  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    permissions: [],
    lastLogin: null
  };

  return res.status(201).json({
    user: userData,
    token
  });
}

async function verifyToken(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Get fresh user data
    const { data: user, error } = await supabase
      .from('admin_users')
      .select(`
        id,
        name,
        email,
        role,
        is_active,
        last_login,
        user_permissions (
          permission_id,
          permissions (
            id,
            name,
            category
          )
        )
      `)
      .eq('id', decoded.userId)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Format user permissions
    const permissions = user.user_permissions?.map((up: any) => ({
      id: up.permissions.id,
      name: up.permissions.name,
      category: up.permissions.category
    })) || [];

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions,
      lastLogin: user.last_login
    };

    return res.status(200).json({ user: userData });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}