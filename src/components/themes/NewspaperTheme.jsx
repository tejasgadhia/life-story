import { useState } from 'react'

const SECTIONS = [
  { id: 'childhood', title: 'The Formative Years', subtitle: 'A Chronicle of Youth', key: 'childhood_context' },
  { id: 'generation', title: 'Generational Identity', subtitle: 'Character of the Cohort', key: 'generational_identity' },
  { id: 'popculture', title: 'Cultural Influences', subtitle: 'Arts & Entertainment', key: 'pop_culture' },
  { id: 'technology', title: 'The Machine Age', subtitle: 'Technological Progress', key: 'technology' },
  { id: 'history', title: 'Historical Record', subtitle: 'Events of Consequence', key: 'historical_milestones' },
  { id: 'career', title: 'Matters of Commerce', subtitle: 'Professional Affairs', key: 'career' },
  { id: 'relationships', title: 'Social Affairs', subtitle: 'Human Connections', key: 'relationships' },
  { id: 'financial', title: 'Economic Standing', subtitle: 'Fiscal Matters', key: 'financial' },
  { id: 'blindspots', title: 'Points of Critique', subtitle: 'Areas for Reflection', key: 'blind_spots' },
  { id: 'roadmap', title: 'Future Prospects', subtitle: 'What Lies Ahead', key: 'life_roadmap' },
  { id: 'comparison', title: 'Statistical Survey', subtitle: 'By the Numbers', key: 'comparison' },
]

