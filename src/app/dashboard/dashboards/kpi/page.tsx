"use client"

import React from 'react'
import { BarChart2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { DispositionSummaryCard } from '@/components/modules/analytics/DispositionSummaryCard'
import { DispositionsByProductChart } from '@/components/modules/analytics/DispositionsByProductChart'
import { MonthlyDispositionTrendsChart } from '@/components/modules/analytics/MonthlyDispositionTrendsChart'
import { useKPIData } from '@/hooks/useAnalytics'

export default function KPIDashboardPage() {
  const { data: kpiData, isLoading } = useKPIData()

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        icon={<BarChart2 className="w-4 h-4 text-white" />}
        title="Executive KPI"
        subtitle="Key performance indicators for ITAD operations"
      />

      <DispositionSummaryCard
        data={kpiData?.dispositionSummary || {
          totalSold: 0,
          totalRecycled: 0,
          totalDispositions: 0,
          recycledPercentage: 0
        }}
        isLoading={isLoading}
      />

      <DispositionsByProductChart
        data={kpiData?.dispositionsByProduct || []}
        isLoading={isLoading}
      />

      <MonthlyDispositionTrendsChart
        data={kpiData?.monthlyTrends || []}
        isLoading={isLoading}
      />
    </div>
  )
}
