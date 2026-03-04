import React from 'react'
import { Package } from 'lucide-react'
import { GaugeChart } from './GaugeChart'

interface DispositionSummaryCardProps {
  data: {
    totalSold: number
    totalRecycled: number
    totalDispositions: number
    recycledPercentage: number
  }
  isLoading: boolean
}

export function DispositionSummaryCard({ data, isLoading }: DispositionSummaryCardProps) {
  if (isLoading) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded animate-pulse w-48"></div>
            </div>
            <div className="border-t border-[#21262d]"></div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-48 h-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Disposition Summary</h3>
          </div>
          <div className="border-t border-[#21262d]"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">TOTAL SOLD</div>
              <div className="text-3xl font-bold text-white">{data.totalSold.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">TOTAL RECYCLED</div>
              <div className="text-3xl font-bold text-white">{data.totalRecycled.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-400 mb-1">TOTAL DISPOSITIONS</div>
              <div className="text-3xl font-bold text-white">{data.totalDispositions.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-center">
          <GaugeChart
            value={data.recycledPercentage}
            label="RECYCLED"
            color="#5eead4"
          />
        </div>
      </div>
    </div>
  )
}
