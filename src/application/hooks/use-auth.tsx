import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Admin, LoginInput } from '../../domain/types/auth.types';
import { AuthService } from '../../infrastructure/services/auth.service';

interface AuthContextType {
  user: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tempToken: string | null;
  submitLogin: (data: LoginInput) => Promise<boolean>;
  submitOtp: (code: string) => Promise<boolean>;
  triggerResendOtp: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tempToken, setTempToken] = useState<string | null>(() => sessionStorage.getItem('tempToken'));

  const checkAuth = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const admin = await AuthService.getMe();
      setUser(admin);
      setIsAuthenticated(true);
    } catch (error) {
      // If getMe fails (e.g. 401), the interceptor will try to refresh.
      // If refresh fails, it will clear tokens. We just reset state here.
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const submitLogin = async (data: LoginInput): Promise<boolean> => {
    try {
      const response = await AuthService.login(data);
      setTempToken(response.tempToken);
      sessionStorage.setItem('tempToken', response.tempToken);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const submitOtp = async (code: string): Promise<boolean> => {
    if (!tempToken) return false;
    try {
      const tokens = await AuthService.verifyOtp({ tempToken, code });
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      setTempToken(null);
      sessionStorage.removeItem('tempToken');
      await checkAuth();
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('OTP Verification failed', error);
      return false;
    }
  };

  const triggerResendOtp = async (): Promise<boolean> => {
    if (!tempToken) return false;
    try {
      const response = await AuthService.resendOtp({ tempToken });
      setTempToken(response.tempToken);
      sessionStorage.setItem('tempToken', response.tempToken);
      return true;
    } catch (error) {
      console.error('Resend OTP failed', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        tempToken,
        submitLogin,
        submitOtp,
        triggerResendOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
