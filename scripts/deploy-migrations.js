#!/usr/bin/env node

/**
 * Script para executar migrations e seeders no deploy da Vercel
 * Este script é executado automaticamente durante o build
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não configuradas');
  console.error('Necessário: VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Cliente Supabase com service role key para operações administrativas
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Executa uma query SQL no Supabase usando a função personalizada
 */
async function executeSQL(sql, description) {
  console.log(`🔄 Executando: ${description}`);
  
  try {
    // Primeiro, tentar usar a função run_migration para logs detalhados
    const { data, error } = await supabase.rpc('run_migration', { 
      migration_name: description,
      migration_sql: sql 
    });
    
    if (error) {
      console.error(`❌ Erro em ${description}:`, error.message);
      return false;
    }
    
    if (data && data.status === 'error') {
      console.error(`❌ Erro na migration ${description}:`, data.error_message);
      return false;
    }
    
    console.log(`✅ Sucesso: ${description}`);
    if (data && data.execution_time) {
      console.log(`⏱️ Tempo de execução: ${data.execution_time}`);
    }
    return true;
  } catch (err) {
    console.error(`❌ Erro inesperado em ${description}:`, err.message);
    // Fallback para execução direta se a função personalizada falhar
    return await executeSQLDirect(sql, description);
  }
}

/**
 * Executa SQL diretamente (fallback)
 */
async function executeSQLDirect(sql, description) {
  try {
    console.log(`🔄 Fallback: Executando ${description} diretamente`);
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`❌ Erro direto em ${description}:`, error.message);
      return false;
    }
    
    console.log(`✅ Sucesso direto: ${description}`);
    return true;
  } catch (err) {
    console.error(`❌ Erro crítico em ${description}:`, err.message);
    return false;
  }
}

/**
 * Verifica se uma tabela existe usando função personalizada
 */
async function tableExists(tableName) {
  try {
    const { data, error } = await supabase.rpc('table_exists', { table_name: tableName });
    
    if (error) {
      console.warn(`⚠️ Erro ao verificar tabela ${tableName}, usando fallback:`, error.message);
      // Fallback para query direta
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', tableName)
        .single();
      
      return !fallbackError && fallbackData;
    }
    
    return data === true;
  } catch (err) {
    console.warn(`⚠️ Erro inesperado ao verificar tabela ${tableName}:`, err.message);
    return false;
  }
}

/**
 * Lê arquivo SQL
 */
function readSQLFile(filename) {
  const filePath = path.join(__dirname, '..', 'migrations', filename);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    return null;
  }
  
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Executa as migrations na ordem correta
 */
async function runMigrations() {
  console.log('🚀 Iniciando execução das migrations...');
  
  // Verificar se o schema já existe
  const schemaExists = await tableExists('properties');
  
  if (!schemaExists) {
    console.log('📋 Schema não encontrado, executando migrations iniciais...');
    
    // 0. Primeiro, executar funções auxiliares (se disponível)
    const functionsSQL = readSQLFile('005_exec_sql_function.sql');
    if (functionsSQL) {
      console.log('🔧 Configurando funções auxiliares...');
      await executeSQLDirect(functionsSQL, 'Funções auxiliares (005_exec_sql_function.sql)');
    }
    
    // 1. Executar schema inicial
    const schemaSQL = readSQLFile('001_initial_schema.sql');
    if (!schemaSQL) return false;
    
    const schemaSuccess = await executeSQL(schemaSQL, 'Schema inicial (001_initial_schema.sql)');
    if (!schemaSuccess) return false;
    
    // 2. Executar seeders completos (ou básicos se preferir)
    const useCompleteSeeders = process.env.USE_COMPLETE_SEEDERS !== 'false';
    const seedersFile = useCompleteSeeders ? '004_complete_seeders.sql' : '002_seed_data.sql';
    
    console.log(`📊 Executando seeders: ${seedersFile}`);
    const seedersSQL = readSQLFile(seedersFile);
    if (!seedersSQL) return false;
    
    const seedersSuccess = await executeSQL(seedersSQL, `Seeders (${seedersFile})`);
    if (!seedersSuccess) return false;
    
    // 3. Executar políticas de storage
    const storageSQL = readSQLFile('003_storage_policies.sql');
    if (!storageSQL) return false;
    
    const storageSuccess = await executeSQL(storageSQL, 'Políticas de Storage (003_storage_policies.sql)');
    if (!storageSuccess) return false;
    
  } else {
    console.log('✅ Schema já existe, pulando migrations iniciais');
    
    // Verificar se precisa executar apenas as políticas de storage
    const { data: buckets } = await supabase.storage.listBuckets();
    const hasPropertyImages = buckets?.some(bucket => bucket.name === 'property-images');
    
    if (!hasPropertyImages) {
      console.log('🗂️ Buckets de storage não encontrados, executando políticas...');
      const storageSQL = readSQLFile('003_storage_policies.sql');
      if (storageSQL) {
        await executeSQL(storageSQL, 'Políticas de Storage (003_storage_policies.sql)');
      }
    }
  }
  
  return true;
}

/**
 * Verifica a saúde do banco após as migrations
 */
async function healthCheck() {
  console.log('🔍 Verificando saúde do banco de dados...');
  
  try {
    // Usar função personalizada de health check
    const { data: healthData, error: healthError } = await supabase.rpc('database_health_check');
    
    if (healthError) {
      console.warn('⚠️ Erro na verificação automática, usando método manual:', healthError.message);
      return await manualHealthCheck();
    }
    
    if (healthData && healthData.tables) {
      console.log(`✅ Status: ${healthData.status}`);
      console.log(`🕐 Timestamp: ${healthData.timestamp}`);
      
      // Exibir contagem de cada tabela
      for (const [tableName, count] of Object.entries(healthData.tables)) {
        if (count === -1) {
          console.warn(`⚠️ Tabela ${tableName}: não existe`);
        } else {
          console.log(`✅ Tabela ${tableName}: ${count} registros`);
        }
      }
    }
    
  } catch (err) {
    console.warn('⚠️ Erro na verificação automática:', err.message);
    return await manualHealthCheck();
  }
  
  // Verificar buckets de storage
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('❌ Erro ao verificar buckets:', bucketsError.message);
    return false;
  }
  
  console.log(`✅ Storage: ${buckets?.length || 0} buckets configurados`);
  
  return true;
}

/**
 * Verificação manual de saúde (fallback)
 */
async function manualHealthCheck() {
  console.log('🔄 Executando verificação manual...');
  
  const tables = ['properties', 'agents', 'admin_users', 'permissions', 'testimonials', 'contact_messages'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
        
      if (error) {
        console.error(`❌ Erro ao verificar tabela ${table}:`, error.message);
        return false;
      }
      
      console.log(`✅ Tabela ${table}: ${count} registros`);
    } catch (err) {
      console.error(`❌ Erro inesperado na tabela ${table}:`, err.message);
      return false;
    }
  }
  
  return true;
}

/**
 * Função principal
 */
async function main() {
  console.log('🎯 IMOBTRAE - Deploy Migrations Script');
  console.log('=====================================');
  
  try {
    // Executar migrations
    const migrationsSuccess = await runMigrations();
    if (!migrationsSuccess) {
      console.error('❌ Falha na execução das migrations');
      process.exit(1);
    }
    
    // Verificar saúde do banco
    const healthSuccess = await healthCheck();
    if (!healthSuccess) {
      console.error('❌ Falha na verificação de saúde do banco');
      process.exit(1);
    }
    
    console.log('🎉 Deploy das migrations concluído com sucesso!');
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main, runMigrations, healthCheck };