import { NextResponse } from 'next/server'
import { config } from '@/stats.config'

export async function GET() {
  try {
    const users = config.github?.users || []

    // Aggregate stats from all configured users
    let totalCommits = 0
    let totalRepos = 0
    let totalLines = 0
    let languages: Record<string, number> = {}

    for (const username of users) {
      // Fetch user repos
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`
            })
          }
        }
      )

      if (!reposRes.ok) continue

      const repos = await reposRes.json()
      totalRepos += repos.length

      // Aggregate language stats
      for (const repo of repos) {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1
        }
      }
    }

    // Convert languages to array sorted by count
    const languageArray = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    return NextResponse.json({
      users,
      totalCommits,
      totalRepos,
      totalLines,
      languages: languageArray,
      since: config.github?.since || '2010-01-01'
    })
  } catch (error) {
    console.error('GitHub stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    )
  }
}
