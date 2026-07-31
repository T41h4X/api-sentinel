/** Top navigation exposes breadcrumb context and a non-functional profile affordance. */
import { Bell, Menu, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
/** Renders the application top bar. @param title current page title @returns header element */ export function TopNavigation({
  title,
}: {
  title: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-xs text-muted-foreground">API Sentinel / {title}</p>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Profile menu">
          <UserCircle className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
