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
('settings.edit', 'Editar Configurações', 'Pode editar configurações do sistema', 'settings');

-- Insert initial admin user (password: admin123)
INSERT INTO admin_users (id, name, email, password_hash, role, created_at, last_login, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Administrador Principal', 'admin@imobiliaria.com', 
 crypt('admin123', gen_salt('bf')), 'super_admin', '2024-01-01T00:00:00Z', '2025-01-15T10:30:00Z', true);

-- Grant all permissions to super admin (super_admin role gets all permissions by default in the app)
INSERT INTO user_permissions (user_id, permission_id, granted_by)
SELECT '550e8400-e29b-41d4-a716-446655440000', id, '550e8400-e29b-41d4-a716-446655440000'
FROM permissions;

-- Insert agents
INSERT INTO agents (id, name, position, photo, contact, email, bio) VALUES
('a1000000-0000-0000-0000-000000000001', 'Carlos Oliveira', 'Senior Agent', 
 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 
 '(11) 98765-4321', 'carlos@imobiliaria.com', 
 'With over 15 years of experience in luxury real estate, Carlos specializes in high-end properties and has a keen eye for investment opportunities.'),

('a1000000-0000-0000-0000-000000000002', 'Ana Souza', 'Residential Specialist', 
 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', 
 '(11) 91234-5678', 'ana@imobiliaria.com', 
 'Ana has helped hundreds of families find their perfect homes. She is known for her attention to detail and personalized approach to each client.'),

('a1000000-0000-0000-0000-000000000003', 'Rafael Santos', 'Commercial Property Expert', 
 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 
 '(11) 99876-5432', 'rafael@imobiliaria.com', 
 'Rafael specializes in commercial properties and has extensive knowledge of market trends, helping businesses find ideal locations for growth.'),

('a1000000-0000-0000-0000-000000000004', 'Juliana Costa', 'Rental Specialist', 
 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 
 '(11) 95678-1234', 'juliana@imobiliaria.com', 
 'Juliana is an expert in the rental market, helping both landlords and tenants navigate the rental process with ease and confidence.');

-- Insert properties
INSERT INTO properties (id, title, price, address, city, bedrooms, bathrooms, area, description, features, images, type, featured, created_by) VALUES
('p1000000-0000-0000-0000-000000000001', 'Modern Luxury Villa', 750000.00, 'Avenida Atlântica, 1500', 'Rio de Janeiro', 
 4, 3, 250.00, 'Stunning modern villa with ocean views, featuring an open concept living area, gourmet kitchen, and private pool.',
 ARRAY['Swimming Pool', 'Garden', 'Garage', 'Security System', 'Air Conditioning'],
 ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'],
 'sale', true, '550e8400-e29b-41d4-a716-446655440000'),

