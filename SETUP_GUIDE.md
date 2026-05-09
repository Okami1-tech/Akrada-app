# AKRADA Setup & Deployment Guide

This guide will walk you through setting up AKRADA from scratch to deployment. It's written for beginners, so don't worry!

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Setup](#supabase-setup)
4. [Database Schema](#database-schema)
5. [Storage Buckets](#storage-buckets)
6. [Running Locally](#running-locally)
7. [Deploying to GitHub](#deploying-to-github)
8. [Deploying to Vercel](#deploying-to-vercel)
9. [Common Errors & Fixes](#common-errors--fixes)

---

## Prerequisites

Before you start, you need:

1. **Node.js** (v16 or higher)
   - Download from https://nodejs.org
   - Verify installation: `node --version` and `npm --version`

2. **Git** (for version control)
   - Download from https://git-scm.com
   - Verify installation: `git --version`

3. **GitHub Account**
   - Sign up at https://github.com if you don't have one

4. **Supabase Account**
   - Sign up at https://supabase.com (free tier is sufficient)

5. **Vercel Account** (for hosting)
   - Sign up at https://vercel.com using your GitHub account

---

## Local Development Setup

### Step 1: Extract and Prepare the Project

1. Download the AKRADA zip file
2. Extract it to a folder: `akrada/`
3. Open terminal/command prompt in that folder

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### Step 3: Create Environment Variables

1. In the `akrada` folder, create a file named `.env.local`
2. Copy the contents of `.env.example` into `.env.local`
3. Leave it as is for now - we'll fill it in after setting up Supabase

File should look like:
```
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## Supabase Setup

### Step 1: Create a Project

1. Go to https://supabase.com and sign in
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `akrada`
   - **Password**: Create a strong password (write it down!)
   - **Region**: Choose the closest to Nigeria (e.g., Europe - London)
4. Click **"Create new project"** and wait 2-3 minutes

### Step 2: Get Your Credentials

1. After project creation, go to **Settings** → **API**
2. Copy:
   - **Project URL** → Paste into `VITE_SUPABASE_URL` in `.env.local`
   - **Anon key** → Paste into `VITE_SUPABASE_ANON_KEY` in `.env.local`
3. Save your `.env.local` file

### Step 3: Enable Authentication

1. In Supabase, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (should be by default)
3. Go to **Authentication** → **Settings**
4. Under "Email Auth", enable:
   - ✅ "Enable email confirmations"
   - ✅ "Enable double confirm changes"

---

## Database Schema

### Step 1: Open SQL Editor

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste all the SQL code below

### Step 2: Create Tables

**Copy and paste this entire SQL block into Supabase SQL Editor:**

```sql
-- Universities Table
CREATE TABLE universities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  hobbies TEXT[] DEFAULT '{}',
  relationship_status TEXT,
  external_links JSONB DEFAULT '[]',
  university_id TEXT REFERENCES universities(id),
  role TEXT DEFAULT 'user',
  is_verified BOOLEAN DEFAULT FALSE,
  is_banned BOOLEAN DEFAULT FALSE,
  is_suspended BOOLEAN DEFAULT FALSE,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  media_type TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  university_id TEXT REFERENCES universities(id),
  club_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Post Likes Table
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- Comments Table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Follows Table
CREATE TABLE follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Clubs Table
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  avatar_url TEXT,
  banner_url TEXT,
  university_id TEXT REFERENCES universities(id),
  is_university_wide BOOLEAN DEFAULT FALSE,
  rules TEXT[] DEFAULT '{}',
  members_count INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Club Members Table
CREATE TABLE club_members (
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (club_id, user_id)
);

-- Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reported_club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Verification Requests Table
CREATE TABLE verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  proof_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_university_id ON posts(university_id);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_club_members_user_id ON club_members(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

Click **"Run"** and wait for success message.

### Step 3: Insert Nigerian Universities

Paste this SQL and run it:

```sql
INSERT INTO universities (id, name, abbreviation, state) VALUES
('unilag', 'University of Lagos', 'UNILAG', 'Lagos'),
('ui', 'University of Ibadan', 'UI', 'Oyo'),
('abua', 'University of Abuja', 'UNIABUJA', 'FCT'),
('oau', 'Obafemi Awolowo University', 'OAU', 'Osun'),
('uniben', 'University of Benin', 'UNIBEN', 'Edo'),
('unn', 'University of Nigeria, Nsukka', 'UNN', 'Enugu'),
('abu', 'Ahmadu Bello University', 'ABU', 'Kaduna'),
('unimaid', 'University of Maiduguri', 'UNIMAID', 'Borno'),
('uniport', 'University of Port Harcourt', 'UNIPORT', 'Rivers'),
('unilorin', 'University of Ilorin', 'UNILORIN', 'Kwara'),
('fuoye', 'Federal University Oye-Ekiti', 'FUOYE', 'Ekiti'),
('futa', 'Federal University of Technology, Akure', 'FUTA', 'Ondo'),
('futo', 'Federal University of Technology, Owerri', 'FUTO', 'Imo'),
('atbu', 'Abubakar Tafawa Balewa University', 'ATBU', 'Bauchi'),
('lautech', 'Ladoke Akintola University of Technology', 'LAUTECH', 'Oyo'),
('covenant', 'Covenant University', 'CU', 'Ogun'),
('babcock', 'Babcock University', 'BU', 'Ogun'),
('afe-babalola', 'Afe Babalola University', 'ABUAD', 'Ekiti'),
('pan-atlantic', 'Pan-Atlantic University', 'PAU', 'Lagos'),
('redeemers', 'Redeemer\'s University', 'RUN', 'Osun'),
('bells', 'Bells University of Technology', 'BELLS', 'Ogun'),
('bowen', 'Bowen University', 'BOWEN', 'Osun'),
('bayero', 'Bayero University Kano', 'BUK', 'Kano'),
('usmanu', 'Usmanu Danfodiyo University', 'UDUS', 'Sokoto');
```

---

## Storage Buckets

### Step 1: Create Storage Buckets

1. In Supabase, go to **Storage** (left sidebar)
2. Click **"New bucket"** and create:
   - **Name**: `avatars`
   - **Public**: Toggle ON
   - Click **Create**
3. Repeat for:
   - **Name**: `media`
   - **Public**: Toggle ON

### Step 2: Set Permissions

For each bucket (`avatars` and `media`):
1. Click the bucket name
2. Go to **Settings**
3. Under "File size limit": Set to `10 MB`
4. No additional setup needed for auth users

---

## Running Locally

### Start the Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  Local:    http://localhost:5173/
```

Open http://localhost:5173 in your browser!

### Login/Sign Up

1. Click **"Sign Up"** if you don't have an account
2. Fill in:
   - Email: `test@example.com`
   - Password: `password123` (at least 6 chars)
   - Display Name: `John Doe`
   - Username: `johndoe123`
   - University: Select any university
3. Confirm your email (check spam folder)
4. You're in! 🎉

---

## Deploying to GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `akrada`
   - **Description**: `Nigerian University Social Network`
   - **Public/Private**: Choose Private (recommended)
3. Click **"Create repository"**

### Step 2: Initialize Git and Push

```bash
cd akrada
git init
git add .
git commit -m "Initial commit: AKRADA MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/akrada.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Upload Logo

1. In GitHub, go to your repo
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your `logo.png` file
4. Commit the changes

---

## Deploying to Vercel

### Step 1: Connect to Vercel

1. Go to https://vercel.com/import
2. Click **"Import Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repo URL and click **"Continue"**
5. Click **"Continue"**

### Step 2: Configure Environment Variables

1. On the "Configure" page, find **"Environment Variables"**
2. Add:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: (paste from your `.env.local`)
3. Click **"Add"**
4. Repeat for `VITE_SUPABASE_ANON_KEY`
5. Click **"Deploy"**

### Step 3: Wait for Deployment

Vercel will build your app (takes 2-3 minutes). You'll see a live URL like:
```
https://akrada-xyz123.vercel.app
```

### Step 4: Update Supabase URLs (Optional)

If you want email confirmations to work properly:
1. In Supabase, go to **Authentication** → **Settings**
2. Under "Redirect URLs", add your Vercel URL
3. Save changes

---

## Custom Domain (Optional)

To use a custom domain like `akrada.com`:

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Enter your domain name
4. Follow Vercel's DNS setup instructions
5. Update nameservers at your domain registrar

---

## Environment Variables Explained

### `.env.local` Variables

```
VITE_SUPABASE_URL
- What: Your Supabase project URL
- Where to find: Supabase → Settings → API → Project URL
- Example: https://xyz123.supabase.co

VITE_SUPABASE_ANON_KEY
- What: Your public API key (safe to expose)
- Where to find: Supabase → Settings → API → Anon key
- Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Never commit `.env.local` to GitHub!** It's in `.gitignore` for security.

---

## Common Errors & Fixes

### Error: "Cannot find module '@supabase/supabase-js'"

**Fix:**
```bash
npm install
```

### Error: "Missing Supabase environment variables"

**Fix:**
1. Check that `.env.local` exists in the root directory
2. Verify values are correct:
   ```bash
   cat .env.local
   ```
3. Restart development server

### Error: "FATAL: password authentication failed"

This appears in Supabase. It means you entered the wrong password when creating the project.
**Fix:** Create a new Supabase project with the correct password.

### Error: "Email already exists"

**Fix:** Use a different email address for testing, or delete the user from Supabase Auth.

### Error: "User does not exist" after signing up

**Fix:**
1. Check your email spam folder
2. Email confirmation is required - check Supabase settings
3. In Supabase, manually confirm the user:
   - Go to **Authentication** → **Users**
   - Find the user, click the menu (...), select **"Confirm user"**

### Build fails on Vercel

**Fix:**
1. Check that all environment variables are added on Vercel
2. Run locally first: `npm run build`
3. Check the Vercel build logs for specific errors
4. Common cause: Missing TypeScript types - verify `types/index.ts` is correct

### "Port 5173 already in use"

**Fix:**
```bash
# Kill the process using the port (macOS/Linux)
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or just use a different port
npm run dev -- --port 3000
```

### "Cannot GET /feed" after deployment

**Fix:** This is normal - Vercel needs the app to handle routing. The app should work, try:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Clear browser cache
3. Check Vercel build logs for errors

---

## Monitoring & Maintenance

### Check Supabase Health

1. Go to https://supabase.com/dashboard
2. You'll see usage stats and can monitor database performance

### Check Vercel Logs

1. Go to your Vercel project
2. Click **"Deployments"**
3. Click on any deployment to see logs

### Backup Database

Supabase offers automatic backups. To manually export:
1. Supabase → **Backups**
2. Click **"Create backup"**
3. Backups are kept for 7 days (paid plans: 30 days)

---

## What's Next?

### Frontend Improvements
- [ ] Add user profile pages
- [ ] Add notifications system
- [ ] Add search functionality
- [ ] Add messaging/DMs
- [ ] Add dark mode toggle

### Backend Features
- [ ] Add email notifications
- [ ] Add moderation queue UI
- [ ] Add analytics dashboard
- [ ] Add rate limiting
- [ ] Add content flagging

### Database Features
- [ ] Add trending posts algorithm
- [ ] Add recommendation system
- [ ] Add activity logging

---

## Support & Troubleshooting

### Getting Help

1. **Supabase Issues**: https://supabase.com/docs
2. **React Issues**: https://react.dev
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **Vercel Issues**: https://vercel.com/docs

### Check the Logs

**Local Development:**
```bash
# Terminal where you ran `npm run dev`
```

**Production (Vercel):**
1. Go to Vercel dashboard
2. Click your project
3. Click **"Deployments"**
4. Find the deployment and click it
5. See logs under **"Logs"**

---

## Summary

You've successfully set up AKRADA! Here's what you did:

✅ Installed Node.js and dependencies
✅ Set up Supabase project
✅ Created database schema and tables
✅ Created storage buckets for media
✅ Ran locally and tested
✅ Pushed to GitHub
✅ Deployed to Vercel

Your app is now live! Share the URL with friends to start building your community.

---

**Built with ❤️ by Okami Nalado**

Last updated: January 2025
