"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlignLeft } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { RequestsFilter } from '@/components/modules/requests/RequestsFilter'
import { RequestsTable } from '@/components/modules/requests/RequestsTable'
import { useRequests } from '@/hooks/useRequests'

export default function RequestsPage() {
  const router = useRouter()
  const [endpoint, setEndpoint] = useState("")
  const [status, setStatus] = useState("")
  const [supplierId, setSupplierId] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const { data: requests, isLoading } = useRequests({ 
    endpoint, 
    status, 
    supplierId, 
    page, 
    pageSize 
  })

  return (
    <div className="p-6">
      <PageHeader
        icon={<AlignLeft />}
        title="Requests"
        subtitle="View and filter API requests"
      />

      <RequestsFilter
        endpoint={endpoint}
        status={status}
        supplierId={supplierId}
        onEndpointChange={(v) => {
          setEndpoint(v)
          setPage(1)
        }}
        onStatusChange={(v) => {
          setStatus(v)
          setPage(1)
        }}
        onSupplierIdChange={(v) => {
          setSupplierId(v)
          setPage(1)
        }}
      />

      <RequestsTable
        data={requests?.items ?? []}
        isLoading={isLoading}
        pagination={{
          total: requests?.total ?? 0,
          page,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size)
            setPage(1)
          }
        }}
        onRowClick={(item) => 
          router.push(`/requests/${item.id}`)
        }
      />
    </div>
  )
}
