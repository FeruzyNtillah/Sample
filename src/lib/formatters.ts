import { format } from 'date-fns'

// Formats report type string for display
// "invoice_details" → "Invoice Details"
// "collection" → "Collection"
export const formatReportType = (type: string): string => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + 
         word.slice(1))
    .join(' ')
}

// Formats date string to dd/MM/yyyy
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  try {
    return format(new Date(dateString), 'dd/MM/yyyy')
  } catch {
    return dateString
  }
}

// Formats date string to dd/MM/yyyy, HH:mm:ss
export const formatDateTime = (
  dateString: string
): string => {
  if (!dateString) return '-'
  try {
    return format(
      new Date(dateString), 
      'dd/MM/yyyy, HH:mm:ss'
    )
  } catch {
    return dateString
  }
}

// Truncates long strings like UUIDs
// "dc8b1d2d-f1be-4104-8ecb..." → "dc8b1d2d..."
export const truncateId = (
  id: string, 
  length: number = 8
): string => {
  if (!id) return '-'
  if (id.length <= length) return id
  return id.substring(0, length) + '...'
}

// Formats file size
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) 
    return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
