import api from '@/lib/axios'

// POST /auth/login
export const loginApi = async (credentials: {
  email: string
  password: string
}) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// GET /auth/me
export const getMeApi = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// POST /auth/logout
export const logoutApi = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}
