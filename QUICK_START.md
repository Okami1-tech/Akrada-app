# AKRADA - Quick Start (2 minutes)

## TL;DR - Get Running in 2 Minutes

### 1. Prerequisites
- Node.js installed: https://nodejs.org
- Supabase account: https://supabase.com
- GitHub account: https://github.com

### 2. Quick Setup

```bash
# Install dependencies
npm install

# Create .env.local file and add your Supabase credentials
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Start development server
npm run dev

# Open http://localhost:5173
```

### 3. Create Supabase Project

1. Go to https://supabase.com
2. Create new project (free tier works)
3. Copy Project URL and Anon Key into `.env.local`
4. Go to SQL Editor and paste the schema from `SETUP_GUIDE.md`
5. Run the SQL to create tables

### 4. Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/import
3. Select your GitHub repo
4. Add environment variables
5. Click "Deploy"

---

**For detailed instructions, see `SETUP_GUIDE.md`**
