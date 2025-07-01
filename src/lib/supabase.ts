import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for TypeScript
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
      agents: {
        Row: {
          id: string
          name: string
          position: string
          photo: string | null
          contact: string | null
          email: string
          bio: string | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          position: string
          photo?: string | null
          contact?: string | null
          email: string
          bio?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          position?: string
          photo?: string | null
          contact?: string | null
          email?: string
          bio?: string | null
          is_active?: boolean
        }
      }
      admin_users: {
        Row: {
          id: string
          name: string
          email: string
          password_hash: string
          role: 'super_admin' | 'admin' | 'editor' | 'viewer'
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          password_hash: string
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer'
          last_login?: string | null
          is_active?: boolean
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          password_hash?: string
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer'
          last_login?: string | null
          is_active?: boolean
          created_by?: string | null
        }
      }
      permissions: {
        Row: {
          id: string
          name: string
          description: string | null
          category: 'properties' | 'users' | 'agents' | 'messages' | 'settings'
          created_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          category: 'properties' | 'users' | 'agents' | 'messages' | 'settings'
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: 'properties' | 'users' | 'agents' | 'messages' | 'settings'
        }
      }
      user_permissions: {
        Row: {
          user_id: string
          permission_id: string
          granted_at: string
          granted_by: string | null
        }
        Insert: {
          user_id: string
          permission_id: string
          granted_by?: string | null
        }
        Update: {
          user_id?: string
          permission_id?: string
          granted_by?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          content: string
          avatar: string | null
          rating: number | null
          created_at: string
          updated_at: string
          is_active: boolean
          approved_by: string | null
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          content: string
          avatar?: string | null
          rating?: number | null
          is_active?: boolean
          approved_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          content?: string
          avatar?: string | null
          rating?: number | null
          is_active?: boolean
          approved_by?: string | null
        }
      }
      property_agents: {
        Row: {
          property_id: string
          agent_id: string
          is_primary: boolean
          assigned_at: string
        }
        Insert: {
          property_id: string
          agent_id: string
          is_primary?: boolean
        }
        Update: {
          property_id?: string
          agent_id?: string
          is_primary?: boolean
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          property_id: string | null
          agent_id: string | null
          status: string
          created_at: string
          updated_at: string
          handled_by: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          property_id?: string | null
          agent_id?: string | null
          status?: string
          handled_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          property_id?: string | null
          agent_id?: string | null
          status?: string
          handled_by?: string | null
        }
      }
      property_views: {
        Row: {
          id: string
          property_id: string
          ip_address: string | null
          user_agent: string | null
          viewed_at: string
          session_id: string | null
        }
        Insert: {
          id?: string
          property_id: string
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      property_type: 'sale' | 'rent'
      user_role: 'super_admin' | 'admin' | 'editor' | 'viewer'
      permission_category: 'properties' | 'users' | 'agents' | 'messages' | 'settings'
    }
  }
}

// Helper functions for common operations
export const getProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_agents(
        agent:agents(*)
      )
    `)
    .eq('featured', true);
  
  if (error) throw error;
  return data;
};

export const getAgents = async () => {
  const { data, error } = await supabase
    .from('agents')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const createContactMessage = async (message: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  property_id?: string;
}) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select();
  
  if (error) throw error;
  return data;
};

// Storage helper functions
export const uploadPropertyImage = async (file: File, propertyId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `properties/${propertyId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('property-images')
    .upload(fileName, file);
  
  if (error) throw error;
  return data;
};

export const uploadAgentPhoto = async (file: File, agentId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `agents/${agentId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('agent-photos')
    .upload(fileName, file);
  
  if (error) throw error;
  return data;
};

export const uploadTestimonialAvatar = async (file: File, testimonialId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `testimonials/${testimonialId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('testimonial-avatars')
    .upload(fileName, file);
  
  if (error) throw error;
  return data;
};

export const uploadDocument = async (file: File, folder: 'contracts' | 'reports' | 'certificates', fileName?: string) => {
  const fileExt = file.name.split('.').pop();
  const finalFileName = fileName || `${folder}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(finalFileName, file);
  
  if (error) throw error;
  return data;
};

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) throw error;
};

// Permission helper functions
export const checkUserPermission = async (permission: string) => {
  const { data, error } = await supabase
    .rpc('check_user_permission', { permission_name: permission });
  
  if (error) throw error;
  return data;
};

export const getUserRole = async () => {
  const { data, error } = await supabase
    .rpc('get_user_role');
  
  if (error) throw error;
  return data;
};

// Analytics helper functions
export const recordPropertyView = async (propertyId: string, userAgent?: string) => {
  const { data, error } = await supabase
    .from('property_views')
    .insert([{
      property_id: propertyId,
      user_agent: userAgent || navigator.userAgent,
      viewed_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const supabaseHelpers = {
  // Properties
  async getProperties(filters?: { type?: 'sale' | 'rent'; city?: string; featured?: boolean }) {
    let query = supabase
      .from('properties')
      .select(`
        *,
        property_agents(
          agent_id,
          is_primary,
          agents(
            id,
            name,
            email,
            contact
          )
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    return query
  },

  async getPropertyById(id: string) {
    return supabase
      .from('properties')
      .select(`
        *,
        property_agents(
          agent_id,
          is_primary,
          agents(
            id,
            name,
            email,
            contact,
            photo,
            position
          )
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()
  },

  // Agents
  async getAgents() {
    return supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('name')
  },

  async getAgentById(id: string) {
    return supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()
  },

  // Testimonials
  async getTestimonials() {
    return supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
  },

  // Contact Messages
  async createContactMessage(message: Database['public']['Tables']['contact_messages']['Insert']) {
    return supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single()
  },

  // Property Views (Analytics)
  async recordPropertyView(propertyId: string, sessionId?: string) {
    return supabase
      .from('property_views')
      .insert({
        property_id: propertyId,
        session_id: sessionId || crypto.randomUUID()
      })
  },

  // Authentication helpers
  async signInWithEmail(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    return supabase.auth.signOut()
  },

  async getCurrentUser() {
    return supabase.auth.getUser()
  },

  // Admin user operations
  async getAdminUserByEmail(email: string) {
    return supabase
      .from('admin_users')
      .select(`
        *,
        user_permissions(
          permission_id,
          permissions(
            id,
            name,
            category
          )
        )
      `)
      .eq('email', email)
      .eq('is_active', true)
      .single()
  },

  async updateLastLogin(userId: string) {
    return supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId)
  }
}

// Real-time subscriptions
export const createRealtimeSubscription = (table: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
    .subscribe()
}

// Error handling helper
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error)
  
  if (error?.code === 'PGRST116') {
    return 'Registro não encontrado'
  }
  
  if (error?.code === '23505') {
    return 'Este registro já existe'
  }
  
  if (error?.code === '42501') {
    return 'Você não tem permissão para esta ação'
  }
  
  return error?.message || 'Erro desconhecido'
}

export default supabase