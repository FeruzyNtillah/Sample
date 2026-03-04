import React from 'react'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { TabsFilter } from '@/components/shared/TabsFilter'

interface DocumentsPageLayoutProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  tabs: { label: string; value: string; count?: number }[]
  activeTab: string
  onTabChange: (value: string) => void
  viewMode: "table" | "json"
  onViewModeChange: (mode: "table" | "json") => void
  onExport: () => void
  isExporting: boolean
  children: React.ReactNode
}

export function DocumentsPageLayout({
  icon,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  onExport,
  isExporting,
  children
}: DocumentsPageLayoutProps) {
  return (
    <div className="p-6">
      <PageHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <TabsFilter
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#21262d] text-white rounded-lg hover:bg-[#161b22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Export
          </button>

          <div className="flex rounded-lg overflow-hidden border border-[#21262d]">
            <button
              onClick={() => onViewModeChange('table')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-[#161b22] text-gray-400 hover:text-white'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => onViewModeChange('json')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'json'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-[#161b22] text-gray-400 hover:text-white'
              }`}
            >
              JSON
            </button>
          </div>
        </div>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}
