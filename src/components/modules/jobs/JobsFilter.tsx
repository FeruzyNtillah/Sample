import React from 'react'
import { ChevronDown } from 'lucide-react'
import { JOB_STAGES, JOB_STATUSES } from '@/lib/constants'

interface JobsFilterProps {
  stage: string
  status: string
  onStageChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function JobsFilter({ stage, status, onStageChange, onStatusChange }: JobsFilterProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Stage
        </label>
        <div className="relative">
          <select
            value={stage}
            onChange={(e) => onStageChange(e.target.value)}
            aria-label="Filter by stage"
            className="w-full min-w-[300px] px-3.5 py-2.5 bg-[#161b22] border border-[#21262d] text-white rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb]"
          >
            <option value="">All Stages</option>
            {JOB_STAGES.map((jobStage) => (
              <option key={jobStage} value={jobStage}>
                {jobStage}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
            className="w-full min-w-[300px] px-3.5 py-2.5 bg-[#161b22] border border-[#21262d] text-white rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb]"
          >
            <option value="">All Statuses</option>
            {JOB_STATUSES.map((jobStatus) => (
              <option key={jobStatus} value={jobStatus}>
                {jobStatus}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
