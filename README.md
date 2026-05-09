# AKRADA - Nigerian University Social Network

**AKRADA** is a modern social network built specifically for Nigerian university students. Connect with peers, create posts, join clubs, and build meaningful communities within your institution.

## Features

✨ **Core Features**
- 🔐 Email/password authentication with university selection
- 👤 Rich profile system with bio, hobbies, relationship status
- 📝 Create posts with text, images, and videos
- ❤️ Like and comment on posts
- 📌 Pin your favorite posts (max 3)
- 👥 Follow system for discovering content
- 🎓 University-based feeds and feeds
- 🏢 Clubs: Create, join, and moderate clubs
- ✅ User verification system with admin approval
- 🚨 Moderation tools (admin/founder roles)
- 🔍 Search users, posts, clubs, and universities

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom theme
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: GitHub (code) + Vercel (deployment)

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   ├── layout/          # Layout components (Navbar)
│   ├── feed/            # Feed-related components (PostCard, CreatePost)
│   ├── clubs/           # Club components
│   ├── profile/         # Profile components
│   └── moderation/      # Admin/moderation components
├── pages/               # Page components (Feed, Login, etc.)
├── hooks/               # Custom hooks (useAuth, usePosts, useFollow)
├── lib/                 # Libraries (supabase client, universities list)
├── utils/               # Utility functions
├── types/               # TypeScript types
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## Getting Started

See `SETUP_GUIDE.md` for detailed installation and deployment instructions.

### Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env.local` and add your Supabase credentials
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Open http://localhost:5173

## Color Scheme

- **Primary**: Electric Purple (`#a855f7`)
- **Background**: Surface Black (`#0d0d0d`)
- **Cards**: Surface Card (`#141414`)
- **Borders**: Surface Border (`#2a2a2a`)

## Database Schema

See `SETUP_GUIDE.md` for detailed SQL schema to create in Supabase.

## Admin Roles

- **User**: Standard user account
- **Admin**: Can delete posts, ban/suspend users, manage reports
- **Founder**: Full access (Okami Nalado)
- **System**: AKRADA official account

## Founded By

**Okami Nalado** - Founder

## License

Private - All rights reserved
