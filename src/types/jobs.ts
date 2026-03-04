export interface Job {
  id: string;
  supplierJobId: string;
  type: string;
  supplier: string;
  stage: string;
  status: string;
  units: number;
  createdAt: string;
  updatedAt: string;
  lifecycle?: LifecycleStage[];
}

export interface LifecycleStage {
  stage: string;
  completed: boolean;
  current: boolean;
}

export interface JobsFilter {
  stage?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateJobRequest {
  file: File;
}
