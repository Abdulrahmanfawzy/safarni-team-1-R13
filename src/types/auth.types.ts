
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

export interface RegisterResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    user: AuthUser;
  };
}
