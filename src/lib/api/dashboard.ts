import api from '@/lib/axios'

// GET /dashboard/stats
// Returns: total requests, successful, failed, pending retry,
// total jobs, total units, imports count
export const getDashboardStatsApi = async () => {
  const response = await api.get('/dashboard/stats')
  return response.data
}

// GET /dashboard/jobs-by-stage
// Returns: array of { stage, count }
export const getJobsByStageApi = async () => {
  const response = await api.get('/dashboard/jobs-by-stage')
  return response.data
}

// GET /dashboard/submissions-by-type
// Returns: array of { type, success, failed }
export const getSubmissionsByTypeApi = async () => {
  const response = await api.get('/dashboard/submissions-by-type')
  return response.data
}

// GET /dashboard/monthly-failure-trend
// Returns: array of { month, count }
export const getMonthlyFailureTrendApi = async () => {
  const response = await api.get('/dashboard/monthly-failure-trend')
  return response.data
}

// GET /dashboard/recent-jobs
// Returns: array of Job (last 5)
export const getRecentJobsApi = async () => {
  const response = await api.get('/dashboard/recent-jobs')
  return response.data
}

// GET /dashboard/recent-imports
// Returns: array of ImportSession (last 5)
export const getRecentImportsApi = async () => {
  const response = await api.get('/dashboard/recent-imports')
  return response.data
}
