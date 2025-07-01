# ✅ Checklist de Deploy na Vercel - IMOBTRAE

## 🎯 Resumo Executivo

Este checklist garante que o deploy do IMOBTRAE na Vercel seja executado corretamente com migrations automáticas do Supabase.

## 📋 Pré-Deploy Checklist

### ✅ 1. Preparação do Código
- [ ] Todos os arquivos commitados no Git
- [ ] Branch `main` atualizada
- [ ] Arquivos de configuração presentes:
  - [ ] `vercel.json`
  - [ ] `scripts/deploy-migrations.js`
  - [ ] `.env.vercel` (template)
  - [ ] Migrations em `migrations/`

### ✅ 2. Configuração do Supabase
- [ ] Projeto Supabase criado
- [ ] Banco PostgreSQL ativo
- [ ] Chaves de API coletadas:
  - [ ] Project URL
  - [ ] Anon Key (pública)
  - [ ] Service Role Key (privada)

### ✅ 3. Repositório Git
- [ ] Repositório público ou privado acessível
- [ ] Permissões de acesso configuradas
- [ ] Último commit inclui todas as mudanças

## 🚀 Processo de Deploy

### Passo 1: Configurar Projeto na Vercel

1. **Acessar Vercel Dashboard**
   - [ ] Login em [vercel.com](https://vercel.com)
   - [ ] Clicar em "New Project"

2. **Importar Repositório**
   - [ ] Selecionar repositório Git
   - [ ] Confirmar importação

3. **Configurar Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build:vercel
   Output Directory: dist
   Install Command: npm install
   ```

### Passo 2: Configurar Variáveis de Ambiente

**Variáveis Obrigatórias:**
- [ ] `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = `eyJ...` (anon key)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = `eyJ...` (service role key)
- [ ] `USE_COMPLETE_SEEDERS` = `true`
- [ ] `VITE_APP_NAME` = `IMOBTRAE`
- [ ] `VITE_APP_DESCRIPTION` = `Plataforma completa para gestão imobiliária`

**Variáveis Opcionais:**
- [ ] `VITE_CONTACT_EMAIL`
- [ ] `VITE_CONTACT_PHONE`
- [ ] `VITE_COMPANY_ADDRESS`
- [ ] `VITE_FACEBOOK_URL`
- [ ] `VITE_INSTAGRAM_URL`
- [ ] `VITE_WHATSAPP_NUMBER`
- [ ] `VITE_GA_TRACKING_ID`
- [ ] `VITE_GOOGLE_MAPS_API_KEY`

### Passo 3: Executar Deploy

1. **Iniciar Deploy**
   - [ ] Clicar em "Deploy"
   - [ ] Aguardar processo de build

2. **Monitorar Build Logs**
   - [ ] Verificar execução das migrations
   - [ ] Confirmar sucesso do build
   - [ ] Anotar URL da aplicação

## 🔍 Verificação Pós-Deploy

### ✅ 1. Aplicação Funcionando
- [ ] URL da aplicação acessível
- [ ] Página inicial carrega corretamente
- [ ] Navegação entre páginas funciona
- [ ] Responsividade em mobile

### ✅ 2. Banco de Dados
- [ ] Tabelas criadas no Supabase
- [ ] Dados inseridos pelos seeders
- [ ] Buckets de storage configurados
- [ ] Políticas RLS ativas

### ✅ 3. Funcionalidades
- [ ] Login com credenciais de teste
- [ ] Visualização de propriedades
- [ ] Formulário de contato funciona
- [ ] Upload de imagens (se configurado)
- [ ] Filtros de busca

### ✅ 4. Performance
- [ ] Tempo de carregamento < 3 segundos
- [ ] Lighthouse Score > 90
- [ ] Sem erros no console
- [ ] Sem warnings críticos

## 🔐 Credenciais de Teste

### Super Admin
- **Email:** `admin@imobtrae.com`
- **Senha:** `admin123`
- **Acesso:** Total

### Admin
- **Email:** `maria.santos@imobtrae.com`
- **Senha:** `admin123`
- **Acesso:** Gestão completa

### Editor
- **Email:** `ana.costa@imobtrae.com`
- **Senha:** `editor123`
- **Acesso:** Criação de conteúdo

### Viewer
- **Email:** `roberto.lima@imobtrae.com`
- **Senha:** `viewer123`
- **Acesso:** Apenas visualização

## 🛠️ Troubleshooting

### ❌ Build Failed
**Possíveis Causas:**
- [ ] Variáveis de ambiente incorretas
- [ ] Chaves do Supabase inválidas
- [ ] Projeto Supabase inativo
- [ ] Erro nas migrations

**Soluções:**
1. Verificar logs de build na Vercel
2. Confirmar chaves do Supabase
3. Testar conexão com banco
4. Executar migrations manualmente

### ❌ Aplicação Não Carrega
**Possíveis Causas:**
- [ ] Erro de roteamento
- [ ] Variáveis de ambiente faltando
- [ ] Erro de JavaScript

**Soluções:**
1. Verificar console do navegador
2. Confirmar todas as variáveis
3. Testar em modo incógnito
4. Verificar logs de runtime

### ❌ Login Não Funciona
**Possíveis Causas:**
- [ ] Migrations não executadas
- [ ] Políticas RLS bloqueando
- [ ] Credenciais incorretas

**Soluções:**
1. Verificar tabela `admin_users` no Supabase
2. Confirmar políticas RLS
3. Testar com credenciais dos seeders
4. Verificar logs de autenticação

### ❌ Dados Não Aparecem
**Possíveis Causas:**
- [ ] Seeders não executados
- [ ] Políticas RLS restritivas
- [ ] Erro de permissões

**Soluções:**
1. Verificar contagem de registros
2. Testar com usuário super admin
3. Revisar políticas RLS
4. Re-executar seeders

## 📊 Monitoramento

### Métricas Importantes
- [ ] Uptime > 99.9%
- [ ] Response Time < 500ms
- [ ] Error Rate < 1%
- [ ] Build Success Rate > 95%

### Ferramentas de Monitoramento
- [ ] Vercel Analytics
- [ ] Supabase Dashboard
- [ ] Google Analytics (se configurado)
- [ ] Lighthouse CI

## 🔄 Atualizações Futuras

### Deploy Automático
- [ ] Push para `main` triggera deploy
- [ ] Migrations executam automaticamente
- [ ] Dados existentes preservados

### Deploy Manual
```bash
# Via CLI da Vercel
npm install -g vercel
vercel --prod
```

### Rollback
- [ ] Acessar "Deployments" na Vercel
- [ ] Selecionar versão anterior
- [ ] Clicar em "Promote to Production"

## 📝 Documentação

### Arquivos de Referência
- [ ] `VERCEL_DEPLOY_GUIDE.md` - Guia completo
- [ ] `SEEDERS_GUIDE.md` - Documentação dos seeders
- [ ] `STORAGE_POLICIES.md` - Políticas de storage
- [ ] `migrations/README.md` - Documentação das migrations

### Links Úteis
- [ ] [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] [Documentação Vercel](https://vercel.com/docs)
- [ ] [Documentação Supabase](https://supabase.com/docs)

## ✅ Checklist Final

- [ ] ✅ Aplicação deployada com sucesso
- [ ] ✅ Banco de dados configurado
- [ ] ✅ Migrations executadas
- [ ] ✅ Seeders carregados
- [ ] ✅ Storage configurado
- [ ] ✅ Políticas RLS ativas
- [ ] ✅ Credenciais de teste funcionando
- [ ] ✅ Performance adequada
- [ ] ✅ Monitoramento ativo
- [ ] ✅ Documentação atualizada

---

**🎉 Parabéns! Seu projeto IMOBTRAE está rodando na Vercel!**

**URL da Aplicação:** `https://your-app.vercel.app`

**Próximos Passos:**
1. Configurar domínio personalizado
2. Configurar Google Analytics
3. Configurar backup automático
4. Configurar alertas de monitoramento
5. Treinar usuários finais