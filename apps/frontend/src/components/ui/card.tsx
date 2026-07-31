/** Card primitives for grouping related dashboard content consistently. */
import * as React from 'react';
import { cn } from '@/lib/utils';
/** Renders a bordered content surface. @param props div properties @returns card container */ export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  );
}
/** Renders card heading space. @param props div properties @returns header element */ export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}
/** Renders a card title. @param props heading properties @returns title element */ export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}
/** Renders card body space. @param props div properties @returns content element */ export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
