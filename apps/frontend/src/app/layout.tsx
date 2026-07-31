/** Root document layout. Responsibilities: global styles, font metadata, and theme context. */
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'API Sentinel', template: '%s | API Sentinel' },
  description: 'API governance foundation',
};
/** Renders the global application shell. @param children active route content @returns HTML document */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
