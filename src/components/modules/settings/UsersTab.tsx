"use client"

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useUsers, useDeactivateUser } from '@/hooks/useSettings'
import { formatDateTime } from '@/lib/formatters'
import { AddUserModal } from './AddUserModal'
import { EditUserModal } from './EditUserModal'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
  updatedAt?: string
}

export function UsersTab() {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)

  const { data, isLoading, refetch } = useUsers({ search, role, status, page })
  const { mutate: deactivateUser, isPending: isDeactivating } = useDeactivateUser()

  const users = data?.data || []
  const pagination = data?.pagination

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search, role, status])

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-[#1e3a5f] text-[#60a5fa] border-[#1d4ed8]'
      case 'viewer':
        return 'bg-[#1f2937] text-[#9ca3af] border-[#374151]'
      case 'supplier':
        return 'bg-[#1a2e1a] text-[#22c55e] border-[#166534]'
      default:
        return 'bg-gray-600 text-gray-300 border-gray-500'
    }
  }

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#052e16] text-[#22c55e] border-[#166534]'
      case 'Inactive':
        return 'bg-[#1f2937] text-[#6b7280] border-[#374151]'
      default:
        return 'bg-gray-600 text-gray-300 border-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-base">Users</h2>
          <p className="text-gray-400 text-sm">View accounts and manage role assignments.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          {/* User Search */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              User Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#161b22] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              title="Filter by role"
              className="w-full px-3 py-2 bg-[#161b22] border border-[#374151] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              title="Filter by status"
              className="w-full px-3 py-2 bg-[#161b22] border border-[#374151] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#0d1117] rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-600 rounded mb-1"></div>
                <div className="h-3 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1117] border-b border-[#21262d]">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-medium">User</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Roles</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Updated</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id} className="border-b border-[#21262d] hover:bg-[#0d1117] transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs border ${getRoleBadgeStyles(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${getStatusBadgeStyles(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {user.updatedAt ? formatDateTime(user.updatedAt) : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditUser(user)}
                          className="px-3 py-1 bg-transparent border border-[#374151] text-white rounded-lg hover:bg-[#161b22] transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deactivateUser(user.id)}
                          disabled={user.status === 'Inactive' || isDeactivating}
                          className="px-3 py-1 bg-transparent border border-[#374151] text-white rounded-lg hover:bg-[#161b22] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeactivating ? '...' : 'Deactivate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-gray-400 text-sm">
            Showing {pagination.start} to {pagination.end} of {pagination.total} users
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 py-1 bg-[#161b22] border border-[#374151] text-white rounded-lg hover:bg-[#0d1117] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-1 bg-[#161b22] border border-[#374151] text-white rounded-lg hover:bg-[#0d1117] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false)
          refetch()
        }}
      />
      <EditUserModal
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        user={editUser}
        onSuccess={() => {
          setEditUser(null)
          refetch()
        }}
      />
    </div>
  )
}
