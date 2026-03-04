import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/axios';
import type { AuthState, LoginRequest, User, AuthResponse } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>('/auth/login', credentials);
          const { token, user } = response.data;

          // Store token in localStorage
          localStorage.setItem('auth_token', token);
          
          // Store token in cookie
          document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Clear token from localStorage
        localStorage.removeItem('auth_token');
        
        // Clear token from cookie
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

        // Reset store state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token });
      },

      initialize: () => {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          set({ token, isAuthenticated: true, isLoading: true });
          
          // Attempt to fetch current user
          api.get<User>('/auth/me')
            .then((response) => {
              set({ user: response.data, isLoading: false });
            })
            .catch(() => {
              // If fetching user fails, clear invalid token
              get().logout();
            });
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
