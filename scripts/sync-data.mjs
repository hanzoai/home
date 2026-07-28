#!/usr/bin/env node

/**
 * Sync script for @hanzo/home
 * Fetches GitHub commits and generates the stats.db SQLite database
 *
 * Usage: npm run sync
 */

import { execSync } from 'child_process'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Load config
const configPath = join(ROOT, 'stats.config.ts')
let config = {
  github: { users: [], since: '2020-01-01' }
}

// Simple config parser (for ESM compatibility)
try {
  const configText = execSync(`npx tsx -e "import { config } from '${configPath}'; console.log(JSON.stringify(config))"`, {
    encoding: 'utf-8',
    cwd: ROOT
  })
  config = JSON.parse(configText)
} catch (e) {
  console.warn('Could not load config, using defaults')
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const OUTPUT_DB = join(ROOT, 'public', 'stats.db')

async function fetchGitHubData(username) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'hanzo-home-sync'
  }

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }

  console.log(`Fetching data for ${username}...`)

  // Fetch repos
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  )

  if (!reposRes.ok) {
    console.error(`Failed to fetch repos for ${username}: ${reposRes.status}`)
    return { repos: [], commits: [] }
  }

  const repos = await reposRes.json()
  console.log(`  Found ${repos.length} repositories`)

  // Fetch recent commits from each repo
  const commits = []
  const since = config.github?.since || '2020-01-01'

  for (const repo of repos.slice(0, 20)) { // Limit to 20 most recent repos
    try {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${since}&per_page=100`,
        { headers }
      )

      if (commitsRes.ok) {
        const repoCommits = await commitsRes.json()
        for (const commit of repoCommits) {
          commits.push({
            sha: commit.sha,
            repo: repo.name,
            message: commit.commit?.message?.split('\n')[0] || '',
            date: commit.commit?.author?.date || '',
            author: username
          })
        }
      }
    } catch (e) {
      // Skip repos with errors
    }
  }

  console.log(`  Found ${commits.length} commits`)

  return { repos, commits }
}

async function generateSQLiteDB(allRepos, allCommits) {
  // Ensure public directory exists
  const publicDir = dirname(OUTPUT_DB)
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true })
  }

  // Generate SQL statements
  const sql = []

  // Create tables
  sql.push(`
    DROP TABLE IF EXISTS repos;
    DROP TABLE IF EXISTS commits;
    DROP TABLE IF EXISTS daily_commits;

    CREATE TABLE repos (
      id INTEGER PRIMARY KEY,
      name TEXT,
      full_name TEXT,
      description TEXT,
      language TEXT,
      stars INTEGER,
      forks INTEGER,
      created_at TEXT,
      updated_at TEXT,
      owner TEXT
    );

    CREATE TABLE commits (
      sha TEXT PRIMARY KEY,
      repo TEXT,
      message TEXT,
      date TEXT,
      author TEXT
    );

    CREATE TABLE daily_commits (
      date TEXT PRIMARY KEY,
      count INTEGER
    );
  `)

  // Insert repos
  for (const repo of allRepos) {
    const values = [
      repo.id,
      (repo.name || '').replace(/'/g, "''"),
      (repo.full_name || '').replace(/'/g, "''"),
      (repo.description || '').replace(/'/g, "''"),
      repo.language || '',
      repo.stargazers_count || 0,
      repo.forks_count || 0,
      repo.created_at || '',
      repo.updated_at || '',
      repo.owner?.login || ''
    ]
    sql.push(`INSERT INTO repos VALUES (${values[0]}, '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}', ${values[5]}, ${values[6]}, '${values[7]}', '${values[8]}', '${values[9]}');`)
  }

  // Insert commits
  for (const commit of allCommits) {
    const values = [
      commit.sha,
      (commit.repo || '').replace(/'/g, "''"),
      (commit.message || '').replace(/'/g, "''").substring(0, 200),
      commit.date || '',
      commit.author || ''
    ]
    sql.push(`INSERT OR IGNORE INTO commits VALUES ('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}');`)
  }

  // Aggregate daily commits
  sql.push(`
    INSERT INTO daily_commits (date, count)
    SELECT DATE(date) as d, COUNT(*) as c
    FROM commits
    GROUP BY DATE(date)
    ORDER BY d;
  `)

  // Write SQL file
  const sqlPath = join(ROOT, 'public', 'init.sql')
  writeFileSync(sqlPath, sql.join('\n'))
  console.log(`Generated ${sqlPath}`)

  // Generate SQLite DB using sqlite3 if available
  try {
    execSync(`sqlite3 "${OUTPUT_DB}" < "${sqlPath}"`, { cwd: ROOT })
    console.log(`Generated ${OUTPUT_DB}`)
  } catch (e) {
    console.log('sqlite3 not found, database will be generated on first load')
    console.log('The init.sql file has been created for manual import')
  }
}

async function main() {
  console.log('🔄 Syncing stats data...\n')

  const users = config.github?.users || []

  if (users.length === 0) {
    console.log('No GitHub users configured in stats.config.ts')
    console.log('Add users to github.users array to sync data')
    return
  }

  let allRepos = []
  let allCommits = []

  for (const username of users) {
    const { repos, commits } = await fetchGitHubData(username)
    allRepos = allRepos.concat(repos)
    allCommits = allCommits.concat(commits)
  }

  console.log(`\nTotal: ${allRepos.length} repos, ${allCommits.length} commits`)

  await generateSQLiteDB(allRepos, allCommits)

  console.log('\n✅ Sync complete!')
}

main().catch(console.error)
