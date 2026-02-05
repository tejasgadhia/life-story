import { memo } from 'react'
import { TABS } from '../../config/tabs'
import { useTabState } from '../../hooks/useTabState'
import { CelebrityList } from '../shared/CelebrityList'

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

function CaseFileTheme({ data, currentTab: propTab = 0, setTab: propSetTab, fontSize = 'base' }) {
  const [activeTab, setActiveTab] = useTabState(propTab, propSetTab)

  // Font size mapping
  const fontSizeClasses = { sm: 'content-scale-sm', base: 'content-scale-base', lg: 'content-scale-lg' }
  const contentFontSize = fontSizeClasses[fontSize] || 'text-base'

  const getContent = (key) => data.sections[key]?.html || ''

  const renderBirthdaySection = () => (
    <div className="bg-vintage-cream/30 border-2 border-sepia-brown/20 p-4 md:p-6">
      <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-sepia-brown/70 tracking-wider border-b-2 border-sepia-brown/30 pb-2">
        SUBJECT PROFILE
      </h3>

      {/* Subject Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-base mb-6 md:mb-8">
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">DATE OF BIRTH</span>
          <span className="font-bold text-base md:text-lg">{data.birthDate}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">CASE NUMBER</span>
          <span className="font-bold text-base md:text-lg">LS-{data.birthYear}-{String(data.birthMonth).padStart(2, '0')}{String(data.birthDay).padStart(2, '0')}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">GENERATION</span>
          <span className="font-bold text-base md:text-lg">{data.generation}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">COHORT SPAN</span>
          <span className="font-bold text-base md:text-lg">{data.generationSpan}</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">BIRTHDAY RANK</span>
          <span className="font-bold text-base md:text-lg">#{data.birthdayRank} of 366</span>
        </div>
        <div className="border-b-2 border-sepia-brown/30 pb-3">
          <span className="text-sepia-brown/70 block text-xs md:text-sm mb-1">PERCENTILE</span>
          <span className="font-bold text-base md:text-lg">{data.birthdayPercentile}%</span>
        </div>
      </div>

      {/* Classification stamps */}
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center my-6 md:my-8">
        <div className="border-4 border-muted-red text-muted-red px-4 md:px-6 py-2 md:py-3 rotate-[-3deg] font-bold text-sm md:text-lg tracking-wider">
          CLASSIFIED
        </div>
        <div className="border-4 border-muted-blue text-muted-blue px-4 md:px-6 py-2 md:py-3 rotate-[2deg] font-bold text-sm md:text-lg tracking-wider">
          PERSONAL FILE
        </div>
      </div>
    </div>
  )

  const renderSection = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    const content = getContent(config.key)
    if (!content) return null

    return (
      <div className="bg-vintage-cream/30 border-2 border-sepia-brown/20 p-4 md:p-6 h-full">
        <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-sepia-brown/70 tracking-wider border-b-2 border-sepia-brown/30 pb-2">
          {config.title.toUpperCase()}
        </h3>
        <div
          className={`${contentFontSize} leading-[1.8]
                   [&>h2]:hidden
                   [&>p]:mb-4
                   [&>strong]:font-bold
                   [&_.hero-callout]:bg-manila/30
                   [&_.hero-callout]:border-muted-red
                   [&_.hero-callout]:text-dark-brown
                   [&_.pull-quote]:text-xl
                   [&_.pull-quote]:border-sepia-brown/40
                   [&_.pull-quote]:text-dark-brown
                   [&_.stat-box]:bg-muted-red
                   [&_.stat-box]:text-vintage-cream`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  const currentTabData = TABS[activeTab]

  return (
    <div className="min-h-screen bg-zinc-800 p-4 md:p-6 font-typewriter">
      {/* Manila folder container */}
      <div className="max-w-6xl mx-auto">
        {/* File tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-0 relative -mx-1 px-1">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`min-w-fit px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide rounded-t-lg
                        relative flex-1 text-center whitespace-nowrap transition-colors duration-200
                        active:scale-[0.98] focus:ring-2 focus:ring-sepia-brown/50 focus:outline-none
                ${activeTab === index
                  ? 'bg-manila text-dark-brown z-10 -mb-px border-t-2 border-x-2 border-sepia-brown/30'
                  : 'bg-sepia-brown/40 text-vintage-cream/80 hover:bg-sepia-brown/60'
                }`}
            >
              <span className="hidden sm:inline">{tab.title}</span>
              <span className="sm:hidden">{tab.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main folder */}
        <div className="bg-manila rounded-b-lg rounded-tr-lg shadow-2xl relative">
          {/* Paperclip decoration */}
          <div className="absolute -top-2 left-10 w-10 h-20 z-20 text-metal-gray">
            <svg viewBox="0 0 32 64" className="w-full h-full drop-shadow-lg">
              <path
                d="M16 4 C8 4 4 10 4 18 L4 46 C4 54 10 60 18 60 C26 60 30 54 30 46 L30 18 C30 12 26 8 20 8 L20 46 C20 50 18 52 16 52 C14 52 12 50 12 46 L12 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Classification header */}
          <div className="bg-dark-brown text-vintage-cream py-3 md:py-4 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 rounded-tr-lg">
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-muted-red font-bold text-sm md:text-base">● CONFIDENTIAL</span>
              <span className="text-xs md:text-sm opacity-70 hidden sm:inline">LIFE STORY DIVISION</span>
            </div>
            <div className="text-xs md:text-sm opacity-70">
              FILE: LS-{data.birthYear}-{String(data.birthMonth).padStart(2, '0')}{String(data.birthDay).padStart(2, '0')}
            </div>
          </div>

          {/* Document content - standardized responsive padding */}
          <div className="p-4 md:p-6 min-h-[400px] md:min-h-[600px]">
            {/* Section header */}
            <div className="border-b-4 border-dark-brown pb-3 md:pb-4 mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-dark-brown uppercase tracking-wider">
                {currentTabData.title}
              </h2>
              <p className="text-sm md:text-base text-sepia-brown mt-1">
                Section {activeTab + 1} of {TABS.length} • Classification: PERSONAL
              </p>
            </div>

            {/* Content */}
            <div className="text-dark-brown">
              {activeTab === 0 ? (
                /* Overview with special birthday layout */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2">
                      {renderBirthdaySection()}
                    </div>
                    {renderSection('generation')}
                    {renderSection('comparison')}
                  </div>
                  <CelebrityList celebrities={data.celebrities} variant="casefile" />
                </div>
              ) : (
                /* Other tabs - 3 sections */
                <div className="grid grid-cols-1 lg:grid-cols-2 desktop:grid-cols-3 gap-6">
                  {currentTabData.sections.map((sectionId) => (
                    <div key={sectionId}>
                      {renderSection(sectionId)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer - standardized responsive padding */}
          <div className="bg-sepia-brown/20 px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-sm md:text-base text-sepia-brown rounded-b-lg">
            <div className="text-xs md:text-base">
              Document generated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-2 md:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className="flex-1 sm:flex-none px-4 md:px-5 py-3 bg-dark-brown text-vintage-cream rounded text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sepia-brown transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sepia-brown/50 focus:ring-offset-1"
              >
                ← Prev
              </button>
              <button
                onClick={() => setActiveTab(Math.min(TABS.length - 1, activeTab + 1))}
                disabled={activeTab === TABS.length - 1}
                className="flex-1 sm:flex-none px-4 md:px-5 py-3 bg-dark-brown text-vintage-cream rounded text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sepia-brown transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sepia-brown/50 focus:ring-offset-1"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs md:text-sm text-zinc-500 mt-6 md:mt-10 max-w-lg mx-auto leading-relaxed px-4">
        This report analyzes US cultural and historical context. For entertainment purposes only.
      </p>
    </div>
  )
}

export default memo(CaseFileTheme)
