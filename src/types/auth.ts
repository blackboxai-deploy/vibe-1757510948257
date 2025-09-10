export interface User {
  id: string;
  phone: string;
  aadhaar?: string;
  name: string;
  email?: string;
  role: UserRole;
  district?: string;
  mandal?: string;
  village?: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  CITIZEN = 'CITIZEN',
  GOVERNMENT_OFFICIAL = 'GOVERNMENT_OFFICIAL',
  YOUTH = 'YOUTH',
  ADMIN = 'ADMIN'
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginRequest {
  phone: string;
  otp?: string;
  aadhaarNumber?: string;
  role: UserRole;
}

export interface OTPVerificationRequest {
  phone: string;
  otp: string;
  role: UserRole;
}

export interface AadhaarVerificationRequest {
  aadhaarNumber: string;
  otp: string;
}

export interface ProfileUpdateRequest {
  name: string;
  email?: string;
  district?: string;
  mandal?: string;
  village?: string;
}