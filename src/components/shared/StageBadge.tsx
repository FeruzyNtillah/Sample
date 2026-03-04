import React from 'react';
import styles from './StageBadge.module.css';

interface StageBadgeProps {
  stage: string;
}

export function StageBadge({ stage }: StageBadgeProps) {
  const stageClass = stage.replace('_', '').toLowerCase();
  
  return (
    <div className={`${styles.stageBadge} ${styles[stageClass]}`}>
      <span>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
    </div>
  );
}
