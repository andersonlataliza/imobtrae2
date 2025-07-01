# 🔐 Políticas de Storage e Segurança - IMOBTRAE

## 📁 Buckets de Storage

### 1. property-images (Público)
- **Tamanho máximo**: 10MB por arquivo
- **Tipos permitidos**: JPEG, PNG, WebP, GIF
- **Acesso**: Leitura pública, upload autenticado
- **Estrutura**: `properties/{property_id}/{timestamp}.{ext}`

### 2. agent-photos (Público)
- **Tamanho máximo**: 5MB por arquivo
- **Tipos permitidos**: JPEG, PNG, WebP
- **Acesso**: Leitura pública, upload autenticado
- **Estrutura**: `agents/{agent_id}/{timestamp}.{ext}`

### 3. testimonial-avatars (Público)
- **Tamanho máximo**: 2MB por arquivo
- **Tipos permitidos**: JPEG, PNG, WebP
- **Acesso**: Leitura pública, upload autenticado
- **Estrutura**: `testimonials/{testimonial_id}/{timestamp}.{ext}`

### 4. documents (Privado)
- **Tamanho máximo**: 50MB por arquivo
- **Tipos permitidos**: PDF, DOC, DOCX
- **Acesso**: Apenas usuários autenticados
- **Estrutura**: `{folder}/{timestamp}.{ext}`
  - `contracts/` - Contratos
  - `reports/` - Relatórios
  - `certificates/` - Certificados

## 🛡️ Políticas de Segurança (RLS)

### Storage Policies

#### Buckets Públicos (property-images, agent-photos, testimonial-avatars)
```sql
-- Leitura pública
CREATE POLICY "Public can view {bucket} images" ON storage.objects
  FOR SELECT USING (bucket_id = '{bucket}');

-- Upload autenticado com estrutura de pastas
CREATE POLICY "Authenticated users can upload {bucket} images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '{bucket}' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = '{folder}'
  );

-- Atualização e exclusão autenticada
CREATE POLICY "Authenticated users can update/delete {bucket} images" ON storage.objects
  FOR UPDATE/DELETE USING (
    bucket_id = '{bucket}' 
    AND auth.role() = 'authenticated'
  );
```

#### Bucket Privado (documents)
```sql
-- Acesso apenas para usuários autenticados
CREATE POLICY "Authenticated users can access documents" ON storage.objects
  FOR ALL USING (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
  );
```

### Database Policies

#### Verificação de Permissões
Todas as tabelas principais utilizam políticas que verificam:
1. **Super Admin**: Acesso total
2. **Permissões específicas**: Verificação via `user_permissions`
3. **Status ativo**: Usuário deve estar ativo

```sql
-- Exemplo para tabela properties
CREATE POLICY "Admin users can manage properties" ON properties
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      -- Super admin tem acesso total
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      -- Outros roles precisam de permissões específicas
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id LIKE 'properties.%'
      )
    )
  );
```

## 🔧 Funções Auxiliares

### check_user_permission(permission_name)
```sql
SELECT check_user_permission('properties.edit');
-- Retorna: true/false
```

### get_user_role()
```sql
SELECT get_user_role();
-- Retorna: 'super_admin', 'admin', 'editor', 'viewer'
```

## 📊 Estrutura de Permissões

### Categorias
- **properties**: Gestão de imóveis
- **users**: Gestão de usuários
- **agents**: Gestão de corretores
- **messages**: Gestão de mensagens
- **settings**: Configurações do sistema

### Ações
- **view**: Visualizar
- **create**: Criar
- **edit**: Editar
- **delete**: Excluir

### Exemplos de Permissões
- `properties.view` - Visualizar imóveis
- `properties.create` - Criar novos imóveis
- `properties.edit` - Editar imóveis existentes
- `properties.delete` - Excluir imóveis
- `users.manage` - Gerenciar usuários (apenas super_admin)

## 🚀 Como Usar no Frontend

### Upload de Imagens
```typescript
import { uploadPropertyImage, getPublicUrl } from './lib/supabase';

// Upload
const { data } = await uploadPropertyImage(file, propertyId);

// Obter URL pública
const imageUrl = getPublicUrl('property-images', data.path);
```

### Verificar Permissões
```typescript
import { checkUserPermission, getUserRole } from './lib/supabase';

// Verificar permissão específica
const canEdit = await checkUserPermission('properties.edit');

// Obter role do usuário
const userRole = await getUserRole();
```

### Analytics
```typescript
import { recordPropertyView } from './lib/supabase';

// Registrar visualização
await recordPropertyView(propertyId);
```

## 🔍 Monitoramento e Logs

### Verificar Políticas Ativas
```sql
-- Listar políticas de storage
SELECT * FROM pg_policies WHERE schemaname = 'storage';

-- Listar políticas de tabelas
SELECT * FROM pg_policies WHERE tablename IN (
  'properties', 'agents', 'admin_users', 'testimonials'
);
```

### Testar Permissões
```sql
-- Testar como usuário específico
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "user-id-here"}';

-- Executar consulta de teste
SELECT * FROM properties;
```

## ⚠️ Considerações de Segurança

1. **Validação no Frontend**: Sempre validar permissões no frontend também
2. **Sanitização**: Validar nomes de arquivos e tipos MIME
3. **Rate Limiting**: Implementar limitação de uploads
4. **Monitoramento**: Acompanhar logs de acesso e uploads
5. **Backup**: Fazer backup regular dos buckets
6. **Auditoria**: Registrar ações importantes para auditoria

## 🛠️ Troubleshooting

### Erro de Upload
1. Verificar se o usuário está autenticado
2. Verificar tamanho e tipo do arquivo
3. Verificar estrutura de pastas
4. Verificar políticas RLS

### Erro de Acesso
1. Verificar se o bucket existe
2. Verificar políticas de leitura
3. Verificar URL pública
4. Verificar CORS se necessário

### Erro de Permissão
1. Verificar se o usuário está ativo
2. Verificar permissões atribuídas
3. Verificar políticas RLS
4. Verificar funções auxiliares