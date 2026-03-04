import api from '@/lib/axios'

// GET /requests
// Params: endpoint?, status?, supplierId?, page?, pageSize?
export const getRequestsApi = async (params?: {
  endpoint?: string
  status?: string
  supplierId?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/requests', { params })
  return response.data
}

// GET /requests/:id
export const getRequestByIdApi = async (id: string) => {
  const response = await api.get(`/requests/${id}`)
  return response.data
}

// GET /requests
// Params: jobId?, endpoint?, status?, supplierId?, page?, pageSize?
export const getRequestsByJobApi = async (params?: {
  jobId?: string
  endpoint?: string
  status?: string
  supplierId?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/requests', { params })
  return response.data
}
