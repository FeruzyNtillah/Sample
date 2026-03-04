import React from 'react';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusClass = status.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  const sizeClass = size === 'sm' ? styles.sm : styles.md;
  
  return (
    <div className={`${styles.statusBadge} ${sizeClass} ${styles[statusClass] || styles.default}`}>
      <div className={styles.statusDot} />
      <span>{status}</span>
    </div>
  );
}
