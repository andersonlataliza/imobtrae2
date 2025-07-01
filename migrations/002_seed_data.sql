-- IMOBTRAE Database Seed Data
-- Migration 002: Initial Data Population
-- Populates tables with initial data based on existing mock data

-- Insert permissions
INSERT INTO permissions (id, name, description, category) VALUES
-- Properties permissions
('properties.view', 'Visualizar Imóveis', 'Pode visualizar a lista de imóveis', 'properties'),
('properties.create', 'Criar Imóveis', 'Pode adicionar novos imóveis', 'properties'),
('properties.edit', 'Editar Imóveis', 'Pode editar imóveis existentes', 'properties'),
('properties.delete', 'Excluir Imóveis', 'Pode excluir imóveis', 'properties'),

-- Users permissions
('users.view', 'Visualizar Usuários', 'Pode visualizar a lista de usuários administrativos', 'users'),
('users.create', 'Criar Usuários', 'Pode criar novos usuários administrativos', 'users'),
('users.edit', 'Editar Usuários', 'Pode editar usuários existentes', 'users'),
('users.delete', 'Excluir Usuários', 'Pode excluir usuários administrativos', 'users'),

-- Agents permissions
('agents.view', 'Visualizar Corretores', 'Pode visualizar a lista de corretores', 'agents'),
('agents.create', 'Criar Corretores', 'Pode adicionar novos corretores', 'agents'),
('agents.edit', 'Editar Corretores', 'Pode editar corretores existentes', 'agents'),
('agents.delete', 'Excluir Corretores', 'Pode excluir corretores', 'agents'),

-- Messages permissions
('messages.view', 'Visualizar Mensagens', 'Pode visualizar mensagens de contato', 'messages'),
('messages.edit', 'Editar Mensagens', 'Pode editar status das mensagens', 'messages'),
('messages.delete', 'Excluir Mensagens', 'Pode excluir mensagens', 'messages'),

-- Settings permissions
('settings.view', 'Visualizar Configurações', 'Pode visualizar configurações do sistema', 'settings'),
('settings.edit', 'Editar Configurações', 'Pode editar configurações do sistema', 'settings')
ON CONFLICT (id) DO NOTHING;

-- Insert initial admin user (password: admin123)
INSERT INTO admin_users (id, name, email, password_hash, role, created_at, last_login, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Administrador Principal', 'admin@imobiliaria.com', 
 crypt('admin123', gen_salt('bf')), 'super_admin', '2024-01-01T00:00:00Z', '2025-01-15T10:30:00Z', true)
ON CONFLICT (id) DO NOTHING;

-- Grant all permissions to super admin (super_admin role gets all permissions by default in the app)
INSERT INTO user_permissions (user_id, permission_id, granted_by)
SELECT '550e8400-e29b-41d4-a716-446655440000', id, '550e8400-e29b-41d4-a716-446655440000'
FROM permissions
ON CONFLICT (user_id, permission_id) DO NOTHING;

-- Insert agents
INSERT INTO agents (id, name, position, photo, contact, email, bio) VALUES
('a1000000-e29b-41d4-a716-446655440001', 'Carlos Oliveira', 'Senior Agent', 
 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 
 '(11) 98765-4321', 'carlos@imobiliaria.com', 
 'With over 15 years of experience in luxury real estate, Carlos specializes in high-end properties and has a keen eye for investment opportunities.'),

('a1000000-e29b-41d4-a716-446655440002', 'Ana Souza', 'Residential Specialist', 
 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', 
 '(11) 91234-5678', 'ana@imobiliaria.com', 
 'Ana has helped hundreds of families find their perfect homes. She is known for her attention to detail and personalized approach to each client.'),

('a1000000-e29b-41d4-a716-446655440003', 'Rafael Santos', 'Commercial Property Expert', 
 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 
 '(11) 99876-5432', 'rafael@imobiliaria.com', 
 'Rafael specializes in commercial properties and has extensive knowledge of market trends, helping businesses find ideal locations for growth.'),

('a1000000-e29b-41d4-a716-446655440004', 'Juliana Costa', 'Rental Specialist', 
 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 
 '(11) 95678-1234', 'juliana@imobiliaria.com', 
 'Juliana is an expert in the rental market, helping both landlords and tenants navigate the rental process with ease and confidence.')
ON CONFLICT (id) DO NOTHING;

-- Insert properties
INSERT INTO properties (id, title, price, address, city, bedrooms, bathrooms, area, description, features, images, type, featured, created_by) VALUES
('b1000000-e29b-41d4-a716-446655440001', 'Modern Luxury Villa', 750000.00, 'Avenida Atlântica, 1500', 'Rio de Janeiro', 
 4, 3, 250.00, 'Stunning modern villa with ocean views, featuring an open concept living area, gourmet kitchen, and private pool.',
 ARRAY['Swimming Pool', 'Garden', 'Garage', 'Security System', 'Air Conditioning'],
 ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'],
 'sale', true, '550e8400-e29b-41d4-a716-446655440000'),

