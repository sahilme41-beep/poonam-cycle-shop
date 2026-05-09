# Poonam Cycle Shop

Next.js 14 ecommerce-style website with:
- Public storefront (`/`, `/shop`, product/category pages)
- Admin panel (`/admin`) with credentials login
- MongoDB + Mongoose data layer
- Cloudinary image upload API

## 1) Local setup

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2) Environment variables

Copy `.env.local.example` to `.env.local` and fill values:

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Notes:
- `NEXTAUTH_SECRET`: generate a long random string.
- `NEXTAUTH_URL`: local should be `http://localhost:3000`; production should be your Vercel domain.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: credentials used for `/login`.

## 3) Seed starter data (first time only)

After env is set and app is running:

```bash
curl -X POST http://localhost:3000/api/seed
```

This creates starter categories, products, review, and announcement settings.

## 4) Deploy on your new Vercel account (step by step)

1. Push this project to GitHub (or GitLab/Bitbucket).
2. Log in to your **new** Vercel account.
3. Click **Add New... -> Project**.
4. Import this repository.
5. Framework preset should auto-detect as **Next.js**.
6. In **Environment Variables**, add all variables from section 2.
7. Set `NEXTAUTH_URL` to your production URL, for example:
   - `https://your-project-name.vercel.app` (initial)
   - later your custom domain URL, if added.
8. Click **Deploy**.

After deploy, open:
- `/` to verify public site
- `/login` then `/admin` to verify admin access

## 5) MongoDB account setup (for your new account)

If you mean MongoDB Atlas ("monogobase"), do:

1. Create a new project and cluster.
2. In **Database Access**, create a DB user (username/password).
3. In **Network Access**, allow your IP for local testing, and allow Vercel:
   - easiest: `0.0.0.0/0` (less secure)
   - better: restrict later with controlled IP ranges.
4. In **Connect -> Drivers**, copy the connection string.
5. Replace `<username>`, `<password>`, `<dbname>` and paste into `MONGODB_URI`.
6. Add this exact `MONGODB_URI` in:
   - local `.env.local`
   - Vercel project environment variables.

## 6) Seed production data after deploy

Once live URL is ready, run once:

```bash
curl -X POST https://your-project-name.vercel.app/api/seed
```

## 7) Production checklist

- `MONGODB_URI` points to new account cluster
- `NEXTAUTH_SECRET` set in Vercel
- `NEXTAUTH_URL` matches deployed domain
- Cloudinary keys are valid
- Admin login works with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `POST /api/seed` has been run once

---

Build verification: `npm run build` succeeds in this repo.
