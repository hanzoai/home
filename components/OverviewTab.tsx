'use client'

import { formatNumber, StatCard } from '@hanzo/stats'
import { useStats } from './StatsProvider'
import { config } from '../stats.config'

export function OverviewTab() {
  const { github, githubLoading, ai, aiLoading } = useStats()

  return (
    <>
      {/* GitHub Stats */}
      {config.features.github && (
        <section className="stats-section">
          <div className="section-header">
            <h2>📊 GitHub</h2>
            {config.links.github && (
              <a href={config.links.github} className="view-all" target="_blank">
                View Profile →
              </a>
            )}
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="value">
                {githubLoading ? '-' : formatNumber(github?.total_commits || 0)}
              </div>
              <div className="label">Commits</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {githubLoading ? '-' : formatNumber(github?.repos || 0)}
              </div>
              <div className="label">Repositories</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {githubLoading
                  ? '-'
                  : formatNumber((github?.additions || 0) - (github?.deletions || 0))}
              </div>
              <div className="label">Lines of Code</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {githubLoading || !github?.first_commit
                  ? '-'
                  : (
                      (Date.now() - new Date(github.first_commit).getTime()) /
                      (365.25 * 24 * 60 * 60 * 1000)
                    ).toFixed(1)}
              </div>
              <div className="label">Years Coding</div>
            </div>
          </div>
        </section>
      )}

      {/* AI Stats */}
      {config.features.ai && (
        <section className="stats-section">
          <div className="section-header">
            <h2>🤖 AI Usage</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="value">
                {aiLoading ? '-' : formatNumber(ai?.interactions || 0)}
              </div>
              <div className="label">Interactions</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {aiLoading ? '-' : formatNumber(ai?.input_tokens || 0)}
              </div>
              <div className="label">Input Tokens</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {aiLoading ? '-' : formatNumber(ai?.output_tokens || 0)}
              </div>
              <div className="label">Output Tokens</div>
            </div>
            <div className="stat-card">
              <div className="value">
                {aiLoading ? '-' : formatNumber(ai?.active_days || 0)}
              </div>
              <div className="label">Active Days</div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
