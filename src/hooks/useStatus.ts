import { useQuery } from '@tanstack/react-query'
import { getStatusPageApi } from '@/lib/api'

interface StatusItem {
  status: string
  id?: string
  reportType?: string
  createdAt?: string
  updatedAt?: string
}

export const useSubmissionStatus = (filters?: {
  status?: string
  reportType?: string
  page?: number
  pageSize?: number
}) => {
  return useQuery({
    queryKey: ['submission-status', filters],
    queryFn: () => getStatusPageApi(filters),
  })
}

export const useStatusSummary = () => {
  return useQuery({
    queryKey: ['status-summary'],
    queryFn: () => getStatusPageApi({ pageSize: 1000 }),
    select: (data) => {
      const items = data?.items || []
      return {
        total: items.length,
        pending: items.filter((item: StatusItem) => 
          item.status === 'pending' || 
          item.status === 'job_created'
        ).length,
        success: items.filter((item: StatusItem) => 
          item.status === 'Success' || 
          item.status === 'submit success'
        ).length,
        failed: items.filter((item: StatusItem) => 
          item.status === 'Validation Failed' || 
          item.status === 'failed'
        ).length,
      }
    }
  })
}
