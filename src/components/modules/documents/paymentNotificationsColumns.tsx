import React from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { truncateId, formatDate } from '@/lib/formatters'

export const paymentNotificationsColumns = [
  {
    key: 'notificationId',
    label: 'Notification ID',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (value: unknown, _row: Record<string, unknown>) => (
      <span className="font-mono text-sm">
        {truncateId(value as string)}
      </span>
    )
  },
  {
    key: 'supplierId',
    label: 'Supplier ID'
  },
  {
    key: 'invoiceNumber',
    label: 'Invoice Number'
  },
  {
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'currency',
    label: 'Currency'
  },
  {
    key: 'status',
    label: 'Status',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (value: unknown, _row: Record<string, unknown>) => (
      <StatusBadge status={value as string} />
    )
  },
  {
    key: 'createdAt',
    label: 'Created',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (value: unknown, _row: Record<string, unknown>) => formatDate(value as string)
  }
]
