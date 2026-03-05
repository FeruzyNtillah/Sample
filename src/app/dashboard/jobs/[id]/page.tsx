'use client'

import Link from 'next/link'
import { ArrowLeft, Briefcase, FileDown, AlignLeft } from 'lucide-react'
import { format } from 'date-fns'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { StageBadge } from '@/components/shared/StageBadge'
import { LifecycleBar } from '@/components/shared/LifecycleBar'
import { DataTable, ColumnDef } from '@/components/shared/DataTable'

// Mock data
const mockJob = {
  id: 'job-123456789',
  supplierJobId: 'SUP-001',
  type: 'Recycling',
  supplier: 'Microsoft Corp',
  status: 'active',
  stage: 'disposition',
  units: 150,
  createdAt: '2024-01-10',
  updatedAt: '2024-01-15'
}

const mockImports = [
  {
    id: 'import-1',
    reportType: 'Disposition',
    filename: 'disposition_report.xlsx',
    status: 'completed',
    rows: 150,
    submittedAt: '2024-01-12',
    createdAt: '2024-01-11'
  },
  {
    id: 'import-2',
    reportType: 'Collection',
    filename: 'collection_data.csv',
    status: 'processing',
    rows: 75,
    submittedAt: null,
    createdAt: '2024-01-13'
  }
]

const mockRequests = [
  {
    id: 'req-1',
    endpoint: '/api/v1/dispositions',
    supplierId: 'SUP-001',
    status: 'success',
    retries: 0,
    createdAt: '2024-01-12'
  },
  {
    id: 'req-2',
    endpoint: '/api/v1/invoices',
    supplierId: 'SUP-001',
    status: 'failed',
    retries: 2,
    createdAt: '2024-01-13'
  }
]

interface ImportSession {
  id: string
  reportType: string
  filename: string
  status: string
  rows: number
  submittedAt?: string
  createdAt: string
}

interface Request {
  id: string
  endpoint: string
  supplierId: string
  status: string
  retries: number
  createdAt: string
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJob
  const imports = { items: mockImports }
  const requests = { items: mockRequests }


  const importColumns: ColumnDef<ImportSession>[] = [
    {
      key: 'reportType',
      header: 'Report Type',
      accessor: (import_) => (
        <span className="text-white font-medium">
          {import_.reportType}
        </span>
      ),
    },
    {
      key: 'filename',
      header: 'File',
      accessor: (import_) => (
        <span className="text-white">
          {import_.filename}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (import_) => <StatusBadge status={import_.status} size="sm" />,
    },
    {
      key: 'rows',
      header: 'Rows',
      accessor: (import_) => (
        <span className="text-white">
          {import_.rows}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      accessor: (import_) => (
        <span className="text-gray-400">
          {import_.submittedAt ? format(new Date(import_.submittedAt), 'dd/MM/yyyy') : '-'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      accessor: (import_) => (
        <span className="text-gray-400">
          {format(new Date(import_.createdAt), 'dd/MM/yyyy')}
        </span>
      ),
    },
  ]

  const requestColumns: ColumnDef<Request>[] = [
    {
      key: 'endpoint',
      header: 'Endpoint',
      accessor: (request) => (
        <span className="text-white font-medium">
          {request.endpoint}
        </span>
      ),
    },
    {
      key: 'supplierId',
      header: 'Supplier ID',
      accessor: (request) => (
        <span className="text-white">
          {request.supplierId}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (request) => <StatusBadge status={request.status} size="sm" />,
    },
    {
      key: 'retries',
      header: 'Retries',
      accessor: (request) => (
        <span className="text-white">
          {request.retries}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      accessor: (request) => (
        <span className="text-gray-400">
          {format(new Date(request.createdAt), 'dd/MM/yyyy')}
        </span>
      ),
    },
  ]

  const truncateId = (id: string) => {
    return id.length > 12 ? `${id.slice(0, 6)}...${id.slice(-6)}` : id
  }

  return (
    <div className="space-y-6">
      <Link 
        href="/jobs"
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      <PageHeader
        icon={<Briefcase className="w-4 h-4 text-gray-400" />}
        title={job?.supplierJobId ?? job?.id ?? ''}
        subtitle={`Job Type: ${job?.type || 'N/A'} • Supplier: ${job?.supplier || 'N/A'}`}
      />

      {/* Job Overview Card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Job Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Job ID</p>
              <p className="text-sm text-white font-medium">{job?.supplierJobId || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Internal ID</p>
              <p className="text-sm text-white font-medium">{job?.id ? truncateId(job.id) : '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Type</p>
              <p className="text-sm text-white font-medium">{job?.type || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Supplier</p>
              <p className="text-sm text-white font-medium">{job?.supplier || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Status</p>
              <div className="mt-1">
                {job?.status ? <StatusBadge status={job.status} size="sm" /> : '-'}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Created</p>
              <p className="text-sm text-white font-medium">
                {job?.createdAt ? format(new Date(job.createdAt), 'dd/MM/yyyy') : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Updated</p>
              <p className="text-sm text-white font-medium">
                {job?.updatedAt ? format(new Date(job.updatedAt), 'dd/MM/yyyy') : '-'}
              </p>
            </div>
          </div>

          {/* Right Column - Lifecycle */}
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Current Stage</p>
              <div className="mt-1">
                {job?.stage ? <StageBadge stage={job.stage} /> : '-'}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Units</p>
              <p className="text-sm text-white font-medium">{job?.units || 0}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Lifecycle Progress</p>
              {job?.stage ? (
                <div className="space-y-2">
                  <LifecycleBar currentStage={job.stage} />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Collection</span>
                    <span>Disposition</span>
                    <span>Invoice</span>
                    <span>Credit</span>
                    <span>Transport</span>
                    <span>Material Audit</span>
                    <span>Closed</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white">-</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Imports */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileDown className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Related Imports</h2>
        </div>
        <DataTable
          columns={importColumns}
          data={imports.items}
          isLoading={false}
          emptyTitle="No imports found"
          emptySubtitle="There are no imports related to this job"
        />
      </div>

      {/* Related Requests */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlignLeft className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Related Requests</h2>
        </div>
        <DataTable
          columns={requestColumns}
          data={requests.items}
          isLoading={false}
          emptyTitle="No requests found"
          emptySubtitle="There are no API requests related to this job"
        />
      </div>
    </div>
  )
}
