import React from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'

export const invoiceDocumentsColumns = [
  {
    key: 'invoiceNumber',
    label: 'Invoice Number',
    render: (value: unknown, row: Record<string, unknown>) => (
      <span className="font-medium">{value as string}</span>
    )
  },
  {
    key: 'supplierBillingEntity',
    label: 'Billing Entity'
  },
  {
    key: 'billingCountry',
    label: 'Country'
  },
  {
    key: 'totalUnitFees',
    label: 'Total Fees'
  },
  {
    key: 'totalMsRevenueShare',
    label: 'MS Revenue'
  },
  {
    key: 'unitCount',
    label: 'Total Units'
  },
  {
    key: 'jobCount',
    label: 'Job Count'
  },
  {
    key: 'status',
    label: 'Status',
    render: (value: unknown, row: Record<string, unknown>) => (
      <StatusBadge status={value as string} />
    )
  }
]
