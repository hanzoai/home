'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useStatsDB, useGitHubStats, useAIStats } from '@hanzo/stats'
import { config } from '../stats.config'
import type { StatsDB, GitHubStats, AIStats } from '@hanzo/stats'

interface StatsContextType {
  db: StatsDB | null
  dbLoading: boolean
  github: GitHubStats | null
  githubLoading: boolean
  ai: AIStats | null
  aiLoading: boolean
}

const StatsContext = createContext<StatsContextType>({
  db: null,
  dbLoading: true,
  github: null,
  githubLoading: true,
  ai: null,
  aiLoading: true,
})

export function StatsProvider({ children }: { children: ReactNode }) {
  const { db, loading: dbLoading } = useStatsDB(config.database)
  const { stats: github, loading: githubLoading } = useGitHubStats('/api/github/stats')
  const { stats: ai, loading: aiLoading } = useAIStats('/api/ai/stats')

  return (
    <StatsContext.Provider
      value={{
        db,
        dbLoading,
        github,
        githubLoading,
        ai,
        aiLoading,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  return useContext(StatsContext)
}
