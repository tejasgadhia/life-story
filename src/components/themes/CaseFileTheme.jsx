import { useState } from 'react'

const TABS = [
  { 
    id: 'overview', 
    title: 'Overview', 
    sections: ['birthday', 'generation', 'comparison']
  },
  { 
    id: 'formative', 
    title: 'Formative Years', 
    sections: ['childhood', 'popculture', 'technology']
  },
  { 
    id: 'world', 
    title: 'World Events', 
    sections: ['history', 'career', 'financial']
  },
  { 
    id: 'personal', 
    title: 'Personal Insights', 
    sections: ['relationships', 'blindspots', 'roadmap']
  },
]

const SECTION_CONFIG = {
  birthday: { title: 'Subject Profile', key: null },
  generation: { title: 'Cohort Analysis', key: 'generational_identity' },
  comparison: { title: 'Statistical Comparison', key: 'comparison' },
  childhood: { title: 'Background Intel', key: 'childhood_context' },
  popculture: { title: 'Cultural Markers', key: 'pop_culture' },
  technology: { title: 'Tech History', key: 'technology' },
  history: { title: 'Timeline of Events', key: 'historical_milestones' },
  career: { title: 'Employment Profile', key: 'career' },
  financial: { title: 'Economic Analysis', key: 'financial' },
  relationships: { title: 'Social Profile', key: 'relationships' },
  blindspots: { title: 'Risk Factors', key: 'blind_spots' },
  roadmap: { title: 'Future Projections', key: 'life_roadmap' },
}

