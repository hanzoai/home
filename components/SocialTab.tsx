'use client'

import { config } from '../stats.config'

export function SocialTab() {
  return (
    <>
      {/* LinkedIn */}
      {config.links.linkedin && (
        <section className="stats-section">
          <div className="section-header">
            <h2>💼 LinkedIn</h2>
            <a href={config.links.linkedin} className="view-all" target="_blank">
              View Profile →
            </a>
          </div>
          <div className="embed-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Connect with me on LinkedIn for professional updates and networking.
            </p>
            <a
              href={config.links.linkedin}
              target="_blank"
              className="social-button"
              style={{ marginTop: '1rem', display: 'inline-block' }}
            >
              View LinkedIn Profile →
            </a>
          </div>
        </section>
      )}

      {/* Instagram */}
      {config.links.instagram && (
        <section className="stats-section">
          <div className="section-header">
            <h2>📸 Instagram</h2>
            <a href={config.links.instagram} className="view-all" target="_blank">
              View Profile →
            </a>
          </div>
          <div className="embed-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Follow me on Instagram for photos and stories.
            </p>
            <a
              href={config.links.instagram}
              target="_blank"
              className="social-button"
              style={{ marginTop: '1rem', display: 'inline-block' }}
            >
              View Instagram Profile →
            </a>
          </div>
        </section>
      )}

      {/* Twitter/X */}
      {config.links.twitter && (
        <section className="stats-section">
          <div className="section-header">
            <h2>𝕏 Twitter</h2>
            <a href={config.links.twitter} className="view-all" target="_blank">
              View Profile →
            </a>
          </div>
          <div className="embed-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Follow me on X for thoughts, updates, and conversations.
            </p>
            <a
              href={config.links.twitter}
              target="_blank"
              className="social-button"
              style={{ marginTop: '1rem', display: 'inline-block' }}
            >
              Follow on X →
            </a>
          </div>
        </section>
      )}
    </>
  )
}
