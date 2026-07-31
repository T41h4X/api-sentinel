/** Lightweight application footer shared by authenticated routes. */
/** Renders copyright and Foundation-version context. @returns footer element */ export function Footer() {
  return (
    <footer className="border-t px-4 py-4 text-center text-xs text-muted-foreground md:px-8">
      © {new Date().getFullYear()} API Sentinel · Foundation v0.1.0
    </footer>
  );
}
