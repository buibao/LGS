import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DatabaseSetupState() {
  return (
    <div className="dashboard-shell min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-[32px]">
          <CardHeader>
            <CardTitle>Database setup required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              LeadOps AI is trying to connect to PostgreSQL at <code>localhost:5432</code>, but no database server is running there.
            </p>
            <p>
              Your current <code>DATABASE_URL</code> in <code>.env.local</code> is still the local placeholder:
            </p>
            <pre className="overflow-x-auto rounded-2xl bg-[var(--secondary)] p-4 text-xs">
{`DATABASE_URL="postgresql://postgres:postgres@localhost:5432/leadops_ai?schema=public"`}
            </pre>
            <p>To fix it, do one of these:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Install and run PostgreSQL locally on port <code>5432</code>, then create a database named <code>leadops_ai</code>.</li>
              <li>Replace <code>DATABASE_URL</code> with a real hosted PostgreSQL connection string.</li>
            </ul>
            <p>After updating the connection, run these commands:</p>
            <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs text-slate-50">
{`npm run db:push
npm run db:seed
npm run dev`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
