/** Small shared utility functions for class-name composition. */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/** Merges conditional class names while resolving Tailwind conflicts. @param inputs candidate class values @returns normalized class string */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
