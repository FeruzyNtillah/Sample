import React from 'react'

interface GaugeChartProps {
  value: number // 0-100 percentage
  label: string // e.g. "RECYCLED" or "COMPLIANCE RATE"
  size?: number // default 200
  color?: string // default cyan #5eead4
}

export function GaugeChart({ 
  value, 
  label, 
  size = 200, 
  color = "#5eead4" 
}: GaugeChartProps) {
  const radius = 80
  const strokeWidth = 16
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference / 2

  return (
    <div className="relative inline-flex justify-center items-center">
      <svg
        height={size}
        width={size * 1.67}
        viewBox="0 0 200 120"
        className="transform"
      >
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#374151"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Value arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-in-out"
        />
        
        {/* Center text */}
        <text
          x="100"
          y="70"
          textAnchor="middle"
          className="text-3xl font-bold fill-white"
        >
          {value}%
        </text>
        
        {/* Bottom label */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-xs uppercase fill-gray-400"
        >
          {label}
        </text>
      </svg>
    </div>
  )
}
