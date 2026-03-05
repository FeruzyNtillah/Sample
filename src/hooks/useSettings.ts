import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deactivateUserApi,
  getRolesApi,
  getSLASettingsApi,
  getSuppliersApi
} from '@/lib/api'

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

// Users hooks
export const useUsers = (filters?: {
  search?: string
  role?: string
  status?: string
  page?: number
  pageSize?: number
}) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsersApi(filters),
  })
}

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getRolesApi(),
  })
}

export const useSLASettings = () => {
  return useQuery({
    queryKey: ['sla-settings'],
    queryFn: () => getSLASettingsApi(),
  })
}

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliersApi(),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as ApiError).response?.data?.message || 'Failed to create user'
        : 'Failed to create user'
      toast.error(errorMessage)
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{
      name: string
      email: string
      role: string
    }> }) => updateUserApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully')
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as ApiError).response?.data?.message || 'Failed to update user'
        : 'Failed to update user'
      toast.error(errorMessage)
    },
  })
}

export const useDeactivateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deactivateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deactivated')
    },
    onError: (error: unknown) => {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as ApiError).response?.data?.message || 'Failed to deactivate user'
        : 'Failed to deactivate user'
      toast.error(errorMessage)
    },
  })
}
