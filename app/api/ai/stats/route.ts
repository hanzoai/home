import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface AIUsageEntry {
  timestamp: string
  model: string
  input_tokens: number
  output_tokens: number
  cost_usd?: number
}

export async function GET() {
  try {
    // Check for local Claude usage data
    const homeDir = process.env.HOME || process.env.USERPROFILE || ''
    const claudeUsagePath = path.join(homeDir, '.claude', 'usage.json')

    let totalTokens = 0
    let totalCost = 0
    let totalSessions = 0
    let modelBreakdown: Record<string, { tokens: number; sessions: number }> = {}

    if (existsSync(claudeUsagePath)) {
      const data = await readFile(claudeUsagePath, 'utf-8')
      const usage: AIUsageEntry[] = JSON.parse(data)

      for (const entry of usage) {
        const tokens = (entry.input_tokens || 0) + (entry.output_tokens || 0)
        totalTokens += tokens
        totalCost += entry.cost_usd || 0
        totalSessions++

        const model = entry.model || 'unknown'
        if (!modelBreakdown[model]) {
          modelBreakdown[model] = { tokens: 0, sessions: 0 }
        }
        modelBreakdown[model].tokens += tokens
        modelBreakdown[model].sessions++
      }
    }

    // Convert model breakdown to array
    const models = Object.entries(modelBreakdown)
      .sort((a, b) => b[1].tokens - a[1].tokens)
      .map(([name, stats]) => ({
        name,
        tokens: stats.tokens,
        sessions: stats.sessions,
        percentage: totalTokens > 0 ? Math.round((stats.tokens / totalTokens) * 100) : 0
      }))

    return NextResponse.json({
      totalTokens,
      totalCost: Math.round(totalCost * 100) / 100,
      totalSessions,
      models,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI stats' },
      { status: 500 }
    )
  }
}
