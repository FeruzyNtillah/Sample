import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useMonthlyFailureTrend } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

interface MonthlyFailureTrendData {
  month: string
  count: number
}

interface MonthlyFailureTrendChartProps {
  data?: MonthlyFailureTrendData[]
  isLoading?: boolean
}

export function MonthlyFailureTrendChart({ data, isLoading }: MonthlyFailureTrendChartProps) {
  const { data: hookData, isLoading: hookIsLoading } = useMonthlyFailureTrend()
  const chartData = data || hookData
  const loading = isLoading !== undefined ? isLoading : hookIsLoading

  if (loading) {
    return (
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Monthly Failure Trend</h2>
        </div>
        <div className={styles.divider} />
        <div className="h-[220px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-700 w-full h-full rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <TrendingUp className="w-5 h-5 text-gray-400" />
        <h2 className={styles.title}>Monthly Failure Trend</h2>
      </div>
      <div className={styles.divider} />
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#21262d' }}
          />
          <YAxis 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#21262d' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #21262d',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#f3f4f6' }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="white" 
            strokeWidth={2}
            dot={{ fill: 'white', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
