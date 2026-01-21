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

function NewspaperTheme({ data, currentPage: propPage = 0, setPage: propSetPage }) {
  const [internalPage, setInternalPage] = useState(propPage)
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
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 md:col-span-3 border-r border-stone-400 pr-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-stone-700 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                <span className="text-5xl">👤</span>
              </div>
            </div>
          </div>
          
          <h3 className="font-display text-center text-2xl font-bold text-stone-900 uppercase tracking-wide">
            {data.generation}
          </h3>
          <p className="text-center text-base text-stone-600 mb-4">Born {data.birthDate}</p>
          
          <div className="border-2 border-stone-600 p-4 bg-amber-100/30">
            <h4 className="text-base font-bold text-center tracking-wider border-b border-stone-400 pb-2 mb-3">
              NOTABLE JUNE 9TH BIRTHS
            </h4>
            {data.celebrities.map((celeb, i) => (
              <p key={i} className="text-base py-2 border-b border-stone-300/50 last:border-0 text-stone-700">
                ◆ {celeb}
              </p>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="col-span-12 md:col-span-6 px-6 border-r border-stone-400">
          <h2 className="font-display text-4xl font-bold text-center text-stone-900 uppercase mb-2">
            The Story of a Life
          </h2>
          <p className="text-center text-base text-stone-600 mb-4 border-b border-stone-400 pb-3">
            Complete Analysis of One Born in {data.birthYear}
          </p>
          
          <div className="border-2 border-stone-500 p-3 mb-4 bg-stone-200">
            <div className="bg-gradient-to-br from-stone-300 to-stone-400 h-36 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">🏛️</span>
                <p className="text-base text-stone-600 mt-2">Historical Scene, {data.birthYear}</p>
              </div>
            </div>
          </div>

          <div className="columns-2 gap-6 text-base leading-[1.8] text-justify" style={{ columnRule: '1px solid #78716c' }}>
            <p className="mb-4">
              <span className="float-left text-5xl font-display mr-2 leading-none text-stone-800">T</span>
              he subject of this comprehensive report entered the world on the ninth day of June, {data.birthYear}, 
              a date ranking #{data.birthdayRank} among all possible calendar dates for frequency of birth.
            </p>
            <p className="mb-4">
              As a member of the {data.generation} generation ({data.generationSpan}), this individual belongs 
              to a cohort numbering approximately 72 million souls—a generation destined to witness profound transformation.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-3 pl-6">
          <div className="border-2 border-stone-700 bg-amber-100/40 p-4 mb-6">
            <h4 className="text-base font-bold text-center tracking-wider border-b border-stone-500 pb-2 mb-3">
              BY THE NUMBERS
            </h4>
            <div className="space-y-2 text-base">
              <div className="flex justify-between border-b border-stone-300/50 pb-2">
                <span className="text-stone-600">Rank:</span>
                <span className="font-bold">#{data.birthdayRank}/366</span>
              </div>
              <div className="flex justify-between border-b border-stone-300/50 pb-2">
                <span className="text-stone-600">Percentile:</span>
                <span className="font-bold">{data.birthdayPercentile}%</span>
              </div>
              <div className="flex justify-between border-b border-stone-300/50 pb-2">
                <span className="text-stone-600">Generation:</span>
                <span className="font-bold">{data.generation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Birth Year:</span>
                <span className="font-bold">{data.birthYear}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-display text-xl font-bold text-stone-900 border-b border-stone-500 pb-2 mb-3">
              YEAR OF BIRTH EVENTS
            </h4>
            {data.yearEvents.slice(0, 3).map((event, i) => (
              <p key={i} className="text-sm text-stone-700 mb-2">• {event}</p>
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
      <article className="p-6 border border-stone-400/50">
        <h2 className="font-display text-xl font-bold text-stone-900 uppercase tracking-wide border-b-2 border-stone-700 pb-2 mb-3">
          {config.title}
        </h2>
        <p className="text-sm text-stone-500 italic mb-4">{config.subtitle}</p>
        <div 
          className="text-base leading-[1.8] text-justify text-stone-800
                   [&>h2]:hidden [&>p]:mb-4 
                   [&>p:first-of-type]:first-letter:float-left 
                   [&>p:first-of-type]:first-letter:text-4xl 
                   [&>p:first-of-type]:first-letter:font-display 
                   [&>p:first-of-type]:first-letter:mr-2 
                   [&>p:first-of-type]:first-letter:leading-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    )
  }

  const currentTabData = TABS[currentPage]

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: '#3d3529' }}>
      <div 
        className="max-w-6xl mx-auto shadow-2xl relative"
        style={{ 
          background: `linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 25%, #e0d4bc 50%, #d8cbb0 75%, #e4d8c0 100%)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"), linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 25%, #e0d4bc 50%, #d8cbb0 75%, #e4d8c0 100%)`,
        }}
      >
        {/* TOP TAGLINE */}
        <div className="flex justify-between items-center px-6 py-2 border-b border-stone-500/50 text-xs tracking-[0.15em] text-stone-600 italic">
          <span>This personal edition captures the essence of a life</span>
          <span>celebrating the spirit and simplicity of {data.birthYear}</span>
        </div>

        {/* MASTHEAD */}
        <header className="text-center pt-4 pb-4 border-b-4 border-double border-stone-800 px-6">
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl text-stone-600">❧</span>
            <h1 
              className="text-5xl md:text-7xl text-stone-900 leading-none"
              style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', serif", textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}
            >
              The Personal Tribune
            </h1>
            <span className="text-4xl text-stone-600">❧</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="flex-1 max-w-32 h-px bg-stone-500" />
            <span className="text-3xl text-stone-700">⚜</span>
            <div className="flex-1 max-w-32 h-px bg-stone-500" />
          </div>
          
          <div className="bg-stone-800 text-amber-50 py-2 px-8 mx-auto inline-block tracking-[0.4em] text-sm font-bold">
            COMPLETE PERSONAL HISTORY & ANALYSIS
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-stone-600 tracking-wider px-8">
            <span className="font-bold">VOL. XXXVII, No. {data.birthdayRank}</span>
            <span className="uppercase font-bold">{formatDate()}</span>
            <span className="font-bold">PERSONAL EDITION</span>
          </div>
        </header>

        {/* PAGE NAVIGATION */}
        <div className="flex justify-center bg-stone-700 border-b-4 border-stone-800">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(i)}
              className={`px-8 py-4 text-base font-bold uppercase tracking-widest transition-all border-x border-stone-600
                ${currentPage === i 
                  ? 'bg-amber-100 text-stone-900 shadow-inner' 
                  : 'bg-stone-700 text-amber-100 hover:bg-stone-600'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="p-6">
          {currentPage === 0 ? (
            /* Overview page with special birthday layout */
            <div className="grid grid-cols-1 gap-6">
              {renderBirthdaySection()}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderSection('generation')}
                {renderSection('comparison')}
              </div>
            </div>
          ) : (
            /* Other pages - 3 column grid */
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
        <footer className="border-t-2 border-double border-stone-700">
          <div className="bg-stone-800 text-amber-50 py-2 px-6 text-center text-sm tracking-[0.3em] font-bold">
            NOTICES • DISCLAIMERS • LEGAL MATTERS
          </div>
          
          <div className="grid grid-cols-4 gap-0 text-sm text-stone-700">
            <div className="p-4 border-r border-stone-400">
              <h5 className="font-bold text-base mb-2 tracking-wider">DATA SOURCES</h5>
              <p className="leading-relaxed">Birthday data from FiveThirtyEight (CDC/SSA).</p>
            </div>
            <div className="p-4 border-r border-stone-400">
              <h5 className="font-bold text-base mb-2 tracking-wider">METHODOLOGY</h5>
              <p className="leading-relaxed">Generational definitions per Pew Research.</p>
            </div>
            <div className="p-4 border-r border-stone-400">
              <h5 className="font-bold text-base mb-2 tracking-wider">DISCLAIMER</h5>
              <p className="leading-relaxed">For entertainment and education only.</p>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-base mb-2 tracking-wider">EDITION</h5>
              <p className="leading-relaxed">Personal Edition • ID: LS-{data.birthYear}-0609</p>
            </div>
          </div>
          
          <div className="text-center py-3 border-t border-stone-500">
            <div className="flex items-center justify-center gap-3 text-sm text-stone-500">
              <span>❧</span>
              <span>© {new Date().getFullYear()} The Personal Tribune</span>
              <span>❧</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewspaperTheme
