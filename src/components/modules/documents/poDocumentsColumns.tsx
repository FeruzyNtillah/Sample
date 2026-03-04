import React from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'

export const poDocumentsColumns = [
  {
    key: 'poNumber',
    label: 'PO Number',
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
    key: 'totalAmount',
    label: 'Total Amount'
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
