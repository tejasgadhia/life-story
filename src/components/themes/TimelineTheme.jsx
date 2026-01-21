import { useState, useEffect, useRef, useCallback } from 'react'

const SECTIONS = [
  { id: 'birthday', title: 'Birthday Analysis', icon: '🎂' },
  { id: 'childhood', title: 'Childhood', icon: '💒' },
  { id: 'generation', title: 'Your Generation', icon: '👥' },
  { id: 'popculture', title: 'Pop Culture', icon: '🎬' },
  { id: 'technology', title: 'Technology', icon: '💻' },
  { id: 'history', title: 'Historical Milestones', icon: '📜' },
  { id: 'career', title: 'Career', icon: '💼' },
  { id: 'relationships', title: 'Relationships', icon: '💬' },
  { id: 'financial', title: 'Financial', icon: '💰' },
  { id: 'blindspots', title: 'Blind Spots', icon: '🔍' },
  { id: 'roadmap', title: 'Life Roadmap', icon: '🗺️' },
  { id: 'comparison', title: 'Comparison', icon: '📊' },
]

// Throttle utility
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

function TimelineTheme({ data }) {
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const sectionRefs = useRef([])

  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index)
          }
        }
      })
    }, 50),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const getSectionContent = (sectionId) => {
    const mapping = {
      'childhood': 'childhood_context',
      'generation': 'generational_identity',
      'popculture': 'pop_culture',
      'technology': 'technology',
      'history': 'historical_milestones',
      'career': 'career',
      'relationships': 'relationships',
      'financial': 'financial',
      'blindspots': 'blind_spots',
      'roadmap': 'life_roadmap',
      'comparison': 'comparison',
    }
    const key = mapping[sectionId]
    return key ? data.sections[key]?.html : null
  }

  // Group sections into pairs for two-column layout
  const contentSections = SECTIONS.slice(1)
  const sectionPairs = []
  for (let i = 0; i < contentSections.length; i += 2) {
    sectionPairs.push(contentSections.slice(i, i + 2))
  }

  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-aged-paper z-40">
        <div 
          className="h-full bg-dark-brown transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timeline Navigation - Compact */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col gap-2">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group flex items-center gap-2 transition-all duration-300"
              title={section.title}
            >
              <span className={`w-2.5 h-2.5 rounded-full border-2 transition-all
                ${activeSection === index 
                  ? 'bg-dark-brown border-dark-brown scale-125' 
                  : 'bg-transparent border-sepia-brown hover:border-dark-brown'
                }`} 
              />
              <span className={`text-xs font-body whitespace-nowrap transition-all
                ${activeSection === index 
                  ? 'opacity-100 text-dark-brown font-bold' 
                  : 'opacity-0 group-hover:opacity-100 text-sepia-brown'
                }`}>
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 xl:pl-32">
        
        {/* Hero Section - Birthday Analysis (Full Width) */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className="py-12 mb-8"
        >
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🎂</span>
            <h1 className="font-display text-4xl md:text-5xl text-dark-brown mb-2">
              {data.birthDate}
            </h1>
            <p className="font-accent text-lg text-sepia-brown">
              Your Life Story Report
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Birthday Rank */}
            <div className="aged-paper rounded-lg p-6 border border-sepia-brown/20 text-center">
              <p className="text-4xl font-display text-dark-brown mb-1">
                #{data.birthdayRank}
              </p>
              <p className="font-body text-sm text-sepia-brown">
                Birthday Rank
              </p>
              <p className="font-body text-xs text-sepia-brown/70 mt-1">
                out of 366 dates
              </p>
            </div>

            {/* Generation */}
            <div className="bg-dark-brown text-vintage-cream rounded-lg p-6 text-center">
              <p className="font-body text-xs uppercase tracking-wider opacity-70 mb-1">Generation</p>
              <p className="font-display text-2xl mb-1">{data.generation}</p>
              <p className="font-body text-sm opacity-70">{data.generationSpan}</p>
            </div>

            {/* Percentile */}
            <div className="aged-paper rounded-lg p-6 border border-sepia-brown/20 text-center">
              <p className="text-4xl font-display text-dark-brown mb-1">
                {data.birthdayPercentile}%
              </p>
              <p className="font-body text-sm text-sepia-brown">
                Percentile
              </p>
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
        </section>

        {/* Two-Column Content Grid */}
        {sectionPairs.map((pair, pairIndex) => (
          <div 
            key={pairIndex} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {pair.map((section, idx) => {
              const globalIndex = pairIndex * 2 + idx + 1
              const content = getSectionContent(section.id)
              if (!content) return null
              
              return (
                <section
                  key={section.id}
                  ref={el => sectionRefs.current[globalIndex] = el}
                  className="bg-white/50 rounded-lg border border-sepia-brown/10 p-6"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sepia-brown/20">
                    <span className="text-2xl">{section.icon}</span>
                    <h2 className="font-display text-xl text-dark-brown">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div 
                    className="font-body text-dark-brown/90 text-sm leading-relaxed
                             [&>h2]:hidden 
                             [&>p]:mb-4 
                             [&>p]:leading-[1.7]
                             [&>p:first-of-type]:font-accent
                             [&>p:first-of-type]:text-base
                             [&>strong]:font-bold
                             max-h-[400px] overflow-y-auto pr-2
                             scrollbar-thin scrollbar-thumb-sepia-brown/30"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </section>
              )
            })}
          </div>
        ))}

        {/* Footer */}
        <footer className="py-8 border-t border-sepia-brown/20 text-center">
          <p className="font-body text-xs text-sepia-brown/60 max-w-2xl mx-auto leading-relaxed">
            This report analyzes US cultural and historical context. Generational 
            characteristics are research-based generalizations. Birthday data sourced from 
            FiveThirtyEight (CDC/SSA 1994-2014). Generational definitions per Pew Research Center.
          </p>
        </footer>
      </main>
    </div>
  )
}

export default TimelineTheme
