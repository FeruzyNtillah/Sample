"use client"

import Link from 'next/link'
import { AlignLeft } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useRequest } from '@/hooks/useRequests'
import { formatDateTime, truncateId } from '@/lib/formatters'

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const { data: request, isLoading, error } = useRequest(params.id)

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Link 
            href="/requests" 
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            ← Back to Requests
          </Link>
        </div>
        <PageHeader
          icon={<AlignLeft />}
          title="Request Details"
          subtitle={`Request ID: ${truncateId(params.id)}`}
        />
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Link 
            href="/requests" 
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            ← Back to Requests
          </Link>
        </div>
        <PageHeader
          icon={<AlignLeft />}
          title="Request Details"
          subtitle={`Request ID: ${truncateId(params.id)}`}
        />
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          <p className="text-red-400">Request not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          href="/requests" 
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          ← Back to Requests
        </Link>
      </div>

      <PageHeader
        icon={<AlignLeft />}
        title="Request Details"
        subtitle={`Request ID: ${truncateId(params.id)}`}
      />

      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Request ID
              </div>
              <div className="text-sm text-white font-medium font-mono">
                {truncateId(request.id)}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Endpoint
              </div>
              <div className="text-sm text-white font-medium">
                {request.endpoint}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Supplier ID
              </div>
              <div className="text-sm text-white font-medium">
                {request.supplierId}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Job ID
              </div>
              <div className="text-sm text-white font-medium font-mono">
                {truncateId(request.jobId)}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Status
              </div>
              <div className="text-sm">
                <StatusBadge status={request.status} />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Retries
              </div>
              <div className="text-sm text-white font-medium">
                {request.retries}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase text-gray-400 tracking-wider mb-1">
                Created
              </div>
              <div className="text-sm text-white font-medium">
                {formatDateTime(request.createdAt)}
              </div>
            </div>
          </div>

          <div>
            {request.response && (
              <div>
                <div className="text-xs uppercase text-gray-400 tracking-wider mb-2">
                  Response
                </div>
                <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4 font-mono text-sm text-[#22c55e] overflow-auto max-h-[300px]">
                  <pre>{JSON.stringify(request.response, null, 2)}</pre>
                </div>
              </div>
            )}

            {request.error && (
              <div>
                <div className="text-xs uppercase text-gray-400 tracking-wider mb-2">
                  Error
                </div>
                <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4 font-mono text-sm text-red-400 overflow-auto max-h-[300px]">
                  <pre>{request.error}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
