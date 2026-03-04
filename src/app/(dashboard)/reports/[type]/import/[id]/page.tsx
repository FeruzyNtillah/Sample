'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileSpreadsheet, ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { WizardSteps } from '@/components/modules/reports/WizardSteps'
import { ValidationResults } from '@/components/modules/reports/ValidationResults'
import { PreviewTable } from '@/components/modules/reports/PreviewTable'
import { SubmitResult } from '@/components/modules/reports/SubmitResult'
import { useImportPreview, useSubmitImport } from '@/hooks/useReports'
import { formatReportType } from '@/lib/formatters'

interface ValidationError {
  row: number
  column: string
  message: string
  value: string
}

interface ImportValidationResult {
  isValid: boolean
  totalRows: number
  errors: ValidationError[]
  warnings: ValidationError[]
}

interface ImportPreview {
  headers: Array<{ key: string; label: string; type: string }>
  rows: Array<{ [key: string]: string | number | boolean | null }>
  totalRows: number
  filename: string
  payload: Record<string, unknown>
  errors?: ValidationError[]
  warnings?: ValidationError[]
}

export default function ImportReportPage({ params }: { params: { type: string; id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean
    requestId?: string
    jobId?: string
    status?: string
    submittedAt?: string
    error?: string
  } | null>(null)

  const { data: preview } = useImportPreview(params.id)
  const submitImport = useSubmitImport()

  // Extract validation info from preview data
  const validationResult: ImportValidationResult = preview ? {
    isValid: !preview.errors || preview.errors.length === 0,
    totalRows: preview.totalRows || 0,
    errors: preview.errors || [],
    warnings: preview.warnings || []
  } : {
    isValid: false,
    totalRows: 0,
    errors: [],
    warnings: []
  }

  const handleBackToUpload = () => {
    router.push(`/reports/${params.type}`)
  }

  const handleContinueToPreview = () => {
    setCurrentStep(2)
  }

  const handleBackToValidation = () => {
    setCurrentStep(1)
  }

  const handleSubmit = () => {
    submitImport.mutate(params.id, {
      onSuccess: (data) => {
        setSubmissionResult(data)
        setCurrentStep(3)
      }
    })
  }

  const handleViewRequest = () => {
    if (submissionResult?.requestId) {
      router.push(`/requests/${submissionResult.requestId}`)
    }
  }

  const handleViewJobs = () => {
    router.push('/jobs')
  }

  return (
    <div className="space-y-6">
      <Link 
        href={`/reports/${params.type}`}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <PageHeader
        icon={<FileSpreadsheet className="w-4 h-4 text-gray-400" />}
        title={`Import ${formatReportType(params.type)}`}
        subtitle="Validate, preview and submit your report"
      />

      <WizardSteps currentStep={currentStep} />

      {/* Step Content */}
      {currentStep === 1 && (
        <ValidationResults
          result={validationResult}
          onBack={handleBackToUpload}
          onContinue={handleContinueToPreview}
        />
      )}

      {currentStep === 2 && (
        <PreviewTable
          preview={preview as ImportPreview}
          onBack={handleBackToValidation}
          onSubmit={handleSubmit}
          isSubmitting={submitImport.isPending}
        />
      )}

      {currentStep === 3 && (
        <SubmitResult
          result={submissionResult || { success: false }}
          onViewRequest={handleViewRequest}
          onViewJobs={handleViewJobs}
        />
      )}
    </div>
  )
}
