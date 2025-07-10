export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  password?: string; // Optional since we don't want to send passwords in updates
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  message?: string;
} 