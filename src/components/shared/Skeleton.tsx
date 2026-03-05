import React from 'react'

interface SkeletonTextProps {
  width?: string
  height?: string
  className?: string
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  width = 'w-full', 
  height = 'h-4',
  className = ''
}) => {
  return (
    <div 
      className={`
        bg-[#21262d] 
        rounded-md 
        animate-pulse
        ${width}
        ${height}
        ${className}
      `}
    />
  )
}

interface SkeletonCardProps {
  height?: string
  className?: string
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  height = 'h-24',
  className = ''
}) => {
  return (
    <div 
      className={`
        bg-[#21262d] 
        rounded-md 
        animate-pulse
        w-full
        ${height}
        ${className}
      `}
    />
  )
}

interface SkeletonTableProps {
  rows?: number
  cols?: number
  className?: string
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ 
  rows = 5,
  cols = 4,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex gap-4 mb-4 pb-2 border-b border-[#21262d]">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonText key={`header-${i}`} height="h-3" className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 py-3 border-b border-[#21262d]">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <SkeletonText key={`cell-${rowIndex}-${colIndex}`} height="h-3" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

interface SkeletonChartProps {
  height?: number
  className?: string
}

export const SkeletonChart: React.FC<SkeletonChartProps> = ({ 
  height = 300,
  className = ''
}) => {
  return (
    <div 
      className={`
        bg-[#21262d] 
        rounded-md 
        animate-pulse
        w-full
        h-[${height}px]
        ${className}
      `}
    />
  )
}
