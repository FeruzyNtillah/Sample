export interface Job {
  id: string;
  jobNumber: string;
  customerName: string;
  status: 'ACTIVE' | 'CLOSED' | 'CANCELLED';
  stage: 'Collection' | 'Disposition' | 'Invoice' | 'Credit' | 'Transport' | 'Material Audit' | 'Closed';
  createdDate: string;
  lastUpdated: string;
  estimatedValue?: number;
  actualValue?: number;
  location?: string;
  contactInfo?: string;
  notes?: string;
}

export interface CreateJobRequest {
  customerName: string;
  location?: string;
  contactInfo?: string;
  estimatedValue?: number;
  notes?: string;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: Job['status'];
  stage?: Job['stage'];
}
