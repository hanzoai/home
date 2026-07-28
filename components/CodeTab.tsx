'use client'

import { useQuery, processSqlTemplate, defaultCharts } from '@hanzo/stats'
import { useStats } from './StatsProvider'
import { config } from '../stats.config'

export function CodeTab() {
  const { db, dbLoading } = useStats()

  // Get chart data using SQL queries
  const commitsQuery = useQuery(
    db,
    processSqlTemplate(defaultCharts[0].sql, { users: config.github.users })
  )

  const daysQuery = useQuery(
    db,
    processSqlTemplate(defaultCharts[3].sql, { users: config.github.users })
  )

  if (dbLoading) {
    return <div className="loading">Loading charts...</div>
  }

  return (
    <section className="stats-section">
      <div className="section-header">
        <h2>📈 Coding Activity</h2>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Commits Over Time</h3>
          <div id="commitsChart">
            {commitsQuery.loading ? (
              <div>Loading...</div>
            ) : commitsQuery.error ? (
              <div className="error">{commitsQuery.error.message}</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    {commitsQuery.data?.columns.map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {commitsQuery.data?.values.slice(-12).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="chart-container">
          <h3>Day of Week</h3>
          <div id="daysChart">
            {daysQuery.loading ? (
              <div>Loading...</div>
            ) : daysQuery.error ? (
              <div className="error">{daysQuery.error.message}</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    {daysQuery.data?.columns.map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysQuery.data?.values.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
