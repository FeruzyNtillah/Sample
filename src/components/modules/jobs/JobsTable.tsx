import React from 'react'
import { format } from 'date-fns'
import { DataTable, ColumnDef } from '@/components/shared/DataTable'
import { StageBadge } from '@/components/shared/StageBadge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { LifecycleBar } from '@/components/shared/LifecycleBar'

interface Job {
  id: string
  supplierJobId?: string
  type: string
  supplier: string
  stage: string
  status: string
  units: number
  createdAt: string
}

interface JobsTableProps {
  data: Job[]
  isLoading: boolean
  pagination: {
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
  onRowClick: (job: Job) => void
}

export function JobsTable({ data, isLoading, pagination, onRowClick }: JobsTableProps) {
  const columns: ColumnDef<Job>[] = [
    {
      key: 'id',
      header: 'Job ID',
      accessor: (job) => (
        <button
          onClick={() => onRowClick(job)}
          className="font-bold text-white hover:underline cursor-pointer"
        >
          {job.supplierJobId || job.id}
        </button>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      accessor: (job) => (
        <span className="text-gray-400 uppercase">
          {job.type}
        </span>
      ),
    },
    {
      key: 'supplier',
      header: 'Supplier',
      accessor: (job) => (
        <span className="text-white">
          {job.supplier}
        </span>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      accessor: (job) => <StageBadge stage={job.stage} />,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (job) => <StatusBadge status={job.status} size="sm" />,
    },
    {
      key: 'lifecycle',
      header: 'Lifecycle',
      accessor: (job) => <LifecycleBar currentStage={job.stage} />,
    },
    {
      key: 'units',
      header: 'Units',
      accessor: (job) => (
        <span className="text-white text-right block">
          {job.units}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      accessor: (job) => (
        <span className="text-gray-400">
          {format(new Date(job.createdAt), 'dd/MM/yyyy')}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No jobs found"
      emptySubtitle="Try adjusting your filters"
      pagination={pagination}
    />
  )
}
