import { memo, useRef, useCallback } from 'react'
import { TABS } from '../../config/tabs'
import { useTabState } from '../../hooks/useTabState'
import { Star } from 'lucide-react'

// Tab IDs for ARIA
const getTabId = (tabId) => `newspaper-tab-${tabId}`
const getTabPanelId = (tabId) => `newspaper-tabpanel-${tabId}`

// Helper to get ordinal suffix (1st, 2nd, 3rd, etc.)
const getOrdinalSuffix = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

// Helper to get month name from 1-12
const getMonthName = (m) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December']
  return months[m - 1]
}

// Helper to get ordinal word (first, second, ninth, etc.)
const getOrdinalWord = (n) => {
  const words = [
    '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth',
    'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth',
    'thirty-first'
  ]
  return words[n] || `${n}${getOrdinalSuffix(n)}`
}

const SECTION_CONFIG = {
  birthday: { title: 'Subject Profile', subtitle: 'A Personal Record', key: null },
  generation: { title: 'Generational Identity', subtitle: 'Character of the Cohort', key: 'generational_identity' },
  comparison: { title: 'Statistical Survey', subtitle: 'By the Numbers', key: 'comparison' },
  childhood: { title: 'The Formative Years', subtitle: 'A Chronicle of Youth', key: 'childhood_context' },
  popculture: { title: 'Cultural Influences', subtitle: 'Arts & Entertainment', key: 'pop_culture' },
  technology: { title: 'The Machine Age', subtitle: 'Technological Progress', key: 'technology' },
  history: { title: 'Historical Record', subtitle: 'Events of Consequence', key: 'historical_milestones' },
  career: { title: 'Matters of Commerce', subtitle: 'Professional Affairs', key: 'career' },
  financial: { title: 'Economic Standing', subtitle: 'Fiscal Matters', key: 'financial' },
  relationships: { title: 'Social Affairs', subtitle: 'Human Connections', key: 'relationships' },
  blindspots: { title: 'Points of Critique', subtitle: 'Areas for Reflection', key: 'blind_spots' },
  roadmap: { title: 'Future Prospects', subtitle: 'What Lies Ahead', key: 'life_roadmap' },
}

