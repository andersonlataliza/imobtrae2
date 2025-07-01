-- Função para executar SQL dinamicamente durante o deploy
-- Esta função é necessária para o script de deploy da Vercel

-- Criar função para executar SQL dinâmico
CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Executar a query SQL fornecida
  EXECUTE sql_query;
  
  -- Retornar sucesso
  RETURN 'SUCCESS';
  
EXCEPTION
  WHEN OTHERS THEN
    -- Retornar erro detalhado
    RETURN 'ERROR: ' || SQLERRM;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION exec_sql(text) IS 'Executa SQL dinâmico durante o deploy - usado pelo script de migrations da Vercel';

-- Criar função para verificar se uma tabela existe
CREATE OR REPLACE FUNCTION table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  exists_flag boolean := false;
BEGIN
  SELECT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = $1
  ) INTO exists_flag;
  
  RETURN exists_flag;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION table_exists(text) IS 'Verifica se uma tabela existe no schema public';

-- Criar função para contar registros de uma tabela
CREATE OR REPLACE FUNCTION count_table_records(table_name text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  record_count integer := 0;
BEGIN
  -- Verificar se a tabela existe primeiro
  IF NOT table_exists(table_name) THEN
    RETURN -1; -- Indica que a tabela não existe
  END IF;
  
  -- Contar registros
  EXECUTE format('SELECT COUNT(*) FROM %I', table_name) INTO record_count;
  
  RETURN record_count;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION count_table_records(text) IS 'Conta registros de uma tabela (retorna -1 se não existir)';

-- Criar função para verificar status do banco
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  tables text[] := ARRAY['properties', 'agents', 'admin_users', 'permissions', 'testimonials', 'contact_messages'];
  table_name text;
  table_count integer;
  health_data json := '{}'::json;
BEGIN
  -- Verificar cada tabela
  FOREACH table_name IN ARRAY tables
  LOOP
    table_count := count_table_records(table_name);
    health_data := health_data || json_build_object(table_name, table_count);
  END LOOP;
  
  -- Adicionar timestamp
  result := json_build_object(
    'timestamp', NOW(),
    'status', 'healthy',
    'tables', health_data
  );
  
  RETURN result;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION database_health_check() IS 'Retorna status de saúde do banco de dados com contagem de registros';

-- Criar função para executar migrations de forma segura
CREATE OR REPLACE FUNCTION run_migration(migration_name text, migration_sql text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  start_time timestamp;
  end_time timestamp;
  execution_time interval;
BEGIN
  start_time := NOW();
  
  BEGIN
    -- Executar a migration
    EXECUTE migration_sql;
    
    end_time := NOW();
    execution_time := end_time - start_time;
    
    -- Retornar sucesso
    result := json_build_object(
      'status', 'success',
      'migration', migration_name,
      'start_time', start_time,
      'end_time', end_time,
      'execution_time', execution_time,
      'message', 'Migration executed successfully'
    );
    
    RETURN result;
    
  EXCEPTION
    WHEN OTHERS THEN
      end_time := NOW();
      execution_time := end_time - start_time;
      
      -- Retornar erro
      result := json_build_object(
        'status', 'error',
        'migration', migration_name,
        'start_time', start_time,
        'end_time', end_time,
        'execution_time', execution_time,
        'error_code', SQLSTATE,
        'error_message', SQLERRM
      );
      
      RETURN result;
  END;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION run_migration(text, text) IS 'Executa uma migration de forma segura com logging detalhado';

-- Criar tabela para log de migrations (se não existir)
CREATE TABLE IF NOT EXISTS migration_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  migration_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'error', 'running')),
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone,
  execution_time interval,
  error_message text,
  created_at timestamp with time zone DEFAULT NOW()
);

-- Comentário da tabela
COMMENT ON TABLE migration_logs IS 'Log de execução das migrations';

-- Criar função para registrar log de migration
CREATE OR REPLACE FUNCTION log_migration(migration_name text, status text, error_message text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id uuid;
BEGIN
  INSERT INTO migration_logs (migration_name, status, start_time, error_message)
  VALUES (migration_name, status, NOW(), error_message)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION log_migration(text, text, text) IS 'Registra log de execução de migration';

-- Criar função para atualizar log de migration
CREATE OR REPLACE FUNCTION update_migration_log(log_id uuid, status text, error_message text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE migration_logs 
  SET 
    status = $2,
    end_time = NOW(),
    execution_time = NOW() - start_time,
    error_message = COALESCE($3, error_message)
  WHERE id = $1;
  
  RETURN FOUND;
END;
$$;

-- Comentário da função
COMMENT ON FUNCTION update_migration_log(uuid, text, text) IS 'Atualiza log de execução de migration';

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_migration_logs_name ON migration_logs(migration_name);
CREATE INDEX IF NOT EXISTS idx_migration_logs_status ON migration_logs(status);
CREATE INDEX IF NOT EXISTS idx_migration_logs_created_at ON migration_logs(created_at);

-- Conceder permissões necessárias
-- Nota: As permissões serão ajustadas conforme as políticas RLS existentes

-- Log de sucesso
SELECT 'Migration 005_exec_sql_function.sql executada com sucesso!' as message;