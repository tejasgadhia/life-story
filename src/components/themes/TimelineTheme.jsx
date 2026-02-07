import { memo, useRef, useCallback, useState, useEffect, lazy, Suspense } from 'react'
import { TABS as BASE_TABS } from '../../config/tabs'
import { useTabState } from '../../hooks/useTabState'
import { CelebrityList } from '../shared/CelebrityList'
import {
  LayoutDashboard,
  GraduationCap,
  Globe,
  Lightbulb,
  Cake,
  Users,
  TrendingUp,
  Home,
  Film,
  Monitor,
  Scroll,
  Briefcase,
  DollarSign,
  MessageCircle,
  Search,
  Map
} from 'lucide-react'

const BirthdayHeatMap = lazy(() => import('../shared/BirthdayHeatMap'))

// Tab icon components
const TAB_ICONS = {
  overview: LayoutDashboard,
  formative: GraduationCap,
  world: Globe,
  personal: Lightbulb
}

// Extend base tabs with theme-specific icons
const TABS = BASE_TABS.map(tab => ({
  ...tab,
  Icon: TAB_ICONS[tab.id]
}))

// Tab IDs for ARIA
const getTabId = (tabId) => `timeline-tab-${tabId}`
const getTabPanelId = (tabId) => `timeline-tabpanel-${tabId}`

const SECTION_CONFIG = {
  birthday: { title: 'Birthday Analysis', Icon: Cake, key: null },
  generation: { title: 'Your Generation', Icon: Users, key: 'generational_identity' },
  comparison: { title: 'Generational Comparison', Icon: TrendingUp, key: 'comparison' },
  childhood: { title: 'Childhood', Icon: Home, key: 'childhood_context' },
  popculture: { title: 'Pop Culture', Icon: Film, key: 'pop_culture' },
  technology: { title: 'Technology', Icon: Monitor, key: 'technology' },
  history: { title: 'Historical Milestones', Icon: Scroll, key: 'historical_milestones' },
  career: { title: 'Career', Icon: Briefcase, key: 'career' },
  financial: { title: 'Financial', Icon: DollarSign, key: 'financial' },
  relationships: { title: 'Relationships', Icon: MessageCircle, key: 'relationships' },
  blindspots: { title: 'Blind Spots', Icon: Search, key: 'blind_spots' },
  roadmap: { title: 'Life Roadmap', Icon: Map, key: 'life_roadmap' },
}

// Export TABS for use in App.jsx routing
export { TABS }