('b1000000-e29b-41d4-a716-446655440002', 'Downtown Apartment', 2500.00, 'Rua Augusta, 789', 'São Paulo', 
 2, 1, 85.00, 'Modern apartment in the heart of the city, close to restaurants, shopping, and public transportation.',
 ARRAY['Elevator', 'Gym', 'Security', 'Balcony'],
 ARRAY['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
 'rent', true, '550e8400-e29b-41d4-a716-446655440000'),

('b1000000-e29b-41d4-a716-446655440003', 'Countryside Retreat', 450000.00, 'Estrada do Sol, 45', 'Gramado', 
 3, 2, 180.00, 'Charming countryside home perfect for those seeking tranquility, featuring a large garden and mountain views.',
 ARRAY['Garden', 'Fireplace', 'Mountain View', 'Garage'],
 ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'],
 'sale', true, '550e8400-e29b-41d4-a716-446655440000'),

('b1000000-e29b-41d4-a716-446655440004', 'Beachfront Condo', 3200.00, 'Avenida Beira Mar, 2100', 'Florianópolis', 
 3, 2, 120.00, 'Luxury beachfront condominium with stunning ocean views and direct beach access.',
 ARRAY['Beach Access', 'Ocean View', 'Pool', 'Security', 'Furnished'],
 ARRAY['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
 'rent', false, '550e8400-e29b-41d4-a716-446655440000'),

('b1000000-e29b-41d4-a716-446655440005', 'Family House', 380000.00, 'Rua das Flores, 123', 'Curitiba', 
 3, 2, 150.00, 'Perfect family home in a quiet neighborhood, featuring a spacious backyard and modern amenities.',
 ARRAY['Backyard', 'Garage', 'Modern Kitchen', 'Security System'],
 ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'],
 'sale', false, '550e8400-e29b-41d4-a716-446655440000'),

('b1000000-e29b-41d4-a716-446655440006', 'Studio Apartment', 1800.00, 'Rua Oscar Freire, 456', 'São Paulo', 
 1, 1, 45.00, 'Compact and modern studio apartment in the trendy Oscar Freire area, perfect for young professionals.',
 ARRAY['Modern Design', 'Central Location', 'Security', 'Furnished'],
 ARRAY['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'],
 'rent', false, '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Assign agents to properties
INSERT INTO property_agents (property_id, agent_id, is_primary) VALUES
('b1000000-e29b-41d4-a716-446655440001', 'a1000000-e29b-41d4-a716-446655440001', true),
('b1000000-e29b-41d4-a716-446655440002', 'a1000000-e29b-41d4-a716-446655440004', true),
('b1000000-e29b-41d4-a716-446655440003', 'a1000000-e29b-41d4-a716-446655440002', true),
('b1000000-e29b-41d4-a716-446655440004', 'a1000000-e29b-41d4-a716-446655440004', true),
('b1000000-e29b-41d4-a716-446655440005', 'a1000000-e29b-41d4-a716-446655440002', true),
('b1000000-e29b-41d4-a716-446655440006', 'a1000000-e29b-41d4-a716-446655440003', true)
ON CONFLICT (property_id, agent_id) DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (id, name, role, content, avatar, rating, approved_by) VALUES
('c1000000-e29b-41d4-a716-446655440001', 'Maria Silva', 'Compradora', 
 'Excelente atendimento! A equipe da Imobiliária Elite me ajudou a encontrar a casa dos meus sonhos. Profissionais muito competentes e atenciosos.',
 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('c1000000-e29b-41d4-a716-446655440002', 'João Santos', 'Investidor', 
 'Trabalho com a Imobiliária Elite há anos e sempre recebo o melhor suporte para meus investimentos imobiliários. Recomendo!',
 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('c1000000-e29b-41d4-a716-446655440003', 'Ana Costa', 'Locatária', 
 'Processo de locação muito tranquilo e transparente. A Ana Souza foi excepcional no atendimento e me ajudou em todo o processo.',
 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('c1000000-e29b-41d4-a716-446655440004', 'Roberto Lima', 'Empresário', 
 'Encontrei o imóvel comercial perfeito para minha empresa. O Rafael Santos entende muito do mercado comercial. Excelente trabalho!',
 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Insert some sample contact messages
INSERT INTO contact_messages (id, name, email, phone, subject, message, property_id, status) VALUES
('d1000000-e29b-41d4-a716-446655440001', 'Pedro Oliveira', 'pedro@email.com', '(11) 99999-1111', 
 'Interesse na Villa Moderna', 'Gostaria de agendar uma visita para conhecer a propriedade.', 
 'b1000000-e29b-41d4-a716-446655440001', 'new'),

('d1000000-e29b-41d4-a716-446655440002', 'Carla Mendes', 'carla@email.com', '(11) 88888-2222', 
 'Dúvidas sobre aluguel', 'Tenho interesse no apartamento downtown. Poderia me enviar mais informações?', 
 'b1000000-e29b-41d4-a716-446655440002', 'new'),

('d1000000-e29b-41d4-a716-446655440003', 'Lucas Ferreira', 'lucas@email.com', '(11) 77777-3333', 
 'Contato geral', 'Gostaria de saber mais sobre os serviços da imobiliária.', 
 NULL, 'read')
ON CONFLICT (id) DO NOTHING;

-- Create some sample property views for analytics
INSERT INTO property_views (property_id, ip_address, user_agent, viewed_at) VALUES
('b1000000-e29b-41d4-a716-446655440001', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '1 day'),
('b1000000-e29b-41d4-a716-446655440001', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', NOW() - INTERVAL '2 hours'),
('b1000000-e29b-41d4-a716-446655440002', '192.168.1.102', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', NOW() - INTERVAL '3 hours'),
('b1000000-e29b-41d4-a716-446655440003', '192.168.1.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', NOW() - INTERVAL '1 hour'),
('b1000000-e29b-41d4-a716-446655440002', '192.168.1.104', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', NOW() - INTERVAL '30 minutes'),
('b1000000-e29b-41d4-a716-446655440006', '192.168.1.15', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '15 minutes')
ON CONFLICT (id) DO NOTHING;