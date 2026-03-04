import React from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface RequestsFilterProps {
  endpoint: string
  status: string
  supplierId: string
  onEndpointChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSupplierIdChange: (value: string) => void
}

export function RequestsFilter({ 
  endpoint, 
  status, 
  supplierId, 
  onEndpointChange, 
  onStatusChange, 
  onSupplierIdChange 
}: RequestsFilterProps) {
  const debouncedSupplierIdChange = useDebounce(onSupplierIdChange, 300)

  const endpoints = [
    'Collection',
    'Disposition (v2)',
    'Invoice Details',
    'Transport',
    'Material Audit'
  ]

  return (
    <div className="flex gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Endpoint
        </label>
        <div className="relative">
          <select
            value={endpoint}
            onChange={(e) => onEndpointChange(e.target.value)}
            aria-label="Filter by endpoint"
            className="min-w-[240px] px-[14px] py-[10px] bg-[#161b22] border border-[#21262d] text-white rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb]"
          >
            <option value="">All Endpoints</option>
            {endpoints.map((ep) => (
              <option key={ep} value={ep}>
                {ep}
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
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Supplier ID
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            defaultValue={supplierId}
            onChange={(e) => debouncedSupplierIdChange(e.target.value)}
            className="min-w-[240px] pl-10 pr-[14px] py-[10px] bg-[#161b22] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#30363d] focus:ring-1 focus:ring-[#1f6feb] placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  )
}
