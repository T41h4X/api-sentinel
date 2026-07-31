/** Primary responsive navigation for the authenticated application shell. */
import Link from 'next/link';
import { Activity, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', icon: Settings },
];
/** Renders the persistent navigation rail. @param props optional extra classes @returns sidebar navigation */ export function Sidebar({
  className,
}: {
  className?: string;
}) {
  return (
    <aside className={cn('hidden w-64 shrink-0 border-r bg-card p-4 md:block', className)}>
      <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2 text-lg font-bold">
        <Activity className="h-5 w-5 text-primary" />
        API Sentinel
      </Link>
      <nav aria-label="Primary navigation" className="grid gap-1">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
