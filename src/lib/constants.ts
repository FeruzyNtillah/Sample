export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://5a5tknk1ik.execute-api.us-east-2.amazonaws.com';

export const REPORT_TYPES = [
  'collection',
  'disposition', 
  'invoice_details',
  'transport',
  'material_audit'
] as const;

export const JOB_STAGES = [
  'Collection',
  'Disposition',
  'Invoice',
  'Credit',
  'Transport',
  'Material Audit',
  'Closed'
] as const;

export const JOB_STATUSES = [
  'ACTIVE',
  'CLOSED', 
  'CANCELLED'
] as const;

export const LIFECYCLE_STAGES = [
  'Collection',
  'Disposition',
  'Invoice',
  'Credit',
  'Transport',
  'Material Audit',
  'Closed'
] as const;

export const PAGE_SIZE_OPTIONS = [25, 50, 100];

export const AUTH_TOKEN_KEY = 'auth_token';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  JOBS: '/jobs',
  JOB_DETAIL: (id: string) => `/jobs/${id}`,
  ADD_JOB: '/jobs/add',
  IMPORTS: '/imports',
  REQUESTS: '/requests',
  REQUEST_DETAIL: (id: string) => `/requests/${id}`,
  REPORTS: '/reports',
  REPORT_DETAIL: (type: string) => `/reports/${type}`,
  IMPORT_REPORT: (type: string, id: string) => `/reports/${type}/import/${id}`,
  INVOICE_DOCUMENTS: '/invoice-documents',
  PO_DOCUMENTS: '/po-documents',
  PAYMENT_NOTIFICATIONS: '/payment-notifications',
  STATUS: '/status',
  KPI_DASHBOARD: '/dashboards/kpi',
  SLA_DASHBOARD: '/dashboards/sla',
  SETTINGS: '/settings',
  PROFILE: '/profile'
} as const;
