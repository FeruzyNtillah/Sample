import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart2 } from 'lucide-react'
import { useJobsByStage } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

interface JobsByStageData {
  stage: string
  count: number
}

interface JobsByStageChartProps {
  data?: JobsByStageData[]
  isLoading?: boolean
}

export function JobsByStageChart({ data, isLoading }: JobsByStageChartProps) {
  const { data: hookData, isLoading: hookIsLoading } = useJobsByStage()
  const chartData = data || hookData
  const loading = isLoading !== undefined ? isLoading : hookIsLoading

  if (loading) {
    return (
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          <BarChart2 className="w-5 h-5 text-gray-400" />
          <h2 className={styles.title}>Jobs by Stage</h2>
        </div>
        <div className={styles.divider} />
        <div className="h-[250px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-700 w-full h-full rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <BarChart2 className="w-5 h-5 text-gray-400" />
        <h2 className={styles.title}>Jobs by Stage</h2>
      </div>
      <div className={styles.divider} />
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis 
            dataKey="stage" 
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
          <Bar dataKey="count" fill="#2d7d9a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
