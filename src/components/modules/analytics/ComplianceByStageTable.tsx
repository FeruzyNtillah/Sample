import React from 'react'
import { DataTable } from '@/components/shared/DataTable'
import { EmptyState } from '@/components/shared/EmptyState'

interface ComplianceByStageTableProps {
  data: {
    stage: string
    total: number
    compliant: number
    atRisk: number
    overdue: number
    compliancePercentage: number
  }[]
  isLoading: boolean
}

export function ComplianceByStageTable({ data, isLoading }: ComplianceByStageTableProps) {
  const columns = [
    {
      key: 'stage',
      header: 'Stage',
      accessor: (row: any) => (
        <span className="font-bold text-white capitalize">
          {row.stage}
        </span>
      )
    },
    {
      key: 'total',
      header: 'Total',
      accessor: (row: any) => (
        <span className="text-white">
          {row.total.toLocaleString()}
        </span>
      )
    },
    {
      key: 'compliant',
      header: 'Compliant',
      accessor: (row: any) => (
        <span className="text-white">
          {row.compliant.toLocaleString()}
        </span>
      )
    },
    {
      key: 'atRisk',
      header: 'At Risk',
      accessor: (row: any) => (
        <span className="text-white">
          {row.atRisk.toLocaleString()}
        </span>
      )
    },
    {
      key: 'overdue',
      header: 'Overdue',
      accessor: (row: any) => (
        <span className="text-white">
          {row.overdue.toLocaleString()}
        </span>
      )
    },
    {
      key: 'compliance',
      header: 'Compliance',
      accessor: (row: any) => (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#052e16] text-[#22c55e] border border-[#166534] text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
          <span>{row.compliancePercentage}%</span>
        </div>
      )
    }
  ]

  if (isLoading) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-48"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <div key={colIndex} className="h-8 bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">Compliance by Stage</h3>
        </div>
        <EmptyState
          title="No compliance data available"
          subtitle="There are no compliance records to display"
        />
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Compliance by Stage</h3>
      </div>
      
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
