import React from 'react'
import { Check, X, AlertCircle, AlertTriangle, ArrowLeft } from 'lucide-react'

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

interface ValidationResultsProps {
  result: ImportValidationResult
  onBack: () => void
  onContinue: () => void
}

export function ValidationResults({ result, onBack, onContinue }: ValidationResultsProps) {
  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="flex items-center justify-between p-4 bg-[#161b22] border border-[#21262d] rounded-xl">
        <div className="flex items-center gap-3">
          {result.isValid ? (
            <>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-green-400 font-semibold">Validation Passed</p>
                <p className="text-sm text-gray-400">
                  {result.totalRows} rows ready for preview
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-red-400 font-semibold">Validation Failed</p>
                <p className="text-sm text-gray-400">
                  {result.errors.length} errors found
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Errors List */}
      {result.errors && result.errors.length > 0 && (
        <div className="bg-[#1a0a0a] border border-[#991b1b] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Errors</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-red-900/30">
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Row</th>
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Column</th>
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Message</th>
                  <th className="text-left py-2 px-3 text-red-400 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="text-red-300">
                {result.errors.map((error, index) => (
                  <tr key={index} className="border-b border-red-900/20">
                    <td className="py-2 px-3">
                      <span className="inline-block bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                        {error.row}
                      </span>
                    </td>
                    <td className="py-2 px-3">{error.column}</td>
                    <td className="py-2 px-3">{error.message}</td>
                    <td className="py-2 px-3 font-mono text-xs">{error.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Warnings List */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="bg-[#1a0f00] border border-[#92400e] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Warnings</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/30">
                  <th className="text-left py-2 px-3 text-orange-400 font-medium">Row</th>
                  <th className="text-left py-2 px-3 text-orange-400 font-medium">Column</th>
                  <th className="text-left py-2 px-3 text-orange-400 font-medium">Message</th>
                  <th className="text-left py-2 px-3 text-orange-400 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="text-orange-300">
                {result.warnings.map((warning, index) => (
                  <tr key={index} className="border-b border-orange-900/20">
                    <td className="py-2 px-3">
                      <span className="inline-block bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                        {warning.row}
                      </span>
                    </td>
                    <td className="py-2 px-3">{warning.column}</td>
                    <td className="py-2 px-3">{warning.message}</td>
                    <td className="py-2 px-3 font-mono text-xs">{warning.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upload
        </button>
        
        {result.isValid && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-4 py-2 bg-teal-300 text-gray-900 font-medium rounded-lg hover:bg-teal-200 transition-colors"
          >
            Continue to Preview
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>
    </div>
  )
}
