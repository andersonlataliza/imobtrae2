export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  images: string[];
  type: 'sale' | 'rent';
  status: 'available' | 'unavailable';
  featured: boolean;
}

export interface Agent {
  id: string;
  name: string;
  position: string;
  photo: string;
  contact: string;
  email: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'properties' | 'users' | 'agents' | 'messages' | 'settings';
}

export interface AuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permissionId: string) => boolean;
}