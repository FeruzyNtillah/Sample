import api from '@/lib/axios'

// GET /reports/types
// Returns list of available report types
export const getReportTypesApi = async () => {
  const response = await api.get('/reports/types')
  return response.data
}

// GET /reports/types/:type/template
// Downloads the Excel template file for a report type
export const downloadTemplateApi = async (type: string) => {
  const response = await api.get(
    `/reports/types/${type}/template`,
    { responseType: 'blob' }
  )
  return response.data
}

// POST /reports/types/:type/import
// Uploads filled Excel file, returns ImportSession with 
// validation results
export const importReportApi = async (
  type: string, 
  file: File
) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post(
    `/reports/types/${type}/import`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

// GET /reports/imports/:id/preview
// Returns table preview data + JSON payload
export const getImportPreviewApi = async (id: string) => {
  const response = await api.get(
    `/reports/imports/${id}/preview` 
  )
  return response.data
}

// POST /reports/imports/:id/submit
// Submits the import to Microsoft API
export const submitImportApi = async (id: string) => {
  const response = await api.post(
    `/reports/imports/${id}/submit` 
  )
  return response.data
}
