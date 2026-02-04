import { useState } from 'react'

const TABS = [
  { 
    id: 'overview', 
    slug: 'overview',
    title: 'Overview', 
    icon: '📊',
    sections: ['birthday', 'generation', 'comparison']
  },
  { 
    id: 'formative', 
    slug: 'formative-years',
    title: 'Formative Years', 
    icon: '💒',
    sections: ['childhood', 'popculture', 'technology']
  },
  { 
    id: 'world', 
    slug: 'world-events',
    title: 'World Events', 
    icon: '🌍',
    sections: ['history', 'career', 'financial']
  },
  { 
    id: 'personal', 
    slug: 'personal-insights',
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

// Export TABS for use in App.jsx routing
export { TABS }

function TimelineTheme({ data, currentTab: propTab = 0, setTab: propSetTab, fontSize = 'base' }) {
  const [internalTab, setInternalTab] = useState(propTab)
  const [celebritiesExpanded, setCelebritiesExpanded] = useState(false)
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  // Font size scaling for all text elements
  const fontSizeClasses = {
    sm: '[&_p]:text-sm [&_h2]:text-lg [&_h3]:text-base [&_strong]:text-sm',
    base: '[&_p]:text-base [&_h2]:text-xl [&_h3]:text-lg [&_strong]:text-base',
    lg: '[&_p]:text-lg [&_h2]:text-2xl [&_h3]:text-xl [&_strong]:text-lg',
  }

  const getSectionContent = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    if (!config?.key) return null
    return data.sections[config.key]?.html
  }

  const renderBirthdaySection = () => (
    <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-4 md:p-6">
      {/* 2-column layout for Generation + Rank/Percentile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch">
        {/* Left - Generation */}
        <div className="aged-paper rounded-lg p-4 md:p-5 border border-sepia-brown/20 text-center flex flex-col justify-center">
          <p className="font-body text-xs uppercase tracking-wider text-sepia-brown/70 mb-1">Generation</p>
          <p className="font-display text-xl md:text-2xl text-dark-brown">{data.generation}</p>
          <p className="font-body text-sm text-sepia-brown/70">{data.generationSpan}</p>
        </div>

        {/* Right - Rank/Percentile */}
        <div className="aged-paper rounded-lg p-4 md:p-5 border border-sepia-brown/20 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-display text-dark-brown">#{data.birthdayRank}</p>
              <p className="font-body text-xs text-sepia-brown">Rank</p>
            </div>
            <div className="w-px h-10 bg-sepia-brown/30" />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-display text-dark-brown">{data.birthdayPercentile}%</p>
              <p className="font-body text-xs text-sepia-brown">Percentile</p>
            </div>
          </div>
          <p className="font-body text-xs text-sepia-brown/60 mt-2">
            {data.birthdayRank < 183 ? 'More common' : 'Less common'} than avg (of 366)
          </p>
        </div>
      </div>

    </div>
  )

  const renderCelebritySection = () => {
    const visibleCelebrities = celebritiesExpanded
      ? data.celebrities
      : data.celebrities.slice(0, 10)
    const hasMore = data.celebrities.length > 10

    return (
      <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-4 md:p-6">
        <p className="font-body text-xs text-sepia-brown uppercase tracking-wider mb-3 md:mb-4 text-center">
          You share your birthday with
        </p>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2">
            {visibleCelebrities.map((celeb, i) => (
              <a
                key={i}
                href={getWikiUrl(celeb.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-aged-paper px-3 py-3 rounded font-body text-sm text-dark-brown
                         hover:bg-sepia-brown hover:text-vintage-cream transition-colors duration-200
                         border border-sepia-brown/20 text-center sm:text-left
                         focus:outline-none focus:ring-2 focus:ring-dark-brown/50 focus:ring-offset-1"
                title={celeb.description}
              >
                {celeb.name} ({celeb.year})
              </a>
            ))}
          </div>
        </div>
        {hasMore && (
          <button
            onClick={() => setCelebritiesExpanded(!celebritiesExpanded)}
            className="mt-4 mx-auto px-4 py-2 text-sm font-body text-sepia-brown/70
                       hover:text-sepia-brown transition-colors duration-200 flex items-center gap-2
                       focus:outline-none focus:ring-2 focus:ring-dark-brown/30 focus:ring-offset-1 rounded"
          >
            {celebritiesExpanded ? 'Show less' : `Show all ${data.celebrities.length}`}
            <span className={`transition-transform duration-300 ${celebritiesExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        )}
      </div>
    )
  }

  const renderSection = (sectionId) => {
    if (sectionId === 'birthday') return renderBirthdaySection()

    const config = SECTION_CONFIG[sectionId]
    const content = getSectionContent(sectionId)
    if (!content) return null

    return (
      <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-4 md:p-6 h-full">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 pb-3 border-b border-sepia-brown/20">
          <span className="text-xl md:text-2xl">{config.icon}</span>
          <h2 className="font-display text-lg md:text-xl text-dark-brown">{config.title}</h2>
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
      {/* Header - Now includes birthday */}
      <header className="bg-dark-brown text-vintage-cream py-3">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <h1 className="font-display text-base md:text-lg hidden sm:block">Life Story</h1>
          <div className="text-center flex-1 sm:flex-none">
            <span className="text-xl md:text-2xl mr-1 md:mr-2">🎂</span>
            <span className="font-display text-lg md:text-xl">{data.birthDate}</span>
          </div>
          <p className="font-body text-xs md:text-sm text-vintage-cream/70 hidden sm:block">Your Life Story Report</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-aged-paper border-b border-sepia-brown/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 md:justify-center gap-1 md:gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`min-w-fit px-3 md:px-6 py-3 font-body text-sm border-b-2 whitespace-nowrap
                  transition-colors duration-200 active:scale-[0.98] focus:ring-2 focus:ring-dark-brown/30 focus:outline-none
                  ${activeTab === index
                    ? 'border-dark-brown text-dark-brown font-bold bg-vintage-cream'
                    : 'border-transparent text-sepia-brown hover:text-dark-brown hover:bg-vintage-cream/50'
                  }`}
              >
                <span className="mr-1 md:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.title}</span>
                <span className="sm:hidden">{tab.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {activeTab === 0 ? (
          <div className="space-y-4 md:space-y-6">
            {renderBirthdaySection()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {renderSection('generation')}
              {renderSection('comparison')}
            </div>
            {renderCelebritySection()}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
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
        <p className="font-body text-xs text-sepia-brown/60 max-w-2xl mx-auto text-center leading-relaxed px-4 md:px-6">
          This report analyzes US cultural and historical context. Generational
          characteristics are research-based generalizations. Birthday data: FiveThirtyEight.
          Generational definitions: Pew Research Center.
        </p>
      </footer>
    </div>
  )
}

export default TimelineTheme
