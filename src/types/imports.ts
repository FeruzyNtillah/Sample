export interface Import {
  id: string;
  importId: string;
  type: 'collection' | 'disposition' | 'invoice_details' | 'transport' | 'material_audit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileName: string;
  uploadedAt: string;
  processedAt?: string;
  totalRecords: number;
  processedRecords?: number;
  failedRecords?: number;
  errors?: string[];
  uploadedBy: string;
}

export interface ImportRequest {
  type: Import['type'];
  file: File;
}

export interface ImportResponse {
  import: Import;
  message: string;
}
