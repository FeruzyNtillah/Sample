"use client"

import { useState, useEffect } from 'react'
import { CircleDollarSign } from 'lucide-react'
import { DocumentsPageLayout } from '@/components/modules/documents/DocumentsPageLayout'
import { DocumentsTableView } from '@/components/modules/documents/DocumentsTableView'
import { DocumentsJsonView } from '@/components/modules/documents/DocumentsJsonView'
import { paymentNotificationsColumns } from '@/components/modules/documents/paymentNotificationsColumns'
import { usePaymentNotifications, useExportDocuments } from '@/hooks/useDocuments'

export default function PaymentNotificationsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    submitted: 0,
    failed: 0
  })

  const { data: documents, isLoading } = usePaymentNotifications(activeTab)
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

  const getEmptyTitle = (status: string) => {
    switch (status) {
      case 'pending':
        return "All payment notifications submitted"
      case 'submitted':
        return "No submitted payment notifications yet"
      case 'failed':
        return "No failed submissions"
      default:
        return "No payment notifications found"
    }
  }

  const getEmptySubtitle = (status: string) => {
    switch (status) {
      case 'pending':
        return "No pending payment notifications."
      case 'submitted':
        return "No submitted payment notifications yet."
      case 'failed':
        return "All payment notification submissions have succeeded."
      default:
        return ""
    }
  }

  return (
    <DocumentsPageLayout
      icon={<CircleDollarSign />}
      title="Payment Notifications"
      subtitle="Payment notification submissions to Microsoft"
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
        type: "payment", 
        status: activeTab 
      })}
      isExporting={isExporting}
    >
      {viewMode === "table" ? (
        <DocumentsTableView
          data={documents?.data ?? []}
          columns={paymentNotificationsColumns}
          isLoading={isLoading}
          emptyTitle={getEmptyTitle(activeTab)}
          emptySubtitle={getEmptySubtitle(activeTab)}
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
