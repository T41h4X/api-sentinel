/** Informational and error callout primitive. */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const variants = cva('relative w-full rounded-lg border p-4 text-sm', {
  variants: {
    variant: { default: 'bg-card', destructive: 'border-destructive/50 text-destructive' },
  },
  defaultVariants: { variant: 'default' },
});
/** Renders an accessible alert container. @param props alert content and variant @returns alert element */ export function Alert({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>) {
  return <div role="alert" className={cn(variants({ variant }), className)} {...props} />;
}
