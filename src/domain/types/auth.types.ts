export interface Admin {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginInput {
  email: string;
  password?: string; // Optional if using magic link, but requested standard login
}

export interface VerifyOtpInput {
  tempToken: string;
  code: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface ResendOtpInput {
  tempToken: string;
}

export interface ForgetPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  tempToken: string;
  code: string;
  newPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  tempToken: string;
}
