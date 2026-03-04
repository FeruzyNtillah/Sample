import React from 'react'
import { Briefcase } from 'lucide-react'
import { KPICard } from './KPICard'
import { useDashboardStats } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

export function ITADPipelineCard() {
  const { data: stats, isLoading, error } = useDashboardStats()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading stats</div>
  if (!stats) return <div>No data available</div>

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <Briefcase className="w-5 h-5 text-gray-400" />
        <h2 className={styles.title}>ITAD Pipeline</h2>
      </div>
      <div className={styles.divider} />
      <div className="grid grid-cols-3 gap-4">
        <KPICard 
          label="TOTAL JOBS" 
          value={stats.totalJobs} 
        />
        <KPICard 
          label="TOTAL UNITS" 
          value={stats.totalUnits} 
        />
        <div className="flex-1 rounded-xl border border-[#21262d] bg-[#161b22] p-5">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            IMPORTS
          </div>
          <div className="text-4xl font-bold text-white mb-1">
            {stats.imports}
          </div>
          <div className="text-xs text-gray-400">
            {stats.importsSuccessful} successful
          </div>
        </div>
      </div>
    </div>
  )
}
