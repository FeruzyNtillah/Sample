import api from '@/lib/axios'

// GET /jobs
// Params: stage?, status?, page?, pageSize?
export const getJobsApi = async (params?: {
  stage?: string
  status?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/jobs', { params })
  return response.data
}

// GET /jobs/:id
export const getJobByIdApi = async (id: string) => {
  const response = await api.get(`/jobs/${id}`)
  return response.data
}

// POST /jobs (create job via excel upload)
// Uses multipart/form-data
export const createJobApi = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/jobs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}
