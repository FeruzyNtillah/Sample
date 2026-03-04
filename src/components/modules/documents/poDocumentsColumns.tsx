import React from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'

export const poDocumentsColumns = [
  {
    key: 'poNumber',
    label: 'PO Number',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (value: unknown, _row: Record<string, unknown>) => (
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (value: unknown, _row: Record<string, unknown>) => (
      <StatusBadge status={value as string} />
    )
  }
]
