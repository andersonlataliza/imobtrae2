// Custom hooks for API operations
import { useState, useEffect } from 'react';
import { 
  propertiesApi, 
  agentsApi, 
  testimonialsApi, 
  contactApi, 
  analyticsApi,
  handleApiError 
} from '../services/api';
import { Property, Agent, Testimonial } from '../types';

// Generic API hook
export const useApi = <T>(apiCall: () => Promise<T>, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

// Properties hooks
export const useProperties = (filters: {
  page?: number;
  limit?: number;
  type?: 'sale' | 'rent';
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  featured?: boolean;
} = {}) => {
  return useApi(
    () => propertiesApi.getProperties(filters),
    [JSON.stringify(filters)]
  );
};

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await propertiesApi.createProperty(propertyData);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createProperty, loading, error };
};

export const useUpdateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await propertiesApi.updateProperty(id, propertyData);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateProperty, loading, error };
};

export const useDeleteProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProperty = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await propertiesApi.deleteProperty(id);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProperty, loading, error };
};

// Agents hooks
export const useAgents = () => {
  return useApi(() => agentsApi.getAgents());
};

export const useAgent = (id: string) => {
  return useApi(() => agentsApi.getAgent(id), [id]);
};

export const useCreateAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAgent = async (agentData: Omit<Agent, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await agentsApi.createAgent(agentData);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createAgent, loading, error };
};

// Testimonials hooks
export const useTestimonials = (params: {
  page?: number;
  limit?: number;
  approved_only?: boolean;
} = {}) => {
  return useApi(
    () => testimonialsApi.getTestimonials(params),
    [JSON.stringify(params)]
  );
};

export const useCreateTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestimonial = async (testimonialData: Omit<Testimonial, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await testimonialsApi.createTestimonial(testimonialData);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createTestimonial, loading, error };
};

// Contact hooks
export const useContactMessages = (params: {
  page?: number;
  limit?: number;
  status?: string;
  property_id?: string;
  agent_id?: string;
} = {}) => {
  return useApi(
    () => contactApi.getMessages(params),
    [JSON.stringify(params)]
  );
};

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (messageData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    property_id?: string;
    agent_id?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await contactApi.sendMessage(messageData);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, success };
};

// Analytics hooks
export const useDashboardStats = () => {
  return useApi(() => analyticsApi.getDashboardStats());
};

export const usePropertyStats = () => {
  return useApi(() => analyticsApi.getPropertyStats());
};

export const useViewStats = (days: number = 30) => {
  return useApi(() => analyticsApi.getViewStats(days), [days]);
};

export const useMessageStats = (days: number = 30) => {
  return useApi(() => analyticsApi.getMessageStats(days), [days]);
};

// Track property view hook
export const useTrackView = () => {
  const trackView = async (propertyId: string) => {
    try {
      await analyticsApi.trackView(propertyId);
    } catch (error) {
      // Silently fail for tracking
      console.warn('Failed to track view:', error);
    }
  };

  return { trackView };
};

// File upload hook
export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFiles = async (files: FileList, bucket: string = 'property-images') => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await propertiesApi.uploadFiles(files, bucket);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return { uploadFiles, loading, error, progress };
};

// Pagination hook
export const usePagination = (initialPage: number = 1, initialLimit: number = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(1, prev - 1));
  const goToPage = (pageNumber: number) => setPage(Math.max(1, pageNumber));
  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  };

  return {
    page,
    limit,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    setPage,
    setLimit
  };
};

// Search and filter hook
export const useSearchFilter = <T>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const updateFilter = (key: keyof T, value: T[keyof T]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateFilters = (newFilters: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  const clearFilter = (key: keyof T) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  return {
    filters,
    searchTerm,
    setSearchTerm,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter
  };
};