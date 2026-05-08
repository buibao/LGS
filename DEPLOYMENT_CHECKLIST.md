# Deployment Checklist

## Local

- `npm install`
- `npm run build`
- `npx prisma generate`

## Database

- `DATABASE_URL` is the pooled Neon runtime URL
- `DATABASE_URL_UNPOOLED` is the unpooled/direct Neon migration URL
- Migration files exist
- `npx prisma migrate deploy` succeeds
- `npx prisma migrate deploy` is scheduled before or immediately after the first production deploy

## Vercel

- Project imported or linked
- Env vars set for Production and Preview
- `NEXT_PUBLIC_APP_URL` set for local development
- `NEXT_PUBLIC_APP_URL` optional for Preview
- `NEXT_PUBLIC_APP_URL` can be omitted for the first Production deploy if the final domain is not known yet
- `NEXT_PUBLIC_APP_URL` set after the final Vercel domain or custom domain is known
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
