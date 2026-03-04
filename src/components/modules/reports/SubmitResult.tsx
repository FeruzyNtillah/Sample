import React from 'react'
import { Check, X, ArrowRight } from 'lucide-react'
import { formatDateTime } from '@/lib/formatters'

interface SubmitResultProps {
  result: {
    success: boolean
    requestId?: string
    jobId?: string
    status?: string
    submittedAt?: string
    error?: string
  }
  onViewRequest: () => void
  onViewJobs: () => void
}

export function SubmitResult({ result, onViewRequest, onViewJobs }: SubmitResultProps) {
  return (
    <div className="space-y-6">
      {/* Result Display */}
      <div className="text-center py-8">
        {result.success ? (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Submission Successful!
            </h2>
            <p className="text-gray-400">
              Your report has been submitted to Microsoft
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Submission Failed
            </h2>
            <p className="text-gray-400 mb-4">
              {result.error || 'An error occurred while submitting your report'}
            </p>
          </>
        )}
      </div>

      {/* Result Details Card */}
      {result.success && (
        <div className="bg-[#052e16] border border-[#166534] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Submission Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Request ID</p>
              <p className="text-sm text-white font-medium">
                {result.requestId || '-'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Job ID</p>
              <p className="text-sm text-white font-medium">
                {result.jobId || '-'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Status</p>
              <p className="text-sm text-white font-medium">
                {result.status || '-'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Submitted At</p>
              <p className="text-sm text-white font-medium">
                {result.submittedAt ? formatDateTime(result.submittedAt) : '-'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Details Card */}
      {!result.success && result.error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error Details</h3>
          <p className="text-red-300 text-sm">
            {result.error}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        {result.success && result.requestId && (
          <button
            onClick={onViewRequest}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Request Details
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        
        <button
          onClick={onViewJobs}
          className="flex items-center gap-2 px-4 py-2 bg-teal-300 text-gray-900 font-medium rounded-lg hover:bg-teal-200 transition-colors"
        >
          View Jobs
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
