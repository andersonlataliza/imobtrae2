# Migrations do IMOBTRAE

Este diretório contém as migrations do banco de dados PostgreSQL para o projeto IMOBTRAE usando Supabase.

## 📁 Estrutura das Migrations

```
migrations/
├── 001_initial_schema.sql    # Schema inicial completo
├── 002_seed_data.sql         # Dados iniciais básicos (seed)
├── 003_storage_policies.sql  # Storage e políticas avançadas
├── 004_complete_seeders.sql  # Dados completos para produção
└── README.md                 # Este arquivo
```

## 🚀 Como Executar as Migrations

### Método 1: Dashboard do Supabase (Recomendado)

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá para **SQL Editor**
3. Execute as migrations na ordem:
   - `001_initial_schema.sql`
   - `002_seed_data.sql`
   - `003_storage_policies.sql`

### Método 2: CLI do Supabase

```bash
# Instalar CLI
npm install -g supabase

# Login
supabase login

# Inicializar projeto
supabase init

# Linkar com projeto remoto
supabase link --project-ref YOUR_PROJECT_REF

# Executar migrations
supabase db push

# Executar funções auxiliares (se necessário)
psql -h db.your-project.supabase.co -U postgres -d postgres -f migrations/005_exec_sql_function.sql
```

**Nota**: Para dados completos, execute `004_complete_seeders.sql` ao invés de `002_seed_data.sql`

### Via Supabase Dashboard
1. Acesse o SQL Editor no dashboard do Supabase
2. Execute os arquivos na seguinte ordem:
   ```sql
   -- 1. Schema inicial
   \i migrations/001_initial_schema.sql
   
   -- 2. Dados básicos OU dados completos (escolha um)
   \i migrations/002_seed_data.sql          -- Para dados básicos
   -- OU --
   \i migrations/004_complete_seeders.sql   -- Para dados completos
   
   -- 3. Storage e políticas
   \i migrations/003_storage_policies.sql
   
   -- 4. Funções para deploy (opcional, mas recomendado)
   \i migrations/005_exec_sql_function.sql
   ```

### Método 3: Cliente PostgreSQL

```bash
# Usando psql
psql -h db.your-project-ref.supabase.co -p 5432 -d postgres -U postgres

# Executar arquivos (escolha uma das opções de seed)
\i migrations/001_initial_schema.sql
\i migrations/002_seed_data.sql          # OU
\i migrations/004_complete_seeders.sql   # Para dados completos
\i migrations/003_storage_policies.sql
\i migrations/005_exec_sql_function.sql
```

## 📋 Detalhes das Migrations

### 001_initial_schema.sql

**Objetivo**: Criar a estrutura completa do banco de dados

**Inclui**:
- ✅ Extensões PostgreSQL (uuid-ossp, pgcrypto)
- ✅ Tipos ENUM personalizados
- ✅ Tabelas principais (9 tabelas)
- ✅ Índices para performance
- ✅ Triggers para updated_at
- ✅ Políticas RLS (Row Level Security)
- ✅ Comentários de documentação

**Tabelas Criadas**:
1. `properties` - Imóveis
2. `agents` - Corretores
3. `admin_users` - Usuários administrativos
4. `permissions` - Permissões do sistema
5. `user_permissions` - Relação usuário-permissões
6. `testimonials` - Depoimentos
7. `property_agents` - Relação imóvel-corretor
8. `contact_messages` - Mensagens de contato
9. `property_views` - Analytics de visualizações

### 002_seed_data.sql

**Objetivo**: Popular o banco com dados iniciais básicos

**Inclui**:
- ✅ 16 permissões básicas do sistema
- ✅ 1 usuário administrador padrão
- ✅ 4 corretores
- ✅ 6 propriedades (3 venda, 3 aluguel)
- ✅ 4 depoimentos
- ✅ 3 mensagens de contato de exemplo
- ✅ Dados mínimos para funcionamento

### 004_complete_seeders.sql

**Objetivo**: Popular o banco com dados completos para produção

**Inclui**:
- ✅ 28 permissões granulares do sistema
- ✅ 9 usuários administrativos com diferentes roles
- ✅ 8 corretores especializados
- ✅ 12 propriedades diversificadas (apartamentos, casas, comerciais)
- ✅ 8 depoimentos de clientes
- ✅ 10 mensagens de contato de exemplo
- ✅ 25+ visualizações de propriedades para analytics
- ✅ Relacionamentos completos entre entidades
- ✅ Dados realistas para demonstração

### 003_storage_policies.sql

**Objetivo**: Configurar storage e políticas avançadas de segurança

**Inclui**:
- ✅ 4 buckets de storage configurados
- ✅ Políticas de acesso para storage
- ✅ Políticas RLS avançadas com verificação de permissões
- ✅ Funções auxiliares para autenticação
- ✅ Índices otimizados para performance

## 📁 Arquivos de Migration

### 001_initial_schema.sql
**Descrição:** Schema inicial completo do banco de dados

**Conteúdo:**
- Criação de tipos ENUM
- Criação de todas as tabelas principais
- Definição de chaves primárias e estrangeiras
- Criação de índices para performance
- Triggers para `updated_at`
- Políticas RLS básicas

### 002_seed_data.sql
**Descrição:** Dados básicos para funcionamento do sistema

