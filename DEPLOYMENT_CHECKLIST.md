# Deployment Checklist

## Local build checklist

- `npm install`
- `npm run lint`
- `npm run build`
- Confirm Prisma Client generates successfully during `postinstall` and `build`
- Confirm local auth, dashboard, and lead routes still load

## Env checklist

- `DATABASE_URL` is set
- `DATABASE_URL` uses the Neon pooled connection string with `-pooler`
- `DATABASE_URL` includes `sslmode=require`
- `DATABASE_URL_UNPOOLED` is set
- `DATABASE_URL_UNPOOLED` uses the Neon direct connection string without `-pooler`
- `DATABASE_URL_UNPOOLED` includes `sslmode=require`
- `NEXT_PUBLIC_APP_URL` is set to the production origin, for example `https://your-app.vercel.app`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- `CLERK_SECRET_KEY` is set
- Clerk keys are live production keys, not `pk_test_` or `sk_test_`
- Clerk route env vars are set:
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

## Database checklist

- Neon production database exists
- `DATABASE_URL` points to the production database
- `DATABASE_URL_UNPOOLED` points to the production direct connection
- Prisma migrations have been created locally and committed
- Production schema has been applied manually with:

```bash
npx prisma migrate deploy
```

- Optional demo data decision is made before go-live
  - Do not run `npm run db:seed` in production unless you intentionally want demo content

## Clerk checklist

- Production Clerk application is created
- Vercel production domain is added to Clerk allowed origins / redirect configuration
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` uses a live publishable key
- `CLERK_SECRET_KEY` uses a live secret key
- Public routes work:
  - `/`
  - `/sign-in`
  - `/sign-up`
- Protected routes redirect unauthenticated users:
  - `/dashboard`
  - `/leads`
  - `/campaigns`
  - `/reports`
  - `/settings`

## Vercel checklist

- Repo is connected to Vercel
- Environment variables are added in the Vercel dashboard
- If using the Vercel/Neon integration, confirm `DATABASE_URL` and `DATABASE_URL_UNPOOLED` are present
- Build command uses the package script
- No `prisma migrate dev` command is run in Vercel
- Production migrations are run separately with `prisma migrate deploy`
- Production domain is known and reflected in `NEXT_PUBLIC_APP_URL`

## Post-deploy smoke test checklist

- Open `/`
- Open `/sign-in`
- Sign in with a production Clerk user
- Confirm `/dashboard` loads
- Confirm `/leads` loads and list renders
- Create a test lead from `/leads/new`
- Open the created lead detail page
- Confirm `/campaigns`, `/reports`, and `/settings` load
- Confirm no missing environment variable errors appear in Vercel logs
- Confirm database reads and writes succeed
