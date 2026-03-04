import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

interface AgingDistributionChartProps {
  data: {
    category: string // e.g. "On Track", "At Risk"
    count: number
  }[]
  isLoading: boolean
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c2128] border border-[#21262d] rounded-lg p-3">
        <p className="text-white font-medium">{payload[0].payload.category}</p>
        <p className="text-sm text-gray-300">Count: {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export function AgingDistributionChart({ data, isLoading }: AgingDistributionChartProps) {
  if (isLoading) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-64"></div>
        </div>
        <div className="h-48 bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  const getBarColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'on track':
        return '#22c55e'
      case 'at risk':
        return '#f97316'
      case 'overdue':
        return '#ef4444'
      default:
        return '#64748b'
    }
  }

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Aging Distribution</h3>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis 
              type="number"
              domain={[0, 1]}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis 
              type="category"
              dataKey="category"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#8884d8"
              radius={[0, 8, 8, 0]}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getBarColor(payload.category)}
                    rx={8}
                    ry={8}
                  />
                )
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
