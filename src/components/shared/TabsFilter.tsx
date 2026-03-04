import React from 'react'

interface TabsFilterProps {
  tabs: { label: string; value: string; count?: number }[]
  activeTab: string
  onTabChange: (value: string) => void
}

export function TabsFilter({ tabs, activeTab, onTabChange }: TabsFilterProps) {
  return (
    <div className="flex gap-1 bg-[#161b22] rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === tab.value
              ? 'bg-[#1f6feb] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#21262d]'
            }
          `}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 bg-[#21262d] px-2 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
