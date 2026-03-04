export interface ApiRequest {
  id: string;
  endpoint: string;
  supplierId: string;
  jobId: string;
  status: string;
  retries: number;
  createdAt: string;
  response?: Record<string, unknown>;
  error?: string;
}

export interface RequestsFilter {
  endpoint?: string;
  status?: string;
  supplierId?: string;
  page?: number;
  pageSize?: number;
}
