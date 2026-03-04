import { useQuery } from '@tanstack/react-query'
import {
  getDashboardStatsApi,
  getJobsByStageApi,
  getSubmissionsByTypeApi,
  getMonthlyFailureTrendApi,
  getRecentJobsApi,
  getRecentImportsApi,
} from '@/lib/api'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStatsApi,
  })
}

export const useJobsByStage = () => {
  return useQuery({
    queryKey: ['jobs-by-stage'],
    queryFn: getJobsByStageApi,
  })
}

export const useSubmissionsByType = () => {
  return useQuery({
    queryKey: ['submissions-by-type'],
    queryFn: getSubmissionsByTypeApi,
  })
}

export const useMonthlyFailureTrend = () => {
  return useQuery({
    queryKey: ['monthly-failure-trend'],
    queryFn: getMonthlyFailureTrendApi,
  })
}

export const useRecentJobs = () => {
  return useQuery({
    queryKey: ['recent-jobs'],
    queryFn: getRecentJobsApi,
  })
}

export const useRecentImports = () => {
  return useQuery({
    queryKey: ['recent-imports'],
    queryFn: getRecentImportsApi,
  })
}
