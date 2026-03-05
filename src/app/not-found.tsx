import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Page not found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          ← Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
