import React, { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { REPORT_TYPES } from '@/lib/constants'
import { formatReportType } from '@/lib/formatters'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'

interface ImportsFilterProps {
  reportType: string
  status: string
  search: string
  onReportTypeChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function ImportsFilter({ 
  reportType, 
  status, 
  search, 
  onReportTypeChange, 
  onStatusChange, 
  onSearchChange 
}: ImportsFilterProps) {
  const [localSearch, setLocalSearch] = useState(search)
  const debouncedSearchChange = useDebouncedCallback((value: string) => onSearchChange(value), 300)

  // Update local search when prop changes
  React.useEffect(() => {
    setLocalSearch(search)
  }, [search])

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Report Type
        </label>
        <div className="relative">
          <select
            value={reportType}
            onChange={(e) => onReportTypeChange(e.target.value)}
            aria-label="Filter by report type"
            className="min-w-[240px] px-[14px] py-[10px] bg-[#161b22] border border-[#21262d] text-white rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb]"
          >
            <option value="">All Report Types</option>
            {REPORT_TYPES.map((type) => (
              <option key={type} value={type}>
                {formatReportType(type)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
            className="min-w-[240px] px-[14px] py-[10px] bg-[#161b22] border border-[#21262d] text-white rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb]"
          >
            <option value="">All Statuses</option>
            <option value="submit success">submit success</option>
            <option value="job created">job created</option>
            <option value="validation failed">validation failed</option>
            <option value="pending">pending</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="File name, job id, or import id"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value)
              debouncedSearchChange(e.target.value)
            }}
            className="min-w-[300px] pl-10 pr-[14px] py-[10px] bg-[#161b22] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb] placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  )
}
