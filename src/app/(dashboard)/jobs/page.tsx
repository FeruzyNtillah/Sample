'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase, Plus } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { JobsFilter } from '@/components/modules/jobs/JobsFilter'
import { JobsTable } from '@/components/modules/jobs/JobsTable'
import { useJobs } from '@/hooks/useJobs'

export default function JobsPage() {
  const router = useRouter()
  const [stage, setStage] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const { data: jobs, isLoading } = useJobs({ stage, status, page, pageSize })

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Briefcase className="w-4 h-4 text-gray-400" />}
        title="Jobs"
        subtitle="Track ITAD job lifecycle progress"
        action={
          <button
            onClick={() => router.push('/jobs/add')}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-300 text-gray-900 font-medium rounded-lg hover:bg-teal-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        }
      />

      <JobsFilter
        stage={stage}
        status={status}
        onStageChange={(value) => {
          setStage(value)
          setPage(1)
        }}
        onStatusChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
      />

      <JobsTable
        data={jobs?.items ?? []}
        isLoading={isLoading}
        pagination={{
          total: jobs?.total ?? 0,
          page,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size)
            setPage(1)
          },
        }}
        onRowClick={(job) => router.push(`/jobs/${job.id}`)}
      />
    </div>
  )
}