function NewspaperTheme({ data, currentPage: propPage = 0, setPage: propSetPage }) {
  const totalPages = 3
  
  // Use internal state if no setPage prop (backwards compatible)
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
  
  // Strip HTML tags for plain text excerpts
  const stripHtml = (html) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  
  const getExcerpt = (key, chars = 400) => {
    const text = stripHtml(getContent(key))
    return text.length > chars ? text.substring(0, chars) + '...' : text
  }


  return (
    <div className="min-h-screen py-4 px-2" style={{ 
      background: '#3d3529',
    }}>
      {/* Newspaper container */}
      <div 
        className="max-w-6xl mx-auto shadow-2xl relative"
        style={{ 
          background: `
            linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 25%, #e0d4bc 50%, #d8cbb0 75%, #e4d8c0 100%)
          `,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
            linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 25%, #e0d4bc 50%, #d8cbb0 75%, #e4d8c0 100%)
          `,
        }}
      >
        
        {/* === TOP TAGLINE BAR === */}
        <div className="flex justify-between items-center px-4 py-1 border-b border-stone-500/50 text-[9px] tracking-[0.2em] text-stone-600 italic">
          <span>This personal edition captures the essence of a life</span>
          <span>celebrating the spirit and simplicity of {data.birthYear}</span>
        </div>

        {/* === MASTHEAD === */}
        <header className="text-center pt-1 pb-2 border-b-4 border-double border-stone-800 relative px-4">
          {/* Main masthead */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl text-stone-600" style={{ fontFamily: 'serif' }}>❧</span>
            <h1 
              className="text-5xl md:text-7xl text-stone-900 leading-none whitespace-nowrap"
              style={{ 
                fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', serif",
                textShadow: '1px 1px 0 rgba(0,0,0,0.1)'
              }}
            >
              The Personal Tribune
            </h1>
            <span className="text-2xl text-stone-600" style={{ fontFamily: 'serif' }}>❧</span>
          </div>
          
          {/* Fleur-de-lis and subtitle bar */}
          <div className="flex items-center justify-center gap-2 my-1">
            <div className="flex-1 max-w-32 h-px bg-stone-500" />
            <span className="text-2xl text-stone-700">⚜</span>
            <div className="flex-1 max-w-32 h-px bg-stone-500" />
          </div>
          
          {/* Black bar subtitle */}
          <div className="bg-stone-800 text-amber-50 py-0.5 px-6 mx-auto inline-block tracking-[0.5em] text-[10px] font-bold">
            COMPLETE PERSONAL HISTORY & ANALYSIS
          </div>
          
          {/* Date and volume line */}
          <div className="flex items-center justify-between mt-1 text-[9px] text-stone-600 tracking-wider px-8">
            <span className="font-bold">VOL. XXXVII, No. {data.birthdayRank}</span>
            <span className="uppercase font-bold">{formatDate()}</span>
            <span className="font-bold">PERSONAL EDITION • PRICE: PRICELESS</span>
          </div>
        </header>

        {/* === PAGE NAVIGATION === */}
        <div className="flex justify-center gap-0 bg-stone-300/50 border-b border-stone-400">
          {['Front Page', 'Life & Times', 'Analysis'].map((label, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-6 py-1 text-[9px] font-bold uppercase tracking-wider border-x border-stone-400/50 transition-all
                ${currentPage === i 
                  ? 'bg-stone-800 text-amber-50' 
                  : 'text-stone-700 hover:bg-stone-400/50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>


        {/* === MAIN CONTENT === */}
        <div className="p-3">
          
          {/* ===== FRONT PAGE ===== */}
          {currentPage === 0 && (
            <div className="grid grid-cols-12 gap-0">
              
              {/* LEFT COLUMN - Profile */}
              <div className="col-span-12 md:col-span-3 border-r border-stone-400 pr-3">
                {/* Circular portrait */}
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-stone-700 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                      <span className="text-3xl">👤</span>
                    </div>
                    <div className="absolute inset-1 rounded-full border-2 border-stone-500/50" />
                  </div>
                </div>
                
                <h3 className="font-display text-center text-base font-bold text-stone-900 leading-tight uppercase tracking-wide">
                  {data.generation}
                </h3>
                <p className="text-center text-[9px] text-stone-600 mb-1">
                  Born {data.birthDate}
                </p>
                
                <p className="text-[9px] text-stone-600 text-center italic border-b border-stone-400 pb-1 mb-2">
                  A Complete Personal Dossier
                </p>
                
                <p className="text-[10px] text-justify leading-snug text-stone-800 mb-2">
                  <span className="float-left text-2xl font-display mr-1 leading-none">S</span>
                  ubject entered this world on {data.birthDate}, ranking #{data.birthdayRank} of 366 possible dates 
                  for birth frequency. A member of the {data.generation} generation ({data.generationSpan}), 
                  a cohort defined by unprecedented change.
                </p>
                
                <div className="border-t border-b border-stone-400 py-1 my-2">
                  <p className="text-[9px] font-bold text-center tracking-wider text-stone-700">YEAR OF BIRTH</p>
                  <p className="text-[10px] text-stone-800 text-center">{data.yearEvents.slice(0, 2).join(' • ')}</p>
                </div>
                
                {/* Notable birthdays box */}
                <div className="border-2 border-stone-600 p-2 bg-amber-100/30">
                  <h4 className="text-[9px] font-bold text-center tracking-wider border-b border-stone-400 pb-1 mb-1">
                    NOTABLE JUNE 9TH BIRTHS
                  </h4>
                  {data.celebrities.slice(0, 4).map((celeb, i) => (
                    <p key={i} className="text-[9px] py-0.5 border-b border-stone-300/50 last:border-0 text-stone-700">
                      ◆ {celeb}
                    </p>
                  ))}
                </div>
              </div>

              {/* CENTER COLUMN - Main Story */}
              <div className="col-span-12 md:col-span-6 px-3 border-r border-stone-400">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-stone-900 leading-none mb-0 uppercase">
                  The Story of a Life
                </h2>
                <p className="text-center text-[10px] text-stone-600 mb-2 border-b border-stone-400 pb-1">
                  Complete Analysis of One Born in {data.birthYear}
                </p>
                
                {/* Image placeholder */}
                <div className="border-2 border-stone-500 p-1 mb-2 bg-stone-200">
                  <div className="bg-gradient-to-br from-stone-300 to-stone-400 h-28 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl">🏛️</span>
                      <p className="text-[9px] text-stone-600 mt-1">Historical Scene, {data.birthYear}</p>
                    </div>
                  </div>
                  <p className="text-[8px] text-stone-600 text-center mt-1 italic">
                    The year witnessed: {data.yearEvents[0]}
                  </p>
                </div>

                {/* Main article - 2 columns */}
                <div className="columns-2 gap-3 text-[10px] leading-snug text-justify" style={{ columnRule: '1px solid #78716c' }}>
                  <p className="mb-2">
                    <span className="float-left text-3xl font-display mr-1 leading-none text-stone-800">T</span>
                    he subject of this comprehensive report entered the world on the ninth day of June, in the year 
                    {data.birthYear}, a date ranking #{data.birthdayRank} among all possible calendar dates for frequency of birth.
                  </p>
                  <p className="mb-2">
                    As a documented member of the {data.generation} generation, spanning the years {data.generationSpan}, 
                    this individual belongs to a cohort numbering approximately seventy-two million souls within these 
                    United States—a generation destined to witness profound transformation.
                  </p>
                  <p className="mb-2">
                    The defining events shaping this generation include the attacks upon the nation on September 11, 2001, 
                    the great financial crisis of 2008, and the worldwide pandemic of 2020. Each catastrophe left 
                    indelible marks upon the collective character of the cohort.
                  </p>
                  <p className="mb-2">
                    Born into the final years of the analog age, this generation witnessed the complete transformation 
                    of human communication, commerce, and culture through digital revolution.
                  </p>
                </div>
              </div>


              {/* RIGHT COLUMN - Sidebar Stories */}
              <div className="col-span-12 md:col-span-3 pl-3">
                {/* Stats box */}
                <div className="border-2 border-stone-700 bg-amber-100/40 p-2 mb-3">
                  <h4 className="text-[9px] font-bold text-center tracking-[0.2em] border-b border-stone-500 pb-1 mb-1">
                    BY THE NUMBERS
                  </h4>
                  <div className="space-y-0.5 text-[9px]">
                    <div className="flex justify-between border-b border-stone-300/50 pb-0.5">
                      <span className="text-stone-600">Rank:</span>
                      <span className="font-bold">#{data.birthdayRank}/366</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-300/50 pb-0.5">
                      <span className="text-stone-600">Percentile:</span>
                      <span className="font-bold">{data.birthdayPercentile}%</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-300/50 pb-0.5">
                      <span className="text-stone-600">Generation:</span>
                      <span className="font-bold">{data.generation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Birth Year:</span>
                      <span className="font-bold">{data.birthYear}</span>
                    </div>
                  </div>
                </div>

                {/* Childhood Preview */}
                <div className="mb-3">
                  <h4 className="font-display text-sm font-bold text-stone-900 border-b border-stone-500 pb-0.5 mb-1">
                    THE FORMATIVE YEARS
                  </h4>
                  <p className="text-[9px] text-stone-600 italic mb-1">Childhood Examined</p>
                  <p className="text-[9px] text-justify leading-snug text-stone-800">
                    {getExcerpt('childhood_context', 200)}
                  </p>
                </div>

                {/* Technology box */}
                <div className="border border-stone-500 p-2 bg-stone-200/30">
                  <h4 className="text-[9px] font-bold text-center tracking-wider mb-1">
                    THE MACHINE AGE
                  </h4>
                  <p className="text-[9px] italic text-center text-stone-600 mb-1">
                    Technological Revolution
                  </p>
                  <p className="text-[9px] text-justify leading-snug text-stone-700">
                    {getExcerpt('technology', 150)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== PAGE 2: LIFE & TIMES ===== */}
          {currentPage === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {SECTIONS.slice(0, 6).map((section, idx) => (
                <article 
                  key={section.id} 
                  className={`p-3 ${idx % 3 !== 2 ? 'border-r border-stone-400' : ''} ${idx < 3 ? 'border-b border-stone-400' : ''}`}
                >
                  <h2 className="font-display text-base font-bold text-stone-900 leading-tight uppercase tracking-wide border-b-2 border-stone-700 pb-0.5 mb-1">
                    {section.title}
                  </h2>
                  <p className="text-[9px] text-stone-500 italic mb-2">{section.subtitle}</p>
                  <div 
                    className="text-[10px] leading-snug text-justify text-stone-800
                             [&>h2]:hidden [&>p]:mb-2 
                             [&>p:first-of-type]:first-letter:float-left 
                             [&>p:first-of-type]:first-letter:text-2xl 
                             [&>p:first-of-type]:first-letter:font-display 
                             [&>p:first-of-type]:first-letter:mr-1 
                             [&>p:first-of-type]:first-letter:leading-none"
                    dangerouslySetInnerHTML={{ __html: getContent(section.key) }}
                  />
                </article>
              ))}
            </div>
          )}

          {/* ===== PAGE 3: ANALYSIS ===== */}
          {currentPage === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {SECTIONS.slice(6).map((section, idx) => (
                <article 
                  key={section.id} 
                  className={`p-3 ${idx % 3 !== 2 ? 'border-r border-stone-400' : ''} ${idx < 3 ? 'border-b border-stone-400' : ''}`}
                >
                  <h2 className="font-display text-base font-bold text-stone-900 leading-tight uppercase tracking-wide border-b-2 border-stone-700 pb-0.5 mb-1">
                    {section.title}
                  </h2>
                  <p className="text-[9px] text-stone-500 italic mb-2">{section.subtitle}</p>
                  <div 
                    className="text-[10px] leading-snug text-justify text-stone-800
                             [&>h2]:hidden [&>p]:mb-2 
                             [&>p:first-of-type]:first-letter:float-left 
                             [&>p:first-of-type]:first-letter:text-2xl 
                             [&>p:first-of-type]:first-letter:font-display 
                             [&>p:first-of-type]:first-letter:mr-1 
                             [&>p:first-of-type]:first-letter:leading-none"
                    dangerouslySetInnerHTML={{ __html: getContent(section.key) }}
                  />
                </article>
              ))}
            </div>
          )}

        </div>


        {/* === FOOTER === */}
        <footer className="border-t-2 border-double border-stone-700">
          {/* Classified section header */}
          <div className="bg-stone-800 text-amber-50 py-0.5 px-4 text-center text-[9px] tracking-[0.3em] font-bold">
            NOTICES • DISCLAIMERS • LEGAL MATTERS
          </div>
          
          <div className="grid grid-cols-4 gap-0 text-[8px] text-stone-700">
            <div className="p-2 border-r border-stone-400">
              <h5 className="font-bold text-[9px] mb-0.5 tracking-wider">DATA SOURCES</h5>
              <p>Birthday frequency data sourced from FiveThirtyEight analysis of CDC/SSA records, 1994-2014.</p>
            </div>
            <div className="p-2 border-r border-stone-400">
              <h5 className="font-bold text-[9px] mb-0.5 tracking-wider">METHODOLOGY</h5>
              <p>Generational boundaries per Pew Research Center definitions. All analysis US-centric.</p>
            </div>
            <div className="p-2 border-r border-stone-400">
              <h5 className="font-bold text-[9px] mb-0.5 tracking-wider">DISCLAIMER</h5>
              <p>For entertainment and educational purposes only. Individual experiences may vary.</p>
            </div>
            <div className="p-2">
              <h5 className="font-bold text-[9px] mb-0.5 tracking-wider">EDITION</h5>
              <p>Personal Edition • Report ID: LS-{data.birthYear}-0609 • Series A</p>
            </div>
          </div>
          
          {/* Bottom line */}
          <div className="text-center py-1 border-t border-stone-500">
            <div className="flex items-center justify-center gap-2 text-[8px] text-stone-500">
              <span>❧</span>
              <span>© {new Date().getFullYear()} The Personal Tribune</span>
              <span>•</span>
              <span>All Rights Reserved</span>
              <span>•</span>
              <span>Printed in the United States</span>
              <span>❧</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewspaperTheme
