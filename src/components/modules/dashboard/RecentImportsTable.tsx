import React from 'react'
import { useRouter } from 'next/navigation'
import { FileDown } from 'lucide-react'
import { format } from 'date-fns'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useRecentImports } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

interface ImportSession {
  id: string
  reportType: string
  filename: string
  status: string
  rows: number
  createdAt: string
}

interface RecentImportsTableProps {
  data?: ImportSession[]
  isLoading?: boolean
}

export function RecentImportsTable({ data, isLoading }: RecentImportsTableProps) {
  const router = useRouter()
  const { data: hookData, isLoading: hookIsLoading } = useRecentImports()
  const tableData = data || hookData
  const loading = isLoading !== undefined ? isLoading : hookIsLoading

  if (loading) {
    return (
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          <FileDown className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Recent Imports</h2>
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
          <FileDown className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Recent Imports</h2>
        </div>
        <button
          onClick={() => router.push('/imports')}
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
              <th className="pb-3 font-medium">Report Type</th>
              <th className="pb-3 font-medium">File</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Rows</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData?.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No recent imports found
                </td>
              </tr>
            ) : (
              tableData?.map((importSession: ImportSession) => (
                <tr key={importSession.id} className="border-b border-gray-800">
                  <td className="py-3 font-medium">{importSession.reportType}</td>
                  <td className="py-3">{importSession.filename}</td>
                  <td className="py-3">
                    <StatusBadge status={importSession.status} size="sm" />
                  </td>
                  <td className="py-3">{importSession.rows}</td>
                  <td className="py-3">
                    {format(new Date(importSession.createdAt), 'dd/MM/yyyy')}
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
