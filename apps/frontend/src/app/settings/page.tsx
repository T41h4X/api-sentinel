/** Settings placeholder ensures dashboard navigation has a stable destination in Foundation. */
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Alert } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
/** Renders the settings shell with no out-of-scope preferences. @returns settings page */ export default function SettingsPage() {
  return (
    <DashboardShell title="Settings">
      <Card>
        <CardHeader>
          <CardTitle>Workspace settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>Settings controls will be added with their corresponding roadmap features.</Alert>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
