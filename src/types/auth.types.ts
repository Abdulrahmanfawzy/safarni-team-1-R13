
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar_url?: string | null;
  role?: string;
  status?: string;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    user: AuthUser;
  };
}
// --->> otp -----------------------------------------------------------------------------
export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      location: string;
      avatar_url: string | null;
      role: string;
      status: string;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}
// ---- forgot pass ----------------------------------------------------------------------------
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: string;
}
// ---- reset pass ----------------------------------------------------------------------------
export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  code: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: null;
}
