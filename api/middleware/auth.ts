import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface AuthenticatedRequest extends VercelRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

export function withAuth(handler: (req: AuthenticatedRequest, res: VercelResponse) => Promise<void | VercelResponse>) {
  return async (req: AuthenticatedRequest, res: VercelResponse) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
      }

      // Verify JWT token
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // Get fresh user data from database
      const { data: user, error } = await supabase
        .from('admin_users')
        .select(`
          id,
          name,
          email,
          role,
          is_active,
          user_permissions (
            permission_id
          )
        `)
        .eq('id', decoded.userId)
        .eq('is_active', true)
        .single();

      if (error || !user) {
        return res.status(401).json({ error: 'Token inválido ou usuário inativo' });
      }

      // Extract permissions
      const permissions = user.user_permissions?.map((up: any) => up.permission_id) || [];

      // Add user info to request
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions
      };

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
}

export function withPermission(permission: string) {
  return function(handler: (req: AuthenticatedRequest, res: VercelResponse) => Promise<void | VercelResponse>) {
    return withAuth(async (req: AuthenticatedRequest, res: VercelResponse) => {
      const user = req.user!;
      
      // Super admin has all permissions
      if (user.role === 'super_admin') {
        return handler(req, res);
      }

      // Check if user has the required permission
      if (!user.permissions.includes(permission)) {
        return res.status(403).json({ error: 'Permissão insuficiente' });
      }

      return handler(req, res);
    });
  };
}

export function withRole(allowedRoles: string[]) {
  return function(handler: (req: AuthenticatedRequest, res: VercelResponse) => Promise<void | VercelResponse>) {
    return withAuth(async (req: AuthenticatedRequest, res: VercelResponse) => {
      const user = req.user!;
      
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Nível de acesso insuficiente' });
      }

      return handler(req, res);
    });
  };
}

// Rate limiting middleware
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
  return function(handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) {
    return async (req: VercelRequest, res: VercelResponse) => {
      const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
      const key = Array.isArray(clientIp) ? clientIp[0] : clientIp;
      const now = Date.now();
      
      const clientData = requestCounts.get(key);
      
      if (!clientData || now > clientData.resetTime) {
        // Reset or initialize counter
        requestCounts.set(key, {
          count: 1,
          resetTime: now + windowMs
        });
      } else {
        // Increment counter
        clientData.count++;
        
        if (clientData.count > maxRequests) {
          return res.status(429).json({ 
            error: 'Muitas requisições. Tente novamente mais tarde.',
            retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
          });
        }
      }
      
      return handler(req, res);
    };
  };
}

// CORS middleware
export function withCors(allowedOrigins?: string[]) {
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://yourdomain.com'
  ];
  
  const origins = allowedOrigins || 
    (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : defaultOrigins);

  return function(handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) {
    return async (req: VercelRequest, res: VercelResponse) => {
      const origin = req.headers.origin;
      
      if (origin && origins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else if (origins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
      
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      return handler(req, res);
    };
  };
}