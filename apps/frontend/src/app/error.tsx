/** Client error boundary for unexpected route rendering failures. */
'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
/** Renders an error recovery action. @param props failure and reset callback @returns error page */ export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route rendering failure', error);
  }, [error]);
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="my-4 text-muted-foreground">Please try the page again.</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
