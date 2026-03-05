'use client'

import { FileSpreadsheet } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ReportTypeCard } from '@/components/modules/reports/ReportTypeCard'
import { useReportTypes } from '@/hooks/useReports'
import { REPORT_TYPES } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export default function ReportsPage() {
  const router = useRouter()
  const { data: reportTypes, isLoading, error } = useReportTypes()

  // Use API data if available, otherwise fallback to constants
  const types = reportTypes || REPORT_TYPES

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FileSpreadsheet className="w-4 h-4 text-gray-400" />}
        title="Reports"
        subtitle="Select a report type to upload"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-700 rounded w-full mb-4" />
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400">
            Failed to load report types. Please try again.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((type: string) => (
            <ReportTypeCard
              key={type}
              type={type}
              description=""
              onClick={() => router.push(`/reports/${type}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
