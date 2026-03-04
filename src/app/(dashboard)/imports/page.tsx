"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FolderDown } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ImportsFilter } from '@/components/modules/imports/ImportsFilter'
import { ImportsTable } from '@/components/modules/imports/ImportsTable'
import { useImports } from '@/hooks/useImports'

export default function ImportsPage() {
  const router = useRouter()
  const [reportType, setReportType] = useState("")
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const { data: imports, isLoading } = useImports({ 
    reportType, 
    status, 
    search, 
    page, 
    pageSize 
  })

  return (
    <div className="p-6">
      <PageHeader
        icon={<FolderDown />}
        title="Imports"
        subtitle="Browse Excel import sessions, validation results, and submission status"
      />

      <ImportsFilter
        reportType={reportType}
        status={status}
        search={search}
        onReportTypeChange={(v) => {
          setReportType(v)
          setPage(1)
        }}
        onStatusChange={(v) => {
          setStatus(v)
          setPage(1)
        }}
        onSearchChange={(v) => {
          setSearch(v)
          setPage(1)
        }}
      />

      <ImportsTable
        data={imports?.items ?? []}
        isLoading={isLoading}
        pagination={{
          total: imports?.total ?? 0,
          page,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size)
            setPage(1)
          }
        }}
        onRowClick={(item) => 
          router.push(
            `/reports/${item.reportType}/import/${item.id}` 
          )
        }
      />
    </div>
  )
}
