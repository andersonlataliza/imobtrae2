-- IMOBTRAE Complete Seeders
-- Migration 004: Comprehensive Data Loading
-- Created for complete system population

-- Clear existing data (in correct order to respect foreign keys)
DELETE FROM property_views;
DELETE FROM contact_messages;
DELETE FROM property_agents;
DELETE FROM user_permissions;
DELETE FROM testimonials;
DELETE FROM properties;
DELETE FROM agents;
DELETE FROM admin_users;
DELETE FROM permissions;

-- Reset sequences
ALTER SEQUENCE IF EXISTS contact_messages_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS property_views_id_seq RESTART WITH 1;

-- Insert comprehensive permissions
INSERT INTO permissions (id, name, description, category) VALUES
-- Properties permissions
('properties.view', 'Visualizar Imóveis', 'Permite visualizar lista e detalhes de imóveis', 'properties'),
('properties.create', 'Criar Imóveis', 'Permite criar novos imóveis no sistema', 'properties'),
('properties.edit', 'Editar Imóveis', 'Permite editar informações de imóveis existentes', 'properties'),
('properties.delete', 'Excluir Imóveis', 'Permite excluir imóveis do sistema', 'properties'),
('properties.publish', 'Publicar Imóveis', 'Permite publicar/despublicar imóveis', 'properties'),
('properties.featured', 'Destacar Imóveis', 'Permite marcar imóveis como destaque', 'properties'),

-- Users permissions
('users.view', 'Visualizar Usuários', 'Permite visualizar lista de usuários do sistema', 'users'),
('users.create', 'Criar Usuários', 'Permite criar novos usuários administrativos', 'users'),
('users.edit', 'Editar Usuários', 'Permite editar informações de usuários', 'users'),
('users.delete', 'Excluir Usuários', 'Permite excluir usuários do sistema', 'users'),
('users.manage', 'Gerenciar Usuários', 'Acesso completo ao gerenciamento de usuários', 'users'),
('users.permissions', 'Gerenciar Permissões', 'Permite atribuir/remover permissões de usuários', 'users'),

-- Agents permissions
('agents.view', 'Visualizar Corretores', 'Permite visualizar lista e perfis de corretores', 'agents'),
('agents.create', 'Criar Corretores', 'Permite cadastrar novos corretores', 'agents'),
('agents.edit', 'Editar Corretores', 'Permite editar informações de corretores', 'agents'),
('agents.delete', 'Excluir Corretores', 'Permite excluir corretores do sistema', 'agents'),
('agents.assign', 'Atribuir Corretores', 'Permite atribuir corretores a imóveis', 'agents'),

-- Messages permissions
('messages.view', 'Visualizar Mensagens', 'Permite visualizar mensagens de contato', 'messages'),
('messages.respond', 'Responder Mensagens', 'Permite responder mensagens de contato', 'messages'),
('messages.delete', 'Excluir Mensagens', 'Permite excluir mensagens do sistema', 'messages'),
('messages.export', 'Exportar Mensagens', 'Permite exportar relatórios de mensagens', 'messages'),

-- Settings permissions
('settings.view', 'Visualizar Configurações', 'Permite visualizar configurações do sistema', 'settings'),
('settings.edit', 'Editar Configurações', 'Permite modificar configurações do sistema', 'settings'),
('settings.backup', 'Backup Sistema', 'Permite realizar backup do sistema', 'settings'),
('settings.logs', 'Visualizar Logs', 'Permite acessar logs do sistema', 'settings'),

-- Analytics permissions
('analytics.view', 'Visualizar Analytics', 'Permite visualizar relatórios e estatísticas', 'analytics'),
('analytics.export', 'Exportar Relatórios', 'Permite exportar relatórios detalhados', 'analytics'),

