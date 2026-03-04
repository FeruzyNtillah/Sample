import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import styles from './DispositionsByProductChart.module.css'

interface DispositionsByProductChartProps {
  data: { 
    productType: string
    sold: number
    recycled: number
    other: number 
  }[]
  isLoading: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // map the data key/name to a CSS class defined in the module
    const colorClassMap: Record<string, string> = {
      sold: styles.sold,
      recycled: styles.recycled,
      other: styles.other
    }

    return (
      <div className="bg-[#1c2128] border border-[#21262d] rounded-lg p-3">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className={`text-sm ${styles.tooltipText} ${colorClassMap[entry.name] || ''}`}
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DispositionsByProductChart({ data, isLoading }: DispositionsByProductChartProps) {
  if (isLoading) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-64"></div>
        </div>
        <div className="h-72 bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  // Transform data for grouped bar chart
  const chartData = data.map(item => ({
    name: item.productType,
    sold: item.sold,
    recycled: item.recycled,
    other: item.other
  }))

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2v20M2 12h20"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Dispositions by Product Type</h3>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-gray-300">
                  {value === 'sold' ? 'Sold' : value === 'recycled' ? 'Recycled' : 'Other'}
                </span>
              )}
            />
            <Bar dataKey="sold" fill="#1e4d6b" />
            <Bar dataKey="recycled" fill="#5eead4" />
            <Bar dataKey="other" fill="#64748b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
