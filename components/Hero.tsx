'use client'

import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  subtitle: string
  avatar: string
  links: Record<string, string>
}

const socialIcons: Record<string, JSX.Element> = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  twitter: <span className="text-sm">𝕏</span>,
  linkedin: <span className="text-sm">in</span>,
  facebook: <span className="text-sm">f</span>,
  instagram: <span className="text-sm">ig</span>,
  spotify: <span className="text-sm">♪</span>,
  soundcloud: <span className="text-sm">☁</span>,
  stackoverflow: <span className="text-sm">SO</span>,
}

export function Hero({ name, title, subtitle, avatar, links }: HeroProps) {
  return (
    <section className="hero">
      <Image
        src={avatar}
        alt={name}
        width={180}
        height={180}
        className="avatar"
        priority
      />
      <h1>{name}</h1>
      <p className="subtitle">
        {title} · {subtitle}
      </p>

      <div className="social-links">
        {Object.entries(links).map(([key, url]) => (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer">
            {socialIcons[key] || key}
            <span className="sr-only">{key}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