**Conteúdo:**
- 16 permissões básicas do sistema
- 1 usuário super admin
- 4 corretores de exemplo
- 6 propriedades de demonstração
- 4 depoimentos de clientes
- 3 mensagens de contato
- Dados básicos para analytics

### 003_storage_policies.sql
**Descrição:** Configuração de storage e políticas avançadas

**Conteúdo:**
- 4 buckets de storage (property-images, agent-photos, testimonial-avatars, documents)
- Políticas RLS para storage
- Políticas RLS aprimoradas para tabelas
- Funções auxiliares (check_user_permission, get_user_role)
- Índices otimizados

### 004_complete_seeders.sql
**Descrição:** Dados completos para demonstração (alternativa ao 002)

**Conteúdo:**
- 28 permissões granulares
- 9 usuários administrativos com diferentes roles
- 8 corretores especializados
- 12 propriedades diversificadas
- 8 depoimentos detalhados
- 10 mensagens de contato realistas
- 25+ visualizações para analytics
- Relacionamentos completos
- Índices adicionais

### 005_exec_sql_function.sql
**Descrição:** Funções auxiliares para deploy automatizado

**Conteúdo:**
- Função `exec_sql()` para execução dinâmica de SQL
- Função `table_exists()` para verificar existência de tabelas
- Função `count_table_records()` para contar registros
- Função `database_health_check()` para verificação de saúde
- Função `run_migration()` para execução segura de migrations
- Tabela `migration_logs` para log de execução
- Funções de logging (`log_migration`, `update_migration_log`)
- Índices para performance dos logs

## 🔐 Credenciais Padrão

**Usuário Administrador**:
- Email: `admin@imobiliaria.com`
- Senha: `admin123`
- Role: `super_admin`

> ⚠️ **Importante**: Altere essas credenciais em produção!

## 🛡️ Segurança (RLS)

### Políticas Implementadas:

**Acesso Público** (SELECT apenas):
- `properties` (apenas ativos)
- `agents` (apenas ativos)
- `testimonials` (apenas ativos)

**Acesso Administrativo** (CRUD completo):
- Todas as tabelas para usuários autenticados
- Baseado em roles e permissões

### Roles do Sistema:

1. **super_admin**: Acesso total
2. **admin**: Gerenciamento geral
3. **editor**: Edição de conteúdo
4. **viewer**: Apenas visualização

## 📊 Estrutura de Permissões

### Categorias:
- `properties` - Gestão de imóveis
- `users` - Gestão de usuários
- `agents` - Gestão de corretores
- `messages` - Gestão de mensagens
- `settings` - Configurações do sistema

### Ações por Categoria:
- `view` - Visualizar
- `create` - Criar
- `edit` - Editar
- `delete` - Excluir

## 🔄 Adicionando Novas Migrations

### Convenção de Nomenclatura:
```
003_add_feature_name.sql
004_update_table_structure.sql
005_add_new_permissions.sql
```

### Template para Nova Migration:

```sql
-- Migration XXX: Descrição da mudança
-- Created: YYYY-MM-DD
-- Author: Nome do desenvolvedor

-- Verificar se a migration já foi executada
DO $$
BEGIN
    -- Sua lógica aqui
END $$;

-- Comentários explicativos
COMMENT ON TABLE nova_tabela IS 'Descrição da nova tabela';
```

### Boas Práticas:

1. **Sempre fazer backup** antes de executar migrations
2. **Testar em ambiente de desenvolvimento** primeiro
3. **Usar transações** para operações complexas
4. **Documentar mudanças** nos comentários
5. **Verificar dependências** entre migrations
6. **Manter compatibilidade** com versões anteriores

## 🧪 Verificação Pós-Migration

### Checklist:

```sql
-- 1. Verificar se todas as tabelas foram criadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- 2. Verificar dados iniciais
SELECT 'properties' as table_name, count(*) as records FROM properties
UNION ALL
SELECT 'agents', count(*) FROM agents
UNION ALL
SELECT 'admin_users', count(*) FROM admin_users;

-- 3. Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies WHERE schemaname = 'public';

-- 4. Testar autenticação
SELECT email, role, is_active FROM admin_users;
```

## 🆘 Troubleshooting

### Problemas Comuns:

**1. Erro de permissão**:
```sql
-- Verificar se você é o owner do banco
SELECT current_user, session_user;
```

**2. Extensões não encontradas**:
```sql
-- Verificar extensões instaladas
SELECT * FROM pg_extension;
```

**3. RLS bloqueando acesso**:
```sql
-- Temporariamente desabilitar RLS para debug
ALTER TABLE nome_da_tabela DISABLE ROW LEVEL SECURITY;
```

**4. Dados duplicados**:
```sql
-- Verificar constraints únicas
SELECT conname, contype FROM pg_constraint 
WHERE contype = 'u' AND connamespace = 'public'::regnamespace;
```

### Rollback de Emergency:

```sql
-- CUIDADO: Isso apaga TODOS os dados!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

## 📚 Recursos Úteis

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor](https://supabase.com/docs/guides/database/sql-editor)

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs do Supabase Dashboard
2. Consulte a documentação oficial
3. Verifique as issues do projeto no GitHub
4. Entre em contato com a equipe de desenvolvimento