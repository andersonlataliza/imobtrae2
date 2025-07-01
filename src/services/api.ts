// API Service - Frontend integration with backend
import { Property, Agent, Testimonial } from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.vercel.app/api'
  : 'http://localhost:3000/api';

// Auth token management
let authToken: string | null = localStorage.getItem('authToken');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => authToken;

// Base fetch function with auth
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
};

// Properties API
export const propertiesApi = {
  // Get properties with filters
  getProperties: async (params: {
    page?: number;
    limit?: number;
    type?: 'sale' | 'rent';
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    featured?: boolean;
  } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    return apiFetch(`/properties?${searchParams}`);
  },

  // Create property
  createProperty: async (propertyData: Omit<Property, 'id'>) => {
    return apiFetch('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  },

  // Update property
  updateProperty: async (id: string, propertyData: Partial<Property>) => {
    return apiFetch(`/properties?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  },

  // Delete property
  deleteProperty: async (id: string) => {
    return apiFetch(`/properties?id=${id}`, {
      method: 'DELETE',
    });
  },

  // Upload files
  uploadFiles: async (files: FileList, bucket: string = 'property-images') => {
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('file', file);
    });
    formData.append('bucket', bucket);

    return apiFetch('/upload', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: formData,
    });
  },
};

// Agents API
export const agentsApi = {
  // Get all agents
  getAgents: async () => {
    return apiFetch('/agents');
  },

  // Get single agent
  getAgent: async (id: string) => {
    return apiFetch(`/agents?id=${id}`);
  },

  // Create agent
  createAgent: async (agentData: Omit<Agent, 'id'>) => {
    return apiFetch('/agents', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  },

  // Update agent
  updateAgent: async (id: string, agentData: Partial<Agent>) => {
    return apiFetch(`/agents?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(agentData),
    });
  },

  // Delete agent
  deleteAgent: async (id: string) => {
    return apiFetch(`/agents?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Authentication API
export const authApi = {
  // Login
  login: async (email: string, password: string) => {
    const response = await apiFetch('/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        email,
        password,
      }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Register
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    const response = await apiFetch('/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'register',
        ...userData,
      }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Verify token
  verifyToken: async () => {
    return apiFetch('/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'verify',
      }),
    });
  },

  // Logout
  logout: () => {
    setAuthToken(null);
  },
};

// Contact API
export const contactApi = {
  // Get messages (admin only)
  getMessages: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    property_id?: string;
    agent_id?: string;
  } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    return apiFetch(`/contact?${searchParams}`);
  },

  // Send message (public)
  sendMessage: async (messageData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    property_id?: string;
    agent_id?: string;
  }) => {
    return apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  // Update message status (admin only)
  updateMessage: async (id: string, data: {
    status: string;
    handled_by?: string;
  }) => {
    return apiFetch(`/contact?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Testimonials API
export const testimonialsApi = {
  // Get testimonials
  getTestimonials: async (params: {
    page?: number;
    limit?: number;
    approved_only?: boolean;
  } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    return apiFetch(`/testimonials?${searchParams}`);
  },

  // Create testimonial (public)
  createTestimonial: async (testimonialData: Omit<Testimonial, 'id'>) => {
    return apiFetch('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  },

  // Update testimonial (admin only)
  updateTestimonial: async (id: string, testimonialData: Partial<Testimonial>) => {
    return apiFetch(`/testimonials?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  },

  // Delete testimonial (admin only)
  deleteTestimonial: async (id: string) => {
    return apiFetch(`/testimonials?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Upload API
export const uploadApi = {
  // Upload files
  uploadFiles: async (files: FileList, bucket: string = 'property-images') => {
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('file', file);
    });
    formData.append('bucket', bucket);

    return apiFetch('/upload', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: formData,
    });
  },

  // Delete file
  deleteFile: async (filePath: string, bucket: string = 'property-images') => {
    return apiFetch(`/upload?filePath=${encodeURIComponent(filePath)}&bucket=${bucket}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API
export const analyticsApi = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return apiFetch('/analytics?type=dashboard');
  },

  // Get property stats
  getPropertyStats: async () => {
    return apiFetch('/analytics?type=properties');
  },

  // Get view stats
  getViewStats: async (days: number = 30) => {
    return apiFetch(`/analytics?type=views&days=${days}`);
  },

  // Get message stats
  getMessageStats: async (days: number = 30) => {
    return apiFetch(`/analytics?type=messages&days=${days}`);
  },

  // Track property view
  trackView: async (propertyId: string) => {
    return apiFetch('/analytics', {
      method: 'POST',
      body: JSON.stringify({
        property_id: propertyId,
        ip_address: 'client-ip', // Will be set by server
        user_agent: navigator.userAgent,
        session_id: sessionStorage.getItem('sessionId') || 'anonymous',
      }),
    });
  },
};

// Error handling helper
export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.message.includes('401')) {
    // Token expired or invalid
    setAuthToken(null);
    window.location.href = '/admin/login';
    return 'Sessão expirada. Faça login novamente.';
  }
  
  if (error.message.includes('403')) {
    return 'Você não tem permissão para esta ação.';
  }
  
  if (error.message.includes('429')) {
    return 'Muitas requisições. Tente novamente em alguns minutos.';
  }
  
  return error.message || 'Erro interno do servidor.';
};

// Initialize auth token on app start
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
}