// Validation utilities for backend APIs

export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'phone' | 'url' | 'array';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateData(data: any, schema: ValidationSchema): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field];
    const error = validateField(field, value, rule);
    if (error) {
      errors.push(error);
    }
  }

  return errors;
}

export function validateField(field: string, value: any, rule: ValidationRule): ValidationError | null {
  // Check required
  if (rule.required && (value === undefined || value === null || value === '')) {
    return { field, message: `${field} é obrigatório` };
  }

  // Skip other validations if value is empty and not required
  if (!rule.required && (value === undefined || value === null || value === '')) {
    return null;
  }

  // Type validation
  if (rule.type) {
    const typeError = validateType(field, value, rule.type);
    if (typeError) return typeError;
  }

  // Length validation for strings
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return { field, message: `${field} deve ter pelo menos ${rule.minLength} caracteres` };
    }
    if (rule.maxLength && value.length > rule.maxLength) {
      return { field, message: `${field} deve ter no máximo ${rule.maxLength} caracteres` };
    }
  }

  // Numeric validation
  if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) {
      return { field, message: `${field} deve ser pelo menos ${rule.min}` };
    }
    if (rule.max !== undefined && value > rule.max) {
      return { field, message: `${field} deve ser no máximo ${rule.max}` };
    }
  }

  // Pattern validation
  if (rule.pattern && typeof value === 'string') {
    if (!rule.pattern.test(value)) {
      return { field, message: `${field} tem formato inválido` };
    }
  }

  // Custom validation
  if (rule.custom) {
    const customError = rule.custom(value);
    if (customError) {
      return { field, message: customError };
    }
  }

  return null;
}

function validateType(field: string, value: any, type: string): ValidationError | null {
  switch (type) {
    case 'string':
      if (typeof value !== 'string') {
        return { field, message: `${field} deve ser um texto` };
      }
      break;
    
    case 'number':
      if (typeof value !== 'number' || isNaN(value)) {
        return { field, message: `${field} deve ser um número` };
      }
      break;
    
    case 'email':
      if (typeof value !== 'string' || !isValidEmail(value)) {
        return { field, message: `${field} deve ser um email válido` };
      }
      break;
    
    case 'phone':
      if (typeof value !== 'string' || !isValidPhone(value)) {
        return { field, message: `${field} deve ser um telefone válido` };
      }
      break;
    
    case 'url':
      if (typeof value !== 'string' || !isValidUrl(value)) {
        return { field, message: `${field} deve ser uma URL válida` };
      }
      break;
    
    case 'array':
      if (!Array.isArray(value)) {
        return { field, message: `${field} deve ser uma lista` };
      }
      break;
  }
  
  return null;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Brazilian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\(\)\+\-]{10,15}$/;
  return phoneRegex.test(phone);
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Password strength validation
export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return 'Senha deve ter pelo menos 6 caracteres';
  }
  
  if (password.length > 128) {
    return 'Senha deve ter no máximo 128 caracteres';
  }
  
  // Check for at least one letter and one number
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    return 'Senha deve conter pelo menos uma letra e um número';
  }
  
  return null;
}

// Sanitize input to prevent XSS
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Common validation schemas
export const propertySchema: ValidationSchema = {
  title: { required: true, type: 'string', minLength: 3, maxLength: 255 },
  price: { required: true, type: 'number', min: 0 },
  address: { required: true, type: 'string', minLength: 5, maxLength: 500 },
  city: { required: true, type: 'string', minLength: 2, maxLength: 100 },
  bedrooms: { required: true, type: 'number', min: 0, max: 20 },
  bathrooms: { required: true, type: 'number', min: 0, max: 20 },
  area: { required: true, type: 'number', min: 1 },
  type: { 
    required: true, 
    type: 'string',
    custom: (value) => ['sale', 'rent'].includes(value) ? null : 'Tipo deve ser "sale" ou "rent"'
  },
  description: { type: 'string', maxLength: 2000 },
  features: { type: 'array' },
  images: { type: 'array' }
};

export const agentSchema: ValidationSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 255 },
  position: { required: true, type: 'string', minLength: 2, maxLength: 100 },
  email: { required: true, type: 'email' },
  contact: { type: 'phone' },
  bio: { type: 'string', maxLength: 1000 },
  photo: { type: 'url' }
};

export const contactSchema: ValidationSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 255 },
  email: { required: true, type: 'email' },
  phone: { type: 'phone' },
  subject: { type: 'string', maxLength: 255 },
  message: { required: true, type: 'string', minLength: 10, maxLength: 2000 }
};

export const testimonialSchema: ValidationSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 255 },
  role: { type: 'string', maxLength: 100 },
  content: { required: true, type: 'string', minLength: 10, maxLength: 1000 },
  rating: { 
    type: 'number', 
    min: 1, 
    max: 5,
    custom: (value) => Number.isInteger(value) ? null : 'Avaliação deve ser um número inteiro'
  },
  avatar: { type: 'url' }
};

export const userSchema: ValidationSchema = {
  name: { required: true, type: 'string', minLength: 2, maxLength: 255 },
  email: { required: true, type: 'email' },
  password: { 
    required: true, 
    type: 'string',
    custom: validatePassword
  },
  role: { 
    required: true, 
    type: 'string',
    custom: (value) => ['super_admin', 'admin', 'editor', 'viewer'].includes(value) 
      ? null : 'Papel inválido'
  }
};