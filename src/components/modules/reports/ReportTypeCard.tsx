import React from 'react'
import { FileSpreadsheet, ArrowRight } from 'lucide-react'
import { formatReportType } from '@/lib/formatters'

interface ReportTypeCardProps {
  type: string
  description: string
  onClick: () => void
}

const REPORT_DESCRIPTIONS: Record<string, string> = {
  collection: "Submit collection data for IT asset pickup and processing",
  disposition: "Report on asset disposition including recycling and resale",
  invoice_details: "Submit invoice details for processed assets",
  transport: "Report transportation details for asset movement",
  material_audit: "Submit material audit data for asset verification",
}

export function ReportTypeCard({ type, description, onClick }: ReportTypeCardProps) {
  const reportDescription = description || REPORT_DESCRIPTIONS[type] || ''

  return (
    <div
      onClick={onClick}
      className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 cursor-pointer transition-all duration-200 ease-in-out hover:border-[#5eead4] hover:bg-[#1a2030] hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            {formatReportType(type)}
          </h3>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {reportDescription}
      </p>
      
      <div className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
        <span className="text-sm font-medium">Upload Report</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}
