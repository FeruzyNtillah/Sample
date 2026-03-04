import React from 'react'
import { REPORT_TYPES } from '@/lib/constants'

interface StatusFilterTabsProps {
  activeFilter: string
  counts: { 
    all: number
    pending: number
    success: number
    failed: number 
  }
  onFilterChange: (filter: string) => void
  reportType: string
  onReportTypeChange: (value: string) => void
}

export function StatusFilterTabs({
  activeFilter,
  counts,
  onFilterChange,
  reportType,
  onReportTypeChange
}: StatusFilterTabsProps) {
  const filterButtons = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'success', label: 'Success', count: counts.success },
    { key: 'failed', label: 'Failed', count: counts.failed }
  ]

  return (
    <div className="flex flex-row justify-between items-center mb-4">
      {/* Left side - Filter tab buttons */}
      <div className="flex flex-row gap-2">
        {filterButtons.map((button) => (
          <button
            key={button.key}
            onClick={() => onFilterChange(button.key)}
            className={`
              px-4 py-1.5 text-sm rounded-full transition-all duration-200
              ${activeFilter === button.key
                ? 'bg-[#1e3a2e] border border-[#166534] text-[#22c55e]'
                : 'bg-[#161b22] border border-[#21262d] text-gray-400 hover:text-white'
              }
            `}
          >
            {button.label} {button.count}
          </button>
        ))}
      </div>

      {/* Right side - Report type filter */}
      <select
        value={reportType}
        onChange={(e) => onReportTypeChange(e.target.value)}
        className="
          bg-[#161b22] border border-[#21262d] text-white
          px-3 py-2 rounded-md text-sm
          min-w-[200px] focus:outline-none focus:border-[#30363d]
        "
        aria-label="Filter by report type"
        title="Filter by report type"
      >
        <option value="">All report types</option>
        {REPORT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
