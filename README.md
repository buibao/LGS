# LeadOps AI

LeadOps AI is a Next.js App Router app for capturing leads, tracking campaign sources, managing follow-ups, and reviewing performance in one dashboard.

## Stack

- Next.js App Router
- TypeScript
- Prisma
- PostgreSQL via Neon or Vercel Postgres
- Clerk
- Tailwind CSS and shadcn/ui
- Vercel

## Local Setup

1. Install dependencies.

```bash
npm install
```

2. Copy the local environment template.

```bash
cp .env.local.example .env.local
```

3. Fill in your local values.

Required variables:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL`

Notes:

- `DATABASE_URL` is the pooled Neon/Vercel Postgres connection string used by the running app.
- `DATABASE_URL_UNPOOLED` is the direct or unpooled connection string used for Prisma migrations.
- `NEXT_PUBLIC_APP_URL` should be `http://localhost:3000` in local development.
- Do not commit `.env.local`, `.env.production`, or any file containing real credentials.

4. Generate Prisma Client and run local migrations.

```bash
npm run db:generate
npm run db:migrate
```

5. Seed local data if needed.

```bash
npm run db:seed
```

6. Start the app.

```bash
npm run dev
```

## Environment Templates

Safe templates are included in the repo:

- `.env.example`
- `.env.local.example`
- `.env.vercel.example`

Use `.env.local.example` for local development and `.env.vercel.example` as the copy source for Vercel project settings.

## App URL Resolution

The app now resolves its base URL from a centralized utility in [lib/app-url.ts](/d:/LGS/lib/app-url.ts).

Resolution order:

- `NEXT_PUBLIC_APP_URL` when you want an explicit canonical origin
- `NEXT_PUBLIC_VERCEL_URL` when available
- `VERCEL_URL` on Vercel server runtime
- Browser `window.location.origin` when running in the client
- `http://localhost:3000` as the final local fallback

Recommended usage by environment:

- Local: set `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- Preview: you can leave `NEXT_PUBLIC_APP_URL` unset and let Vercel preview URLs resolve automatically
- Production: set `NEXT_PUBLIC_APP_URL` when you want a stable Vercel production domain or custom domain

## Prisma and Database Notes

The Prisma datasource is configured for hosted Postgres deployments:

- `url = env("DATABASE_URL")`
- `directUrl = env("DATABASE_URL_UNPOOLED")`

Use these commands correctly:

- `prisma migrate dev` is for local development.
- `prisma migrate deploy` is for production and staging.

Do not run `prisma migrate dev` in Vercel production.

## Vercel Deployment

GitHub import is the recommended deployment path.

### A. Local checks

```bash
npm install
npm run build
```

### B. Create a database

Create a Neon or Vercel Postgres database.

Set:

- `DATABASE_URL` to the pooled connection string
- `DATABASE_URL_UNPOOLED` to the unpooled or direct connection string

### C. Set Vercel environment variables

Add these variables in Vercel for both Preview and Production:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

`NEXT_PUBLIC_APP_URL` handling:

- Preview deployments: optional
- Production deployments: recommended for a stable canonical origin
- If omitted, the app falls back to Vercel-provided deployment URLs

### D. Run the production migration

```bash
npx prisma migrate deploy
```

### E. Deploy

Deploy either by importing the GitHub repo into Vercel or by using the optional Vercel CLI flow below.

## GitHub to Vercel

1. Push the repository to GitHub.
2. In Vercel, click `Add New...` -> `Project`.
3. Import the GitHub repository.
4. Confirm the framework preset is `Next.js`.
5. Confirm the install command is `npm install`.
6. Confirm the build command is `npm run build`.
7. Leave the output directory empty so Vercel uses the default.
8. Add the required environment variables for Preview and Production.
   `NEXT_PUBLIC_APP_URL` is optional for Preview and recommended for Production.
9. Deploy.
10. Run `npx prisma migrate deploy` against the production database if you have not already done so from your release workflow.

## Optional Vercel CLI

GitHub import is still the recommended path, but local CLI deploy is supported.

Install:

```bash
npm i -g vercel
```

Login:

```bash
vercel login
```

Link:

```bash
vercel link
```

Pull env:

```bash
vercel env pull .env.local
```

Preview deploy:

```bash
vercel
```

Production deploy:

```bash
vercel --prod
```

If you deploy with the CLI, still run production migrations with:

```bash
npx prisma migrate deploy
```

## Auth Route Notes

Current public routes:

- `/`
- `/sign-in`
- `/sign-up`
- `/capture/[orgSlug]` and `/capture/[orgSlug]/success` if those routes are added later

Current protected routes:

- `/dashboard`
- `/leads`
- `/campaigns`
- `/reports`
- `/settings`

No `/capture/[orgSlug]` route currently exists in this repo, but the Clerk middleware is configured so capture routes remain public if introduced.
