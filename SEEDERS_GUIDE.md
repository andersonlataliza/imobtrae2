# 🌱 Guia de Seeders - IMOBTRAE

## 📋 Visão Geral

O projeto IMOBTRAE possui dois tipos de seeders para popular o banco de dados:

1. **Seeders Básicos** (`002_seed_data.sql`) - Dados mínimos para funcionamento
2. **Seeders Completos** (`004_complete_seeders.sql`) - Dados realistas para demonstração

## 🔄 Tipos de Seeders

### 002_seed_data.sql - Seeders Básicos

**Quando usar:**
- Desenvolvimento inicial
- Testes unitários
- Ambiente de desenvolvimento limpo
- Quando você quer adicionar seus próprios dados

**Conteúdo:**
- ✅ 16 permissões básicas
- ✅ 1 usuário super admin
- ✅ 4 corretores básicos
- ✅ 6 propriedades de exemplo
- ✅ 4 depoimentos simples
- ✅ 3 mensagens de contato
- ✅ Dados mínimos para analytics

### 004_complete_seeders.sql - Seeders Completos

**Quando usar:**
- Demonstrações para clientes
- Ambiente de staging/homologação
- Testes de performance
- Sistema pronto para apresentação

**Conteúdo:**
- ✅ 28 permissões granulares
- ✅ 9 usuários com diferentes roles
- ✅ 8 corretores especializados
- ✅ 12 propriedades diversificadas
- ✅ 8 depoimentos detalhados
- ✅ 10 mensagens de contato realistas
- ✅ 25+ visualizações para analytics
- ✅ Relacionamentos completos

## 👥 Usuários Administrativos (Seeders Completos)

### Super Admin
| Nome | Email | Senha | Role | Descrição |
|------|-------|-------|------|-----------|
| Carlos Silva | admin@imobtrae.com | admin123 | super_admin | Acesso total ao sistema |

### Administradores
| Nome | Email | Senha | Role | Permissões |
|------|-------|-------|------|------------|
| Maria Santos | maria.santos@imobtrae.com | admin123 | admin | Gestão de imóveis, agentes, mensagens |
| João Oliveira | joao.oliveira@imobtrae.com | admin123 | admin | Gestão completa + analytics |

### Editores
| Nome | Email | Senha | Role | Especialização |
|------|-------|-------|------|----------------|
| Ana Costa | ana.costa@imobtrae.com | editor123 | editor | Imóveis + Depoimentos |
| Pedro Almeida | pedro.almeida@imobtrae.com | editor123 | editor | Publicação + Atribuições |
| Lucia Ferreira | lucia.ferreira@imobtrae.com | editor123 | editor | Criação de conteúdo |

### Visualizadores
| Nome | Email | Senha | Role | Acesso |
|------|-------|-------|------|--------|
| Roberto Lima | roberto.lima@imobtrae.com | viewer123 | viewer | Visualização + Analytics |
| Fernanda Rocha | fernanda.rocha@imobtrae.com | viewer123 | viewer | Apenas visualização |

## 🏠 Propriedades (Seeders Completos)

### Apartamentos de Alto Padrão
- **Vila Madalena** - R$ 1.250.000 (3 quartos, 120m²)
- **Jardins Cobertura** - R$ 2.800.000 (4 quartos, 250m²)
- **Brooklin Moderno** - R$ 850.000 (2 quartos, 85m²)

### Casas Residenciais
- **Alto de Pinheiros** - R$ 1.650.000 (4 quartos, 300m²)
- **Morumbi Sobrado** - R$ 2.200.000 (5 quartos, 400m²)
- **Alphaville Condomínio** - R$ 1.450.000 (3 quartos, 220m²)
- **Cotia Campo** - R$ 950.000 (4 quartos, 350m²)

### Imóveis Comerciais
- **Faria Lima Sala** - R$ 750.000 (60m²)
- **Guarulhos Galpão** - R$ 1.200.000 (800m²)

### Apartamentos Econômicos
- **Vila Prudente** - R$ 320.000 (2 quartos, 45m²)
- **Tatuapé Familiar** - R$ 480.000 (3 quartos, 70m²)

### Imóveis de Luxo
- **Cidade Jardim Mansão** - R$ 8.500.000 (6 quartos, 800m²)

## 👨‍💼 Corretores (Seeders Completos)

| Nome | Especialização | Contato | Email |
|------|----------------|---------|-------|
| Carlos Eduardo Silva | Imóveis Alto Padrão | (11) 99999-0001 | carlos.silva@imobtrae.com |
| Marina Santos Oliveira | Financiamento Familiar | (11) 99999-0002 | marina.santos@imobtrae.com |
| Roberto Almeida Costa | Imóveis Comerciais | (11) 99999-0003 | roberto.almeida@imobtrae.com |
| Ana Paula Ferreira | Residencial Zona Sul | (11) 99999-0004 | ana.ferreira@imobtrae.com |
| Fernando Rodrigues | Imóveis de Luxo | (11) 99999-0005 | fernando.rodrigues@imobtrae.com |
| Juliana Mendes | Vendas Digitais | (11) 99999-0006 | juliana.mendes@imobtrae.com |
| Marcos Vinícius | Investimentos | (11) 99999-0007 | marcos.vinicius@imobtrae.com |
| Camila Souza | Público Jovem | (11) 99999-0008 | camila.souza@imobtrae.com |

## 🔐 Sistema de Permissões

### Categorias de Permissões
- **properties** - Gestão de imóveis (view, create, edit, delete, publish, featured)
- **users** - Gestão de usuários (view, create, edit, delete, manage, permissions)
- **agents** - Gestão de corretores (view, create, edit, delete, assign)
- **messages** - Gestão de mensagens (view, respond, delete, export)
- **settings** - Configurações (view, edit, backup, logs)
- **analytics** - Relatórios (view, export)
- **testimonials** - Depoimentos (view, create, edit, delete)

