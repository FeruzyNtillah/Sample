import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import styles from './MonthlyDispositionTrendsChart.module.css'

interface MonthlyDispositionTrendsChartProps {
  data: {
    month: string
    sold: number
    recycled: number
  }[]
  isLoading: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const colorClassMap: Record<string, string> = {
      sold: styles.sold,
      recycled: styles.recycled
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

export function MonthlyDispositionTrendsChart({ data, isLoading }: MonthlyDispositionTrendsChartProps) {
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

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Monthly Disposition Trends</h3>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis 
              dataKey="month" 
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
                  {value === 'sold' ? 'Sold' : 'Recycled'}
                </span>
              )}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="sold" 
              stroke="#1e4d6b" 
              strokeWidth={2}
              dot={{ fill: '#1e4d6b', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="recycled" 
              stroke="#5eead4" 
              strokeWidth={2}
              dot={{ fill: '#5eead4', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