function TimelineTheme({ data, currentTab: propTab = 0, setTab: propSetTab }) {
  const [activeTab, setActiveTab] = useTabState(propTab, propSetTab)
  const tabRefs = useRef([])
  const tabListRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isHeatMapOpen, setIsHeatMapOpen] = useState(false)

  const updateScrollIndicators = useCallback(() => {
    const el = tabListRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateScrollIndicators()
    window.addEventListener('resize', updateScrollIndicators)
    return () => window.removeEventListener('resize', updateScrollIndicators)
  }, [updateScrollIndicators])

  useEffect(() => { updateScrollIndicators() }, [activeTab, updateScrollIndicators])

  // Keyboard navigation for tabs (WAI-ARIA APG)
  const handleTabKeyDown = useCallback((e, index) => {
    let newIndex = null
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      newIndex = (index + 1) % TABS.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      newIndex = (index - 1 + TABS.length) % TABS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      newIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      newIndex = TABS.length - 1
    }
    if (newIndex !== null) {
      setActiveTab(newIndex)
      tabRefs.current[newIndex]?.focus()
    }
  }, [setActiveTab])

  const getSectionContent = (sectionId) => {
    const config = SECTION_CONFIG[sectionId]
    if (!config?.key) return null
    return data.sections[config.key]?.html
  }

  const renderBirthdaySection = () => (
    <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-3 sm:p-4 md:p-6">
      {/* 2-column layout for Generation + Rank/Percentile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch">
        {/* Left - Generation */}
        <div className="aged-paper rounded-lg p-4 md:p-5 border border-sepia-brown/20 text-center flex flex-col justify-center">
          <p className="font-sans text-xs uppercase tracking-wider text-sepia-brown mb-1">Generation</p>
          <p className="font-display text-xl md:text-2xl text-dark-brown">{data.generation}</p>
          <p className="font-sans text-sm text-sepia-brown">{data.generationSpan}</p>
        </div>

        {/* Right - Rank/Percentile (clickable → opens heat map) */}
        <button
          onClick={() => setIsHeatMapOpen(true)}
          className="aged-paper rounded-lg p-4 md:p-5 border border-sepia-brown/20 text-center flex flex-col justify-center w-full
                     cursor-pointer hover:border-sepia-brown/40 hover:shadow-md transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dark-brown/30 focus:ring-offset-1"
        >
          <p className="font-sans text-xs uppercase tracking-wider text-sepia-brown mb-2">Birthday Popularity</p>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-display text-dark-brown">#{data.birthdayRank}</p>
              <p className="font-sans text-xs text-sepia-brown">Birthday Rank</p>
            </div>
            <div className="w-px h-10 bg-sepia-brown/30" />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-display text-dark-brown">{data.birthdayPercentile}%</p>
              <p className="font-sans text-xs text-sepia-brown">Popularity</p>
            </div>
          </div>
          <p className="font-sans text-xs text-sepia-brown mt-2">
            Your birthday is {data.birthdayRank < 183 ? 'more' : 'less'} common than the average calendar date
          </p>
          <p className="font-sans text-xs text-dark-brown/60 mt-1">View all 366 days →</p>
        </button>
      </div>

    </div>
  )

  const renderSection = (sectionId) => {
    if (sectionId === 'birthday') return renderBirthdaySection()

    const config = SECTION_CONFIG[sectionId]
    const content = getSectionContent(sectionId)
    if (!content) return null

    return (
      <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-3 sm:p-4 md:p-6 h-full">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 pb-3 border-b border-sepia-brown/20">
          <config.Icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
          <h2 className="font-display text-lg md:text-xl text-dark-brown">{config.title}</h2>
        </div>
        
        <div
          className={`font-sans text-dark-brown/90 leading-relaxed max-w-prose
                   [&>h2]:hidden
                   [&>p]:mb-4
                   [&>p]:leading-[1.7]
                   [&>strong]:font-bold
                   [&_.hero-callout]:bg-aged-paper/60
                   [&_.hero-callout]:border-sepia-brown
                   [&_.hero-callout]:text-dark-brown
                   [&_.pull-quote]:text-xl
                   [&_.pull-quote]:border-sepia-brown/30
                   [&_.pull-quote]:text-dark-brown
                   [&_.stat-box]:bg-dark-brown
                   [&_.stat-box]:text-vintage-cream
                   [&_p]:text-base [&_h2]:text-xl [&_h3]:text-lg [&_strong]:text-base`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  const currentTabData = TABS[activeTab]

  return (
    <div className="min-h-screen bg-vintage-cream overflow-x-hidden">
      {/* Header - Now includes birthday */}
      <header className="bg-dark-brown text-vintage-cream py-3">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <h1 className="font-display text-base md:text-lg hidden sm:block">Life Story</h1>
          <div className="text-center flex-1 sm:flex-none">
            <Cake className="w-5 h-5 md:w-6 md:h-6 mr-1 md:mr-2 inline" aria-hidden="true" />
            <span className="font-display text-lg md:text-xl">{data.birthDate}</span>
          </div>
          <p className="font-sans text-xs md:text-sm text-vintage-cream hidden sm:block">Your Life Story Report</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-aged-paper border-b border-sepia-brown/30 sticky top-0 z-40" aria-label="Report sections">
        <div className="max-w-7xl mx-auto px-2 md:px-6 relative">
          <div 
            ref={tabListRef}
            role="tablist" 
            className="flex overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 md:justify-center gap-1 md:gap-2"
            onScroll={updateScrollIndicators}
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[index] = el)}
                role="tab"
                id={getTabId(tab.id)}
                aria-selected={activeTab === index}
                aria-controls={getTabPanelId(tab.id)}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`min-w-fit px-2 xs:px-3 md:px-6 py-4 md:py-3 font-sans text-sm border-b-2 whitespace-nowrap
                  transition-colors duration-200 active:scale-[0.98] focus:ring-2 focus:ring-dark-brown/30 focus:outline-none
                  ${activeTab === index
                    ? 'border-dark-brown text-dark-brown font-bold bg-vintage-cream'
                    : 'border-transparent text-sepia-brown hover:text-dark-brown hover:bg-vintage-cream/50'
                  }`}
              >
                <tab.Icon className="w-4 h-4 mr-1 md:mr-2 inline" aria-hidden="true" />
                <span className="hidden md:inline">{tab.title}</span>
                <span className="md:hidden">{tab.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          {/* Scroll indicators */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-aged-paper to-transparent pointer-events-none md:hidden" aria-hidden="true" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-aged-paper to-transparent pointer-events-none md:hidden" aria-hidden="true" />
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div
        role="tabpanel"
        id={getTabPanelId(currentTabData.id)}
        aria-labelledby={getTabId(currentTabData.id)}
        className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6"
      >
        <h2 className="sr-only">{currentTabData.title}</h2>
        {activeTab === 0 ? (
          <div className="space-y-4 md:space-y-6">
            {renderBirthdaySection()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {renderSection('generation')}
              {renderSection('comparison')}
            </div>
            <CelebrityList celebrities={data.celebrities} variant="timeline" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 desktop:grid-cols-3 gap-4 md:gap-6">
            {currentTabData.sections.map((sectionId) => (
              <div key={sectionId}>
                {renderSection(sectionId)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-aged-paper py-4 border-t border-sepia-brown/20">
        <p className="font-sans text-xs text-sepia-brown max-w-2xl mx-auto text-center leading-relaxed px-4 md:px-6">
          This report analyzes US cultural and historical context. Generational
          characteristics are research-based generalizations. Birthday data: FiveThirtyEight.
          Generational definitions: Pew Research Center.
        </p>
      </footer>

      {/* Heat Map Overlay */}
      {isHeatMapOpen && (
        <Suspense fallback={null}>
          <BirthdayHeatMap
            userMonth={data.birthMonth}
            userDay={data.birthDay}
            birthdayRank={data.birthdayRank}
            birthdayPercentile={data.birthdayPercentile}
            isOpen={isHeatMapOpen}
            onClose={() => setIsHeatMapOpen(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default memo(TimelineTheme)
