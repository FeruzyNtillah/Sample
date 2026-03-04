import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getInvoiceDocumentsApi,
  getPODocumentsApi,
  getPaymentNotificationsApi,
  exportInvoiceDocumentsApi,
  exportPODocumentsApi,
  exportPaymentNotificationsApi
} from '@/lib/api'

export const useInvoiceDocuments = (status?: string) => {
  return useQuery({
    queryKey: ['invoice-documents', status],
    queryFn: () => getInvoiceDocumentsApi({ status }),
  })
}

export const usePODocuments = (status?: string) => {
  return useQuery({
    queryKey: ['po-documents', status],
    queryFn: () => getPODocumentsApi({ status }),
  })
}

export const usePaymentNotifications = (status?: string) => {
  return useQuery({
    queryKey: ['payment-notifications', status],
    queryFn: () => getPaymentNotificationsApi({ status }),
  })
}

export const useExportDocuments = () => {
  return useMutation({
    mutationFn: async ({ type, status }: { type: string; status: string }) => {
      let blob: Blob
      
      switch (type) {
        case 'invoice':
          blob = await exportInvoiceDocumentsApi(status)
          break
        case 'po':
          blob = await exportPODocumentsApi(status)
          break
        case 'payment':
          blob = await exportPaymentNotificationsApi(status)
          break
        default:
          throw new Error('Invalid document type')
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${type}_${status}_export.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
    onSuccess: () => {
      toast.success('Export downloaded')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Export failed')
    },
  })
}
