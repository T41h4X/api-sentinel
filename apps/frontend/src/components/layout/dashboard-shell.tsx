/** Authenticated route shell that composes navigation, page content, and footer. */
import { Footer } from './footer';
import { Sidebar } from './sidebar';
import { TopNavigation } from './top-navigation';
/** Renders a consistent dashboard frame. @param props title and route content @returns dashboard layout */ export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavigation title={title} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
