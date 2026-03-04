'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Download, CloudUpload, X } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { useCreateJob } from '@/hooks/useJobs'
import { downloadTemplateApi } from '@/lib/api'

export default function AddJobPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const createJobMutation = useCreateJob()

  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadTemplateApi('collection')
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'collection_template.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download template:', error)
    }
  }

  const handleFileSelect = (file: File) => {
    const validTypes = ['.xlsx', '.xls']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!validTypes.includes(fileExtension)) {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      return
    }
    
    setSelectedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    await createJobMutation.mutateAsync(selectedFile)
    router.push('/jobs')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <Link 
        href="/jobs"
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <PageHeader
        icon={<Plus className="w-4 h-4 text-gray-400" />}
        title="Add Job"
        subtitle="Create a new job by uploading a Job Info sheet"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Download Template Card */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Download Template</h3>
          <p className="text-sm text-gray-400 mb-6">
            Download Collection template and fill only Job Info sheet. 
            Leave Items sheet empty.
          </p>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
        </div>

        {/* Upload Job Info Card */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Upload Job Info</h3>
          <p className="text-sm text-gray-400 mb-6">
            Upload a filled Excel file with job details. Only Job Info sheet will be processed.
          </p>
          
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
              isDragging 
                ? 'border-teal-400 bg-[#0a0f14]' 
                : 'border-[#374151] bg-[#0d1117] hover:border-[#4a5568]'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setIsDragging(false)
            }}
            onDrop={handleDrop}
          >
            <CloudUpload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-white font-medium mb-2">
              Drop your file here or click to browse
            </p>
            <p className="text-sm text-gray-400">
              Accepted formats: XLSX, XLS
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Upload Excel file"
            title="Upload Excel file"
          />

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-4 bg-[#161b22] border border-[#21262d] rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#21262d] rounded flex items-center justify-center">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Remove selected file"
                title="Remove selected file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={createJobMutation.isPending}
              className="w-full mt-4 px-4 py-2.5 bg-teal-300 text-gray-900 font-medium rounded-lg hover:bg-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {createJobMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Upload & Create Job
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