function NewspaperTheme({ data, currentTab: propTab = 0, setTab: propSetTab, fontSize = 'base' }) {
  const [currentPage, setCurrentPage] = useTabState(propTab, propSetTab)
  const tabRefs = useRef([])

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
      setCurrentPage(newIndex)
      tabRefs.current[newIndex]?.focus()
    }
  }, [setCurrentPage])

  const fontSizeClasses = { sm: 'content-scale-sm', base: 'content-scale-base', lg: 'content-scale-lg' }
  const contentFontSize = fontSizeClasses[fontSize] || 'text-base'

  const formatDate = () => {
    const d = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }

  const getContent = (key) => data.sections[key]?.html || ''

  const renderBirthdaySection = () => (
    <div className="col-span-3">
      <div className="grid grid-cols-12 gap-0">
        {/* LEFT COLUMN - Generation & Celebrities */}
        <div className="col-span-12 md:col-span-3 md:border-r-2 border-stone-400 pr-0 md:pr-4 mb-4 md:mb-0">
          {/* Generation Box */}
          <div className="border-2 border-stone-700 p-3 md:p-4 mb-4 bg-stone-100">
            <h3 className="font-display text-center text-2xl md:text-3xl font-black text-stone-900 uppercase tracking-wide mb-1">
              {data.generation}
            </h3>
            <p className="text-center text-sm text-stone-600 border-t border-stone-400 pt-2">
              {data.generationSpan}
            </p>
            <p className="text-center text-xs text-stone-600 mt-1">
              Born {data.birthDate}
            </p>
          </div>

          {/* Notable Births */}
          <div className="border-t-4 border-double border-stone-700 pt-3">
            <h4 className="text-sm font-black text-center tracking-wider mb-3 uppercase">
              Notable {getMonthName(data.birthMonth)} {data.birthDay}{getOrdinalSuffix(data.birthDay)} Births
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-0">
              {data.celebrities.slice(0, 8).map((celeb, i) => (
                <a
                  key={i}
                  href={`https://en.wikipedia.org/wiki/${celeb.name.replace(/ /g, '_')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${contentFontSize} py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-200 px-1 transition-colors duration-200 border-b border-stone-300 md:last:border-0 focus:outline-none focus:ring-2 focus:ring-stone-500/50 focus:ring-offset-1`}
                  title={celeb.description}
                >
                  • {celeb.name} ({celeb.year})
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Story */}
        <div className="col-span-12 md:col-span-6 px-0 md:px-5 md:border-r-2 border-stone-400 mb-4 md:mb-0">
          <h2 className="font-display text-3xl md:text-5xl font-black text-center text-stone-900 uppercase mb-1 leading-tight">
            The Story of a Life
          </h2>
          <p className="text-center text-sm text-stone-600 mb-4 border-b-2 border-stone-400 pb-3">
            Complete Analysis of One Born in {data.birthYear}
          </p>

          {/* Main text - 1 column on mobile, 2 columns on desktop */}
          <div className={`columns-1 md:columns-2 gap-5 ${contentFontSize} leading-[1.9] text-justify`} style={{ columnRule: '1px solid var(--color-column-rule)' }}>
            <p className="mb-4">
              <span className="float-left text-5xl md:text-6xl font-display font-black mr-2 leading-none text-stone-800">T</span>
              he subject of this comprehensive report entered the world on the {getOrdinalWord(data.birthDay)} day of {getMonthName(data.birthMonth)}, {data.birthYear},
              a date ranking <strong>#{data.birthdayRank}</strong> among all 366 possible calendar dates for frequency of birth.
              This places the subject in the <strong>{data.birthdayPercentile}th percentile</strong> for birthday commonality.
            </p>
            <p className="mb-4">
              As a member of the {data.generation} generation ({data.generationSpan}), this individual belongs
              to a cohort numbering approximately <strong>72 million</strong> souls in the United States alone—a generation
              destined to witness profound technological, cultural, and economic transformation.
            </p>
            <p className="mb-4">
              The year {data.birthYear} marked a pivotal moment in American history. The world into which this
              individual was born stood on the precipice of immense change, with events unfolding that would
              shape the trajectory of an entire generation.
            </p>
            <p className="mb-4">
              This report examines the historical context, cultural touchstones, and generational characteristics
              that have defined the life experience of one born on this particular date—offering insight into
              both the individual and the collective experience of their cohort.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - Stats & Events */}
        <div className="col-span-12 md:col-span-3 pl-0 md:pl-4">
          {/* By The Numbers - with context */}
          <div className="border-2 border-stone-700 bg-stone-100 p-4 mb-4">
            <h4 className="text-sm font-black text-center tracking-wider border-b-2 border-stone-700 pb-2 mb-3 uppercase">
              By The Numbers
            </h4>
            <div className={`space-y-3 ${contentFontSize}`}>
              <div className="border-b border-stone-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Birthday Rank</span>
                  <span>#{data.birthdayRank}</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Out of 366 possible dates
                </p>
              </div>
              <div className="border-b border-stone-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Percentile</span>
                  <span>{data.birthdayPercentile}%</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {data.birthdayRank < 183 ? 'More common' : 'Less common'} than average
                </p>
              </div>
              <div className="border-b border-stone-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Generation</span>
                  <span>{data.generation}</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  ~72 million in the U.S.
                </p>
              </div>
              <div>
                <div className="flex justify-between font-bold">
                  <span>Birth Year</span>
                  <span>{data.birthYear}</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  ~3.9 million born that year
                </p>
              </div>
            </div>
          </div>

          {/* Year Events */}
          <div className="border-t-4 border-double border-stone-700 pt-3">
            <h4 className="text-sm font-black tracking-wider mb-3 uppercase">
              {data.birthYear} Headlines
            </h4>
            <div className="space-y-2">
              {data.yearEvents.map((event, i) => (
                <p key={i} className={`${contentFontSize} text-stone-700 border-b border-stone-300 pb-2 last:border-0`}>
                  ▸ {event}
                </p>
              ))}
            </div>
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
      <article className="p-3 sm:p-4 md:p-5 border-2 border-stone-300 bg-white/50 h-full">
        <h2 className="font-display text-lg md:text-xl font-black text-stone-900 uppercase tracking-wide border-b-2 border-stone-700 pb-2 mb-2">
          {config.title}
        </h2>
        <p className="text-[10px] md:text-xs text-stone-500 italic mb-3 md:mb-4 uppercase tracking-wider">{config.subtitle}</p>
        <div
          className={`${contentFontSize} leading-[1.8] text-justify text-stone-800
                   [&>h2]:hidden [&>p]:mb-4
                   [&>p:first-of-type]:first-letter:float-left
                   [&>p:first-of-type]:first-letter:text-3xl
                   md:[&>p:first-of-type]:first-letter:text-4xl
                   [&>p:first-of-type]:first-letter:font-display
                   [&>p:first-of-type]:first-letter:font-black
                   [&>p:first-of-type]:first-letter:mr-2
                   [&>p:first-of-type]:first-letter:leading-none
                   [&_.hero-callout]:bg-stone-100
                   [&_.hero-callout]:border-stone-700
                   [&_.hero-callout]:text-stone-800
                   [&_.pull-quote]:text-xl
                   [&_.pull-quote]:border-stone-400
                   [&_.pull-quote]:text-stone-900
                   [&_.pull-quote]:font-display
                   [&_.stat-box]:bg-stone-800
                   [&_.stat-box]:text-stone-100`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    )
  }

  const currentTabData = TABS[currentPage]

  return (
    <div className="min-h-screen py-4 md:py-6 px-2 md:px-4 bg-stone-400">
      <div
        className="max-w-6xl mx-auto shadow-2xl relative newspaper-texture"
      >
        {/* TOP TAGLINE */}
        <div className="flex justify-between items-center px-6 py-2 border-b border-stone-400 text-xs tracking-[0.15em] text-stone-500 italic">
          <span>A Personal Historical Record</span>
          <span>Est. {data.birthYear}</span>
        </div>

        {/* MASTHEAD */}
        <header className="text-center pt-2 md:pt-3 pb-2 md:pb-3 border-b-4 border-double border-stone-800 px-3 md:px-6">
          <h1 className="font-blackletter text-3xl sm:text-4xl md:text-6xl text-stone-900 leading-none">
            The Personal Tribune
          </h1>

          <div className="flex items-center justify-center gap-2 md:gap-3 my-2">
            <div className="flex-1 max-w-16 md:max-w-24 h-px bg-stone-500" aria-hidden="true" />
            <Star className="w-4 h-4 md:w-5 md:h-5 text-stone-600 fill-stone-600" aria-hidden="true" />
            <div className="flex-1 max-w-16 md:max-w-24 h-px bg-stone-500" aria-hidden="true" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0 text-[10px] sm:text-xs text-stone-600 tracking-wider px-2 md:px-4">
            <span className="font-bold">VOL. XXXVII • No. {data.birthdayRank}</span>
            <span className="bg-stone-800 text-stone-100 py-1 px-2 sm:px-4 text-[10px] sm:text-xs font-bold tracking-widest">
              COMPLETE PERSONAL HISTORY
            </span>
            <span className="font-bold uppercase hidden sm:inline">{formatDate()}</span>
          </div>
        </header>

        {/* PAGE NAVIGATION */}
        <nav aria-label="Report sections">
          <div 
            role="tablist" 
            className="flex overflow-x-auto scrollbar-hide bg-stone-800 border-b-2 border-stone-900"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={getTabId(tab.id)}
                aria-selected={currentPage === i}
                aria-controls={getTabPanelId(tab.id)}
                tabIndex={currentPage === i ? 0 : -1}
                onClick={() => setCurrentPage(i)}
                onKeyDown={(e) => handleTabKeyDown(e, i)}
                className={`flex-1 min-w-fit px-3 sm:px-6 md:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap
                  transition-colors duration-200 active:scale-[0.98] focus:ring-2 focus:ring-stone-400/50 focus:outline-none
                  ${currentPage === i
                    ? 'bg-stone-100 text-stone-900'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-100'
                  }`}
              >
                <span className="hidden sm:inline">{tab.title}</span>
                <span className="sm:hidden">{tab.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div 
          role="tabpanel"
          id={getTabPanelId(currentTabData.id)}
          aria-labelledby={getTabId(currentTabData.id)}
          className="p-3 sm:p-4 md:p-6"
        >
          {currentPage === 0 ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {renderBirthdaySection()}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-t-4 border-double border-stone-400 pt-4 md:pt-6">
                {renderSection('generation')}
                {renderSection('comparison')}
              </div>
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

        {/* FOOTER */}
        <footer className="border-t-2 border-stone-500 bg-stone-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-xs text-stone-600">
            <div className="p-3 md:p-4 border-r border-b md:border-b-0 border-stone-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase text-[10px] md:text-xs">Data Sources</h5>
              <p className="leading-relaxed text-[10px] md:text-xs">FiveThirtyEight (CDC/SSA)</p>
            </div>
            <div className="p-3 md:p-4 md:border-r border-b md:border-b-0 border-stone-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase text-[10px] md:text-xs">Methodology</h5>
              <p className="leading-relaxed text-[10px] md:text-xs">Pew Research definitions</p>
            </div>
            <div className="p-3 md:p-4 border-r border-stone-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase text-[10px] md:text-xs">Disclaimer</h5>
              <p className="leading-relaxed text-[10px] md:text-xs">Entertainment & education</p>
            </div>
            <div className="p-3 md:p-4">
              <h5 className="font-bold mb-1 tracking-wider uppercase text-[10px] md:text-xs">Edition</h5>
              <p className="leading-relaxed text-[10px] md:text-xs">ID: LS-{data.birthYear}-{String(data.birthMonth).padStart(2, '0')}{String(data.birthDay).padStart(2, '0')}</p>
            </div>
          </div>

          <div className="text-center py-2 border-t border-stone-400 text-[10px] md:text-xs text-stone-500">
            © {new Date().getFullYear()} The Personal Tribune
          </div>
        </footer>
      </div>
    </div>
  )
}

export default memo(NewspaperTheme)
