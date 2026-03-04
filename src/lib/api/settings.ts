import api from '@/lib/axios'

// GET /settings/users
export const getUsersApi = async (params?: {
  search?: string
  role?: string
  status?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/settings/users', { params })
  return response.data
}

// POST /settings/users
export const createUserApi = async (data: {
  name: string
  email: string
  role: string
  password: string
}) => {
  const response = await api.post('/settings/users', data)
  return response.data
}

// PUT /settings/users/:id
export const updateUserApi = async (
  id: string, 
  data: Partial<{
    name: string
    email: string
    role: string
  }>
) => {
  const response = await api.put(`/settings/users/${id}`, data)
  return response.data
}

// PUT /settings/users/:id/deactivate
export const deactivateUserApi = async (id: string) => {
  const response = await api.put(
    `/settings/users/${id}/deactivate` 
  )
  return response.data
}

// GET /settings/roles
export const getRolesApi = async () => {
  const response = await api.get('/settings/roles')
  return response.data
}

// GET /settings/sla
export const getSLASettingsApi = async () => {
  const response = await api.get('/settings/sla')
  return response.data
}

// GET /settings/suppliers
export const getSuppliersApi = async () => {
  const response = await api.get('/settings/suppliers')
  return response.data
}

// GET /status (submission status page)
export const getSubmissionStatusApi = async (params?: {
  reportType?: string
  status?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/status', { params })
  return response.data
}
