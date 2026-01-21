import { useState } from 'react'

const TABS = [
  { 
    id: 'overview', 
    title: 'Overview', 
    icon: '📊',
    sections: ['birthday', 'generation', 'comparison']
  },
  { 
    id: 'formative', 
    title: 'Formative Years', 
    icon: '💒',
    sections: ['childhood', 'popculture', 'technology']
  },
  { 
    id: 'world', 
    title: 'World Events', 
    icon: '🌍',
    sections: ['history', 'career', 'financial']
  },
  { 
    id: 'personal', 
    title: 'Personal Insights', 
    icon: '💡',
    sections: ['relationships', 'blindspots', 'roadmap']
  },
]

const SECTION_CONFIG = {
  birthday: { title: 'Birthday Analysis', icon: '🎂', key: null },
  generation: { title: 'Your Generation', icon: '👥', key: 'generational_identity' },
  comparison: { title: 'Generational Comparison', icon: '📈', key: 'comparison' },
  childhood: { title: 'Childhood', icon: '💒', key: 'childhood_context' },
  popculture: { title: 'Pop Culture', icon: '🎬', key: 'pop_culture' },
  technology: { title: 'Technology', icon: '💻', key: 'technology' },
  history: { title: 'Historical Milestones', icon: '📜', key: 'historical_milestones' },
  career: { title: 'Career', icon: '💼', key: 'career' },
  financial: { title: 'Financial', icon: '💰', key: 'financial' },
  relationships: { title: 'Relationships', icon: '💬', key: 'relationships' },
  blindspots: { title: 'Blind Spots', icon: '🔍', key: 'blind_spots' },
  roadmap: { title: 'Life Roadmap', icon: '🗺️', key: 'life_roadmap' },
}

const getWikiUrl = (name) => `https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`

function TimelineTheme({ data, currentTab: propTab = 0, setTab: propSetTab, fontSize = 'base' }) {
  const [internalTab, setInternalTab] = useState(propTab)
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  const fontSizeClasses = {
    sm: 'text-sm [&>p]:text-sm',
    base: 'text-base [&>p]:text-base',
    lg: 'text-lg [&>p]:text-lg',
  }

  const getSectionContent = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    if (!config?.key) return null
    return data.sections[config.key]?.html
  }

  const renderBirthdaySection = () => (
    <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-6">
      {/* Consolidated header - 3 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Left - Generation */}
        <div className="aged-paper rounded-lg p-5 border border-sepia-brown/20 text-center flex flex-col justify-center">
          <p className="font-body text-xs uppercase tracking-wider text-sepia-brown/70 mb-1">Generation</p>
          <p className="font-display text-2xl text-dark-brown">{data.generation}</p>
          <p className="font-body text-sm text-sepia-brown/70">{data.generationSpan}</p>
        </div>

        {/* Center - Birthday (accent color) */}
        <div className="bg-dark-brown text-vintage-cream rounded-lg p-5 text-center flex flex-col justify-center">
          <span className="text-4xl mb-2 block">🎂</span>
          <h2 className="font-display text-2xl mb-1">{data.birthDate}</h2>
          <p className="font-body text-sm opacity-70">Your Life Story Report</p>
        </div>

        {/* Right - Rank/Percentile */}
        <div className="aged-paper rounded-lg p-5 border border-sepia-brown/20 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-display text-dark-brown">#{data.birthdayRank}</p>
              <p className="font-body text-xs text-sepia-brown">Rank</p>
            </div>
            <div className="w-px h-10 bg-sepia-brown/30" />
            <div className="text-center">
              <p className="text-2xl font-display text-dark-brown">{data.birthdayPercentile}%</p>
              <p className="font-body text-xs text-sepia-brown">Percentile</p>
            </div>
          </div>
          <p className="font-body text-xs text-sepia-brown/60 mt-2">
            {data.birthdayRank < 183 ? 'More common' : 'Less common'} than avg
          </p>
        </div>
      </div>

      {/* Celebrity Birthdays */}
      <div className="mt-6">
        <p className="font-body text-xs text-sepia-brown uppercase tracking-wider mb-4 text-center">
          You share your birthday with
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {data.celebrities.map((celeb, i) => (
            <a 
              key={i}
              href={getWikiUrl(celeb.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-aged-paper px-3 py-2 rounded font-body text-sm text-dark-brown 
                       hover:bg-sepia-brown hover:text-vintage-cream transition-colors
                       border border-sepia-brown/20"
              title={celeb.description}
            >
              {celeb.name} ({celeb.year})
            </a>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSection = (sectionId) => {
    if (sectionId === 'birthday') return renderBirthdaySection()
    
    const config = SECTION_CONFIG[sectionId]
    const content = getSectionContent(sectionId)
    if (!content) return null

    return (
      <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-6 h-full">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sepia-brown/20">
          <span className="text-2xl">{config.icon}</span>
          <h2 className="font-display text-xl text-dark-brown">{config.title}</h2>
        </div>
        
        <div 
          className={`font-body text-dark-brown/90 leading-relaxed
                   [&>h2]:hidden 
                   [&>p]:mb-4 
                   [&>p]:leading-[1.7]
                   [&>strong]:font-bold
                   ${fontSizeClasses[fontSize]}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  const currentTabData = TABS[activeTab]

  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Header */}
      <header className="bg-dark-brown text-vintage-cream py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-xl text-center">Life Story</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-aged-paper border-b border-sepia-brown/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-body text-sm transition-all border-b-2
                  ${activeTab === index 
                    ? 'border-dark-brown text-dark-brown font-bold bg-vintage-cream' 
                    : 'border-transparent text-sepia-brown hover:text-dark-brown hover:bg-vintage-cream/50'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 0 ? (
          <div className="space-y-6">
            {renderBirthdaySection()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderSection('generation')}
              {renderSection('comparison')}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {currentTabData.sections.map((sectionId) => (
              <div key={sectionId}>
                {renderSection(sectionId)}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-aged-paper py-4 border-t border-sepia-brown/20">
        <p className="font-body text-xs text-sepia-brown/60 max-w-2xl mx-auto text-center leading-relaxed px-6">
          This report analyzes US cultural and historical context. Generational 
          characteristics are research-based generalizations. Birthday data: FiveThirtyEight. 
          Generational definitions: Pew Research Center.
        </p>
      </footer>
    </div>
  )
}

export default TimelineTheme
