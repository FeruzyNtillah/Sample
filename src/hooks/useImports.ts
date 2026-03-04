import { useQuery } from '@tanstack/react-query'
import { getImportsApi, getImportByIdApi } from '@/lib/api'

interface ImportsFilters {
  reportType?: string
  status?: string
  search?: string
  page?: number
  pageSize?: number
}

export const useImports = (filters: ImportsFilters = {}) => {
  return useQuery({
    queryKey: ['imports', filters],
    queryFn: () => getImportsApi(filters),
  })
}

export const useImport = (id: string) => {
  return useQuery({
    queryKey: ['import', id],
    queryFn: () => getImportByIdApi(id),
    enabled: !!id,
  })
}
