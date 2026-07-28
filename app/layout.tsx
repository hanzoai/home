import type { Metadata } from 'next'
import { config } from '../stats.config'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: `${config.name} | Personal Homepage`,
  description: config.subtitle,
  openGraph: {
    title: config.name,
    description: config.subtitle,
    images: [config.avatar],
  },
  icons: {
    icon: config.avatar,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
