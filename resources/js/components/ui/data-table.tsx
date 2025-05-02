import React from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface ActionLink extends Omit<InertiaLinkProps, 'children'> {
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => ActionLink[];
  keyField: keyof T;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    routeName: string;
    routeParams?: Record<string, any>;
  };
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  actions,
  keyField,
  emptyMessage = 'No data found.',
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 bg-card border-b border-border">
        <div className="responsive-table-container">
          <div className="responsive-table-wrapper">
            <table className="responsive-table min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={cn(
                        "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                        column.className
                      )}
                    >
                      {column.header}
                    </th>
                  ))}
                  {actions && (
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={String(item[keyField])} className="hover:bg-muted/30 transition-colors">
                      {columns.map((column, index) => (
                        <td
                          key={index}
                          className={cn(
                            "px-4 py-3 text-sm text-card-foreground",
                            column.className
                          )}
                        >
                          {typeof column.accessor === 'function'
                            ? column.accessor(item)
                            : item[column.accessor] as React.ReactNode}
                        </td>
                      ))}
                      {actions && (
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            {actions(item).map((action, index) => {
                              const { label, className, ...linkProps } = action;
                              return (
                                <Link
                                  key={index}
                                  {...linkProps}
                                  className={className || "text-accent hover:text-accent/80 cursor-pointer"}
                                >
                                  {label}
                                </Link>
                              );
                            })}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={actions ? columns.length + 1 : columns.length}
                      className="px-6 py-4 text-center text-muted-foreground"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.lastPage > 1 && (
            <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
              <div className="text-sm text-card-foreground">
                Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.perPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * pagination.perPage, pagination.total)}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span> results
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={route(pagination.routeName, { ...pagination.routeParams, page })}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      page === pagination.currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-card-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
