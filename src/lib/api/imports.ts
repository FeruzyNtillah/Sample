import api from '@/lib/axios'

// GET /reports/imports
// Params: reportType?, status?, search?, page?, pageSize?
export const getImportsApi = async (params?: {
  reportType?: string
  status?: string
  search?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/reports/imports', { params })
  return response.data
}

// GET /reports/imports/:id
export const getImportByIdApi = async (id: string) => {
  const response = await api.get(`/reports/imports/${id}`)
  return response.data
}

// GET /reports/imports
// Params: jobId?, reportType?, status?, search?, page?, pageSize?
export const getImportsByJobApi = async (params?: {
  jobId?: string
  reportType?: string
  status?: string
  search?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/reports/imports', { params })
  return response.data
}
