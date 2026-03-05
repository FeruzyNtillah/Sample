"use client"

import React from 'react'
import { useRoles } from '@/hooks/useSettings'

interface Role {
  id: string
  name: string
  description?: string
  permissions?: string[]
}

export function RolesTab() {
  const { data: roles, isLoading } = useRoles()

  const getPermissionBadge = (permission: string) => {
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs bg-[#1e3a5f] text-[#60a5fa] border border-[#1d4ed8] rounded">
        {permission}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white font-semibold text-base mb-2">Roles</h2>
        <p className="text-gray-400 text-sm">Manage user roles and permissions.</p>
      </div>

      {/* Roles Table */}
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
        ) : !roles || roles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No roles configured</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1117] border-b border-[#21262d]">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-medium">Role Name</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Description</th>
                  <th className="px-4 py-3 text-left text-white font-medium">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role: Role) => (
                  <tr key={role.id} className="border-b border-[#21262d] hover:bg-[#0d1117] transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-3 py-1 text-sm bg-[#1e3a5f] text-[#60a5fa] border border-[#1d4ed8] rounded">
                        {role.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {role.description || '-'}
                    </td>
                    <td className="px-4 py-3">
                      {role.permissions && role.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission) => (
                            <span key={permission} className="text-xs">
                              {getPermissionBadge(permission)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">No permissions configured</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
