# API Documentation - IMOBTRAE Backend

Esta documentação descreve as APIs do backend criadas para o sistema IMOBTRAE.

## Configuração

### Variáveis de Ambiente

Copie o arquivo `.env.backend.example` para `.env.local` e configure as seguintes variáveis:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key_here
```

### Instalação de Dependências

```bash
npm install
```

## Endpoints da API

### Base URL
- Desenvolvimento: `http://localhost:3000/api`
- Produção: `https://yourdomain.vercel.app/api`

---

## 🏠 Properties API

### GET /api/properties
Busca propriedades com filtros e paginação.

**Query Parameters:**
- `page` (number): Página (padrão: 1)
- `limit` (number): Itens por página (padrão: 10)
- `type` (string): Tipo da propriedade ('sale' | 'rent')
- `city` (string): Cidade
- `minPrice` (number): Preço mínimo
- `maxPrice` (number): Preço máximo
- `bedrooms` (number): Número de quartos
- `featured` (boolean): Apenas propriedades em destaque

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Casa Moderna",
      "price": 500000,
      "address": "Rua das Flores, 123",
      "city": "São Paulo",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 120,
      "type": "sale",
      "featured": true,
      "images": ["url1", "url2"],
      "features": ["Piscina", "Garagem"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### POST /api/properties
Cria uma nova propriedade.

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Casa Moderna",
  "price": 500000,
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 120,
  "description": "Descrição da propriedade",
  "type": "sale",
  "featured": false,
  "features": ["Piscina", "Garagem"],
  "images": ["url1", "url2"]
}
```

### PUT /api/properties?id=<property_id>
Atualiza uma propriedade existente.

**Headers:**
- `Authorization: Bearer <token>`

### DELETE /api/properties?id=<property_id>
Remove uma propriedade (soft delete).

**Headers:**
- `Authorization: Bearer <token>`

---

## 👥 Agents API

### GET /api/agents
Busca todos os agentes ativos.

### GET /api/agents?id=<agent_id>
Busca um agente específico.

### POST /api/agents
Cria um novo agente.

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "João Silva",
  "position": "Corretor Senior",
  "email": "joao@imobiliaria.com",
  "contact": "+55 11 99999-9999",
  "bio": "Especialista em imóveis residenciais",
  "photo": "https://example.com/photo.jpg"
}
```

### PUT /api/agents?id=<agent_id>
Atualiza um agente.

### DELETE /api/agents?id=<agent_id>
Remove um agente.

---

## 🔐 Authentication API

### POST /api/auth
Endpoint de autenticação com múltiplas ações.

#### Login
**Body:**
```json
{
  "action": "login",
  "email": "admin@imobiliaria.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@imobiliaria.com",
    "role": "super_admin",
    "permissions": []
  },
  "token": "jwt_token_here"
}
```

#### Register
**Body:**
```json
{
  "action": "register",
  "name": "Novo Admin",
  "email": "novo@imobiliaria.com",
  "password": "senha123",
  "role": "admin"
}
```

#### Verify Token
**Body:**
```json
{
  "action": "verify"
}
```

**Headers:**
- `Authorization: Bearer <token>`

---

## 📧 Contact API

### GET /api/contact
Busca mensagens de contato (requer autenticação).

**Headers:**
- `Authorization: Bearer <token>`

**Query Parameters:**
- `page`, `limit`: Paginação
- `status`: Status da mensagem ('new', 'read', 'replied', 'closed')
- `property_id`: Filtrar por propriedade
- `agent_id`: Filtrar por agente

### POST /api/contact
Cria uma nova mensagem de contato (público).

**Body:**
```json
{
  "name": "Cliente Interessado",
  "email": "cliente@email.com",
  "phone": "+55 11 99999-9999",
  "subject": "Interesse em propriedade",
  "message": "Gostaria de mais informações...",
  "property_id": "uuid_opcional",
  "agent_id": "uuid_opcional"
}
```