-- Testimonials permissions
('testimonials.view', 'Visualizar Depoimentos', 'Permite visualizar depoimentos de clientes', 'testimonials'),
('testimonials.create', 'Criar Depoimentos', 'Permite criar novos depoimentos', 'testimonials'),
('testimonials.edit', 'Editar Depoimentos', 'Permite editar depoimentos existentes', 'testimonials'),
('testimonials.delete', 'Excluir Depoimentos', 'Permite excluir depoimentos', 'testimonials');

-- Insert comprehensive admin users
INSERT INTO admin_users (id, name, email, role, created_at, last_login, is_active) VALUES
-- Super Admin
('550e8400-e29b-41d4-a716-446655440000', 'Carlos Silva', 'admin@imobtrae.com', 'super_admin', NOW(), NOW(), true),

-- Admins
('550e8400-e29b-41d4-a716-446655440001', 'Maria Santos', 'maria.santos@imobtrae.com', 'admin', NOW(), NOW() - INTERVAL '2 days', true),
('550e8400-e29b-41d4-a716-446655440002', 'João Oliveira', 'joao.oliveira@imobtrae.com', 'admin', NOW(), NOW() - INTERVAL '1 day', true),

-- Editors
('550e8400-e29b-41d4-a716-446655440003', 'Ana Costa', 'ana.costa@imobtrae.com', 'editor', NOW(), NOW() - INTERVAL '3 hours', true),
('550e8400-e29b-41d4-a716-446655440004', 'Pedro Almeida', 'pedro.almeida@imobtrae.com', 'editor', NOW(), NOW() - INTERVAL '1 hour', true),
('550e8400-e29b-41d4-a716-446655440005', 'Lucia Ferreira', 'lucia.ferreira@imobtrae.com', 'editor', NOW(), NOW() - INTERVAL '5 hours', true),

-- Viewers
('550e8400-e29b-41d4-a716-446655440006', 'Roberto Lima', 'roberto.lima@imobtrae.com', 'viewer', NOW(), NOW() - INTERVAL '1 day', true),
('550e8400-e29b-41d4-a716-446655440007', 'Fernanda Rocha', 'fernanda.rocha@imobtrae.com', 'viewer', NOW(), NOW() - INTERVAL '2 days', true),

-- Inactive user for testing
('550e8400-e29b-41d4-a716-446655440008', 'Usuario Inativo', 'inativo@imobtrae.com', 'viewer', NOW(), NOW() - INTERVAL '30 days', false);

