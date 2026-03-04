import { useQuery } from '@tanstack/react-query'
import { getKPIDataApi, getSLADataApi } from '@/lib/api'

export const useKPIData = () => {
  return useQuery({
    queryKey: ['kpi-data'],
    queryFn: getKPIDataApi,
  })
}

export const useSLAData = () => {
  return useQuery({
    queryKey: ['sla-data'],
    queryFn: getSLADataApi,
  })
}
