import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const authStore = useAuthStore();

  // Helper to check if user is admin
  const isAdmin = authStore.user?.role === 'admin';

  // Helper to check if user is viewer
  const isViewer = authStore.user?.role === 'viewer';

  return {
    ...authStore,
    isAdmin,
    isViewer,
  };
}
