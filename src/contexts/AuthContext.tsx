import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  admin: { email: 'admin@company.com', password: 'admin123' },
  employee: { email: 'employee@company.com', password: 'employee123' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'User not found' };
    }

    // Check password (demo: admin123 for admin, employee123 for employee)
    const isValidPassword = 
      (user.role === 'admin' && credentials.password === 'admin123') ||
      (user.role === 'employee' && credentials.password === 'employee123');

    if (!isValidPassword) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Invalid password' };
    }

    if (!user.isActive) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Account is deactivated' };
    }

    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { DEMO_CREDENTIALS };
