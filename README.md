# LeadOps AI

LeadOps AI is a lightweight SaaS MVP for local service businesses to capture leads, track campaign sources, manage follow-ups, and review weekly performance from one dashboard.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Clerk authentication
- PostgreSQL
- Prisma ORM
- Zod
- React Hook Form
- TanStack Table
- Recharts

## Features

- Public landing page at `/`
- Clerk-protected app routes
- Workspace-aware data model with `Organization` and `Membership`
- Lead management with manual lead entry
- Campaign and source tracking
- Basic CRM-style status pipeline
- Dashboard analytics
- Deterministic AI-style weekly report placeholder
- Settings placeholders for workspace, team, and subscription

## Routes

- `/`
- `/dashboard`
- `/leads`
- `/leads/new`
- `/leads/[id]`
- `/campaigns`
- `/reports`
- `/settings`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your PostgreSQL connection string and Clerk keys to `.env.local`.

For Neon or Vercel Postgres:

- `DATABASE_URL` should use the Neon pooled connection string with `-pooler` and `sslmode=require`.
- `DATABASE_URL_UNPOOLED` should use the Neon direct connection string without `-pooler` and `sslmode=require`.

For local development, Clerk test keys are expected and will show a browser warning from Clerk. That warning is normal in development. Before deploying, replace `pk_test_...` and `sk_test_...` with Clerk live production keys.

4. Generate Prisma client and create or apply local migrations:

```bash
npm run db:generate
npx prisma migrate dev
```

5. Seed demo data:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

## Seeded demo data

The seed script creates:

- 1 demo organization
- 3 campaigns
- 20 leads with mixed statuses and sources
- Timeline activities for each lead

If a newly signed-in Clerk user has no membership yet, the app automatically attaches that user to the earliest available organization. This makes the seeded demo workspace visible immediately after login.

## AI reporting note

`lib/report-generator.ts` uses deterministic summary logic for now and includes a TODO to replace it later with OpenAI or Vercel AI SDK powered report generation.

## Deployment

This project is designed for Vercel deployment. Configure the same environment variables from `.env.example` in Vercel, connect a PostgreSQL database, and run the Prisma commands during your deployment workflow or database setup phase.

Do not deploy with Clerk test keys. The app will now fail fast in production if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `CLERK_SECRET_KEY` still use `pk_test_` or `sk_test_`.

## Prisma Migration Guidance

- Use `npx prisma migrate dev` only for local development.
- Use `npx prisma migrate deploy` for production and staging databases.
- Do not run `prisma migrate dev` in production.
- Prisma uses `DATABASE_URL_UNPOOLED` for direct schema operations when needed, while the app runtime should use the pooled `DATABASE_URL`.

## Neon + Vercel Deployment

1. Create a Neon project and database.

2. Copy the Neon pooled connection string into `DATABASE_URL`.

Requirements:

- Use the pooled string that includes `-pooler`
- Include `sslmode=require`

3. Copy the Neon direct connection string into `DATABASE_URL_UNPOOLED`.

Requirements:

- Use the direct string without `-pooler`
- Include `sslmode=require`

Vercel and Neon may automatically provide `DATABASE_URL` and `DATABASE_URL_UNPOOLED` when the database integration is connected.

4. Add these environment variables in Vercel:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@EP-POOLER-REGION-pooler.neon.tech/leadops_ai?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://USER:PASSWORD@EP-DIRECT-REGION.neon.tech/leadops_ai?sslmode=require
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

5. Run production migrations against the Neon production database.

Use this command for production and staging:

```bash
npx prisma migrate deploy
```

If you have not created your initial migrations yet, create them locally first:

```bash
npx prisma migrate dev --name init
```

Commit the generated `prisma/migrations` folder before deploying.

6. Push the project to GitHub.

7. Import the GitHub repository into Vercel.

8. Deploy on Vercel.

The repo already runs:

- `postinstall`: `prisma generate`
- `build`: `prisma generate && next build`

9. After deployment, smoke test these routes:

- `/`
- `/sign-in`
- `/dashboard`
- `/leads`
- `/campaigns`
- `/reports`
- `/settings`

## Deployment Notes

- Public routes are currently `/`, `/sign-in(.*)`, and `/sign-up(.*)`.
- Protected routes include `/dashboard`, `/leads`, `/campaigns`, `/reports`, and `/settings`.
- No `/capture/[orgSlug]` routes currently exist in this repo, so no extra Clerk public-route exemptions are required.
- The app does not use local filesystem storage for persistent data.
- The app does not depend on `localhost` in production runtime paths. The `localhost` references in this repo are example environment values and local database setup messaging only.
- No background jobs are started inside Vercel request handlers.
- Prisma schema changes should be applied manually with `prisma migrate deploy` as part of deployment operations, not automatically during the Vercel build step.
