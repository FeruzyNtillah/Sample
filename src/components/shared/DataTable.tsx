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
          {data.map((item, index) => (
            <tr key={index} className="border-b border-[#21262d] hover:bg-[#1c2128]">
              {columns.map((column) => (
                <td key={String(column.key)} className="py-3 px-4 text-sm">
                  {column.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#21262d]">
          <div className="text-sm text-gray-400">
            Showing {startItem} to {endItem} of {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <select
              value={pagination.pageSize}
              onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
              className="bg-[#161b22] border border-[#21262d] text-white px-2 py-1 rounded text-sm"
              aria-label="Select page size"
              title="Select page size"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <div className="flex items-center gap-1">
              <button
                onClick={() => pagination.onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-1 rounded hover:bg-[#1c2128] disabled:opacity-50"
                aria-label="Previous page"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400 px-2">
                Page {pagination.page}
              </span>
              <button
                onClick={() => pagination.onPageChange(pagination.page + 1)}
                disabled={endItem >= pagination.total}
                className="p-1 rounded hover:bg-[#1c2128] disabled:opacity-50"
                aria-label="Next page"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
