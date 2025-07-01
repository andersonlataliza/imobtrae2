# IMOBTRAE Backend

Backend completo para a plataforma IMOBTRAE, construído com TypeScript e Vercel Serverless Functions.

## 🚀 Funcionalidades

### APIs Disponíveis

- **Properties API** - Gestão de propriedades
- **Agents API** - Gestão de corretores
- **Authentication API** - Sistema de autenticação
- **Contact API** - Gestão de mensagens de contato
- **Testimonials API** - Gestão de depoimentos
- **Upload API** - Upload de arquivos e imagens
- **Analytics API** - Estatísticas e métricas

### Recursos Implementados

- ✅ Autenticação JWT
- ✅ Autorização baseada em roles
- ✅ Rate limiting
- ✅ Validação de dados
- ✅ Upload de arquivos
- ✅ Soft delete
- ✅ Paginação
- ✅ Filtros avançados
- ✅ CORS configurado
- ✅ Logs de segurança
- ✅ Middleware de autenticação

## 📁 Estrutura do Backend

```
api/
├── properties/
│   └── index.ts          # CRUD de propriedades
├── agents/
│   └── index.ts          # CRUD de corretores
├── auth/
│   └── index.ts          # Autenticação e autorização
├── contact/
│   └── index.ts          # Mensagens de contato
├── testimonials/
│   └── index.ts          # Depoimentos
├── upload/
│   └── index.ts          # Upload de arquivos
├── analytics/
│   └── index.ts          # Estatísticas
├── middleware/
│   └── auth.ts           # Middleware de autenticação
└── utils/
    └── validation.ts     # Utilitários de validação
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.backend.example`:

```bash
# Supabase
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico

# JWT
JWT_SECRET=seu_jwt_secret_muito_seguro

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app

# Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://seudominio.com
```

### 2. Instalação de Dependências

```bash
npm install
```

### 3. Deploy no Vercel

```bash
# Deploy automático
vercel --prod

# Ou configure as variáveis de ambiente no dashboard do Vercel
```

## 🔐 Autenticação

### Login

```typescript
const response = await fetch('/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'login',
    email: 'admin@imobtrae.com',
    password: 'senha123'
  })
});

const { token, user } = await response.json();
```

### Uso do Token

```typescript
const response = await fetch('/api/properties', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 📊 Exemplos de Uso

### 1. Listar Propriedades

```typescript
// GET /api/properties
const properties = await fetch('/api/properties?page=1&limit=10&type=sale');
```

### 2. Criar Propriedade

```typescript
// POST /api/properties
const newProperty = await fetch('/api/properties', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Casa Moderna',
    description: 'Linda casa com 3 quartos',
    price: 450000,
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    agent_id: 'agent-uuid'
  })
});
```

### 3. Upload de Imagens

```typescript
// POST /api/upload
const formData = new FormData();
formData.append('file', file);
formData.append('bucket', 'property-images');

const uploadResult = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### 4. Enviar Mensagem de Contato

```typescript
// POST /api/contact
const message = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    subject: 'Interesse na propriedade',
    message: 'Gostaria de mais informações',
    property_id: 'property-uuid'
  })
});
```

### 5. Obter Estatísticas

```typescript
// GET /api/analytics?type=dashboard
const stats = await fetch('/api/analytics?type=dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🛡️ Segurança

### Roles e Permissões

- **admin**: Acesso total ao sistema
- **manager**: Gestão de propriedades e corretores
- **agent**: Gestão das próprias propriedades

### Rate Limiting

- 100 requisições por 15 minutos por IP
- Configurável via variáveis de ambiente

### Validação

- Validação de entrada em todas as APIs
- Sanitização de dados
- Verificação de tipos

## 🔄 Integração com Frontend

### Service Layer

O arquivo `src/services/api.ts` fornece uma camada de abstração:

```typescript
import { propertiesApi, authApi } from '../services/api';

// Login
const { user, token } = await authApi.login(email, password);

// Buscar propriedades
const properties = await propertiesApi.getProperties({ type: 'sale' });
```

### Hooks Personalizados

O arquivo `src/hooks/useApi.ts` fornece hooks React:

```typescript
import { useProperties, useCreateProperty } from '../hooks/useApi';

// No componente
const { data: properties, loading, error } = useProperties({ type: 'sale' });
const { createProperty, loading: creating } = useCreateProperty();
```

## 📈 Monitoramento

### Logs

- Logs de autenticação
- Logs de erro
- Logs de performance
- Logs de segurança

### Métricas

- Visualizações de propriedades
- Mensagens de contato
- Performance das APIs
- Uso por usuário

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Variáveis de Ambiente no Vercel

```bash
# No dashboard do Vercel, adicione:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
# ... outras variáveis
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro 401 - Unauthorized**
   - Verifique se o token JWT está sendo enviado
   - Confirme se o token não expirou

2. **Erro 403 - Forbidden**
   - Verifique as permissões do usuário
   - Confirme se o role está correto

3. **Erro 429 - Too Many Requests**
   - Aguarde o reset do rate limit
   - Ajuste as configurações se necessário

4. **Erro de CORS**
   - Verifique as configurações de CORS
   - Confirme se o domínio está na lista de permitidos

### Debug

```typescript
// Ativar logs detalhados
process.env.DEBUG = 'true';
```

## 📚 Documentação Adicional

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentação completa das APIs
- [Supabase Docs](https://supabase.com/docs) - Documentação do Supabase
- [Vercel Docs](https://vercel.com/docs) - Documentação do Vercel

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.