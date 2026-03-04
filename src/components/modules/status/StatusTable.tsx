import React from 'react'
import { DataTable } from '@/components/shared/DataTable'
import { formatReportType, truncateId, formatDateTime } from '@/lib/formatters'

interface StatusTableProps {
  data: any[]
  isLoading: boolean
  pagination: {
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'job_created':
        return 'bg-[#1f2937] text-[#9ca3af] border border-[#374151]'
      case 'success':
      case 'submit success':
        return 'bg-[#052e16] text-[#22c55e] border border-[#166534]'
      case 'validation failed':
      case 'failed':
        return 'bg-[#450a0a] text-[#ef4444] border border-[#991b1b]'
      case 'pending':
        return 'bg-[#431407] text-[#f97316] border border-[#9a3412]'
      default:
        return 'bg-[#1f2937] text-[#9ca3af] border border-[#374151]'
    }
  }

  const getDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'submit success':
        return 'bg-[#22c55e]'
      case 'validation failed':
      case 'failed':
        return 'bg-[#ef4444]'
      case 'pending':
        return 'bg-[#f97316]'
      default:
        return 'bg-[#9ca3af]'
    }
  }

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
      min-w-[120px] justify-center
      ${getStatusStyle(status)}
    `}>
      <div className={`w-2 h-2 rounded-full ${getDotColor(status)}`}></div>
      <span className="capitalize">
        {status.replace(/_/g, ' ')}
      </span>
    </div>
  )
}

export function StatusTable({ data, isLoading, pagination }: StatusTableProps) {
  const columns = [
    {
      key: 'reportType',
      header: 'Report Type',
      accessor: (row: any) => (
        <span className="font-bold text-white">
          {formatReportType(row.reportType || '')}
        </span>
      )
    },
    {
      key: 'jobId',
      header: 'Job ID',
      accessor: (row: any) => (
        <span className="font-mono text-gray-400">
          {truncateId(row.jobId || '', 8)}
        </span>
      )
    },
    {
      key: 'fileName',
      header: 'File Name',
      accessor: (row: any) => (
        <span className="text-gray-400 truncate max-w-[200px] block">
          {row.fileName || '-'}
        </span>
      )
    },
    {
      key: 'rows',
      header: 'Rows',
      accessor: (row: any) => (
        <span className="text-center block">
          {row.rows || 0}
        </span>
      )
    },
    {
      key: 'submittedAt',
      header: 'Submitted At',
      accessor: (row: any) => (
        <span className="text-gray-400">
          {formatDateTime(row.submittedAt)}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: any) => (
        <StatusBadge status={row.status || ''} />
      )
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No submissions found"
      emptySubtitle="Try adjusting your filters"
      pagination={pagination}
    />
  )
}
