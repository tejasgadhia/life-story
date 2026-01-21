import { useState } from 'react'

const SECTIONS = [
  { id: 'birthday', title: 'Subject Profile', key: null },
  { id: 'childhood', title: 'Background', key: 'childhood_context' },
  { id: 'generation', title: 'Cohort Analysis', key: 'generational_identity' },
  { id: 'popculture', title: 'Cultural Intel', key: 'pop_culture' },
  { id: 'technology', title: 'Tech History', key: 'technology' },
  { id: 'history', title: 'Timeline', key: 'historical_milestones' },
  { id: 'career', title: 'Employment', key: 'career' },
  { id: 'relationships', title: 'Social Profile', key: 'relationships' },
  { id: 'financial', title: 'Economic', key: 'financial' },
  { id: 'blindspots', title: 'Risk Factors', key: 'blind_spots' },
  { id: 'roadmap', title: 'Projections', key: 'life_roadmap' },
  { id: 'comparison', title: 'Comparison', key: 'comparison' },
]

function CaseFileTheme({ data, currentTab: propTab = 0, setTab: propSetTab }) {
  // Use internal state if no setTab prop (backwards compatible)
  const [internalTab, setInternalTab] = useState(propTab)
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  const renderTabContent = () => {
    const section = SECTIONS[activeTab]
    
    if (section.id === 'birthday') {
      return (
        <div className="space-y-6">
          {/* Subject Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">DATE OF BIRTH:</span>
              <span className="ml-2 font-bold">{data.birthDate}</span>
            </div>
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">CASE NUMBER:</span>
              <span className="ml-2 font-bold">LS-1988-0609</span>
            </div>
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">GENERATION:</span>
              <span className="ml-2 font-bold">{data.generation}</span>
            </div>
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">COHORT SPAN:</span>
              <span className="ml-2 font-bold">{data.generationSpan}</span>
            </div>
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">BIRTHDAY RANK:</span>
              <span className="ml-2 font-bold">#{data.birthdayRank} of 366</span>
            </div>
            <div className="border-b border-sepia-brown/30 pb-2">
              <span className="text-sepia-brown/70">PERCENTILE:</span>
              <span className="ml-2 font-bold">{data.birthdayPercentile}%</span>
            </div>
          </div>

          {/* Classification stamps */}
          <div className="flex gap-4 justify-center my-8">
            <div className="border-2 border-muted-red text-muted-red px-4 py-2 rotate-[-3deg] font-bold text-sm">
              CLASSIFIED
            </div>
            <div className="border-2 border-muted-blue text-muted-blue px-4 py-2 rotate-[2deg] font-bold text-sm">
              PERSONAL FILE
            </div>
          </div>

          {/* Known Associates */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-sepia-brown/70">KNOWN BIRTHDAY ASSOCIATES:</h4>
            <div className="bg-vintage-cream/50 p-4 border border-sepia-brown/20">
              {data.celebrities.map((celeb, i) => (
                <div key={i} className="py-1 border-b border-sepia-brown/10 last:border-0">
                  • {celeb}
                </div>
              ))}
            </div>
          </div>

          {/* Year Events */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-sepia-brown/70">EVENTS AT TIME OF BIRTH:</h4>
            <div className="bg-vintage-cream/50 p-4 border border-sepia-brown/20">
              {data.yearEvents.map((event, i) => (
                <div key={i} className="py-1 border-b border-sepia-brown/10 last:border-0">
                  • {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    const content = data.sections[section.key]?.html
    if (!content) return <p>No data available for this section.</p>

    return (
      <div 
        className="[&>h2]:hidden [&>p]:mb-4 [&>p]:leading-relaxed [&>p:first-of-type]:font-bold"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-zinc-800 p-4 md:p-8 font-typewriter">
      {/* Manila folder container */}
      <div className="max-w-4xl mx-auto">
        {/* File tabs */}
        <div className="flex flex-wrap gap-1 mb-0 relative">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wide rounded-t-lg
                        transition-all relative
                ${activeTab === index 
                  ? 'bg-manila text-dark-brown z-10 -mb-px border-t-2 border-x-2 border-sepia-brown/30' 
                  : 'bg-sepia-brown/40 text-vintage-cream/80 hover:bg-sepia-brown/60'
                }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Main folder */}
        <div className="bg-manila rounded-b-lg rounded-tr-lg shadow-2xl relative">
          {/* Paperclip decoration */}
          <div className="absolute -top-2 left-8 w-8 h-16 z-20">
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
          <div className="bg-dark-brown text-vintage-cream py-3 px-6 flex justify-between items-center rounded-tr-lg">
            <div className="flex items-center gap-4">
              <span className="text-muted-red font-bold text-sm">● CONFIDENTIAL</span>
              <span className="text-xs opacity-70">LIFE STORY DIVISION</span>
            </div>
            <div className="text-xs opacity-70">
              FILE: LS-1988-0609-{String(activeTab + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Document content */}
          <div className="p-8 md:p-12 min-h-[600px]">
            {/* Section header */}
            <div className="border-b-2 border-dark-brown pb-4 mb-6">
              <h2 className="text-2xl font-bold text-dark-brown uppercase tracking-wider">
                Section {activeTab + 1}: {SECTIONS[activeTab].title}
              </h2>
              <p className="text-xs text-sepia-brown mt-1">
                Page {activeTab + 1} of {SECTIONS.length} • Classification: PERSONAL
              </p>
            </div>

            {/* Content */}
            <div className="text-dark-brown leading-relaxed">
              {renderTabContent()}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-sepia-brown/20 px-8 py-4 flex justify-between items-center text-xs text-sepia-brown rounded-b-lg">
            <div>
              Document generated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className="px-3 py-1 bg-dark-brown text-vintage-cream rounded disabled:opacity-30"
              >
                ← Previous
              </button>
              <button 
                onClick={() => setActiveTab(Math.min(SECTIONS.length - 1, activeTab + 1))}
                disabled={activeTab === SECTIONS.length - 1}
                className="px-3 py-1 bg-dark-brown text-vintage-cream rounded disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Hole punches decoration */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-32">
          <div className="w-6 h-6 rounded-full bg-zinc-800 border-4 border-zinc-600" />
          <div className="w-6 h-6 rounded-full bg-zinc-800 border-4 border-zinc-600" />
          <div className="w-6 h-6 rounded-full bg-zinc-800 border-4 border-zinc-600" />
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-zinc-500 mt-8 max-w-md mx-auto">
        This report analyzes US cultural and historical context. For entertainment purposes only.
      </p>
    </div>
  )
}

export default CaseFileTheme
