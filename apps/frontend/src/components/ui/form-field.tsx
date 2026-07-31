/** Small form-field composition helper that standardizes labels and validation messages. */
import * as React from 'react';
import { cn } from '@/lib/utils';
/** Renders a label, input content, and optional validation text. @param props field content @returns labelled field */ export function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('grid gap-2 text-sm font-medium', className)}>
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
