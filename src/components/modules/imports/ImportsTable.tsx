import React from 'react'
import { DataTable, ColumnDef } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ImportSession } from '@/types/imports'
import { formatReportType, formatDateTime, formatDate, truncateId } from '@/lib/formatters'

interface ImportsTableProps {
  data: ImportSession[]
  isLoading: boolean
  pagination: {
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
  onRowClick: (item: ImportSession) => void
}

export function ImportsTable({ data, isLoading, pagination, onRowClick }: ImportsTableProps) {
  const columns: ColumnDef<ImportSession>[] = [
    {
      key: 'reportType',
      header: 'Report Type',
      accessor: (item) => (
        <button
          onClick={() => onRowClick(item)}
          className="font-bold text-white hover:underline cursor-pointer"
        >
          {formatReportType(item.reportType)}
        </button>
      ),
    },
    {
      key: 'fileName',
      header: 'File',
      accessor: (item) => (
        <span className="text-gray-400 truncate block max-w-[200px]" title={item.fileName}>
          {item.fileName}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'rows',
      header: 'Rows',
      accessor: (item) => (
        <span className="text-white text-center block">
          {item.rows}
        </span>
      ),
    },
    {
      key: 'errors',
      header: 'Errors',
      accessor: (item) => (
        <span className={`text-center block ${item.errors > 0 ? 'text-red-500' : 'text-gray-400'}`}>
          {item.errors}
        </span>
      ),
    },
    {
      key: 'jobId',
      header: 'Job',
      accessor: (item) => (
        <span className="text-gray-400 font-mono truncate block max-w-[100px]" title={item.jobId}>
          {item.jobId ? truncateId(item.jobId) : '-'}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      accessor: (item) => (
        <span className="text-gray-400">
          {item.submittedAt ? formatDateTime(item.submittedAt) : '-'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      accessor: (item) => (
        <span className="text-gray-400">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No imports found"
      emptySubtitle="Try adjusting your filters or upload a new report"
      pagination={pagination}
    />
  )
}
