'use client';

import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, isAdmin, isViewer } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-400">
          {isAdmin && 'Administrator access - Full system control'}
          {isViewer && 'Viewer access - Read-only permissions'}
          {!isAdmin && !isViewer && 'Standard user access'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Jobs</h3>
          <p className="text-3xl font-bold text-[#5eead4]">0</p>
          <p className="text-sm text-gray-400 mt-1">Active recycling jobs</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Imports</h3>
          <p className="text-3xl font-bold text-[#0891b2]">0</p>
          <p className="text-sm text-gray-400 mt-1">Pending imports</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Requests</h3>
          <p className="text-3xl font-bold text-[#f59e0b]">0</p>
          <p className="text-sm text-gray-400 mt-1">API requests</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Reports</h3>
          <p className="text-3xl font-bold text-[#8b5cf6]">0</p>
          <p className="text-sm text-gray-400 mt-1">Generated reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-gray-400 text-sm">No recent activity</div>
          </div>
        </div>
        
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-gray-300 hover:bg-[#21262d] transition-colors">
              Create New Job
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-gray-300 hover:bg-[#21262d] transition-colors">
              Import Data
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-gray-300 hover:bg-[#21262d] transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
