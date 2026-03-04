import React from 'react'
import { useRouter } from 'next/navigation'
import { Zap, BarChart2, Timer, Plus } from 'lucide-react'
import styles from './DashboardCard.module.css'

export function QuickActionsCard() {
  const router = useRouter()

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <Zap className="w-5 h-5 text-gray-400" />
        <h2 className={styles.title}>Quick Actions</h2>
      </div>
      <div className={styles.divider} />
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/jobs/add')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-300 text-gray-900 font-medium hover:bg-teal-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Start a Job
        </button>
        <button
          onClick={() => router.push('/dashboards/kpi')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
        >
          <BarChart2 className="w-4 h-4" />
          Executive KPIs
        </button>
        <button
          onClick={() => router.push('/dashboards/sla')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
        >
          <Timer className="w-4 h-4" />
          Reporting SLA
        </button>
      </div>
    </div>
  )
}
