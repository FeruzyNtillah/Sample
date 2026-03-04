import React, { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowLeft } from 'lucide-react'

interface PreviewColumn {
  key: string
  label: string
  type: string
}

interface PreviewRow {
  [key: string]: string | number | boolean | null
}

interface ImportPreview {
  headers: PreviewColumn[]
  rows: PreviewRow[]
  totalRows: number
  filename: string
  payload: Record<string, unknown>
}

interface PreviewTableProps {
  preview: ImportPreview
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function PreviewTable({ preview, onBack, onSubmit, isSubmitting }: PreviewTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(100)
  const [showJson, setShowJson] = useState(false)

  const totalPages = Math.ceil(preview.totalRows / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, preview.totalRows)
  const paginatedRows = preview.rows.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Info Row */}
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="text-blue-800 font-medium">
            {preview.totalRows} rows to be submitted
          </span>
          <span className="text-blue-600 text-sm">
            File: {preview.filename}
          </span>
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {preview.headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-1">
                      {header.label}
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Data Rows */}
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {preview.headers.map((header) => (
                    <td
                      key={header.key}
                      className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100"
                    >
                      {row[header.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Page Size:
          </span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
              aria-label="Page size"
              title="Page size"
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <span className="text-sm text-gray-700">
            {startIndex + 1} to {endIndex} of {preview.totalRows}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            aria-label="First page"
            title="First page"
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            title="Previous page"
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            title="Next page"
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
            title="Last page"
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* JSON Payload Toggle */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <button
          onClick={() => setShowJson(!showJson)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span className="font-medium">
            {showJson ? 'Hide' : 'View'} JSON Payload
          </span>
        </button>
        
        {showJson && (
          <div className="mt-4">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
              {JSON.stringify(preview.payload, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-teal-300 text-gray-900 font-medium rounded-lg hover:bg-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Report
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
