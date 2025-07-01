# 🚀 Guia de Deploy na Vercel - IMOBTRAE

## 📋 Visão Geral

Este guia explica como fazer o deploy do projeto IMOBTRAE na Vercel com execução automática das migrations e seeders do Supabase.

## 🔧 Pré-requisitos

### 1. Conta na Vercel
- Crie uma conta em [vercel.com](https://vercel.com)
- Conecte sua conta do GitHub/GitLab/Bitbucket

### 2. Projeto Supabase Configurado
- Projeto criado no [Supabase](https://supabase.com)
- Chaves de API disponíveis
- Banco de dados PostgreSQL ativo

### 3. Repositório Git
- Código commitado em um repositório Git
- Acesso ao repositório pela Vercel

## 📁 Arquivos de Configuração

O projeto inclui os seguintes arquivos para deploy:

- **`vercel.json`** - Configuração principal da Vercel
- **`scripts/deploy-migrations.js`** - Script para executar migrations
- **`.env.vercel`** - Template de variáveis de ambiente
- **`package.json`** - Scripts de build atualizados

## 🚀 Processo de Deploy

### Passo 1: Preparar o Repositório

1. **Commit todos os arquivos:**
```bash
git add .
git commit -m "feat: configuração para deploy na Vercel"
git push origin main
```

### Passo 2: Configurar Projeto na Vercel

1. **Acesse o Dashboard da Vercel**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique em "New Project"

2. **Importar Repositório**
   - Selecione seu repositório Git
   - Clique em "Import"

3. **Configurar Build Settings**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build:vercel`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Passo 3: Configurar Variáveis de Ambiente

1. **Na página de configuração do projeto, vá para "Environment Variables"**

2. **Adicione as seguintes variáveis:**

#### Variáveis Obrigatórias

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Chave de service role (PRIVADA) |
| `USE_COMPLETE_SEEDERS` | `true` | Usar seeders completos |
| `VITE_APP_NAME` | `IMOBTRAE` | Nome da aplicação |
| `VITE_APP_DESCRIPTION` | `Plataforma completa para gestão imobiliária` | Descrição |

#### Variáveis Opcionais

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VITE_CONTACT_EMAIL` | `contato@imobtrae.com` | Email de contato |
| `VITE_CONTACT_PHONE` | `(11) 99999-9999` | Telefone |
| `VITE_COMPANY_ADDRESS` | `São Paulo, SP` | Endereço |
| `VITE_FACEBOOK_URL` | `https://facebook.com/imobtrae` | Facebook |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/imobtrae` | Instagram |
| `VITE_WHATSAPP_NUMBER` | `5511999999999` | WhatsApp |
| `VITE_GA_TRACKING_ID` | `G-XXXXXXXXXX` | Google Analytics |
| `VITE_GOOGLE_MAPS_API_KEY` | `your-api-key` | Google Maps |

### Passo 4: Obter Chaves do Supabase

1. **Acesse seu projeto no Supabase Dashboard**
2. **Vá para Settings > API**
3. **Copie as seguintes informações:**
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE:** A `service_role` key é PRIVADA e deve ser mantida em segredo!

### Passo 5: Deploy

1. **Clique em "Deploy"**
2. **Aguarde o processo de build**
3. **Verifique os logs de build**

## 📊 Processo de Build

Durante o deploy, o seguinte processo é executado:

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Execução das Migrations
```bash
npm run migrate:deploy
```

Este script:
- ✅ Conecta ao Supabase usando a service role key
- ✅ Verifica se o schema já existe
- ✅ Executa `001_initial_schema.sql` se necessário
- ✅ Executa `004_complete_seeders.sql` (ou `002_seed_data.sql`)
- ✅ Executa `003_storage_policies.sql`
- ✅ Verifica a saúde do banco de dados
- ✅ Configura buckets de storage

### 3. Build da Aplicação
```bash
vite build
```

### 4. Deploy dos Arquivos Estáticos
- Arquivos são enviados para a CDN da Vercel
- Configurações de roteamento são aplicadas

## 🔍 Verificação Pós-Deploy

### 1. Verificar URL da Aplicação
- A Vercel fornecerá uma URL como `https://imobtrae-xxx.vercel.app`
- Acesse a URL para verificar se a aplicação está funcionando

### 2. Testar Funcionalidades
- ✅ Login com credenciais dos seeders
- ✅ Visualização de propriedades
- ✅ Cadastro de mensagens de contato
- ✅ Upload de imagens (se configurado)

### 3. Verificar Banco de Dados
No Supabase Dashboard:
- ✅ Tabelas criadas
- ✅ Dados inseridos pelos seeders
- ✅ Buckets de storage configurados
- ✅ Políticas RLS ativas

## 🔐 Credenciais de Teste

Após o deploy com seeders completos, use estas credenciais:

### Super Admin
- **Email:** `admin@imobtrae.com`
- **Senha:** `admin123`

### Admin
- **Email:** `maria.santos@imobtrae.com`
- **Senha:** `admin123`

### Editor
- **Email:** `ana.costa@imobtrae.com`
- **Senha:** `editor123`

### Viewer
- **Email:** `roberto.lima@imobtrae.com`
- **Senha:** `viewer123`

## 🔄 Atualizações e Redeployment

### Deploy Automático
- Qualquer push para a branch `main` triggera um novo deploy
- As migrations são executadas automaticamente
- Dados existentes são preservados

### Deploy Manual
```bash
# Via CLI da Vercel
npm install -g vercel
vercel --prod
```

### Forçar Re-execução das Migrations
1. Vá para o Dashboard da Vercel
2. Acesse "Deployments"
3. Clique em "Redeploy" no último deployment
4. Selecione "Use existing Build Cache: No"

## 🛠️ Configurações Avançadas

### Custom Domain
1. No Dashboard da Vercel, vá para "Domains"
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções
4. Atualize `VITE_APP_URL` com o novo domínio

### Configurar Região
O projeto está configurado para a região `gru1` (São Paulo) no `vercel.json`:
```json
"regions": ["gru1"]
```

### Headers de Segurança
O `vercel.json` inclui headers de segurança:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run build:vercel` | Build para produção com migrations |
| `npm run migrate:deploy` | Executa apenas as migrations |
| `npm run migrate:local` | Testa migrations localmente |
| `npm run vercel:dev` | Desenvolvimento local com Vercel |
| `npm run vercel:deploy` | Deploy manual via CLI |

## 🚨 Troubleshooting

### Erro: "Supabase connection failed"
- ✅ Verifique as variáveis `VITE_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Confirme que o projeto Supabase está ativo
- ✅ Verifique se a service role key está correta

### Erro: "Migration failed"
- ✅ Verifique os logs de build na Vercel
- ✅ Confirme que os arquivos SQL estão corretos
- ✅ Teste as migrations localmente primeiro

### Erro: "Build timeout"
- ✅ As migrations podem demorar alguns minutos
- ✅ Considere usar seeders básicos (`USE_COMPLETE_SEEDERS=false`)
- ✅ Verifique se não há loops infinitos no código

### Aplicação não carrega
- ✅ Verifique se todas as variáveis de ambiente estão configuradas
- ✅ Confirme que o build foi bem-sucedido
- ✅ Verifique o console do navegador para erros

### Dados não aparecem
- ✅ Verifique se as migrations foram executadas
- ✅ Confirme que as políticas RLS estão corretas
- ✅ Teste login com credenciais dos seeders

## 📞 Suporte

### Logs de Build
- Acesse "Functions" > "View Function Logs" na Vercel
- Verifique logs de erro durante o build

### Logs de Runtime
- Use `console.log` no código para debug
- Logs aparecem em "Functions" > "View Function Logs"

### Monitoramento
- Configure alertas na Vercel para falhas de deploy
- Use Supabase Dashboard para monitorar banco de dados

## 🎯 Próximos Passos

1. **Configure domínio personalizado**
2. **Configure Google Analytics**
3. **Configure Google Maps API**
4. **Configure email de contato**
5. **Configure backup automático do banco**
6. **Configure monitoramento de performance**

## 📚 Recursos Úteis

- [Documentação da Vercel](https://vercel.com/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Vite](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**🎉 Parabéns! Seu projeto IMOBTRAE está agora rodando na Vercel com banco de dados completo!**