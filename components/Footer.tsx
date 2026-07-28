'use client'

interface FooterProps {
  copyright: string
  license: string
  repoUrl?: string
  showStarFork?: boolean
}

export function Footer({ copyright, license, repoUrl, showStarFork }: FooterProps) {
  return (
    <footer>
      {showStarFork && repoUrl && (
        <div className="footer-links">
          <a href={repoUrl} target="_blank">
            ⭐ Star
          </a>
          <span>·</span>
          <a href={`${repoUrl}/fork`} target="_blank">
            🍴 Fork
          </a>
          <span>·</span>
          <a href={repoUrl} target="_blank">
            Source
          </a>
        </div>
      )}

      <p>
        Built with{' '}
        <a href="https://github.com/hanzoai/home" target="_blank">
          @hanzo/home
        </a>
      </p>

      <p className="copyright">{copyright}</p>

      {license && <p className="license">{license}</p>}

      <p className="updated">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </footer>
  )
}
