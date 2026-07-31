/** Semantic table primitives retaining responsive styling at call sites. */
import * as React from 'react';
import { cn } from '@/lib/utils';
/** Renders a horizontally scrollable table wrapper. @param props table properties @returns table element */ export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}
/** Renders table heading area. @param props section properties @returns thead */ export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <thead className="border-b" {...props} />;
}
/** Renders a table row. @param props row properties @returns tr */ export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('border-b transition-colors hover:bg-muted/50', className)} {...props} />
  );
}
/** Renders a header cell. @param props cell properties @returns th */ export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
/** Renders a body cell. @param props cell properties @returns td */ export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('p-4 align-middle', className)} {...props} />;
}
