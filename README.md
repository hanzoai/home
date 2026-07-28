# @hanzo/home

A forkable personal homepage template with stats dashboard, social integrations, and client-side SQL queries.

Built with Next.js, @hanzo/stats, and @hanzo/ui.

## Features

- **GitHub Stats**: Commits, repositories, lines of code, activity charts
- **AI Usage**: Token usage, model breakdown, interaction history
- **Music Integration**: Spotify and SoundCloud embeds
- **Social Links**: LinkedIn, Twitter, Instagram, Facebook, StackOverflow
- **SQL Query Console**: Run queries against your data client-side
- **Dark Theme**: Beautiful monochrome dark design
- **Responsive**: Works on all devices
- **Static Export**: Deploy to GitHub Pages or any static host

## Quick Start

### 1. Fork this repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone and install

```bash
git clone https://github.com/YOUR-USERNAME/home
cd home
npm install
```

### 3. Configure

Edit `stats.config.ts` to customize:

```ts
export const config = {
  name: 'Your Name',
  title: 'Software Engineer',
  subtitle: 'Building the future with code',
  avatar: 'https://github.com/your-username.png',

  links: {
    github: 'https://github.com/your-username',
    twitter: 'https://x.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
  },

  features: {
    github: true,
    ai: true,
    music: false,
    stackoverflow: false,
  },

  github: {
    users: ['your-username'],
    since: '2010-01-01',
  },
}
```

### 4. Sync your data

```bash
npm run sync
```

This fetches your GitHub commits and generates the stats database.

### 5. Run locally

```bash
npm run dev
```

Visit http://localhost:3000 to see your homepage.

## Deployment

### GitHub Pages

1. Uncomment `output: 'export'` in `next.config.mjs`
2. Set your `basePath` if needed
3. Build and export:

```bash
npm run build
```

4. Deploy the `out` directory to GitHub Pages

### Vercel

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hanzoai/home)

### Cloudflare Pages

Connect your GitHub repository to Cloudflare Pages with these settings:

- Build command: `npm run build`
- Build output directory: `out` (or `.next` for SSR)

## Customization

### Adding Music

Enable music in `stats.config.ts`:

```ts
features: {
  music: true,
},
music: {
  spotify: {
    userId: 'your-spotify-id',
    playlists: ['playlist-id-1', 'playlist-id-2'],
  },
  soundcloud: {
    username: 'your-soundcloud-username',
  },
},
```

### Adding StackOverflow

```ts
features: {
  stackoverflow: true,
},
stackoverflow: {
  userId: '123456',
  apiKey: 'your-api-key', // Optional, from stackapps.com
},
```

### Custom Theme

Edit CSS variables in `styles/globals.css`:

```css
:root {
  --background: #000;
  --foreground: #fff;
  --primary: #fff;
  --accent: #fff;
  --border: #222;
}
```

### Adding Charts

Use the @hanzo/stats chart utilities in your components:

```tsx
import { useQuery, processSqlTemplate, defaultCharts } from '@hanzo/stats'

const { data } = useQuery(db, processSqlTemplate(defaultCharts[0].sql))
```

## Data Sync

The `npm run sync` command fetches data from:

- GitHub API (commits, repos)
- Local Claude usage files (if configured)

Set up a GitHub Action to sync daily:

```yaml
name: Sync Stats
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run sync
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## License

BSD-3-Clause © Hanzo AI, Inc.

---

Built with ❤️ by [Hanzo AI](https://hanzo.ai)
