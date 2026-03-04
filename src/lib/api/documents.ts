import api from '@/lib/axios'

// GET /invoice-documents
// Params: status? (pending/submitted/failed)
export const getInvoiceDocumentsApi = async (params?: {
  status?: string
}) => {
  const response = await api.get(
    '/invoice-documents', 
    { params }
  )
  return response.data
}

// GET /po-documents
// Params: status? (pending/submitted/failed)
export const getPODocumentsApi = async (params?: {
  status?: string
}) => {
  const response = await api.get('/po-documents', { params })
  return response.data
}

// GET /payment-notifications
// Params: status? (pending/submitted/failed)
export const getPaymentNotificationsApi = async (params?: {
  status?: string
}) => {
  const response = await api.get(
    '/payment-notifications', 
    { params }
  )
  return response.data
}

// GET /export endpoint for each document type
export const exportInvoiceDocumentsApi = async (
  status: string
) => {
  const response = await api.get(
    '/invoice-documents/export',
    { params: { status }, responseType: 'blob' }
  )
  return response.data
}

export const exportPODocumentsApi = async (
  status: string
) => {
  const response = await api.get(
    '/po-documents/export',
    { params: { status }, responseType: 'blob' }
  )
  return response.data
}

export const exportPaymentNotificationsApi = async (
  status: string
) => {
  const response = await api.get(
    '/payment-notifications/export',
    { params: { status }, responseType: 'blob' }
  )
  return response.data
}
