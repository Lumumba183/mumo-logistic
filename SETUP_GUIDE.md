# EliteHub — Vercel + Supabase + Clerk Setup Guide

## 🎯 What Was Changed

Your original EliteHub app (Kimi OAuth + MySQL + Netlify) has been fully migrated to:

| Before | After |
|--------|-------|
| **Auth**: Kimi OAuth | **Auth**: Clerk |
| **Database**: MySQL (Drizzle) | **Database**: PostgreSQL via Supabase (Drizzle) |
| **Hosting**: Netlify | **Hosting**: Vercel |

---

## 📋 Prerequisites

Before you start, you need:
1. A **GitHub** account
2. A **Vercel** account (https://vercel.com)
3. A **Supabase** account (https://supabase.com)
4. A **Clerk** account (https://clerk.com)

---

## STEP 1: Create Your New GitHub Repository

1. Go to https://github.com/new
2. Name it: `ELITEHUB2LIVE`
3. Make it **Public** or **Private** (your choice)
4. Do NOT initialize with README, .gitignore, or license (we already have code)
5. Click **Create repository**

---

## STEP 2: Set Up Supabase (Database)

### 2.1 Create a Supabase Project
1. Go to https://app.supabase.com and sign in
2. Click **New Project**
3. Choose your organization
4. Project name: `elitehub`
5. Database password: **Save this somewhere safe!**
6. Region: Choose closest to your users (e.g., `East US (N. Virginia)`)
7. Click **Create new project**
8. Wait for the project to finish setting up (1-2 minutes)

### 2.2 Get Your Database Connection String
1. In your Supabase dashboard, go to **Project Settings** (gear icon, left sidebar)
2. Click **Database** in the settings menu
3. Under **Connection string**, click **URI**
4. Copy the connection string. It looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefgh12345678.supabase.co:5432/postgres
   ```
5. **Important**: Replace `[YOUR-PASSWORD]` with the password you set in step 2.1
6. Save this full string — you will need it for Vercel environment variables

### 2.3 Run Database Migrations

You have two options:

#### Option A: Using Drizzle Kit (Recommended)
```bash
# Install dependencies first
npm install

# Push the schema to Supabase (creates all tables)
npx drizzle-kit push
```

#### Option B: Using Supabase SQL Editor
1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the contents of `db/migrations/0000_*.sql` (this file will be generated after running `drizzle-kit generate`)
4. Click **Run**

---

## STEP 3: Set Up Clerk (Authentication)

### 3.1 Create a Clerk Application
1. Go to https://dashboard.clerk.com and sign in
2. Click **Create application**
3. Name it: `EliteHub`
4. Choose how users sign in:
   - ✅ **Email** (recommended)
   - ✅ **Google** (optional)
   - ✅ **Username** (optional)
5. Click **Create**

### 3.2 Get Your API Keys
1. In your Clerk dashboard, go to **API Keys** (left sidebar)
2. You will see two keys:
   - **Publishable key**: starts with `pk_test_` (for development) or `pk_live_` (for production)
   - **Secret key**: starts with `sk_test_` (for development) or `sk_live_` (for production)
3. Copy both keys and save them

### 3.3 Configure Clerk Redirect URLs
1. In Clerk dashboard, go to **User & Authentication > Social Connections** (if using OAuth)
2. Go to **Sessions** in the left sidebar
3. Under **Home**, make sure your domain is added:
   - For production: `https://elitehub2live.vercel.app`
   - For local dev: `http://localhost:3000`

### 3.4 Configure Allowed Origins (Important!)
1. In Clerk dashboard, go to **User & Authentication > Restrictions**
2. Under **Allowlist**, add your production domain:
   ```
   https://elitehub2live.vercel.app
   ```
3. For development, `http://localhost:3000` is allowed by default

---

## STEP 4: Set Up Vercel (Hosting)

### 4.1 Connect Your GitHub Repository
1. Go to https://vercel.com and sign in
2. Click **Add New... > Project**
3. Under **Import Git Repository**, find and select `Lumumba183/ELITEHUB2LIVE`
4. Click **Import**

### 4.2 Configure Project Settings
1. **Framework Preset**: Select `Vite`
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (or `vite build`)
4. **Output Directory**: `dist/public`
5. Click **Deploy** (we will add env vars after first deploy or before)

### 4.3 Add Environment Variables
After importing, or by going to **Project Settings > Environment Variables**:

Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your Supabase connection string (from Step 2.2) | Production, Preview, Development |
| `CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key (from Step 3.2) | Production, Preview, Development |
| `CLERK_SECRET_KEY` | Your Clerk secret key (from Step 3.2) | Production, Preview, Development |
| `VITE_CLERK_PUBLISHABLE_KEY` | Same as `CLERK_PUBLISHABLE_KEY` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**How to add:**
1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in left sidebar
4. Add each variable one by one
5. Click **Save**

### 4.4 Redeploy
After adding environment variables, Vercel will automatically redeploy.

---

## STEP 5: Push Code to GitHub

### 5.1 Using Command Line (Terminal)

Open your terminal and run these commands:

```bash
# Navigate to the project folder
cd elitehub-work

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: migrate to Vercel + Supabase + Clerk"

# Add the new remote repository
git remote add origin https://github.com/Lumumba183/ELITEHUB2LIVE.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 5.2 If Push Fails (Authentication)
If you get an authentication error, you have two options:

**Option A: Use GitHub Token**
```bash
# Instead of the above remote, use your token
git remote add origin https://YOUR_GITHUB_TOKEN@github.com/Lumumba183/ELITEHUB2LIVE.git
git push -u origin main
```

**Option B: Use GitHub Desktop or VS Code**
1. Open the folder in GitHub Desktop or VS Code
2. Commit the changes
3. Push to the remote repository

---

## STEP 6: How Everything Connects

Here is the architecture of your new setup:

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  React App  │  │ Clerk React  │  │    tRPC Client        │  │
│  │  (Vite)     │  │ (Auth UI)    │  │    (API Calls)        │  │
│  └──────┬──────┘  └──────┬───────┘  └───────────┬───────────┘  │
└─────────┼────────────────┼──────────────────────┼──────────────┘
          │                │                      │
          │                │                      │
          ▼                ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL                                  │
│  ┌─────────────────┐         ┌─────────────────────────────┐   │
│  │  Static Assets  │         │   API Serverless Function   │   │
│  │  (dist/public)  │         │   (api/index.ts → Hono)     │   │
│  │                 │         │                             │   │
│  │  index.html     │         │   • tRPC Router             │   │
│  │  JS bundles     │◄────────│   • Clerk Auth Check        │   │
│  │  CSS            │   API   │   • Drizzle ORM Queries     │   │
│  └─────────────────┘  Calls  └──────────────────────┬────────┘   │
└─────────────────────────────────────────────────────┼────────────┘
                                                      │
                                                      │ SQL
                                                      ▼
                                            ┌──────────────────┐
                                            │    SUPABASE      │
                                            │  (PostgreSQL)    │
                                            │                  │
                                            │  • users         │
                                            │  • messages      │
                                            │  • transactions  │
                                            │  • etc.          │
                                            └──────────────────┘
```

### Authentication Flow (Clerk)
1. User clicks **Sign In** on your site
2. Clerk's `<SignIn>` component handles email/password or OAuth
3. Clerk creates a session and stores a secure cookie
4. On every API call, the cookie is sent automatically (`credentials: "include"`)
5. Backend (`api/context.ts`) verifies the cookie with Clerk
6. If valid, the user's data is fetched from Supabase and attached to the tRPC context

### Database Flow (Supabase)
1. Backend needs to read/write data
2. Drizzle ORM connects to Supabase using the `DATABASE_URL`
3. All queries go through Drizzle's type-safe API
4. Results are returned to the frontend via tRPC

---

## STEP 7: Post-Deployment Checklist

After your first successful deploy:

- [ ] Visit your Vercel URL (e.g., `https://elitehub2live.vercel.app`)
- [ ] Test **Sign Up** with a real email
- [ ] Test **Sign In**
- [ ] Test **demo login** buttons (they should still work)
- [ ] Check that user data appears in **Supabase** (go to Table Editor in Supabase dashboard)
- [ ] Check that the user appears in **Clerk** dashboard

### If Sign Up Doesn't Work:
1. Check Vercel **Function Logs** (in Vercel dashboard > your project > Logs)
2. Check that all **Environment Variables** are set correctly
3. Check that your **Supabase password** is correct in `DATABASE_URL`

### Common Issues:

**"Missing VITE_CLERK_PUBLISHABLE_KEY"**
→ You forgot to add `VITE_CLERK_PUBLISHABLE_KEY` to Vercel environment variables.

**"Database connection failed"**
→ Check your `DATABASE_URL`. Make sure the password is correct and the URL format is exact.

**"CORS error"**
→ Make sure your Clerk dashboard has your Vercel domain in the allowed origins.

---

## STEP 8: Connect Custom Domain (Optional)

If you bought a domain (e.g., `elitehub.com`):

1. In Vercel dashboard, go to **Project > Settings > Domains**
2. Add your domain
3. Follow Vercel's DNS instructions
4. Add the domain to Clerk's allowed origins (in Clerk dashboard)
5. Update any hardcoded URLs in your code

---

## 🎉 You Are Live!

Once everything is connected:
- **Frontend**: Hosted on Vercel
- **Database**: Running on Supabase
- **Auth**: Handled by Clerk
- **API**: Serverless functions on Vercel

Your app is now production-ready with a modern, scalable stack!

---

## Need Help?

- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team/docs
