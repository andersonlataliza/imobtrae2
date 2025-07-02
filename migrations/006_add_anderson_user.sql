-- Migration 006: Add Anderson User
-- Adds anderson.lataliza@yahoo.com.br user to admin_users table

-- Insert Anderson user with admin role
INSERT INTO admin_users (id, name, email, password_hash, role, created_at, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Anderson Lataliza', 'anderson.lataliza@yahoo.com.br', 
 crypt('mi@uel01', gen_salt('bf')), 'admin', NOW(), true)
ON CONFLICT (email) DO UPDATE SET
  password_hash = crypt('mi@uel01', gen_salt('bf')),
  updated_at = NOW();

-- Grant all permissions to Anderson (admin role gets comprehensive permissions)
INSERT INTO user_permissions (user_id, permission_id, granted_by)
SELECT 
  (SELECT id FROM admin_users WHERE email = 'anderson.lataliza@yahoo.com.br'),
  id,
  '550e8400-e29b-41d4-a716-446655440000' -- granted by super admin
FROM permissions
ON CONFLICT (user_id, permission_id) DO NOTHING;

-- Confirm user creation
SELECT 
  id,
  name,
  email,
  role,
  created_at,
  is_active
FROM admin_users 
WHERE email = 'anderson.lataliza@yahoo.com.br';