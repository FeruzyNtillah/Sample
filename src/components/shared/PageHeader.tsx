import React from 'react';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export function PageHeader({ icon, title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[20px] bg-[#161b22] rounded flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      
      {action && <div>{action}</div>}
    </div>
  );
}
