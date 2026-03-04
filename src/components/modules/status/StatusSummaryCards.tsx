import React from 'react'

interface StatusSummaryCardsProps {
  summary: {
    total: number
    pending: number
    success: number
    failed: number
  }
  isLoading: boolean
}

export function StatusSummaryCards({ summary, isLoading }: StatusSummaryCardsProps) {
  const cards = [
    {
      label: "All Submissions",
      value: summary.total,
      valueColor: "text-white"
    },
    {
      label: "Pending",
      value: summary.pending,
      valueColor: "text-[#f97316]"
    },
    {
      label: "Success",
      value: summary.success,
      valueColor: "text-[#22c55e]"
    },
    {
      label: "Failed",
      value: summary.failed,
      valueColor: "text-[#ef4444]"
    }
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-[#161b22] border border-[#21262d] rounded-xl p-7">
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-[#161b22] border border-[#21262d] rounded-xl p-7">
          <div className="text-sm text-white mb-2">{card.label}</div>
          <div className={`text-5xl font-bold ${card.valueColor}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
