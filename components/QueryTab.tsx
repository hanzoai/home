'use client'

import { useState } from 'react'
import { QueryResults } from '@hanzo/stats'
import { useStats } from './StatsProvider'

const defaultQuery = `SELECT
    strftime('%Y-%m', date) as month,
    COUNT(*) as commits,
    SUM(additions) as additions,
    SUM(deletions) as deletions
FROM commits
GROUP BY month
ORDER BY month DESC
LIMIT 12;`

export function QueryTab() {
  const { db, dbLoading } = useStats()
  const [query, setQuery] = useState(defaultQuery)
  const [results, setResults] = useState<{ columns: string[]; values: any[][] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const runQuery = async () => {
    if (!db || !query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const result = await db.exec(query)
      if (result.length > 0) {
        setResults(result[0])
      } else {
        setResults({ columns: [], values: [] })
      }
    } catch (e: any) {
      setError(e.message)
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  if (dbLoading) {
    return <div className="loading">Loading database...</div>
  }

  return (
    <section className="stats-section">
      <div className="section-header">
        <h2>🔍 Query My Data</h2>
      </div>

      <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
        Run SQL queries against my stats data. Data is loaded client-side via sql.js.
      </p>

      <div className="sql-console">
        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="SELECT * FROM commits LIMIT 10;"
          rows={6}
        />
        <button onClick={runQuery} disabled={loading || !db}>
          {loading ? 'Running...' : 'Run Query'}
        </button>

        <div className="sql-results">
          {error && <p className="error">Error: {error}</p>}
          {results && (
            <QueryResults
              columns={results.columns}
              values={results.values}
              maxRows={50}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
        <strong>Available Tables:</strong>
        <code> commits</code> (sha, username, date, repo, message, additions, deletions),
        <code> ai_usage</code> (date, model, input_tokens, output_tokens)
      </div>
    </section>
  )
}
