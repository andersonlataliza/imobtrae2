import { AdminUser } from '../types';
import { rolePermissions } from './permissions';

export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Administrador Principal',
    email: 'admin@imobiliaria.com',
    role: 'super_admin',
    permissions: rolePermissions.super_admin.map(id => ({ id } as any)),
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2025-01-15T10:30:00Z',
    isActive: true
  }
];

// Simulated password storage (in production, use proper hashing)
export const userCredentials: Record<string, string> = {
  'admin@imobiliaria.com': 'admin123'
};