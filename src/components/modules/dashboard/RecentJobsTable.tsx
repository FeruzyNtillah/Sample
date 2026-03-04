import React from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase } from 'lucide-react'
import { format } from 'date-fns'
import { StageBadge } from '@/components/shared/StageBadge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { LifecycleBar } from '@/components/shared/LifecycleBar'
import { useRecentJobs } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

interface Job {
  id: string
  supplier: string
  stage: string
  status: string
  units: number
  createdAt: string
}

interface RecentJobsTableProps {
  data?: Job[]
  isLoading?: boolean
}

export function RecentJobsTable({ data, isLoading }: RecentJobsTableProps) {
  const router = useRouter()
  const { data: hookData, isLoading: hookIsLoading } = useRecentJobs()
  const tableData = data || hookData
  const loading = isLoading !== undefined ? isLoading : hookIsLoading

  if (loading) {
    return (
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          <Briefcase className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Recent Jobs</h2>
        </div>
        <div className={styles.divider} />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.dashboardCard}>
      <div className="flex items-center justify-between">
        <div className={styles.header}>
          <Briefcase className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Recent Jobs</h2>
        </div>
        <button
          onClick={() => router.push('/jobs')}
          className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors"
        >
          View All →
        </button>
      </div>
      <div className={styles.divider} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-3 font-medium">Job ID</th>
              <th className="pb-3 font-medium">Supplier</th>
              <th className="pb-3 font-medium">Stage</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Lifecycle</th>
              <th className="pb-3 font-medium">Units</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData?.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No recent jobs found
                </td>
              </tr>
            ) : (
              tableData?.map((job: Job) => (
                <tr key={job.id} className="border-b border-gray-800">
                  <td className="py-3 font-medium">{job.id}</td>
                  <td className="py-3">{job.supplier}</td>
                  <td className="py-3">
                    <StageBadge stage={job.stage} />
                  </td>
                  <td className="py-3">
                    <StatusBadge status={job.status} size="sm" />
                  </td>
                  <td className="py-3">
                    <LifecycleBar currentStage={job.stage} />
                  </td>
                  <td className="py-3">{job.units}</td>
                  <td className="py-3">
                    {format(new Date(job.createdAt), 'dd/MM/yyyy')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
