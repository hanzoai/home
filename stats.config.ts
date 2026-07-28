/**
 * Stats Homepage Configuration
 * Customize this file to personalize your homepage
 */

export const config = {
  // Personal Info
  name: 'Your Name',
  title: 'Software Engineer',
  subtitle: 'Building the future with code',
  avatar: 'https://github.com/your-username.png',

  // Social Links
  links: {
    github: 'https://github.com/your-username',
    twitter: 'https://x.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
    // facebook: 'https://facebook.com/your-username',
    // instagram: 'https://instagram.com/your-username',
    // spotify: 'https://open.spotify.com/user/your-username',
    // soundcloud: 'https://soundcloud.com/your-username',
    // stackoverflow: 'https://stackoverflow.com/users/123456/your-name',
  },

  // Features to enable
  features: {
    github: true,
    ai: true,
    music: false,
    stackoverflow: false,
  },

  // GitHub configuration
  github: {
    users: ['your-username'],
    since: '2010-01-01',
  },

  // StackOverflow configuration (if enabled)
  stackoverflow: {
    userId: '',
    apiKey: '', // Optional, get from stackapps.com
  },

  // Music configuration (if enabled)
  music: {
    spotify: {
      userId: '',
      playlists: [], // Playlist IDs to embed
    },
    soundcloud: {
      username: '',
    },
  },

  // Database path
  database: '/stats.db',

  // Theme colors
  theme: {
    primary: '#ffffff',
    background: '#000000',
    accent: '#ffffff',
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Your Name`,
    license: 'BSD-3-Clause',
    showStarFork: true,
    repoUrl: 'https://github.com/your-username/home',
  },
}

export default config