### PUT /api/contact?id=<message_id>
Atualiza status de uma mensagem.

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "read",
  "handled_by": "admin_user_id"
}
```

---

## ⭐ Testimonials API

### GET /api/testimonials
Busca depoimentos.

**Query Parameters:**
- `approved_only`: Apenas aprovados (padrão: true)
- `page`, `limit`: Paginação

### POST /api/testimonials
Cria um novo depoimento (público).

**Body:**
```json
{
  "name": "Cliente Satisfeito",
  "role": "Comprador",
  "content": "Excelente atendimento...",
  "rating": 5,
  "avatar": "https://example.com/avatar.jpg"
}
```

### PUT /api/testimonials?id=<testimonial_id>
Atualiza/aprova um depoimento.

**Headers:**
- `Authorization: Bearer <token>`

### DELETE /api/testimonials?id=<testimonial_id>
Remove um depoimento.

---

## 📤 Upload API

### POST /api/upload
Faz upload de imagens.

**Headers:**
- `Content-Type: multipart/form-data`
- `Authorization: Bearer <token>`

**Form Data:**
- `file`: Arquivo(s) de imagem
- `bucket`: Bucket do Supabase (padrão: 'property-images')

**Response:**
```json
{
  "message": "Upload realizado com sucesso",
  "files": [
    {
      "fileName": "1234567890-abc.jpg",
      "filePath": "property-images/1234567890-abc.jpg",
      "publicUrl": "https://supabase.co/storage/v1/object/public/...",
      "size": 1024000,
      "type": "image/jpeg"
    }
  ]
}
```

### DELETE /api/upload?filePath=<path>&bucket=<bucket>
Remove um arquivo.

**Headers:**
- `Authorization: Bearer <token>`

---

## 📊 Analytics API

### GET /api/analytics?type=dashboard
Estatísticas do dashboard.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
```json
{
  "data": {
    "totals": {
      "properties": 150,
      "agents": 12,
      "messages": 45,
      "views": 2340
    },
    "recent": {
      "properties": 5,
      "messages": 12,
      "views": 234
    },
    "breakdown": {
      "propertiesByType": {
        "sale": 120,
        "rent": 30
      },
      "messagesByStatus": {
        "new": 10,
        "read": 15,
        "replied": 18,
        "closed": 2
      }
    }
  }
}
```

### GET /api/analytics?type=properties
Estatísticas de propriedades.

### GET /api/analytics?type=views&days=30
Estatísticas de visualizações.

### POST /api/analytics
Registra uma visualização de propriedade.

**Body:**
```json
{
  "property_id": "uuid",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "session_id": "session_uuid"
}
```

---

## 🔒 Autenticação e Autorização

### Headers de Autenticação
Para endpoints protegidos, inclua o header:
```
Authorization: Bearer <jwt_token>
```

### Níveis de Acesso
- **super_admin**: Acesso total
- **admin**: Gerenciamento de propriedades e agentes
- **editor**: Edição de conteúdo
- **viewer**: Apenas visualização

### Middleware Disponível
- `withAuth`: Requer autenticação
- `withPermission(permission)`: Requer permissão específica
- `withRole(roles)`: Requer papel específico
- `withRateLimit`: Limitação de taxa
- `withCors`: Configuração CORS

---

## 🚀 Deploy

### Vercel
O projeto está configurado para deploy automático no Vercel. As funções da API serão automaticamente disponibilizadas como serverless functions.

### Variáveis de Ambiente no Vercel
Configure as seguintes variáveis no painel do Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

---

## 🛠️ Desenvolvimento

### Estrutura de Arquivos
```
api/
├── agents/
│   └── index.ts
├── analytics/
│   └── index.ts
├── auth/
│   └── index.ts
├── contact/
│   └── index.ts
├── middleware/
│   └── auth.ts
├── properties/
│   └── index.ts
├── testimonials/
│   └── index.ts
├── upload/
│   └── index.ts
└── utils/
    └── validation.ts
```

### Testando Localmente
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Testar com Vercel CLI
npm run vercel:dev
```

### Exemplos de Uso
Veja os arquivos de exemplo na pasta `examples/` para implementações de referência.

---

## 📝 Notas Importantes

1. **Segurança**: Todas as senhas são hasheadas com bcrypt
2. **Rate Limiting**: APIs têm limitação de 100 requisições por 15 minutos por IP
3. **Validação**: Todos os inputs são validados antes do processamento
4. **CORS**: Configurado para permitir origens específicas
5. **Logs**: Erros são logados para debugging
6. **Soft Delete**: Registros são marcados como inativos ao invés de deletados

---

## 🐛 Troubleshooting

### Erro 401 - Unauthorized
- Verifique se o token JWT está sendo enviado corretamente
- Confirme se o token não expirou (24h de validade)
- Verifique se o usuário está ativo no banco

### Erro 403 - Forbidden
- Usuário não tem permissão para a ação
- Verifique o papel e permissões do usuário

### Erro 429 - Too Many Requests
- Rate limit atingido
- Aguarde antes de fazer nova requisição

### Erro 500 - Internal Server Error
- Verifique as variáveis de ambiente
- Confirme a conexão com o Supabase
- Verifique os logs do servidor