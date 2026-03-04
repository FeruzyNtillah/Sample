"use client"

import { useState, useEffect } from 'react'
import { Monitor } from 'lucide-react'
import { DocumentsPageLayout } from '@/components/modules/documents/DocumentsPageLayout'
import { DocumentsTableView } from '@/components/modules/documents/DocumentsTableView'
import { DocumentsJsonView } from '@/components/modules/documents/DocumentsJsonView'
import { poDocumentsColumns } from '@/components/modules/documents/poDocumentsColumns'
import { usePODocuments, useExportDocuments } from '@/hooks/useDocuments'

export default function PODocumentsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    submitted: 0,
    failed: 0
  })

  const { data: documents, isLoading } = usePODocuments(activeTab)
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
      icon={<Monitor />}
      title="PO Documents"
      subtitle="Aggregated purchase order calculations and document submissions"
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
        type: "po", 
        status: activeTab 
      })}
      isExporting={isExporting}
    >
      {viewMode === "table" ? (
        <DocumentsTableView
          data={documents?.data ?? []}
          columns={poDocumentsColumns}
          isLoading={isLoading}
          emptyTitle={getEmptyTitle("po", activeTab)}
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
