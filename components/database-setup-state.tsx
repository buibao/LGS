import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppUrl } from "@/lib/app-url";

export function DatabaseSetupState() {
  const appUrl = getAppUrl();

  return (
    <div className="dashboard-shell min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-[32px]">
          <CardHeader>
            <CardTitle>Database setup required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              LeadOps AI could not connect to the PostgreSQL database configured for <code>{appUrl}</code>.
            </p>
            <p>
              Check that <code>DATABASE_URL</code> points to a valid pooled runtime connection string and that{" "}
              <code>DATABASE_URL_UNPOOLED</code> points to the direct migration connection string.
            </p>
            <pre className="overflow-x-auto rounded-2xl bg-[var(--secondary)] p-4 text-xs">
{`DATABASE_URL="postgresql://USER:PASSWORD@HOST-pooler.REGION.neon.tech/DB?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST.REGION.neon.tech/DB?sslmode=require"`}
            </pre>
            <p>To fix it, do one of these:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Replace the placeholder values in your local env file with real database credentials.</li>
              <li>Confirm the database is reachable from your current environment and rerun the Prisma commands below.</li>
            </ul>
            <p>After updating the connection, run these commands:</p>
            <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs text-slate-50">
{`npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
