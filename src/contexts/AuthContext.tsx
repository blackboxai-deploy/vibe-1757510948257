"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (phone: string, otp: string, role: UserRole) => Promise<boolean>;
  loginWithAadhaar: (aadhaar: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        token: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: null,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored authentication on app load
    const token = localStorage.getItem('ap_youth_connect_token');
    const userData = localStorage.getItem('ap_youth_connect_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (error) {
        localStorage.removeItem('ap_youth_connect_token');
        localStorage.removeItem('ap_youth_connect_user');
      }
    }
  }, []);

  const sendOTP = async (phone: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`OTP sent to ${phone}`);
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const verifyOTP = async (phone: string, otp: string, role: UserRole): Promise<boolean> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful verification
      if (otp === '123456') {
        const mockUser: User = {
          id: `user_${Date.now()}`,
          phone,
          name: role === UserRole.CITIZEN ? 'John Citizen' : 
                role === UserRole.GOVERNMENT_OFFICIAL ? 'Officer Smith' : 'Youth Leader',
          role,
          district: 'Krishna',
          mandal: 'Vijayawada',
          village: 'Amaravati',
          isVerified: true,
          createdAt: new Date(),
          lastLogin: new Date(),
        };
        
        const token = `token_${Date.now()}`;
        
        // Store in localStorage
        localStorage.setItem('ap_youth_connect_token', token);
        localStorage.setItem('ap_youth_connect_user', JSON.stringify(mockUser));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token } });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const login = async (phone: string, otp: string, role: UserRole): Promise<boolean> => {
    return verifyOTP(phone, otp, role);
  };

  const loginWithAadhaar = async (aadhaar: string, otp: string): Promise<boolean> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === '123456') {
        const mockUser: User = {
          id: `user_${Date.now()}`,
          phone: '9876543210',
          aadhaar: aadhaar,
          name: 'Aadhaar Verified User',
          role: UserRole.CITIZEN,
          district: 'Krishna',
          mandal: 'Vijayawada',
          village: 'Amaravati',
          isVerified: true,
          createdAt: new Date(),
          lastLogin: new Date(),
        };
        
        const token = `token_${Date.now()}`;
        
        localStorage.setItem('ap_youth_connect_token', token);
        localStorage.setItem('ap_youth_connect_user', JSON.stringify(mockUser));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token } });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('ap_youth_connect_token');
    localStorage.removeItem('ap_youth_connect_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    if (state.user) {
      localStorage.setItem('ap_youth_connect_user', JSON.stringify({ ...state.user, ...updates }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithAadhaar,
        logout,
        updateProfile,
        sendOTP,
        verifyOTP,
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