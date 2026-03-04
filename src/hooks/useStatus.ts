import { useQuery } from '@tanstack/react-query'
import { getSubmissionStatusApi } from '@/lib/api'

export const useSubmissionStatus = (filters?: {
  status?: string
  reportType?: string
  page?: number
  pageSize?: number
}) => {
  return useQuery({
    queryKey: ['submission-status', filters],
    queryFn: () => getSubmissionStatusApi(filters),
  })
}

export const useStatusSummary = () => {
  return useQuery({
    queryKey: ['status-summary'],
    queryFn: () => getSubmissionStatusApi({ pageSize: 1000 }),
    select: (data) => {
      const items = data?.items || []
      return {
        total: items.length,
        pending: items.filter(item => 
          item.status === 'pending' || 
          item.status === 'job_created'
        ).length,
        success: items.filter(item => 
          item.status === 'Success' || 
          item.status === 'submit success'
        ).length,
        failed: items.filter(item => 
          item.status === 'Validation Failed' || 
          item.status === 'failed'
        ).length,
      }
    }
  })
}
