"use client"

import React, { useState } from 'react'
import { Settings, RotateCw } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { TabsFilter } from '@/components/shared/TabsFilter'
import { UsersTab } from '@/components/modules/settings/UsersTab'
import { RolesTab } from '@/components/modules/settings/RolesTab'
import { SLATab } from '@/components/modules/settings/SLATab'
import { SupplierTab } from '@/components/modules/settings/SupplierTab'
import { useUsers, useRoles } from '@/hooks/useSettings'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")

  // Get counts for tabs (placeholder for now)
  const { data: usersData } = useUsers({ pageSize: 1 })
  const { data: rolesData } = useRoles()
  const usersCount = usersData?.pagination?.total || 0
  const rolesCount = rolesData?.length || 0

  const tabDefinitions = [
    { 
      label: "Users", 
      value: "users",
      count: usersCount 
    },
    { 
      label: "Roles", 
      value: "roles",
      count: rolesCount 
    },
    { label: "SLA", value: "sla" },
    { label: "Supplier", value: "supplier" }
  ]

  const handleRefreshAll = () => {
    // This would typically refetch all queries
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          icon={<Settings />}
          title="Settings"
          subtitle=""
        />
        <button
          onClick={handleRefreshAll}
          className="px-4 py-2 border border-[#374151] text-white rounded-lg hover:bg-[#0d1117] transition-colors flex items-center gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <TabsFilter
        tabs={tabDefinitions}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 min-h-[400px]">
        {activeTab === "users" && <UsersTab />}
        {activeTab === "roles" && <RolesTab />}
        {activeTab === "sla" && <SLATab />}
        {activeTab === "supplier" && <SupplierTab />}
      </div>
    </div>
  )
}
