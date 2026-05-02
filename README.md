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
cp .env.example .env
```

3. Add your PostgreSQL connection string and Clerk keys to `.env`.

4. Generate Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
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
