import type { Role, User } from './user';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