function CaseFileTheme({ data, currentTab: propTab = 0, setTab: propSetTab }) {
  const [internalTab, setInternalTab] = useState(propTab)
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  const getContent = (key) => data.sections[key]?.html || ''

  const renderBirthdaySection = () => (
    <div className="bg-vintage-cream/30 border-2 border-sepia-brown/20 p-6">
      <h3 className="font-bold text-lg mb-6 text-sepia-brown/70 tracking-wider border-b-2 border-sepia-brown/30 pb-2">
        SUBJECT PROFILE
      </h3>
      
      {/* Subject Info Grid */}
      <div className="grid grid-cols-2 gap-6 text-base mb-8">
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">DATE OF BIRTH</span>
          <span className="font-bold text-lg">{data.birthDate}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">CASE NUMBER</span>
          <span className="font-bold text-lg">LS-{data.birthYear}-0609</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">GENERATION</span>
          <span className="font-bold text-lg">{data.generation}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">COHORT SPAN</span>
          <span className="font-bold text-lg">{data.generationSpan}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">BIRTHDAY RANK</span>
          <span className="font-bold text-lg">#{data.birthdayRank} of 366</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-sm mb-1">PERCENTILE</span>
          <span className="font-bold text-lg">{data.birthdayPercentile}%</span>
        </div>
      </div>

      {/* Classification stamps */}
      <div className="flex gap-6 justify-center my-8">
        <div className="border-4 border-muted-red text-muted-red px-6 py-3 rotate-[-3deg] font-bold text-lg tracking-wider">
          CLASSIFIED
        </div>
        <div className="border-4 border-muted-blue text-muted-blue px-6 py-3 rotate-[2deg] font-bold text-lg tracking-wider">
          PERSONAL FILE
        </div>
      </div>

      {/* Known Associates */}
      <div>
        <h4 className="font-bold text-base mb-4 text-sepia-brown/70 tracking-wider">KNOWN BIRTHDAY ASSOCIATES:</h4>
        <div className="bg-vintage-cream/50 p-4 border-2 border-sepia-brown/20">
          <div className="grid grid-cols-2 gap-2">
            {data.celebrities.map((celeb, i) => (
              <div key={i} className="py-2 text-base">• {celeb}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSection = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    const content = getContent(config.key)
    if (!content) return null

    return (
      <div className="bg-vintage-cream/30 border-2 border-sepia-brown/20 p-6 h-full">
        <h3 className="font-bold text-lg mb-4 text-sepia-brown/70 tracking-wider border-b-2 border-sepia-brown/30 pb-2">
          {config.title.toUpperCase()}
        </h3>
        <div 
          className="text-base leading-[1.8] 
                   [&>h2]:hidden 
                   [&>p]:mb-4 
                   [&>p:first-of-type]:font-bold
                   [&>strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  const currentTabData = TABS[activeTab]

  return (
    <div className="min-h-screen bg-zinc-800 p-6 md:p-10 font-typewriter">
      {/* Manila folder container */}
      <div className="max-w-6xl mx-auto">
        {/* File tabs */}
        <div className="flex gap-1 mb-0 relative">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide rounded-t-lg
                        transition-all relative flex-1 text-center
                ${activeTab === index 
                  ? 'bg-manila text-dark-brown z-10 -mb-px border-t-2 border-x-2 border-sepia-brown/30' 
                  : 'bg-sepia-brown/40 text-vintage-cream/80 hover:bg-sepia-brown/60'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Main folder */}
        <div className="bg-manila rounded-b-lg rounded-tr-lg shadow-2xl relative">
          {/* Paperclip decoration */}
          <div className="absolute -top-2 left-10 w-10 h-20 z-20">
            <svg viewBox="0 0 32 64" className="w-full h-full drop-shadow-lg">
              <path
                d="M16 4 C8 4 4 10 4 18 L4 46 C4 54 10 60 18 60 C26 60 30 54 30 46 L30 18 C30 12 26 8 20 8 L20 46 C20 50 18 52 16 52 C14 52 12 50 12 46 L12 18"
                fill="none"
                stroke="#8B8B8B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Classification header */}
          <div className="bg-dark-brown text-vintage-cream py-4 px-8 flex justify-between items-center rounded-tr-lg">
            <div className="flex items-center gap-6">
              <span className="text-muted-red font-bold text-base">● CONFIDENTIAL</span>
              <span className="text-sm opacity-70">LIFE STORY DIVISION</span>
            </div>
            <div className="text-sm opacity-70">
              FILE: LS-{data.birthYear}-0609 • {currentTabData.title.toUpperCase()}
            </div>
          </div>

          {/* Document content */}
          <div className="p-8 md:p-12 min-h-[600px]">
            {/* Section header */}
            <div className="border-b-4 border-dark-brown pb-4 mb-8">
              <h2 className="text-2xl font-bold text-dark-brown uppercase tracking-wider">
                {currentTabData.title}
              </h2>
              <p className="text-base text-sepia-brown mt-1">
                Section {activeTab + 1} of {TABS.length} • Classification: PERSONAL
              </p>
            </div>

            {/* Content */}
            <div className="text-dark-brown">
              {activeTab === 0 ? (
                /* Overview with special birthday layout */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    {renderBirthdaySection()}
                  </div>
                  {renderSection('generation')}
                  {renderSection('comparison')}
                </div>
              ) : (
                /* Other tabs - 3 sections */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {currentTabData.sections.map((sectionId) => (
                    <div key={sectionId}>
                      {renderSection(sectionId)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-sepia-brown/20 px-8 py-4 flex justify-between items-center text-base text-sepia-brown rounded-b-lg">
            <div>
              Document generated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className="px-5 py-2 bg-dark-brown text-vintage-cream rounded text-base disabled:opacity-30 hover:bg-sepia-brown transition-colors"
              >
                ← Previous
              </button>
              <button 
                onClick={() => setActiveTab(Math.min(TABS.length - 1, activeTab + 1))}
                disabled={activeTab === TABS.length - 1}
                className="px-5 py-2 bg-dark-brown text-vintage-cream rounded text-base disabled:opacity-30 hover:bg-sepia-brown transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-sm text-zinc-500 mt-10 max-w-lg mx-auto leading-relaxed">
        This report analyzes US cultural and historical context. For entertainment purposes only.
      </p>
    </div>
  )
}

export default CaseFileTheme
