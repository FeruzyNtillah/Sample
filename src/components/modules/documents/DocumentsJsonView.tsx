import React from 'react'

interface DocumentsJsonViewProps {
  data: Record<string, unknown>[]
  isLoading: boolean
}

export function DocumentsJsonView({ data, isLoading }: DocumentsJsonViewProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 min-h-[400px] overflow-auto">
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data to display</p>
        </div>
      ) : (
        <pre className="font-mono text-sm text-[#00b894] whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