### Matriz de Permissões por Role

| Permissão | Super Admin | Admin | Editor | Viewer |
|-----------|-------------|-------|--------|---------|
| Todas as permissões | ✅ | ❌ | ❌ | ❌ |
| Gestão de usuários | ✅ | ❌ | ❌ | ❌ |
| Gestão de imóveis | ✅ | ✅ | ✅ | ❌ |
| Gestão de agentes | ✅ | ✅ | Parcial | ❌ |
| Mensagens | ✅ | ✅ | ✅ | ❌ |
| Analytics | ✅ | ✅ | ❌ | ✅ |
| Configurações | ✅ | Parcial | ❌ | ❌ |

## 📊 Dados de Analytics

### Visualizações de Propriedades
- **Mais visualizadas**: Vila Madalena (5 views), Jardins Cobertura (3 views)
- **Dispositivos**: Desktop (60%), Mobile (40%)
- **Horários**: Distribuídos ao longo do dia
- **User Agents**: Diversos navegadores e dispositivos

### Mensagens de Contato
- **10 mensagens** de diferentes clientes
- **Tipos**: Interesse em imóveis específicos, dúvidas sobre financiamento, consultas gerais
- **Horários**: Últimas 2 dias com timestamps realistas
- **Propriedades**: Algumas mensagens linkadas a imóveis específicos

## 🚀 Como Executar

### Opção 1: Seeders Básicos
```sql
-- Execute apenas se quiser dados mínimos
\i migrations/001_initial_schema.sql
\i migrations/002_seed_data.sql
\i migrations/003_storage_policies.sql
```

### Opção 2: Seeders Completos (Recomendado)
```sql
-- Execute para sistema completo
\i migrations/001_initial_schema.sql
\i migrations/004_complete_seeders.sql  -- Substitui o 002
\i migrations/003_storage_policies.sql
```

### Opção 3: Via Dashboard Supabase
1. Acesse o SQL Editor
2. Cole o conteúdo de cada arquivo
3. Execute na ordem correta
4. Verifique os logs de sucesso

## 🔄 Limpeza e Recarga

### Limpar Dados Existentes
```sql
-- O arquivo 004_complete_seeders.sql já inclui limpeza automática
-- Mas você pode executar manualmente se necessário:
DELETE FROM property_views;
DELETE FROM contact_messages;
DELETE FROM property_agents;
DELETE FROM user_permissions;
DELETE FROM testimonials;
DELETE FROM properties;
DELETE FROM agents;
DELETE FROM admin_users;
DELETE FROM permissions;
```

### Recarregar Dados
```sql
-- Após limpeza, execute novamente o seeder desejado
\i migrations/004_complete_seeders.sql
```

## ✅ Verificação Pós-Execução

### Verificar Dados Inseridos
```sql
-- Contar registros por tabela
SELECT 'permissions' as tabela, COUNT(*) as total FROM permissions
UNION ALL
SELECT 'admin_users', COUNT(*) FROM admin_users
UNION ALL
SELECT 'agents', COUNT(*) FROM agents
UNION ALL
SELECT 'properties', COUNT(*) FROM properties
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'contact_messages', COUNT(*) FROM contact_messages
UNION ALL
SELECT 'property_views', COUNT(*) FROM property_views;
```

### Resultados Esperados (Seeders Completos)
- **permissions**: 28 registros
- **admin_users**: 9 registros
- **agents**: 8 registros
- **properties**: 12 registros
- **testimonials**: 8 registros
- **contact_messages**: 10 registros
- **property_views**: 25+ registros

## 🎯 Casos de Uso

### Para Desenvolvimento
- Use **seeders básicos** (`002_seed_data.sql`)
- Adicione seus próprios dados conforme necessário
- Mantenha o ambiente limpo e controlado

### Para Demonstração
- Use **seeders completos** (`004_complete_seeders.sql`)
- Sistema pronto para apresentar
- Dados realistas e diversificados
- Múltiplos usuários para testar permissões

### Para Testes
- **Seeders básicos**: Testes unitários
- **Seeders completos**: Testes de integração e performance
- Ambos incluem dados suficientes para validação

## 🔧 Personalização

### Modificar Dados
1. Copie o arquivo de seeder desejado
2. Modifique os dados conforme necessário
3. Mantenha a estrutura e relacionamentos
4. Execute o arquivo personalizado

### Adicionar Novos Dados
1. Use os seeders como base
2. Adicione novos INSERTs no final
3. Respeite as chaves estrangeiras
4. Atualize os índices se necessário

## 📝 Notas Importantes

- **Ordem de execução**: Sempre execute na ordem correta devido às dependências
- **Limpeza automática**: O seeder completo limpa dados existentes automaticamente
- **Senhas**: Todas as senhas são hasheadas com bcrypt
- **UUIDs**: Usamos UUIDs fixos para facilitar testes e relacionamentos
- **Timestamps**: Dados incluem timestamps realistas para simular uso real
- **Performance**: Índices adicionais são criados para otimizar consultas

## 🆘 Troubleshooting

### Erro de Chave Estrangeira
- Verifique se executou na ordem correta
- Confirme que o schema foi criado primeiro

### Erro de Duplicação
- Execute a limpeza antes de recarregar
- Verifique se não executou o mesmo seeder duas vezes

### Dados Não Aparecem
- Verifique as políticas RLS
- Confirme que o usuário tem permissões adequadas
- Teste com o usuário super admin

### Performance Lenta
- Execute ANALYZE após inserir dados
- Verifique se os índices foram criados
- Considere usar VACUUM se necessário