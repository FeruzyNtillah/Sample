import { useState } from 'react'
import { FileText } from 'lucide-react'
import { DocumentsPageLayout } from '@/components/modules/documents/DocumentsPageLayout'
import { DocumentsTableView } from '@/components/modules/documents/DocumentsTableView'
import { DocumentsJsonView } from '@/components/modules/documents/DocumentsJsonView'
import { invoiceDocumentsColumns } from '@/components/modules/documents/invoiceDocumentsColumns'

// Mock data
const mockDocuments = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    supplierName: 'Supplier A',
    amount: 1500.00,
    status: 'pending',
    createdAt: '2024-01-15',
    submittedAt: null
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    supplierName: 'Supplier B',
    amount: 2300.50,
    status: 'submitted',
    createdAt: '2024-01-14',
    submittedAt: '2024-01-16'
  }
]

export default function InvoiceDocumentsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [isExporting, setIsExporting] = useState(false)
  
  const tabCounts = {
    pending: mockDocuments.filter(d => d.status === 'pending').length,
    submitted: mockDocuments.filter(d => d.status === 'submitted').length,
    failed: 0
  }
  
  const filteredDocuments = mockDocuments.filter(doc => doc.status === activeTab)

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
      onExport={() => {
        setIsExporting(true)
        setTimeout(() => {
          setIsExporting(false)
        }, 2000)
      }}
      isExporting={isExporting}
    >
      {viewMode === "table" ? (
        <DocumentsTableView
          data={filteredDocuments}
          columns={invoiceDocumentsColumns}
          isLoading={false}
          emptyTitle={getEmptyTitle("invoice", activeTab)}
          emptySubtitle=""
        />
      ) : (
        <DocumentsJsonView
          data={filteredDocuments}
          isLoading={false}
        />
      )}
    </DocumentsPageLayout>
  )
}
