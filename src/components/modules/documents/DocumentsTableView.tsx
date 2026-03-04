import React from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'

interface Column {
  key: string
  label: string
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

interface DocumentsTableViewProps {
  data: Record<string, unknown>[]
  columns: Column[]
  isLoading: boolean
  emptyTitle: string
  emptySubtitle?: string
}

export function DocumentsTableView({ 
  data, 
  columns, 
  isLoading, 
  emptyTitle, 
  emptySubtitle 
}: DocumentsTableViewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#e5e7eb]">
        <div className="divide-y divide-[#f3f4f6]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4">
              <div className="animate-pulse">
                <div className="grid grid-cols-8 gap-4">
                  {columns.map((_, colIndex) => (
                    <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon="✓"
        title={emptyTitle}
        subtitle={emptySubtitle}
      />
    )
  }

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs uppercase font-medium text-[#374151]"
              >
                <div className="flex items-center justify-between">
                  {column.label}
                  <ChevronsUpDown className="w-3 h-3 text-gray-400 ml-1" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3 text-sm text-[#111827]"
                >
                  {column.render 
                    ? column.render(row[column.key], row)
                    : String(row[column.key] || '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="px-4 py-3 bg-white border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#374151]">Page Size:</span>
          <select className="text-sm border border-[#e5e7eb] rounded px-2 py-1 text-[#374151]" aria-label="Page size">
            <option>100</option>
            <option>50</option>
            <option>25</option>
          </select>
        </div>
        
        <div className="text-sm text-[#374151]">
          1 to {data.length} of {data.length}
        </div>
        
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 text-sm border border-[#e5e7eb] rounded text-[#374151] hover:bg-gray-50">
            |&lt;
          </button>
          <button className="px-2 py-1 text-sm border border-[#e5e7eb] rounded text-[#374151] hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-2 py-1 text-sm border border-[#e5e7eb] rounded text-[#374151] hover:bg-gray-50">
            Page 1 of 1
          </button>
          <button className="px-2 py-1 text-sm border border-[#e5e7eb] rounded text-[#374151] hover:bg-gray-50">
            &gt;
          </button>
          <button className="px-2 py-1 text-sm border border-[#e5e7eb] rounded text-[#374151] hover:bg-gray-50">
            &gt;|
          </button>
        </div>
      </div>
    </div>
  )
}
