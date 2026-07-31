/** Global loading state shown while App Router segments stream. */
/** Renders an accessible loading indicator. @returns loading page */ export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center">
      <p className="animate-pulse text-muted-foreground">Loading API Sentinel…</p>
    </main>
  );
}
