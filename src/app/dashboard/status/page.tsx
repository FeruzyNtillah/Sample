"use client"

import React, { useState } from 'react'
import { Activity } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusSummaryCards } from '@/components/modules/status/StatusSummaryCards'
import { StatusFilterTabs } from '@/components/modules/status/StatusFilterTabs'
import { StatusTable } from '@/components/modules/status/StatusTable'
import { useStatusSummary, useSubmissionStatus } from '@/hooks/useStatus'

export default function StatusPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [reportType, setReportType] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(25)

  const { data: summary, isLoading: summaryLoading } = useStatusSummary()
  const { data: statusData, isLoading } = useSubmissionStatus({
    status: activeFilter === "all" ? "" : activeFilter,
    reportType,
    page,
    pageSize
  })

  const counts = {
    all: summary?.total ?? 0,
    pending: summary?.pending ?? 0,
    success: summary?.success ?? 0,
    failed: summary?.failed ?? 0
  }

  return (
    <div className="p-6">
      <PageHeader
        icon={<Activity className="w-4 h-4 text-white" />}
        title="Submission Status"
        subtitle="Track report submissions across all report types"
      />

      <StatusSummaryCards
        summary={summary || {
          total: 0,
          pending: 0,
          success: 0,
          failed: 0
        }}
        isLoading={summaryLoading}
      />

      <StatusFilterTabs
        activeFilter={activeFilter}
        counts={counts}
        onFilterChange={(filter) => {
          setActiveFilter(filter)
          setPage(1)
        }}
        reportType={reportType}
        onReportTypeChange={(value) => {
          setReportType(value)
          setPage(1)
        }}
      />

      <StatusTable
        data={statusData?.items || []}
        isLoading={isLoading}
        pagination={{
          total: statusData?.total || 0,
          page,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size)
            setPage(1)
          }
        }}
      />
    </div>
  )
}