-- Insert comprehensive agents
INSERT INTO agents (id, name, position, photo, contact, email, bio, created_at, updated_at) VALUES
('agent-001', 'Carlos Eduardo Silva', 'Corretor Sênior', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', '(11) 99999-0001', 'carlos.silva@imobtrae.com', 'Especialista em imóveis de alto padrão com mais de 15 anos de experiência no mercado imobiliário de São Paulo. Formado em Administração e pós-graduado em Gestão Imobiliária.', NOW(), NOW()),

('agent-002', 'Marina Santos Oliveira', 'Corretora Especialista', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face', '(11) 99999-0002', 'marina.santos@imobtrae.com', 'Focada em apartamentos e casas para famílias, com expertise em financiamento imobiliário. Mais de 10 anos ajudando clientes a realizar o sonho da casa própria.', NOW(), NOW()),

('agent-003', 'Roberto Almeida Costa', 'Corretor Comercial', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', '(11) 99999-0003', 'roberto.almeida@imobtrae.com', 'Especialista em imóveis comerciais e investimentos. Atua principalmente com salas comerciais, galpões e terrenos para desenvolvimento.', NOW(), NOW()),

('agent-004', 'Ana Paula Ferreira', 'Corretora Residencial', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', '(11) 99999-0004', 'ana.ferreira@imobtrae.com', 'Especializada em imóveis residenciais na zona sul de São Paulo. Conhecimento profundo do mercado local e excelente relacionamento com clientes.', NOW(), NOW()),

('agent-005', 'Fernando Rodrigues', 'Corretor de Luxo', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face', '(11) 99999-0005', 'fernando.rodrigues@imobtrae.com', 'Corretor especializado em imóveis de luxo e alto padrão. Atende clientes VIP com discrição e excelência no atendimento personalizado.', NOW(), NOW()),

('agent-006', 'Juliana Mendes', 'Corretora Digital', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face', '(11) 99999-0006', 'juliana.mendes@imobtrae.com', 'Especialista em vendas online e marketing digital imobiliário. Pioneira em tours virtuais e atendimento remoto de qualidade.', NOW(), NOW()),

('agent-007', 'Marcos Vinícius', 'Corretor de Investimentos', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face', '(11) 99999-0007', 'marcos.vinicius@imobtrae.com', 'Focado em investimentos imobiliários e consultoria patrimonial. Ajuda investidores a maximizar retornos através de estratégias imobiliárias.', NOW(), NOW()),

('agent-008', 'Camila Souza', 'Corretora Jovem', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face', '(11) 99999-0008', 'camila.souza@imobtrae.com', 'Corretora especializada no atendimento ao público jovem. Expert em apartamentos para solteiros e casais sem filhos, com foco em localização e mobilidade urbana.', NOW(), NOW());

-- Insert comprehensive properties
INSERT INTO properties (id, title, price, address, city, bedrooms, bathrooms, area, description, features, images, type, featured, created_at, updated_at) VALUES
-- Apartamentos de Alto Padrão
('prop-001', 'Apartamento Luxuoso na Vila Madalena', 1250000.00, 'Rua Harmonia, 1234', 'São Paulo', 3, 2, 120.00, 'Apartamento moderno e sofisticado no coração da Vila Madalena. Totalmente reformado com acabamentos de primeira linha, cozinha gourmet integrada e varanda com vista panorâmica.', ARRAY['Varanda gourmet', 'Cozinha integrada', 'Ar condicionado', 'Piscina', 'Academia', 'Portaria 24h', 'Vaga de garagem', 'Elevador'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560449752-b4b5c2b5c3e2?w=800', 'https://images.unsplash.com/photo-1560449752-c4b5c2b5c3e3?w=800'], 'apartment', true, NOW(), NOW()),

('prop-002', 'Cobertura Duplex Jardins', 2800000.00, 'Alameda Santos, 567', 'São Paulo', 4, 3, 250.00, 'Cobertura duplex exclusiva nos Jardins com terraço privativo, piscina e churrasqueira. Vista deslumbrante da cidade e acabamentos importados em todos os ambientes.', ARRAY['Terraço privativo', 'Piscina privativa', 'Churrasqueira', 'Vista panorâmica', 'Elevador privativo', 'Portaria 24h', '3 vagas de garagem', 'Depósito'], ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800'], 'apartment', true, NOW(), NOW()),

('prop-003', 'Apartamento Moderno Brooklin', 850000.00, 'Rua Joaquim Floriano, 890', 'São Paulo', 2, 2, 85.00, 'Apartamento contemporâneo no Brooklin, próximo ao metrô e shopping centers. Planta otimizada e varanda integrada com living.', ARRAY['Varanda integrada', 'Cozinha americana', 'Ar condicionado', 'Academia', 'Salão de festas', 'Portaria 24h', 'Vaga de garagem'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800'], 'apartment', false, NOW(), NOW()),

-- Casas
('prop-004', 'Casa Térrea Alto de Pinheiros', 1650000.00, 'Rua Cardeal Arcoverde, 456', 'São Paulo', 4, 3, 300.00, 'Casa térrea charmosa no Alto de Pinheiros com jardim amplo e piscina. Perfeita para famílias que buscam tranquilidade sem abrir mão da localização privilegiada.', ARRAY['Jardim amplo', 'Piscina', 'Churrasqueira', 'Garagem para 4 carros', 'Escritório', 'Lareira', 'Quintal', 'Portão eletrônico'], ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'], 'house', true, NOW(), NOW()),

('prop-005', 'Sobrado Moderno Morumbi', 2200000.00, 'Rua Giovanni Gronchi, 789', 'São Paulo', 5, 4, 400.00, 'Sobrado moderno no Morumbi com arquitetura contemporânea. Amplos espaços integrados, piscina com deck e área gourmet completa.', ARRAY['Arquitetura moderna', 'Piscina com deck', 'Área gourmet', 'Home theater', 'Escritório', 'Suíte master', 'Garagem para 6 carros', 'Sistema de segurança'], ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800'], 'house', true, NOW(), NOW()),

('prop-006', 'Casa de Condomínio Alphaville', 1450000.00, 'Alameda Araguaia, 123', 'Barueri', 3, 3, 220.00, 'Casa em condomínio fechado de alto padrão em Alphaville. Segurança 24h, área de lazer completa e localização estratégica.', ARRAY['Condomínio fechado', 'Segurança 24h', 'Piscina do condomínio', 'Quadra de tênis', 'Playground', 'Salão de festas', 'Garagem para 3 carros'], ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'], 'house', false, NOW(), NOW()),

-- Imóveis Comerciais
('prop-007', 'Sala Comercial Faria Lima', 750000.00, 'Avenida Faria Lima, 2000', 'São Paulo', 0, 2, 60.00, 'Sala comercial moderna na Faria Lima, ideal para escritórios e consultorias. Prédio corporativo com infraestrutura completa.', ARRAY['Prédio corporativo', 'Ar condicionado central', 'Elevadores', 'Portaria 24h', 'Vaga de garagem', 'Gerador', 'Internet fibra'], ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'], 'commercial', false, NOW(), NOW()),

('prop-008', 'Galpão Industrial Guarulhos', 1200000.00, 'Rodovia Presidente Dutra, km 15', 'Guarulhos', 0, 4, 800.00, 'Galpão industrial estrategicamente localizado próximo à Dutra. Ideal para logística e distribuição com fácil acesso a rodovias.', ARRAY['Localização estratégica', 'Pé direito alto', 'Docas para caminhões', 'Escritório administrativo', 'Estacionamento amplo', 'Energia trifásica'], ARRAY['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', 'https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800'], 'commercial', false, NOW(), NOW()),

-- Apartamentos Econômicos
('prop-009', 'Apartamento Compacto Vila Prudente', 320000.00, 'Rua do Oratório, 567', 'São Paulo', 2, 1, 45.00, 'Apartamento compacto e funcional na Vila Prudente. Ótima opção para primeiro imóvel ou investimento. Próximo ao metrô.', ARRAY['Próximo ao metrô', 'Portaria', 'Playground', 'Salão de festas', 'Vaga de garagem'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'], 'apartment', false, NOW(), NOW()),

('prop-010', 'Apartamento Familiar Tatuapé', 480000.00, 'Rua Tuiuti, 890', 'São Paulo', 3, 2, 70.00, 'Apartamento familiar no Tatuapé com boa metragem e localização. Próximo a escolas, comércio e transporte público.', ARRAY['Localização central', 'Próximo a escolas', 'Transporte público', 'Portaria', 'Playground', 'Vaga de garagem'], ARRAY['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', 'https://images.unsplash.com/photo-1484154218968-a197022b5858?w=800'], 'apartment', false, NOW(), NOW()),

-- Casas de Alto Padrão
('prop-011', 'Mansão Cidade Jardim', 8500000.00, 'Avenida Cidade Jardim, 100', 'São Paulo', 6, 5, 800.00, 'Mansão exclusiva na Cidade Jardim com projeto arquitetônico assinado. Terreno de 1200m² com jardim paisagístico e área de lazer completa.', ARRAY['Projeto arquitetônico', 'Jardim paisagístico', 'Piscina olímpica', 'Quadra de tênis', 'Adega climatizada', 'Home theater', 'Elevador', 'Garagem para 8 carros'], ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], 'house', true, NOW(), NOW()),

('prop-012', 'Casa de Campo Cotia', 950000.00, 'Estrada da Capuava, 456', 'Cotia', 4, 3, 350.00, 'Casa de campo em Cotia com muito verde e tranquilidade. Ideal para quem busca qualidade de vida longe do centro urbano.', ARRAY['Muito verde', 'Tranquilidade', 'Piscina natural', 'Horta orgânica', 'Churrasqueira', 'Garagem para 4 carros', 'Poço artesiano'], ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'], 'house', false, NOW(), NOW());

-- Insert property-agent relationships
INSERT INTO property_agents (property_id, agent_id, created_at) VALUES
('prop-001', 'agent-001', NOW()),
('prop-002', 'agent-005', NOW()),
('prop-003', 'agent-002', NOW()),
('prop-004', 'agent-004', NOW()),
('prop-005', 'agent-005', NOW()),
('prop-006', 'agent-002', NOW()),
('prop-007', 'agent-003', NOW()),
('prop-008', 'agent-003', NOW()),
('prop-009', 'agent-002', NOW()),
('prop-010', 'agent-004', NOW()),
('prop-011', 'agent-005', NOW()),
('prop-012', 'agent-001', NOW()),
-- Some properties with multiple agents
('prop-001', 'agent-006', NOW()),
('prop-002', 'agent-001', NOW()),
('prop-005', 'agent-001', NOW()),
('prop-011', 'agent-001', NOW());

-- Insert comprehensive testimonials
INSERT INTO testimonials (id, name, role, content, avatar, created_at, updated_at) VALUES
('test-001', 'Ricardo Mendes', 'Empresário', 'Excelente atendimento! A equipe da IMOBTRAE me ajudou a encontrar o apartamento perfeito na Vila Madalena. Processo rápido e transparente.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-002', 'Fernanda Costa', 'Arquiteta', 'Profissionais competentes e atenciosos. Conseguiram vender minha casa em tempo recorde pelo melhor preço do mercado. Recomendo!', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-003', 'Carlos Eduardo', 'Médico', 'Comprei minha primeira casa através da IMOBTRAE. Desde o primeiro contato até a entrega das chaves, tudo foi perfeito. Equipe nota 10!', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-004', 'Marina Silva', 'Advogada', 'Atendimento personalizado e conhecimento profundo do mercado. Me senti segura durante todo o processo de compra do meu apartamento.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-005', 'João Santos', 'Engenheiro', 'Investimento certeiro! A consultoria da IMOBTRAE me ajudou a escolher o melhor imóvel para investimento. Já estou vendo os resultados.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-006', 'Ana Beatriz', 'Designer', 'Venderam meu apartamento em apenas 2 semanas! Marketing excelente e negociação profissional. Superou todas as expectativas.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-007', 'Roberto Lima', 'Contador', 'Equipe muito preparada e honesta. Me orientaram sobre todos os aspectos legais e financeiros da compra. Transparência total!', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),

('test-008', 'Juliana Rocha', 'Professora', 'Atendimento humanizado e eficiente. Entenderam exatamente o que eu procurava e encontraram a casa dos meus sonhos. Gratidão!', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', NOW(), NOW());

-- Insert user permissions for different roles
-- Super Admin gets all permissions automatically (handled by policies)

-- Admin permissions
INSERT INTO user_permissions (user_id, permission_id, created_at) VALUES
-- Maria Santos (Admin)
('550e8400-e29b-41d4-a716-446655440001', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'properties.create', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'properties.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'properties.publish', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'properties.featured', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'agents.create', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'agents.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'agents.assign', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'messages.respond', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'testimonials.view', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'testimonials.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'analytics.view', NOW()),

-- João Oliveira (Admin)
('550e8400-e29b-41d4-a716-446655440002', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'properties.create', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'properties.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'properties.delete', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'agents.create', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'agents.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'messages.respond', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'messages.delete', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'settings.view', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'analytics.view', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'analytics.export', NOW());

-- Editor permissions
-- Ana Costa (Editor)
INSERT INTO user_permissions (user_id, permission_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'properties.create', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'properties.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'agents.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'messages.respond', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'testimonials.view', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'testimonials.create', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'testimonials.edit', NOW()),

-- Pedro Almeida (Editor)
('550e8400-e29b-41d4-a716-446655440004', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'properties.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'properties.publish', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'agents.assign', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'messages.respond', NOW()),

-- Lucia Ferreira (Editor)
('550e8400-e29b-41d4-a716-446655440005', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'properties.create', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'properties.edit', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'testimonials.view', NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'testimonials.create', NOW());

-- Viewer permissions
-- Roberto Lima (Viewer)
INSERT INTO user_permissions (user_id, permission_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440006', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'testimonials.view', NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'analytics.view', NOW()),

-- Fernanda Rocha (Viewer)
('550e8400-e29b-41d4-a716-446655440007', 'properties.view', NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'agents.view', NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'messages.view', NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'testimonials.view', NOW());

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, phone, subject, message, property_id, created_at, updated_at) VALUES
('Lucas Martins', 'lucas.martins@email.com', '(11) 98765-4321', 'Interesse no apartamento Vila Madalena', 'Olá! Tenho interesse no apartamento na Vila Madalena. Gostaria de agendar uma visita para este final de semana. Aguardo retorno.', 'prop-001', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

('Carla Fernandes', 'carla.fernandes@email.com', '(11) 97654-3210', 'Informações sobre financiamento', 'Bom dia! Gostaria de saber mais informações sobre as opções de financiamento para o apartamento no Brooklin. Tenho FGTS para usar como entrada.', 'prop-003', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),

('Rafael Santos', 'rafael.santos@email.com', '(11) 96543-2109', 'Visita à casa no Alto de Pinheiros', 'Boa tarde! Tenho muito interesse na casa no Alto de Pinheiros. Posso visitar amanhã pela manhã? Sou pré-aprovado para financiamento.', 'prop-004', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours'),

('Patrícia Lima', 'patricia.lima@email.com', '(11) 95432-1098', 'Dúvidas sobre condomínio', 'Olá! Gostaria de saber o valor do condomínio e IPTU da cobertura nos Jardins. Também quero informações sobre a documentação.', 'prop-002', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),

('Marcos Oliveira', 'marcos.oliveira@email.com', '(11) 94321-0987', 'Interesse comercial', 'Bom dia! Represento uma empresa que está procurando um galpão para logística. O galpão em Guarulhos atende nossas necessidades. Podemos conversar?', 'prop-008', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '5 hours'),

('Amanda Costa', 'amanda.costa@email.com', '(11) 93210-9876', 'Primeiro imóvel', 'Olá! Estou procurando meu primeiro apartamento. O da Vila Prudente está dentro do meu orçamento. Gostaria de mais informações sobre financiamento.', 'prop-009', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours'),

('Eduardo Rocha', 'eduardo.rocha@email.com', '(11) 92109-8765', 'Investimento imobiliário', 'Boa tarde! Sou investidor e tenho interesse no apartamento do Tatuapé para locação. Qual a rentabilidade estimada da região?', 'prop-010', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours'),

('Beatriz Almeida', 'beatriz.almeida@email.com', '(11) 91098-7654', 'Casa dos sonhos', 'Olá! A mansão na Cidade Jardim é exatamente o que procuro. Gostaria de agendar uma visita com meu arquiteto. Quando seria possível?', 'prop-011', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),

('Gabriel Silva', 'gabriel.silva@email.com', '(11) 90987-6543', 'Informações gerais', 'Bom dia! Gostaria de receber informações sobre todos os imóveis disponíveis na zona sul de São Paulo na faixa de R$ 800.000 a R$ 1.200.000.', NULL, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),

('Isabela Santos', 'isabela.santos@email.com', '(11) 89876-5432', 'Venda de imóvel', 'Olá! Tenho um apartamento para vender na região da Liberdade. Gostaria de uma avaliação e proposta de trabalho da imobiliária.', NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Insert sample property views for analytics
INSERT INTO property_views (property_id, user_agent, viewed_at) VALUES
-- Popular properties with more views
('prop-001', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '1 hour'),
('prop-001', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '2 hours'),
('prop-001', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '3 hours'),
('prop-001', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)', NOW() - INTERVAL '4 hours'),
('prop-001', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '5 hours'),

('prop-002', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '1 hour'),
('prop-002', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '2 hours'),
('prop-002', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '6 hours'),

('prop-004', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '30 minutes'),
('prop-004', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)', NOW() - INTERVAL '1 hour'),
('prop-004', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '3 hours'),
('prop-004', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '4 hours'),

('prop-005', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '2 hours'),
('prop-005', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '5 hours'),
('prop-005', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)', NOW() - INTERVAL '7 hours'),

('prop-011', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '1 hour'),
('prop-011', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '3 hours'),

-- Other properties with fewer views
('prop-003', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '2 hours'),
('prop-003', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)', NOW() - INTERVAL '4 hours'),

('prop-006', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '3 hours'),
('prop-006', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '6 hours'),

('prop-007', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '1 hour'),

('prop-008', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '4 hours'),

('prop-009', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)', NOW() - INTERVAL '2 hours'),
('prop-009', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', NOW() - INTERVAL '5 hours'),

('prop-010', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '3 hours'),

('prop-012', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '7 hours');

-- Create some additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_price_range ON properties(price) WHERE price BETWEEN 300000 AND 3000000;
CREATE INDEX IF NOT EXISTS idx_properties_city_type ON properties(city, type);
CREATE INDEX IF NOT EXISTS idx_properties_featured_created ON properties(featured, created_at DESC) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_property_views_property_date ON property_views(property_id, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_name ON agents(name);
CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC);

-- Update statistics for better query planning
ANALYZE properties;
ANALYZE agents;
ANALYZE admin_users;
ANALYZE contact_messages;
ANALYZE property_views;
ANALYZE testimonials;

-- Comments for documentation
COMMENT ON TABLE properties IS 'Tabela principal de imóveis com informações completas';
COMMENT ON TABLE agents IS 'Corretores e agentes imobiliários';
COMMENT ON TABLE admin_users IS 'Usuários administrativos do sistema';
COMMENT ON TABLE permissions IS 'Permissões granulares do sistema';
COMMENT ON TABLE user_permissions IS 'Relacionamento entre usuários e permissões';
COMMENT ON TABLE contact_messages IS 'Mensagens de contato dos clientes';
COMMENT ON TABLE property_views IS 'Analytics de visualizações de imóveis';
COMMENT ON TABLE testimonials IS 'Depoimentos de clientes satisfeitos';
COMMENT ON TABLE property_agents IS 'Relacionamento entre imóveis e corretores responsáveis';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'IMOBTRAE: Seeders executados com sucesso!';
    RAISE NOTICE 'Dados inseridos:';
    RAISE NOTICE '- 28 Permissões do sistema';
    RAISE NOTICE '- 9 Usuários administrativos';
    RAISE NOTICE '- 8 Corretores';
    RAISE NOTICE '- 12 Propriedades';
    RAISE NOTICE '- 8 Depoimentos';
    RAISE NOTICE '- 10 Mensagens de contato';
    RAISE NOTICE '- 25+ Visualizações de propriedades';
    RAISE NOTICE '- Relacionamentos e permissões configurados';
    RAISE NOTICE 'Sistema pronto para uso!';
END $$;