/** Dashboard skeleton route; cards deliberately show only Foundation placeholders. */
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const cards = ['Service health', 'Active projects', 'Contract changes', 'Recent activity'];
/** Renders the dashboard layout without monitoring business data. @returns dashboard page */ export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Welcome to API Sentinel</h2>
        <p className="mt-1 text-muted-foreground">
          Your API governance workspace is ready for configuration.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Foundation ready</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Authentication, navigation, theming, and service health are available. Project and
          monitoring workflows are intentionally deferred to future roadmap phases.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
