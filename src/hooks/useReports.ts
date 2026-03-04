import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getReportTypesApi,
  downloadTemplateApi,
  importReportApi,
  getImportPreviewApi,
  submitImportApi,
} from '@/lib/api'

export const useReportTypes = () => {
  return useQuery({
    queryKey: ['report-types'],
    queryFn: getReportTypesApi,
  })
}

export const useDownloadTemplate = () => {
  return useMutation({
    mutationFn: downloadTemplateApi,
    onSuccess: (blob, type) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}_template.xlsx`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Template downloaded')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to download template')
    },
  })
}

export const useImportReport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ type, file }: { type: string; file: File }) =>
      importReportApi(type, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] })
      toast.success('File uploaded successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload file')
    },
  })
}

export const useImportPreview = (id: string) => {
  return useQuery({
    queryKey: ['import-preview', id],
    queryFn: () => getImportPreviewApi(id),
    enabled: !!id,
  })
}

export const useSubmitImport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitImportApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      toast.success('Report submitted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit report')
    },
  })
}
