import React from 'react';
import { JOB_STAGES } from '@/lib/constants';
import styles from './LifecycleBar.module.css';

interface LifecycleBarProps {
  currentStage: string;
  allStages?: string[];
}

export function LifecycleBar({ currentStage, allStages = [...JOB_STAGES] }: LifecycleBarProps) {
  const currentIndex = allStages.indexOf(currentStage);
  
  return (
    <div className={styles.lifecycleBar}>
      {allStages.map((stage, index) => {
        let stageClass = styles.future;
        
        if (index < currentIndex) {
          stageClass = styles.completed;
        } else if (index === currentIndex) {
          stageClass = styles.current;
        }
        
        return (
          <div
            key={stage}
            className={`${styles.stageIndicator} ${stageClass}`}
          />
        );
      })}
    </div>
  );
}
