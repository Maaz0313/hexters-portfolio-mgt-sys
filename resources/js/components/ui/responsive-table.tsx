import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("responsive-table-container", className)} {...props}>
      <div className="responsive-table-wrapper">
        <table className="responsive-table min-w-full divide-y divide-border">
          {children}
        </table>
      </div>
    </div>
  );
}

export function ResponsiveTableHead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("bg-muted", className)} {...props}>
      {children}
    </thead>
  );
}

export function ResponsiveTableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("bg-card divide-y divide-border", className)} {...props}>
      {children}
    </tbody>
  );
}

export function ResponsiveTableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-muted/30 transition-colors", className)} {...props}>
      {children}
    </tr>
  );
}

export function ResponsiveTableHeader({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th 
      scope="col" 
      className={cn("px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", className)} 
      {...props}
    >
      {children}
    </th>
  );
}

export function ResponsiveTableCell({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3 text-sm text-card-foreground", className)} {...props}>
      {children}
    </td>
  );
}

export function ResponsiveTablePagination({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex flex-wrap justify-between items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
}
