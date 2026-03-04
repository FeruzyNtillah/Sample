import React from 'react'
import styles from './KPICard.module.css'

interface KPICardProps {
  label: string
  value: number | string
  valueColor?: string
}

export function KPICard({ label, value, valueColor }: KPICardProps) {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={`${styles.value} ${valueColor === '#ef4444' ? styles.red : ''}`}>
        {value}
      </div>
    </div>
  )
}
