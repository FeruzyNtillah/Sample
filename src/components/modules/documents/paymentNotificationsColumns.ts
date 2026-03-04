import React from 'react'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { truncateId, formatDate } from '@/lib/formatters'

export const paymentNotificationsColumns = [
  {
    key: 'notificationId',
    label: 'Notification ID',
    render: (value: string) => (
      <span className="font-mono text-sm">
        {truncateId(value)}
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
    render: (value: string) => (
      <StatusBadge status={value} />
    )
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (value: string) => formatDate(value)
  }
]
