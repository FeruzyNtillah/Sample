import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getErrorMessage } from '../lib/helpers';
import type { AuthState, LoginRequest, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        
        // Mock authentication for development
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user database
          const mockUsers = {
            'admin@example.com': {
              password: 'admin123',
              user: {
                id: '1',
                name: 'Admin User',
                email: 'admin@example.com',
                role: 'admin',
                status: 'active'
              },
              token: 'mock-admin-token-12345'
            },
            'viewer@example.com': {
              password: 'viewer123',
              user: {
                id: '2',
                name: 'Viewer User',
                email: 'viewer@example.com',
                role: 'viewer',
                status: 'active'
              },
              token: 'mock-viewer-token-67890'
            }
          };

          const mockUser = mockUsers[credentials.email as keyof typeof mockUsers];
          
          if (!mockUser || mockUser.password !== credentials.password) {
            throw new Error('Invalid email or password');
          }

          const { token, user } = mockUser;

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
          // Throw a more descriptive error using helper
          if (error instanceof Error) {
            throw new Error(getErrorMessage(error));
          } else {
            throw new Error('An unknown error occurred');
          }
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
          
          // Mock user validation for development
          setTimeout(() => {
            if (token === 'mock-admin-token-12345') {
              set({ 
                user: {
                  id: '1',
                  name: 'Admin User',
                  email: 'admin@example.com',
                  role: 'admin',
                  status: 'active'
                }, 
                isLoading: false 
              });
            } else if (token === 'mock-viewer-token-67890') {
              set({ 
                user: {
                  id: '2',
                  name: 'Viewer User',
                  email: 'viewer@example.com',
                  role: 'viewer',
                  status: 'active'
                }, 
                isLoading: false 
              });
            } else {
              // Invalid token, clear it
              get().logout();
            }
          }, 500);
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
