import { useQuery } from '@tanstack/react-query'
import { getRequestsApi, getRequestByIdApi } from '@/lib/api'

interface RequestsFilters {
  endpoint?: string
  status?: string
  supplierId?: string
  page?: number
  pageSize?: number
}

export const useRequests = (filters: RequestsFilters = {}) => {
  return useQuery({
    queryKey: ['requests', filters],
    queryFn: () => getRequestsApi(filters),
  })
}

export const useRequest = (id: string) => {
  return useQuery({
    queryKey: ['request', id],
    queryFn: () => getRequestByIdApi(id),
    enabled: !!id,
  })
}
