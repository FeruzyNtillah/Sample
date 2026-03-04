"use client"

import React from 'react'
import { Timer } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SLAOverviewCard } from '@/components/modules/analytics/SLAOverviewCard'
import { ComplianceByStageTable } from '@/components/modules/analytics/ComplianceByStageTable'
import { AgingDistributionChart } from '@/components/modules/analytics/AgingDistributionChart'
import { useSLAData } from '@/hooks/useAnalytics'

export default function SLADashboardPage() {
  const { data: slaData, isLoading } = useSLAData()

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        icon={<Timer className="w-4 h-4 text-white" />}
        title="Reporting SLA"
        subtitle="Track compliance rates, aging distribution, and overdue jobs"
      />

      <SLAOverviewCard
        data={slaData?.overview || {
          totalJobs: 0,
          compliant: 0,
          atRisk: 0,
          overdue: 0,
          complianceRate: 0
        }}
        isLoading={isLoading}
      />

      <ComplianceByStageTable
        data={slaData?.complianceByStage || []}
        isLoading={isLoading}
      />

      <AgingDistributionChart
        data={slaData?.agingDistribution || []}
        isLoading={isLoading}
      />
    </div>
  )
}
