import api from '@/lib/axios'

// GET /analytics/kpi
export const getKPIDataApi = async () => {
  const response = await api.get('/analytics/kpi')
  return response.data
}

// GET /analytics/sla
export const getSLADataApi = async () => {
  const response = await api.get('/analytics/sla')
  return response.data
}

// GET /submission-status
export const getSubmissionStatusApi = async (filters?: {
  status?: string
  reportType?: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get('/submission-status', { params: filters })
  return response.data
}
