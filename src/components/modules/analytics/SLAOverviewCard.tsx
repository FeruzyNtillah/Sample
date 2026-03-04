import React from 'react'
import { Timer } from 'lucide-react'
import { GaugeChart } from './GaugeChart'

interface SLAOverviewCardProps {
  data: {
    totalJobs: number
    compliant: number
    atRisk: number
    overdue: number
    complianceRate: number
  }
  isLoading: boolean
}

export function SLAOverviewCard({ data, isLoading }: SLAOverviewCardProps) {
  if (isLoading) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded animate-pulse w-48"></div>
            </div>
            <div className="border-t border-[#21262d]"></div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-48 h-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">SLA Overview</h3>
          </div>
          <div className="border-t border-[#21262d]"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">TOTAL JOBS</div>
              <div className="text-3xl font-bold text-white">{data.totalJobs.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">COMPLIANT</div>
              <div className="text-3xl font-bold text-white">{data.compliant.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">AT RISK</div>
              <div className="text-3xl font-bold text-white">{data.atRisk.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">OVERDUE</div>
              <div className="text-3xl font-bold text-white">{data.overdue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-center">
          <GaugeChart
            value={data.complianceRate}
            label="COMPLIANCE RATE"
            color="#5eead4"
          />
        </div>
      </div>
    </div>
  )
}
