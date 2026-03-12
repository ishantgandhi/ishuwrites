# ishu.iso - Google Drive Image Gallery

A modern Next.js application that automatically syncs and displays images from Google Drive, with daily cron jobs via Vercel.

## Features

- 🖼️ **Google Drive Integration** - Automatically fetch images from a Google Drive folder
- ⏰ **Daily Sync** - Vercel cron job runs daily to sync new images
- 🔄 **Auto-sorted** - Images displayed newest to oldest
- 📱 **Responsive** - Works on all screen sizes
- ⚡ **Next.js 14** - React framework with App Router
- 📘 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Drive API

See [SETUP.md](./SETUP.md) for detailed instructions on:
- Creating a Google Cloud Project
- Setting up a Service Account
- Getting API credentials
- Sharing your Google Drive folder

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
CRON_SECRET=your_random_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your gallery.

### 5. Manual Sync (Testing)

Trigger a manual sync:

```bash
curl -X GET http://localhost:3000/api/sync-images \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Note:** Vercel Cron Jobs require a Pro plan or higher.

## How It Works

1. **Daily Cron Job** (midnight UTC) calls `/api/sync-images`
2. API fetches images from Google Drive folder
3. New images are added to the top of `src/data/images.json`
4. Homepage displays images (newest first)
5. Page revalidates every hour for fresh content

## Project Structure

```
ishuiso/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── sync-images/    # Syncs images from Google Drive
│   │   │   └── images/         # Returns image list
│   │   ├── layout.tsx
│   │   └── page.tsx            # Main gallery page
│   ├── lib/
│   │   └── googleDrive.ts      # Google Drive API client
│   └── data/
│       └── images.json         # Cached image metadata
├── public/                      # Static assets (icons, images)
├── vercel.json                 # Cron job configuration
├── SETUP.md                    # Detailed setup guide
└── package.json
```

## API Endpoints

- `GET /api/sync-images` - Sync images from Google Drive (protected)
- `GET /api/images` - Get list of all images

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Drive API](https://developers.google.com/drive/api)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)

