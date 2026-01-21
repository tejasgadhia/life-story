import { useState } from 'react'

const SECTIONS = [
  { id: 'birthday', title: 'Subject Profile', key: null },
  { id: 'childhood', title: 'The Formative Years', key: 'childhood_context' },
  { id: 'generation', title: 'Generational Character', key: 'generational_identity' },
  { id: 'popculture', title: 'Cultural Influences', key: 'pop_culture' },
  { id: 'technology', title: 'The Machine Age', key: 'technology' },
  { id: 'history', title: 'Historical Record', key: 'historical_milestones' },
  { id: 'career', title: 'Matters of Commerce', key: 'career' },
  { id: 'relationships', title: 'Social Affairs', key: 'relationships' },
  { id: 'financial', title: 'Economic Standing', key: 'financial' },
  { id: 'blindspots', title: 'Points of Critique', key: 'blind_spots' },
  { id: 'roadmap', title: 'Future Prospects', key: 'life_roadmap' },
  { id: 'comparison', title: 'Statistical Survey', key: 'comparison' },
]

function NewspaperTheme({ data }) {
  const [currentPage, setCurrentPage] = useState(0)
  const sectionsPerPage = 4
  const totalPages = Math.ceil(SECTIONS.length / sectionsPerPage)
  
  const currentSections = SECTIONS.slice(
    currentPage * sectionsPerPage, 
    (currentPage + 1) * sectionsPerPage
  )

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  const getContent = (key) => {
    if (!key) return null
    return data.sections[key]?.html || ''
  }

  return (
    <div className="min-h-screen bg-stone-700 py-6 px-4">
      {/* Newspaper container */}
      <div className="max-w-6xl mx-auto bg-amber-50 shadow-2xl relative"
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
           }}>
        
        {/* Top tagline bar */}
        <div className="text-center py-1 text-[10px] tracking-[0.3em] text-stone-600 border-b border-stone-400 bg-amber-100/50">
          This personal edition captures the essence of a life                                                          celebrating the spirit of historical inquiry
        </div>

        {/* === MASTHEAD === */}
        <header className="text-center pt-2 pb-3 border-b-4 border-double border-stone-800 relative">
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="flex-1 max-w-24 h-px bg-stone-400" />
            <span className="text-stone-500 text-sm">❦</span>
            <div className="flex-1 max-w-24 h-px bg-stone-400" />
          </div>
          
          {/* Main masthead with fleur-de-lis */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl text-stone-600">❧</span>
            <h1 className="font-blackletter text-6xl md:text-8xl text-stone-900 tracking-wide leading-none whitespace-nowrap">
              The Personal Tribune
            </h1>
            <span className="text-3xl text-stone-600">❧</span>
          </div>
          
          {/* Fleur-de-lis centerpiece */}
          <div className="text-4xl text-stone-700 my-1">⚜</div>
          
          {/* Subtitle: WORLD NEWS GLOBAL HEADLINES style */}
          <div className="bg-stone-800 text-amber-50 py-1 px-4 mx-auto max-w-md tracking-[0.4em] text-xs font-bold">
            COMPLETE PERSONAL HISTORY & ANALYSIS
          </div>
          
          {/* Date and volume line */}
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-stone-600 tracking-wider">
            <span>VOL. XXXVII</span>
            <span className="text-stone-400">•</span>
            <span>No. {data.birthdayRank}</span>
            <span className="text-stone-400">•</span>
            <span className="uppercase">{formatDate()}</span>
            <span className="text-stone-400">•</span>
            <span>PERSONAL EDITION</span>
          </div>
        </header>

        {/* Page navigation tabs */}
        <div className="flex justify-center gap-1 py-1 bg-stone-200/50 border-b border-stone-300">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider transition-all
                ${currentPage === i 
                  ? 'bg-stone-800 text-amber-50' 
                  : 'text-stone-600 hover:bg-stone-300'
                }`}
            >
              Page {i + 1}
            </button>
          ))}
        </div>

        {/* === MAIN CONTENT AREA === */}
        <div className="p-4">
          {/* First page hero layout */}
          {currentPage === 0 && (
            <div className="grid grid-cols-12 gap-4 mb-4">
              {/* Left column - Subject Profile with portrait */}
              <div className="col-span-12 md:col-span-3">
                {/* Circular portrait frame */}
                <div className="flex justify-center mb-3">
                  <div className="w-28 h-28 rounded-full border-4 border-stone-700 bg-stone-200 flex items-center justify-center relative">
                    <div className="absolute inset-2 rounded-full border-2 border-stone-400" />
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
                <h3 className="font-display text-center text-lg font-bold text-stone-800 leading-tight">
                  {data.generation}
                </h3>
                <p className="text-center text-[10px] text-stone-600 italic mb-2">
                  Born {data.birthDate}
                </p>
                <div className="border-t border-b border-stone-400 py-2 my-2">
                  <p className="text-[11px] text-justify leading-tight text-stone-700">
                    Subject born into the {data.generation} generation ({data.generationSpan}), 
                    a cohort defined by unprecedented technological change and economic uncertainty. 
                    Birthday ranks #{data.birthdayRank} of 366 possible dates, placing subject 
                    in the {data.birthdayPercentile}th percentile for birth date commonality.
                  </p>
                </div>
                <p className="text-[11px] text-justify leading-tight text-stone-700">
                  The year {data.birthYear} witnessed: {data.yearEvents.slice(0, 3).join('; ')}.
                </p>
              </div>

              {/* Center column - Main headline story */}
              <div className="col-span-12 md:col-span-6 border-l border-r border-stone-300 px-4">
                <h2 className="font-display text-3xl font-bold text-center text-stone-900 leading-tight mb-1">
                  THE STORY OF A LIFE
                </h2>
                <p className="text-center text-xs text-stone-600 mb-3 italic">
                  A Complete Analysis of One Born in the Year {data.birthYear}
                </p>
                
                {/* Featured image placeholder - like the train in reference */}
                <div className="bg-stone-200 border border-stone-400 p-2 mb-3 text-center">
                  <div className="bg-stone-300 h-32 flex items-center justify-center">
                    <span className="text-stone-500 text-sm">[Historical Photograph - {data.birthYear}]</span>
                  </div>
                  <p className="text-[9px] text-stone-600 mt-1 italic">
                    Events of {data.birthYear}: {data.yearEvents[0]}
                  </p>
                </div>

                {/* Main article text */}
                <div className="columns-2 gap-3 text-[11px] leading-tight text-justify" style={{ columnRule: '1px solid #a8a29e' }}>
                  <p className="mb-2">
                    <span className="float-left text-4xl font-display mr-1 leading-none text-stone-800">T</span>
                    he subject of this report entered the world on {data.birthDate}, a date that would prove 
                    to be #{data.birthdayRank} in terms of birth frequency among the 366 possible calendar dates.
                  </p>
                  <p className="mb-2">
                    As a member of the {data.generation} generation, the subject belongs to a cohort 
                    numbering approximately 72 million souls in these United States alone—a generation 
                    that would come of age during times of profound transformation.
                  </p>
                  <p className="mb-2">
                    The defining events of this generation include the attacks of September 11, 2001, 
                    the financial crisis of 2008, and the great pandemic of 2020. Each left indelible 
                    marks upon the collective character.
                  </p>
                </div>
              </div>

              {/* Right column - Quick facts and sidebar */}
              <div className="col-span-12 md:col-span-3">
                {/* Stats box */}
                <div className="border-2 border-stone-700 bg-amber-100/50 p-2 mb-3">
                  <h4 className="text-center font-bold text-xs border-b border-stone-400 pb-1 mb-2 tracking-wider">
                    BY THE NUMBERS
                  </h4>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between border-b border-stone-300 pb-1">
                      <span className="text-stone-600">Birthday Rank:</span>
                      <span className="font-bold">#{data.birthdayRank}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-300 pb-1">
                      <span className="text-stone-600">Percentile:</span>
                      <span className="font-bold">{data.birthdayPercentile}%</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-300 pb-1">
                      <span className="text-stone-600">Generation:</span>
                      <span className="font-bold">{data.generation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Birth Year:</span>
                      <span className="font-bold">{data.birthYear}</span>
                    </div>
                  </div>
                </div>

                {/* Notable birthdays box */}
                <div className="border border-stone-400 p-2">
                  <h4 className="text-center font-bold text-xs border-b border-stone-300 pb-1 mb-2">
                    NOTABLE BIRTHDAYS
                  </h4>
                  <p className="text-[9px] text-center text-stone-500 mb-1">June 9th</p>
                  {data.celebrities.map((celeb, i) => (
                    <p key={i} className="text-[10px] py-0.5 border-b border-stone-200 last:border-0">
                      • {celeb}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Multi-column article layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ columnRule: '1px solid #a8a29e' }}>
            {currentSections.map((section, idx) => {
              const content = section.key ? getContent(section.key) : null
              const isFirstOnPage = idx === 0 && currentPage > 0
              
              // Skip birthday section on page 0 (handled above)
              if (section.id === 'birthday' && currentPage === 0) return null
              
              return (
                <article key={section.id} className="border-b border-stone-300 pb-3 mb-3 last:border-0">
                  {/* Section headline */}
                  <h2 className="font-display text-lg font-bold text-stone-900 leading-tight mb-1 border-b border-stone-400 pb-1">
                    {section.title}
                  </h2>
                  <p className="text-[9px] text-stone-500 mb-2 italic">
                    Section {currentPage * sectionsPerPage + idx + 1} • Page {currentPage + 1}
                  </p>
                  
                  {/* Content */}
                  {content ? (
                    <div 
                      className="text-[11px] leading-tight text-justify text-stone-800
                               [&>h2]:hidden [&>p]:mb-2 
                               [&>p:first-of-type]:first-letter:float-left 
                               [&>p:first-of-type]:first-letter:text-3xl 
                               [&>p:first-of-type]:first-letter:font-display 
                               [&>p:first-of-type]:first-letter:mr-1 
                               [&>p:first-of-type]:first-letter:leading-none
                               [&>p>strong]:font-bold"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <p className="text-[11px] text-stone-500 italic">Content forthcoming.</p>
                  )}
                </article>
              )
            })}
          </div>
        </div>

        {/* === FOOTER === */}
        <footer className="border-t-2 border-stone-800">
          {/* Classified ads style footer */}
          <div className="bg-stone-800 text-amber-50 py-1 px-4 text-center text-[10px] tracking-wider">
            NOTICES & LEGAL DISCLAIMERS
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 text-[9px] text-stone-600">
            <div className="border border-stone-300 p-2">
              <h5 className="font-bold text-[10px] mb-1">Data Sources</h5>
              <p>Birthday data: FiveThirtyEight (CDC/SSA 1994-2014)</p>
            </div>
            <div className="border border-stone-300 p-2">
              <h5 className="font-bold text-[10px] mb-1">Methodology</h5>
              <p>Generational definitions per Pew Research Center</p>
            </div>
            <div className="border border-stone-300 p-2">
              <h5 className="font-bold text-[10px] mb-1">Disclaimer</h5>
              <p>For entertainment and educational purposes only</p>
            </div>
            <div className="border border-stone-300 p-2">
              <h5 className="font-bold text-[10px] mb-1">Edition</h5>
              <p>Personal Edition • ID: LS-{data.birthYear}-0609</p>
            </div>
          </div>
          
          {/* Bottom decorative line */}
          <div className="text-center py-2 border-t border-stone-300">
            <div className="flex items-center justify-center gap-3">
              <span className="text-stone-400">❧</span>
              <span className="text-[9px] text-stone-500">© {new Date().getFullYear()} The Personal Tribune</span>
              <span className="text-stone-400">❧</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewspaperTheme
