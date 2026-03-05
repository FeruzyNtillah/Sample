'use client';

import { LayoutDashboard } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { APIRequestsCard } from '@/components/modules/dashboard/APIRequestsCard';
import { ITADPipelineCard } from '@/components/modules/dashboard/ITADPipelineCard';
import { QuickActionsCard } from '@/components/modules/dashboard/QuickActionsCard';
import { JobsByStageChart } from '@/components/modules/dashboard/JobsByStageChart';
import { SubmissionsByTypeChart } from '@/components/modules/dashboard/SubmissionsByTypeChart';
import { MonthlyFailureTrendChart } from '@/components/modules/dashboard/MonthlyFailureTrendChart';
import { RecentJobsTable } from '@/components/modules/dashboard/RecentJobsTable';
import { RecentImportsTable } from '@/components/modules/dashboard/RecentImportsTable';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<LayoutDashboard className="w-4 h-4 text-gray-400" />}
        title="Dashboard"
        subtitle="API request monitoring and ITAD pipeline overview"
      />
      
      <APIRequestsCard />
      <ITADPipelineCard />
      <QuickActionsCard />
      <JobsByStageChart />
      <SubmissionsByTypeChart />
      <MonthlyFailureTrendChart />
      <RecentJobsTable />
      <RecentImportsTable />
    </div>
  );
}