('p1000000-0000-0000-0000-000000000002', 'Downtown Apartment', 2500.00, 'Rua Augusta, 789', 'São Paulo', 
 2, 1, 85.00, 'Modern apartment in the heart of the city, close to restaurants, shopping, and public transportation.',
 ARRAY['Elevator', 'Gym', 'Security', 'Balcony'],
 ARRAY['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
 'rent', true, '550e8400-e29b-41d4-a716-446655440000'),

('p1000000-0000-0000-0000-000000000003', 'Countryside Retreat', 450000.00, 'Estrada do Sol, 45', 'Gramado', 
 3, 2, 180.00, 'Charming countryside home perfect for those seeking tranquility, featuring a large garden and mountain views.',
 ARRAY['Garden', 'Fireplace', 'Mountain View', 'Garage'],
 ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'],
 'sale', true, '550e8400-e29b-41d4-a716-446655440000'),

('p1000000-0000-0000-0000-000000000004', 'Beachfront Condo', 3200.00, 'Avenida Beira Mar, 2100', 'Florianópolis', 
 3, 2, 120.00, 'Luxury beachfront condominium with stunning ocean views and direct beach access.',
 ARRAY['Beach Access', 'Ocean View', 'Pool', 'Security', 'Furnished'],
 ARRAY['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
 'rent', false, '550e8400-e29b-41d4-a716-446655440000'),

('p1000000-0000-0000-0000-000000000005', 'Family House', 380000.00, 'Rua das Flores, 123', 'Curitiba', 
 3, 2, 150.00, 'Perfect family home in a quiet neighborhood, featuring a spacious backyard and modern amenities.',
 ARRAY['Backyard', 'Garage', 'Modern Kitchen', 'Security System'],
 ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'],
 'sale', false, '550e8400-e29b-41d4-a716-446655440000'),

('p1000000-0000-0000-0000-000000000006', 'Studio Apartment', 1800.00, 'Rua Oscar Freire, 456', 'São Paulo', 
 1, 1, 45.00, 'Compact and modern studio apartment in the trendy Oscar Freire area, perfect for young professionals.',
 ARRAY['Modern Design', 'Central Location', 'Security', 'Furnished'],
 ARRAY['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'],
 'rent', false, '550e8400-e29b-41d4-a716-446655440000');

-- Assign agents to properties
INSERT INTO property_agents (property_id, agent_id, is_primary) VALUES
('p1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', true),
('p1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004', true),
('p1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', true),
('p1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', true),
('p1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', true),
('p1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', true);

-- Insert testimonials
INSERT INTO testimonials (id, name, role, content, avatar, rating, approved_by) VALUES
('t1000000-0000-0000-0000-000000000001', 'Maria Silva', 'Compradora', 
 'Excelente atendimento! A equipe da Imobiliária Elite me ajudou a encontrar a casa dos meus sonhos. Profissionais muito competentes e atenciosos.',
 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('t1000000-0000-0000-0000-000000000002', 'João Santos', 'Investidor', 
 'Trabalho com a Imobiliária Elite há anos e sempre recebo o melhor suporte para meus investimentos imobiliários. Recomendo!',
 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('t1000000-0000-0000-0000-000000000003', 'Ana Costa', 'Locatária', 
 'Processo de locação muito tranquilo e transparente. A Ana Souza foi excepcional no atendimento e me ajudou em todo o processo.',
 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000'),

('t1000000-0000-0000-0000-000000000004', 'Roberto Lima', 'Empresário', 
 'Encontrei o imóvel comercial perfeito para minha empresa. O Rafael Santos entende muito do mercado comercial. Excelente trabalho!',
 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 5, '550e8400-e29b-41d4-a716-446655440000');

-- Insert some sample contact messages
INSERT INTO contact_messages (id, name, email, phone, subject, message, property_id, status) VALUES
('m1000000-0000-0000-0000-000000000001', 'Pedro Oliveira', 'pedro@email.com', '(11) 99999-1111', 
 'Interesse na Villa Moderna', 'Gostaria de agendar uma visita para conhecer a propriedade.', 
 'p1000000-0000-0000-0000-000000000001', 'new'),

('m1000000-0000-0000-0000-000000000002', 'Carla Mendes', 'carla@email.com', '(11) 88888-2222', 
 'Dúvidas sobre aluguel', 'Tenho interesse no apartamento downtown. Poderia me enviar mais informações?', 
 'p1000000-0000-0000-0000-000000000002', 'new'),

('m1000000-0000-0000-0000-000000000003', 'Lucas Ferreira', 'lucas@email.com', '(11) 77777-3333', 
 'Contato geral', 'Gostaria de saber mais sobre os serviços da imobiliária.', 
 NULL, 'read');

-- Create some sample property views for analytics
INSERT INTO property_views (property_id, ip_address, viewed_at) VALUES
('p1000000-0000-0000-0000-000000000001', '192.168.1.100', NOW() - INTERVAL '1 day'),
('p1000000-0000-0000-0000-000000000001', '192.168.1.101', NOW() - INTERVAL '2 hours'),
('p1000000-0000-0000-0000-000000000002', '192.168.1.102', NOW() - INTERVAL '3 hours'),
('p1000000-0000-0000-0000-000000000003', '192.168.1.103', NOW() - INTERVAL '1 hour'),
('p1000000-0000-0000-0000-000000000002', '192.168.1.104', NOW() - INTERVAL '30 minutes');