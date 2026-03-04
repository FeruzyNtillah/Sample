export interface ImportSession {
  id: string;
  reportType: string;
  fileName: string;
  status: string;
  rows: number;
  errors: number;
  jobId?: string;
  submittedAt?: string;
  createdAt: string;
}

export interface ImportValidationResult {
  id: string;
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  rows: number;
}

export interface ValidationError {
  row: number;
  column: string;
  message: string;
  value?: string;
}

export interface ValidationWarning {
  row: number;
  column: string;
  message: string;
}

export interface ImportPreview {
  id: string;
  headers: string[];
  rows: Record<string, unknown>[];
  payload: Record<string, unknown>;
}

export interface ImportsFilter {
  reportType?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}
