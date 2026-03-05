"use client"

import React from 'react'
import { useSLASettings } from '@/hooks/useSettings'

interface SLASetting {
  id: string
  stageName: string
  slaDays: number
  warningThresholdDays: number
  status: string
  description?: string
}

export function SLATab() {
  const { data: slaSettings, isLoading } = useSLASettings()

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
        <h2 className="text-white font-semibold text-base mb-2">SLA Settings</h2>
        <p className="text-gray-400 text-sm">Service Level Agreement configurations and deadlines.</p>
      </div>

      {/* SLA Settings */}
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
        ) : !slaSettings || slaSettings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No SLA settings configured</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1117] border-b border-[#21262d]">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-medium">Stage Name</th>
                  <th className="px-4 py-3 text-left text-white font-medium">SLA Days</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Warning Threshold</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {slaSettings.map((setting: SLASetting) => (
                  <tr key={setting.id} className="border-b border-[#21262d] hover:bg-[#0d1117] transition-colors">
                    <td className="px-4 py-3 text-white font-medium">
                      {setting.stageName}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {setting.slaDays} days
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {setting.warningThresholdDays} days
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${getStatusBadge(setting.status)}`}>
                        {setting.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {setting.description || '-'}
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
        <h3 className="text-white font-medium mb-2">SLA Information</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p><span className="font-medium">SLA Days:</span> Number of days allowed for each processing stage.</p>
          <p><span className="font-medium">Warning Threshold:</span> Days before SLA breach when warning is triggered.</p>
          <p><span className="font-medium">Status:</span> Whether the SLA configuration is currently active.</p>
        </div>
      </div>
    </div>
  )
}
