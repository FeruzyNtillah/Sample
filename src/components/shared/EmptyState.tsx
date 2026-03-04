import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, subtitle, icon = <CheckCircle2 size={40} /> }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-[#21262d] rounded-lg bg-[#0d1117]">
      <div className="text-[#22c55e] mb-3">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      {subtitle && (
        <p className="text-gray-400 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
