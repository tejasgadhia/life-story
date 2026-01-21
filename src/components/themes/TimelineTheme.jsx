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

function TimelineTheme({ data, currentTab: propTab = 0, setTab: propSetTab }) {
  const [internalTab, setInternalTab] = useState(propTab)
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  const getSectionContent = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    if (!config?.key) return null
    return data.sections[config.key]?.html
  }

  const renderBirthdaySection = () => (
    <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-8">
      <div className="text-center mb-8">
        <span className="text-5xl mb-4 block">🎂</span>
        <h2 className="font-display text-3xl text-dark-brown mb-2">
          {data.birthDate}
        </h2>
        <p className="font-accent text-lg text-sepia-brown">
          Your Life Story Report
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="aged-paper rounded-lg p-6 border border-sepia-brown/20 text-center">
          <p className="text-4xl font-display text-dark-brown mb-1">
            #{data.birthdayRank}
          </p>
          <p className="font-body text-sm text-sepia-brown">Birthday Rank</p>
          <p className="font-body text-xs text-sepia-brown/70 mt-1">out of 366 dates</p>
        </div>

        <div className="bg-dark-brown text-vintage-cream rounded-lg p-6 text-center">
          <p className="font-body text-xs uppercase tracking-wider opacity-70 mb-1">Generation</p>
          <p className="font-display text-2xl mb-1">{data.generation}</p>
          <p className="font-body text-sm opacity-70">{data.generationSpan}</p>
        </div>

        <div className="aged-paper rounded-lg p-6 border border-sepia-brown/20 text-center">
          <p className="text-4xl font-display text-dark-brown mb-1">
            {data.birthdayPercentile}%
          </p>
          <p className="font-body text-sm text-sepia-brown">Percentile</p>
          <p className="font-body text-xs text-sepia-brown/70 mt-1">
            {data.birthdayRank < 183 ? 'more common' : 'less common'} than avg
          </p>
        </div>
      </div>

      {/* Celebrity Birthdays */}
      <div className="text-center">
        <p className="font-body text-xs text-sepia-brown uppercase tracking-wider mb-3">
          You share your birthday with
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {data.celebrities.map((celeb, i) => (
            <span 
              key={i}
              className="bg-aged-paper px-3 py-1.5 rounded font-body text-sm text-dark-brown"
            >
              {celeb}
            </span>
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
      <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-6">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sepia-brown/20">
          <span className="text-2xl">{config.icon}</span>
          <h2 className="font-display text-xl text-dark-brown">{config.title}</h2>
        </div>
        
        <div 
          className="font-body text-dark-brown/90 text-sm leading-relaxed
                   [&>h2]:hidden 
                   [&>p]:mb-4 
                   [&>p]:leading-[1.7]
                   [&>p:first-of-type]:font-accent
                   [&>p:first-of-type]:text-base
                   [&>strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  const currentTabData = TABS[activeTab]

  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Header */}
      <header className="bg-dark-brown text-vintage-cream py-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-display text-2xl text-center">Life Story</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-aged-paper border-b border-sepia-brown/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 font-body text-sm transition-all border-b-2
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
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentTabData.sections.map((sectionId) => (
            <div key={sectionId} className={sectionId === 'birthday' ? 'lg:col-span-3' : ''}>
              {renderSection(sectionId)}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-aged-paper py-6 border-t border-sepia-brown/20">
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
