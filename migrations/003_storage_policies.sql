-- IMOBTRAE Storage Configuration
-- Migration 003: Storage Buckets and Policies
-- Created for Supabase Storage with RLS policies

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('property-images', 'property-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('agent-photos', 'agent-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('testimonial-avatars', 'testimonial-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies for property-images bucket
-- Allow public read access to property images
CREATE POLICY "Public can view property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

-- Allow authenticated users to upload property images
CREATE POLICY "Authenticated users can upload property images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'property-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'properties'
  );

-- Allow authenticated users to update their own property images
CREATE POLICY "Authenticated users can update property images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'property-images' 
    AND auth.role() = 'authenticated'
  ) WITH CHECK (
    bucket_id = 'property-images' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete property images
CREATE POLICY "Authenticated users can delete property images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'property-images' 
    AND auth.role() = 'authenticated'
  );

-- Storage policies for agent-photos bucket
-- Allow public read access to agent photos
CREATE POLICY "Public can view agent photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'agent-photos');

-- Allow authenticated users to upload agent photos
CREATE POLICY "Authenticated users can upload agent photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'agent-photos' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'agents'
  );

-- Allow authenticated users to update agent photos
CREATE POLICY "Authenticated users can update agent photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'agent-photos' 
    AND auth.role() = 'authenticated'
  ) WITH CHECK (
    bucket_id = 'agent-photos' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete agent photos
CREATE POLICY "Authenticated users can delete agent photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'agent-photos' 
    AND auth.role() = 'authenticated'
  );

-- Storage policies for testimonial-avatars bucket
-- Allow public read access to testimonial avatars
CREATE POLICY "Public can view testimonial avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'testimonial-avatars');

-- Allow authenticated users to upload testimonial avatars
CREATE POLICY "Authenticated users can upload testimonial avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'testimonial-avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'testimonials'
  );

-- Allow authenticated users to update testimonial avatars
CREATE POLICY "Authenticated users can update testimonial avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'testimonial-avatars' 
    AND auth.role() = 'authenticated'
  ) WITH CHECK (
    bucket_id = 'testimonial-avatars' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete testimonial avatars
CREATE POLICY "Authenticated users can delete testimonial avatars" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'testimonial-avatars' 
    AND auth.role() = 'authenticated'
  );

-- Storage policies for documents bucket (private)
-- Only authenticated users can access documents
CREATE POLICY "Authenticated users can view documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to upload documents
CREATE POLICY "Authenticated users can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN ('contracts', 'reports', 'certificates')
  );

-- Allow authenticated users to update documents
CREATE POLICY "Authenticated users can update documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
  ) WITH CHECK (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete documents
CREATE POLICY "Authenticated users can delete documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' 
    AND auth.role() = 'authenticated'
  );

-- Additional RLS policies for enhanced security

-- Enhanced property policies with user-specific access
DROP POLICY IF EXISTS "Admin users can manage properties" ON properties;
CREATE POLICY "Admin users can manage properties" ON properties
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      -- Super admin has full access
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      -- Other roles need specific permissions
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id LIKE 'properties.%'
      )
    )
  );

-- Enhanced agents policies
DROP POLICY IF EXISTS "Admin users can manage agents" ON agents;
CREATE POLICY "Admin users can manage agents" ON agents
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id LIKE 'agents.%'
      )
    )
  );

-- Enhanced testimonials policies
DROP POLICY IF EXISTS "Admin users can manage testimonials" ON testimonials;
CREATE POLICY "Admin users can manage testimonials" ON testimonials
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id IN ('testimonials.view', 'testimonials.edit')
      )
    )
  );

-- Enhanced contact messages policies
DROP POLICY IF EXISTS "Admin users can manage contact messages" ON contact_messages;
CREATE POLICY "Admin users can manage contact messages" ON contact_messages
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id LIKE 'messages.%'
      )
    )
  );

-- Policy for admin_users table (only super_admin can manage users)
CREATE POLICY "Super admin can manage admin users" ON admin_users
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()::text 
      AND role = 'super_admin' 
      AND is_active = true
    )
  );

-- Policy for user_permissions table
CREATE POLICY "Super admin can manage user permissions" ON user_permissions
  FOR ALL USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()::text 
      AND role = 'super_admin' 
      AND is_active = true
    )
  );

-- Policy for permissions table (read-only for authenticated users)
CREATE POLICY "Authenticated users can view permissions" ON permissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for property_agents table
CREATE POLICY "Admin users can manage property agents" ON property_agents
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()::text 
        AND role = 'super_admin' 
        AND is_active = true
      )
      OR
      EXISTS (
        SELECT 1 FROM admin_users au
        JOIN user_permissions up ON au.id = up.user_id
        WHERE au.id = auth.uid()::text 
        AND au.is_active = true
        AND up.permission_id IN ('properties.edit', 'agents.edit')
      )
    )
  );

-- Policy for property_views table (analytics)
CREATE POLICY "Admin users can view analytics" ON property_views
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM admin_users au
      JOIN user_permissions up ON au.id = up.user_id
      WHERE au.id = auth.uid()::text 
      AND au.is_active = true
      AND up.permission_id = 'properties.view'
    )
  );

-- Allow anyone to insert property views (for analytics)
CREATE POLICY "Anyone can record property views" ON property_views
  FOR INSERT WITH CHECK (true);

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(permission_name text)
RETURNS boolean AS $$
BEGIN
  -- Super admin has all permissions
  IF EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid()::text 
    AND role = 'super_admin' 
    AND is_active = true
  ) THEN
    RETURN true;
  END IF;
  
  -- Check specific permission
  RETURN EXISTS (
    SELECT 1 FROM admin_users au
    JOIN user_permissions up ON au.id = up.user_id
    WHERE au.id = auth.uid()::text 
    AND au.is_active = true
    AND up.permission_id = permission_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT role FROM admin_users 
    WHERE id = auth.uid()::text 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON FUNCTION check_user_permission(text) IS 'Check if current user has specific permission';
COMMENT ON FUNCTION get_user_role() IS 'Get current user role';

-- Storage bucket comments
COMMENT ON TABLE storage.buckets IS 'Storage buckets for file uploads';

-- Create indexes for better performance on auth queries
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_id ON admin_users(id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_permission_id ON user_permissions(permission_id);