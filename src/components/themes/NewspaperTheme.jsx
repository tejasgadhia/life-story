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

function NewspaperTheme({ data, currentPage: propPage = 0, setPage: propSetPage, fontSize = 'base' }) {
  const [internalPage, setInternalPage] = useState(propPage)
  
  const fontSizeClasses = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' }
  const contentFontSize = fontSizeClasses[fontSize] || 'text-base'
  const currentPage = propSetPage ? propPage : internalPage
  const setCurrentPage = propSetPage || setInternalPage

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
        <div className="col-span-12 md:col-span-3 border-r-2 border-neutral-400 pr-4">
          {/* Generation Box */}
          <div className="border-2 border-neutral-700 p-4 mb-4 bg-neutral-100">
            <h3 className="font-display text-center text-3xl font-black text-neutral-900 uppercase tracking-wide mb-1">
              {data.generation}
            </h3>
            <p className="text-center text-sm text-neutral-600 border-t border-neutral-400 pt-2">
              Born {data.birthDate} • {data.generationSpan}
            </p>
          </div>
          
          {/* Notable Births */}
          <div className="border-t-4 border-double border-neutral-700 pt-3">
            <h4 className="text-sm font-black text-center tracking-wider mb-3 uppercase">
              Notable June 9th Births
            </h4>
            <div className="space-y-1">
              {data.celebrities.slice(0, 8).map((celeb, i) => (
                <a 
                  key={i} 
                  href={`https://en.wikipedia.org/wiki/${celeb.name.replace(/ /g, '_')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm py-1 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 px-1 transition-colors border-b border-neutral-300 last:border-0"
                  title={celeb.description}
                >
                  • {celeb.name} ({celeb.year})
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Story */}
        <div className="col-span-12 md:col-span-6 px-5 border-r-2 border-neutral-400">
          <h2 className="font-display text-5xl font-black text-center text-neutral-900 uppercase mb-1 leading-tight">
            The Story of a Life
          </h2>
          <p className="text-center text-sm text-neutral-600 mb-4 border-b-2 border-neutral-400 pb-3">
            Complete Analysis of One Born in {data.birthYear}
          </p>

          {/* Main text - 2 columns */}
          <div className="columns-2 gap-5 text-sm leading-[1.9] text-justify" style={{ columnRule: '1px solid #a3a3a3' }}>
            <p className="mb-4">
              <span className="float-left text-6xl font-display font-black mr-2 leading-none text-neutral-800">T</span>
              he subject of this comprehensive report entered the world on the ninth day of June, {data.birthYear}, 
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
        <div className="col-span-12 md:col-span-3 pl-4">
          {/* By The Numbers - with context */}
          <div className="border-2 border-neutral-700 bg-neutral-100 p-4 mb-4">
            <h4 className="text-sm font-black text-center tracking-wider border-b-2 border-neutral-700 pb-2 mb-3 uppercase">
              By The Numbers
            </h4>
            <div className="space-y-3 text-sm">
              <div className="border-b border-neutral-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Birthday Rank</span>
                  <span>#{data.birthdayRank}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Out of 366 possible dates
                </p>
              </div>
              <div className="border-b border-neutral-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Percentile</span>
                  <span>{data.birthdayPercentile}%</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {data.birthdayRank < 183 ? 'More common' : 'Less common'} than average
                </p>
              </div>
              <div className="border-b border-neutral-300 pb-2">
                <div className="flex justify-between font-bold">
                  <span>Generation</span>
                  <span>{data.generation}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  ~72 million in the U.S.
                </p>
              </div>
              <div>
                <div className="flex justify-between font-bold">
                  <span>Birth Year</span>
                  <span>{data.birthYear}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  ~3.9 million born that year
                </p>
              </div>
            </div>
          </div>

          {/* Year Events */}
          <div className="border-t-4 border-double border-neutral-700 pt-3">
            <h4 className="text-sm font-black tracking-wider mb-3 uppercase">
              {data.birthYear} Headlines
            </h4>
            <div className="space-y-2">
              {data.yearEvents.map((event, i) => (
                <p key={i} className="text-sm text-neutral-700 border-b border-neutral-300 pb-2 last:border-0">
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
      <article className="p-5 border-2 border-neutral-300 bg-white/50 h-full">
        <h2 className="font-display text-xl font-black text-neutral-900 uppercase tracking-wide border-b-2 border-neutral-700 pb-2 mb-2">
          {config.title}
        </h2>
        <p className="text-xs text-neutral-500 italic mb-4 uppercase tracking-wider">{config.subtitle}</p>
        <div 
          className={`${contentFontSize} leading-[1.8] text-justify text-neutral-800
                   [&>h2]:hidden [&>p]:mb-4 
                   [&>p:first-of-type]:first-letter:float-left 
                   [&>p:first-of-type]:first-letter:text-4xl 
                   [&>p:first-of-type]:first-letter:font-display
                   [&>p:first-of-type]:first-letter:font-black
                   [&>p:first-of-type]:first-letter:mr-2 
                   [&>p:first-of-type]:first-letter:leading-none`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    )
  }

  const currentTabData = TABS[currentPage]

  return (
    <div className="min-h-screen py-6 px-4 bg-neutral-400">
      <div 
        className="max-w-6xl mx-auto shadow-2xl relative"
        style={{ 
          background: '#f5f1e8',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"), linear-gradient(to bottom, #f5f1e8, #ebe5d6)`,
        }}
      >
        {/* TOP TAGLINE */}
        <div className="flex justify-between items-center px-6 py-2 border-b border-neutral-400 text-xs tracking-[0.15em] text-neutral-500 italic">
          <span>A Personal Historical Record</span>
          <span>Est. {data.birthYear}</span>
        </div>

        {/* MASTHEAD */}
        <header className="text-center pt-3 pb-3 border-b-4 border-double border-neutral-800 px-6">
          <h1 
            className="text-5xl md:text-6xl text-neutral-900 leading-none"
            style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', serif" }}
          >
            The Personal Tribune
          </h1>
          
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="flex-1 max-w-24 h-px bg-neutral-500" />
            <span className="text-xl text-neutral-600">✦</span>
            <div className="flex-1 max-w-24 h-px bg-neutral-500" />
          </div>
          
          <div className="flex items-center justify-between text-xs text-neutral-600 tracking-wider px-4">
            <span className="font-bold">VOL. XXXVII • No. {data.birthdayRank}</span>
            <span className="bg-neutral-800 text-neutral-100 py-1 px-4 text-xs font-bold tracking-widest">
              COMPLETE PERSONAL HISTORY
            </span>
            <span className="font-bold uppercase">{formatDate()}</span>
          </div>
        </header>

        {/* PAGE NAVIGATION */}
        <div className="flex justify-center bg-neutral-800 border-b-2 border-neutral-900">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(i)}
              className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all
                ${currentPage === i 
                  ? 'bg-neutral-100 text-neutral-900' 
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="p-6">
          {currentPage === 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {renderBirthdaySection()}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t-4 border-double border-neutral-400 pt-6">
                {renderSection('generation')}
                {renderSection('comparison')}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTabData.sections.map((sectionId) => (
                <div key={sectionId}>
                  {renderSection(sectionId)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="border-t-2 border-neutral-500 bg-neutral-200/50">
          <div className="grid grid-cols-4 gap-0 text-xs text-neutral-600">
            <div className="p-4 border-r border-neutral-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase">Data Sources</h5>
              <p className="leading-relaxed">FiveThirtyEight (CDC/SSA)</p>
            </div>
            <div className="p-4 border-r border-neutral-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase">Methodology</h5>
              <p className="leading-relaxed">Pew Research definitions</p>
            </div>
            <div className="p-4 border-r border-neutral-400">
              <h5 className="font-bold mb-1 tracking-wider uppercase">Disclaimer</h5>
              <p className="leading-relaxed">Entertainment & education</p>
            </div>
            <div className="p-4">
              <h5 className="font-bold mb-1 tracking-wider uppercase">Edition</h5>
              <p className="leading-relaxed">ID: LS-{data.birthYear}-0609</p>
            </div>
          </div>
          
          <div className="text-center py-2 border-t border-neutral-400 text-xs text-neutral-500">
            © {new Date().getFullYear()} The Personal Tribune
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewspaperTheme
