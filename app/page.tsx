'use client'

import { useState } from 'react'
import { config } from '../stats.config'
import { Hero } from '../components/Hero'
import { Tabs } from '../components/Tabs'
import { OverviewTab } from '../components/OverviewTab'
import { CodeTab } from '../components/CodeTab'
import { MusicTab } from '../components/MusicTab'
import { SocialTab } from '../components/SocialTab'
import { QueryTab } from '../components/QueryTab'
import { Footer } from '../components/Footer'
import { StatsProvider } from '../components/StatsProvider'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'code', label: 'Code' },
  ...(config.features.music ? [{ id: 'music', label: 'Music' }] : []),
  { id: 'social', label: 'Social' },
  { id: 'query', label: 'SQL Query' },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <StatsProvider>
      <main className="container">
        <Hero
          name={config.name}
          title={config.title}
          subtitle={config.subtitle}
          avatar={config.avatar}
          links={config.links}
        />

        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        <div className="tab-content">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'code' && <CodeTab />}
          {activeTab === 'music' && config.features.music && <MusicTab />}
          {activeTab === 'social' && <SocialTab />}
          {activeTab === 'query' && <QueryTab />}
        </div>

        <Footer
          copyright={config.footer.copyright}
          license={config.footer.license}
          repoUrl={config.footer.repoUrl}
          showStarFork={config.footer.showStarFork}
        />
      </main>
    </StatsProvider>
  )
}
