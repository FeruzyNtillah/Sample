import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from './EmptyState';

export interface ColumnDef<T = unknown> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface DataTableProps<T = unknown> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  pagination?: PaginationProps;
}

export function DataTable<T = unknown>({
  columns,
  data,
  isLoading,
  emptyTitle = 'No data available',
  emptySubtitle = 'There are no items to display',
  pagination
}: DataTableProps<T>) {
  const startItem = pagination ? (pagination.page - 1) * pagination.pageSize + 1 : 1;
  const endItem = pagination ? Math.min(startItem + pagination.pageSize - 1, pagination.total) : data.length;

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="border border-[#21262d] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#161b22] border-b border-[#21262d]">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-3.5 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-[#21262d]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-3.5 py-3.5">
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        subtitle={emptySubtitle}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="border border-[#21262d] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#161b22] border-b border-[#21262d]">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-border hover:bg-muted/50">
              {columns.map((column) => (
                <td key={String(column.key)} className="py-3 px-4 text-sm">
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
}
