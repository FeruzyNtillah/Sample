export interface Request {
  id: string;
  requestId: string;
  type: 'collection' | 'disposition' | 'invoice' | 'transport' | 'material_audit';
  title: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestedBy: string;
  requestedAt: string;
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
  relatedJobId?: string;
  attachments?: string[];
  notes?: string;
}

export interface CreateRequestRequest {
  type: Request['type'];
  title: string;
  description?: string;
  priority: Request['priority'];
  dueDate?: string;
  relatedJobId?: string;
  attachments?: File[];
  notes?: string;
}

export interface UpdateRequestRequest extends Partial<CreateRequestRequest> {
  status?: Request['status'];
  assignedTo?: string;
}
