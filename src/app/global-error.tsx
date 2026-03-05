'use client'

import React from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-red-900 rounded-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          
          <h2 className="text-white text-xl font-semibold mb-2">
            Something went wrong
          </h2>
          
          <p className="text-gray-400 text-sm mb-6">
            {error.message || 'An unexpected error occurred while loading this page.'}
          </p>
          
          <button
            onClick={reset}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
