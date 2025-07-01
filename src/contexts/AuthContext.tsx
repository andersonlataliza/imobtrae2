import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AuthContextType } from '../types';
import { adminUsers, userCredentials } from '../data/adminUsers';
import { rolePermissions } from '../data/permissions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedPassword = userCredentials[email];
    if (!storedPassword || storedPassword !== password) {
      throw new Error('Credenciais inválidas');
    }

    const foundUser = adminUsers.find(u => u.email === email);
    if (!foundUser || !foundUser.isActive) {
      throw new Error('Usuário não encontrado ou inativo');
    }

    // Update last login
    foundUser.lastLogin = new Date().toISOString();
    
    setUser(foundUser);
    localStorage.setItem('adminUser', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permissionId);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};