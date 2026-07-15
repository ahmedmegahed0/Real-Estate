import { apiClient } from '../api/api-client';
import type {
  Admin,
  AuthTokens,
  ForgetPasswordInput,
  LoginInput,
  LoginResponse,
  RefreshTokenInput,
  ResendOtpInput,
  ResetPasswordInput,
  VerifyOtpInput,
} from '../../domain/types/auth.types';

export const AuthService = {
  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<{ message: string; data: LoginResponse }>('/auth/login', data);
    return response.data.data;
  },

  verifyOtp: async (data: VerifyOtpInput): Promise<AuthTokens> => {
    const response = await apiClient.post<{ message: string; data: AuthTokens }>('/auth/verify-otp', data);
    return response.data.data;
  },

  refreshTokens: async (data: RefreshTokenInput): Promise<AuthTokens> => {
    const response = await apiClient.post<{ message: string; data: AuthTokens }>('/auth/refresh', data);
    return response.data.data;
  },

  resendOtp: async (data: ResendOtpInput): Promise<LoginResponse> => {
    const response = await apiClient.post<{ message: string; data: LoginResponse }>('/auth/resend-otp', data);
    return response.data.data;
  },

  forgetPassword: async (data: ForgetPasswordInput): Promise<LoginResponse> => {
    const response = await apiClient.post<{ message: string; data: LoginResponse }>('/auth/forget-password', data);
    return response.data.data;
  },

  resetPassword: async (data: ResetPasswordInput): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },

  getMe: async (): Promise<Admin> => {
    const response = await apiClient.get<{ message?: string; data: Admin }>('/auth/me');
    return response.data.data;
  },
};
