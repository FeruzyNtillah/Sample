"use client"

import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
import { DocumentsPageLayout } from '@/components/modules/documents/DocumentsPageLayout'
import { DocumentsTableView } from '@/components/modules/documents/DocumentsTableView'
import { DocumentsJsonView } from '@/components/modules/documents/DocumentsJsonView'
import { invoiceDocumentsColumns } from '@/components/modules/documents/invoiceDocumentsColumns'
import { useInvoiceDocuments, useExportDocuments } from '@/hooks/useDocuments'

export default function InvoiceDocumentsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    submitted: 0,
    failed: 0
  })

  const { data: documents, isLoading } = useInvoiceDocuments(activeTab)
  const { mutate: exportDocuments, isPending: isExporting } = useExportDocuments()

  // Fetch counts for each tab
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // In a real implementation, you'd fetch counts from API
        // For now, we'll use placeholder counts
        setTabCounts({
          pending: 0,
          submitted: 0,
          failed: 0
        })
      } catch (error) {
        console.error('Failed to fetch tab counts:', error)
      }
    }
    fetchCounts()
  }, [])

  const getEmptyTitle = (type: string, status: string) => {
    switch (status) {
      case 'pending':
        return `No pending ${type} documents.`
      case 'submitted':
        return `No submitted ${type} documents yet`
      case 'failed':
        return `No failed ${type} documents`
      default:
        return `No ${type} documents found`
    }
  }

  return (
    <DocumentsPageLayout
      icon={<FileText />}
      title="Invoice Documents"
      subtitle="Aggregated invoice calculations and document uploads"
      tabs={[
        { label: "Pending", value: "pending" },
        { 
          label: "Submitted", 
          value: "submitted",
          count: tabCounts.submitted 
        },
        { label: "Failed", value: "failed" }
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onExport={() => exportDocuments({ 
        type: "invoice", 
        status: activeTab 
      })}
      isExporting={isExporting}
    >
      {viewMode === "table" ? (
        <DocumentsTableView
          data={documents?.data ?? []}
          columns={invoiceDocumentsColumns}
          isLoading={isLoading}
          emptyTitle={getEmptyTitle("invoice", activeTab)}
          emptySubtitle=""
        />
      ) : (
        <DocumentsJsonView
          data={documents?.data ?? []}
          isLoading={isLoading}
        />
      )}
    </DocumentsPageLayout>
  )
}
