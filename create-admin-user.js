// Script para criar usuário administrador no Supabase Auth
// Execute este script para resolver o problema de credenciais inválidas

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  console.error('Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_SERVICE_ROLE_KEY estão configuradas no .env.local');
  process.exit(1);
}

// Cliente com privilégios administrativos
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    console.log('🔄 Criando usuário administrador...');
    
    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@imobiliaria.com',
      password: 'admin123',
      email_confirm: true // Confirma o email automaticamente
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✅ Usuário já existe no Supabase Auth');
      } else {
        console.error('❌ Erro ao criar usuário no Auth:', authError.message);
        return;
      }
    } else {
      console.log('✅ Usuário criado no Supabase Auth com sucesso!');
    }

    // Verificar se usuário existe na tabela admin_users
    const { data: existingUser, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@imobiliaria.com')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Erro ao verificar usuário na tabela:', checkError.message);
      return;
    }

    if (!existingUser) {
      console.log('🔄 Criando perfil na tabela admin_users...');
      
      // Inserir usuário na tabela admin_users
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Administrador Principal',
          email: 'admin@imobiliaria.com',
          role: 'admin',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('❌ Erro ao criar perfil:', insertError.message);
        return;
      }

      console.log('✅ Perfil criado na tabela admin_users!');
    } else {
      console.log('✅ Perfil já existe na tabela admin_users');
    }

    // Verificar/criar permissões
    const { data: permissions, error: permError } = await supabase
      .from('user_permissions')
      .select('*')
      .eq('user_id', '550e8400-e29b-41d4-a716-446655440000');

    if (permError) {
      console.error('❌ Erro ao verificar permissões:', permError.message);
      return;
    }

    if (!permissions || permissions.length === 0) {
      console.log('🔄 Criando permissões do usuário...');
      
      // Buscar todas as permissões disponíveis
      const { data: allPermissions } = await supabase
        .from('permissions')
        .select('id');

      if (allPermissions && allPermissions.length > 0) {
        const userPermissions = allPermissions.map(perm => ({
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          permission_id: perm.id
        }));

        const { error: permInsertError } = await supabase
          .from('user_permissions')
          .insert(userPermissions);

        if (permInsertError) {
          console.error('❌ Erro ao criar permissões:', permInsertError.message);
        } else {
          console.log('✅ Permissões criadas com sucesso!');
        }
      }
    } else {
      console.log('✅ Permissões já existem');
    }

    console.log('\n🎉 Configuração concluída!');
    console.log('📧 Email: admin@imobiliaria.com');
    console.log('🔑 Senha: admin123');
    console.log('🌐 Acesse: http://localhost:5173/');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

createAdminUser();