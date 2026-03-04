import React from 'react'
import { DataTable, ColumnDef } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ApiRequest } from '@/types/requests'
import { formatDate, truncateId } from '@/lib/formatters'

interface RequestsTableProps {
  data: ApiRequest[]
  isLoading: boolean
  pagination: {
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
  onRowClick: (item: ApiRequest) => void
}

export function RequestsTable({ data, isLoading, pagination, onRowClick }: RequestsTableProps) {
  const columns: ColumnDef<ApiRequest>[] = [
    {
      key: 'endpoint',
      header: 'Endpoint',
      accessor: (item) => (
        <button
          onClick={() => onRowClick(item)}
          className="font-bold text-white hover:underline cursor-pointer"
        >
          {item.endpoint}
        </button>
      ),
    },
    {
      key: 'supplierId',
      header: 'Supplier ID',
      accessor: (item) => (
        <span className="text-gray-400">
          {item.supplierId}
        </span>
      ),
    },
    {
      key: 'jobId',
      header: 'Job ID',
      accessor: (item) => (
        <span className="text-gray-400 font-mono truncate block max-w-[100px]" title={item.jobId}>
          {truncateId(item.jobId)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'retries',
      header: 'Retries',
      accessor: (item) => (
        <span className={`text-center block ${item.retries > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
          {item.retries}
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
      emptyTitle="No requests found"
      emptySubtitle="Try adjusting your filters"
      pagination={pagination}
    />
  )
}
