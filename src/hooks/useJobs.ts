import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getJobsApi, getJobByIdApi, createJobApi } from '@/lib/api'

interface JobsFilters {
  stage?: string
  status?: string
  page?: number
  pageSize?: number
}

export const useJobs = (filters: JobsFilters = {}) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => getJobsApi(filters),
  })
}

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobByIdApi(id),
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      toast.success('Job created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create job')
    },
  })
}
