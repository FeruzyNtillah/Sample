import React from 'react'
import { BarChart2 } from 'lucide-react'
import { KPICard } from './KPICard'
import { useDashboardStats } from '@/hooks/useDashboard'
import styles from './DashboardCard.module.css'

export function APIRequestsCard() {
  const { data: stats, isLoading, error } = useDashboardStats()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading stats</div>
  if (!stats) return <div>No data available</div>

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <BarChart2 className="w-5 h-5 text-gray-400" />
        <h2 className={styles.title}>API Requests</h2>
      </div>
      <div className={styles.divider} />
      <div className="grid grid-cols-4 gap-4">
        <KPICard 
          label="TOTAL REQUESTS" 
          value={stats.totalRequests} 
        />
        <KPICard 
          label="SUCCESSFUL" 
          value={stats.successful} 
        />
        <KPICard 
          label="FAILED" 
          value={stats.failed} 
          valueColor="#ef4444"
        />
        <KPICard 
          label="PENDING RETRY" 
          value={stats.pendingRetry} 
        />
      </div>
    </div>
  )
}
