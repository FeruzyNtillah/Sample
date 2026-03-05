import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export const PageLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117]">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-400 text-sm">Loading...</p>
    </div>
  )
}
