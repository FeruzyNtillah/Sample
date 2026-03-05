"use client"

import React from 'react'
import { useSuppliers } from '@/hooks/useSettings'
import { formatDate } from '@/lib/formatters'

interface Supplier {
  id: string
  supplierId: string
  supplierName: string
  country: string
  status: string
  createdAt?: string
  updatedAt?: string
}

export function SupplierTab() {
  const { data: suppliers, isLoading } = useSuppliers()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#052e16] text-[#22c55e] border-[#166534]'
      case 'Inactive':
        return 'bg-[#1f2937] text-[#6b7280] border-[#374151]'
      default:
        return 'bg-gray-600 text-gray-300 border-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white font-semibold text-base mb-2">Suppliers</h2>
        <p className="text-gray-400 text-sm">Manage supplier accounts and information.</p>
      </div>

      {/* Suppliers Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#0d1117] rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-600 rounded mb-1"></div>
                <div className="h-3 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : !suppliers || suppliers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No suppliers configured</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1117] border-b border-[#21262d]">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-medium">Supplier ID</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Supplier Name</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Country</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier: Supplier) => (
                  <tr key={supplier.id} className="border-b border-[#21262d] hover:bg-[#0d1117] transition-colors">
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">
                      {supplier.supplierId}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {supplier.supplierName}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {supplier.country}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${getStatusBadge(supplier.status)}`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {supplier.createdAt ? formatDate(supplier.createdAt) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4">
        <h3 className="text-white font-medium mb-2">Supplier Information</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p><span className="font-medium">Supplier ID:</span> Unique identifier for each supplier.</p>
          <p><span className="font-medium">Status:</span> Whether the supplier&apos;s account is currently active.</p>
          <p><span className="font-medium">Country:</span> Supplier's registered country.</p>
        </div>
      </div>
    </div>
  )
}
