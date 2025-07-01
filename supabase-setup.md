# Configuração do Supabase para IMOBTRAE

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. CLI do Supabase instalado (opcional)

## 🚀 Configuração Inicial

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie um novo projeto:
   - **Nome**: IMOBTRAE
   - **Database Password**: Escolha uma senha segura
   - **Region**: Escolha a região mais próxima (ex: South America)

### 2. Executar Migrations

#### Opção A: Via Dashboard do Supabase

1. Acesse seu projeto no Supabase Dashboard
2. Vá para **SQL Editor**
3. Execute os arquivos de migration na ordem:
   - Primeiro: `migrations/001_initial_schema.sql`
   - Segundo: `migrations/002_seed_data.sql` (dados básicos) **OU** `migrations/004_complete_seeders.sql` (dados completos)
   - Terceiro: `migrations/003_storage_policies.sql`

**Recomendação**: Use `004_complete_seeders.sql` para um sistema completo com dados realistas para demonstração.

#### Opção B: Via CLI do Supabase

```bash
# Instalar CLI do Supabase
npm install -g supabase

# Login no Supabase
supabase login

# Inicializar projeto local
supabase init

# Linkar com projeto remoto
supabase link --project-ref YOUR_PROJECT_REF

# Executar migrations
supabase db push
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
VITE_APP_NAME=IMOBTRAE
VITE_APP_URL=http://localhost:5173
```

**Como obter as chaves:**
1. No Dashboard do Supabase, vá para **Settings > API**
2. Copie a **URL** e **anon public key**
3. A **service_role key** está na mesma página (use com cuidado!)

### 4. Configurar Autenticação

#### Row Level Security (RLS)
As políticas de RLS já estão configuradas nas migrations. Principais regras:

- **Público**: Pode visualizar propriedades, agentes e depoimentos ativos
- **Autenticado**: Administradores podem gerenciar todos os dados
- **Baseado em Roles**: Permissões granulares por função

#### Providers de Autenticação (Opcional)
Para habilitar login social:

1. Vá para **Authentication > Providers**
2. Configure os providers desejados (Google, GitHub, etc.)
3. Adicione as URLs de callback:
   - Development: `http://localhost:5173/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`

### 5. Configurar Storage (Para Upload de Imagens)

#### Buckets Criados Automaticamente:
A migration `003_storage_policies.sql` cria automaticamente os seguintes buckets:

- **property-images** (público, 10MB max, imagens)
- **agent-photos** (público, 5MB max, imagens)
- **testimonial-avatars** (público, 2MB max, imagens)
- **documents** (privado, 50MB max, documentos)

#### Políticas RLS Configuradas:
- **Leitura pública**: Imagens de propriedades, agentes e avatars
- **Upload autenticado**: Usuários logados podem fazer upload
- **Organização por pastas**: 
  - `properties/` para imagens de imóveis
  - `agents/` para fotos de corretores
  - `testimonials/` para avatars de depoimentos
  - `contracts/`, `reports/`, `certificates/` para documentos

#### Verificar Storage:
1. Acesse **Storage** no Dashboard
2. Confirme que os buckets foram criados
3. Teste upload de uma imagem

## 🔧 Configuração do Cliente

### Instalar Dependência do Supabase

```bash
npm install @supabase/supabase-js
```

### Criar Cliente Supabase

Crie o arquivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para TypeScript
export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          price: number
          address: string
          city: string
          bedrooms: number
          bathrooms: number
          area: number
          description: string | null
          features: string[] | null
          images: string[] | null
          type: 'sale' | 'rent'
          featured: boolean
          created_at: string
          updated_at: string
          created_by: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          title: string
          price: number
          address: string
          city: string
          bedrooms: number
          bathrooms: number
          area: number
          description?: string | null
          features?: string[] | null
          images?: string[] | null
          type: 'sale' | 'rent'
          featured?: boolean
          created_by?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          title?: string
          price?: number
          address?: string
          city?: string
          bedrooms?: number
          bathrooms?: number
          area?: number
          description?: string | null
          features?: string[] | null
          images?: string[] | null
          type?: 'sale' | 'rent'
          featured?: boolean
          created_by?: string | null
          is_active?: boolean
        }
      }
      // Adicione outros tipos conforme necessário
    }
  }
}
```

## 🔐 Credenciais Padrão

### Usuários Administrativos (004_complete_seeders.sql):

**Super Admin:**
- **Email**: admin@imobtrae.com
- **Senha**: admin123
- **Role**: super_admin
- **Nome**: Carlos Silva

**Admins:**
- **Email**: maria.santos@imobtrae.com | **Senha**: admin123 | **Nome**: Maria Santos
- **Email**: joao.oliveira@imobtrae.com | **Senha**: admin123 | **Nome**: João Oliveira

**Editores:**
- **Email**: ana.costa@imobtrae.com | **Senha**: editor123 | **Nome**: Ana Costa
- **Email**: pedro.almeida@imobtrae.com | **Senha**: editor123 | **Nome**: Pedro Almeida
- **Email**: lucia.ferreira@imobtrae.com | **Senha**: editor123 | **Nome**: Lucia Ferreira

**Visualizadores:**
- **Email**: roberto.lima@imobtrae.com | **Senha**: viewer123 | **Nome**: Roberto Lima
- **Email**: fernanda.rocha@imobtrae.com | **Senha**: viewer123 | **Nome**: Fernanda Rocha

### Acesso ao Dashboard:
1. Acesse a aplicação
2. Clique em "Login" no menu
3. Use qualquer uma das credenciais acima
4. Será redirecionado para o dashboard administrativo

> ⚠️ **Importante**: Altere essas credenciais em produção!

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:

1. **properties** - Imóveis
2. **agents** - Corretores
3. **admin_users** - Usuários administrativos
4. **permissions** - Permissões do sistema
5. **user_permissions** - Relação usuário-permissões
6. **testimonials** - Depoimentos
7. **property_agents** - Relação imóvel-corretor
8. **contact_messages** - Mensagens de contato
9. **property_views** - Analytics de visualizações

### Relacionamentos:

- Propriedades ↔ Agentes (Many-to-Many)
- Usuários ↔ Permissões (Many-to-Many)
- Mensagens → Propriedades (Many-to-One)
- Mensagens → Agentes (Many-to-One)

## 🧪 Testes

### Verificar Conexão

```typescript
// Teste básico de conexão
import { supabase } from './lib/supabase'

const testConnection = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('count')
    .limit(1)
  
  if (error) {
    console.error('Erro de conexão:', error)
  } else {
    console.log('Conexão OK:', data)
  }
}
```

### Verificar Autenticação

```typescript
// Teste de login
const testAuth = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@imobiliaria.com',
    password: 'admin123'
  })
  
  if (error) {
    console.error('Erro de autenticação:', error)
  } else {
    console.log('Login OK:', data.user)
  }
}
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://yourdomain.com
```

### Configurações de Segurança

1. **CORS**: Configure os domínios permitidos no Supabase
2. **RLS**: Verifique se todas as políticas estão ativas
3. **API Keys**: Use apenas a anon key no frontend
4. **SSL**: Sempre use HTTPS em produção

## 📚 Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

## 🆘 Troubleshooting

### Problemas Comuns:

1. **Erro de conexão**: Verifique as variáveis de ambiente
2. **RLS negando acesso**: Verifique as políticas de segurança
3. **Migrations falhando**: Execute uma por vez e verifique logs
4. **Autenticação falhando**: Verifique se o usuário foi criado corretamente

### Logs e Debug:

```typescript
// Habilitar logs detalhados
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
})
```