# Deployment Checklist

## Local

- `npm install`
- `npm run build`
- `npx prisma generate`

## Database

- `DATABASE_URL` is pooled
- `DATABASE_URL_UNPOOLED` is unpooled/direct
- Migration files exist
- `npx prisma migrate deploy` succeeds

## Vercel

- Project imported or linked
- Env vars set for Production and Preview
- `NEXT_PUBLIC_APP_URL` set for local development, optional for Preview, recommended for Production
- Framework preset is Next.js
- Build command is `npm run build`
- Install command is `npm install`
- Output directory is default

## Clerk

- Publishable key set
- Secret key set
- Allowed redirect URLs and domain configured in Clerk dashboard

## Post-deploy smoke test

- `/`
- `/dashboard`
- `/leads`
- `/campaigns`
- `/reports`
- `/settings`
- Create lead flow
- Database write works
