import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'border-t-cyan-400',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-10 h-10 border-4'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        border-gray-600 
        ${color}
        rounded-full 
        animate-spin
        ${className}
      `}
    />
  )
}
