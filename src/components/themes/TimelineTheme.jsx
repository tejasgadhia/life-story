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

  // Throttled scroll handler (fires max every 50ms)
  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)

      // Find active section
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

  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-aged-paper z-40">
        <div 
          className="h-full bg-dark-brown transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timeline Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group flex items-center gap-3 transition-all duration-300"
              title={section.title}
            >
              <span className={`w-3 h-3 rounded-full border-2 transition-all
                ${activeSection === index 
                  ? 'bg-dark-brown border-dark-brown scale-125' 
                  : 'bg-transparent border-sepia-brown hover:border-dark-brown'
                }`} 
              />
              <span className={`text-sm font-body whitespace-nowrap transition-all
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
      <main className="max-w-2xl mx-auto px-8 py-24 lg:ml-48 lg:mr-auto">
        {/* Hero Section - Birthday Analysis (centered) */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className="min-h-screen flex flex-col justify-center text-center py-20"
        >
          <span className="text-6xl mb-6">🎂</span>
          <h1 className="font-display text-5xl md:text-6xl text-dark-brown mb-4">
            {data.birthDate}
          </h1>
          <p className="font-accent text-xl text-sepia-brown mb-10">
            Your Life Story Report
          </p>
          
          {/* Birthday Rank Card */}
          <div className="aged-paper rounded-lg p-10 mb-10 border border-sepia-brown/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="text-center">
                <p className="text-6xl font-display text-dark-brown mb-2">
                  #{data.birthdayRank}
                </p>
                <p className="font-body text-base text-sepia-brown">
                  Birthday Rank
                </p>
                <p className="font-body text-sm text-sepia-brown/70 mt-1">
                  out of 366 possible dates
                </p>
              </div>
              <div className="w-px h-20 bg-sepia-brown/30 hidden md:block" />
              <div className="text-center">
                <p className="text-5xl font-display text-dark-brown mb-2">
                  {data.birthdayPercentile}%
                </p>
                <p className="font-body text-base text-sepia-brown">
                  Percentile
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-vintage-cream/50 rounded border border-sepia-brown/10">
              <p className="font-body text-sm text-sepia-brown/80 text-center leading-relaxed">
                <strong>How to read:</strong> #1 = most common birthday, #366 = least common. 
                Your rank of #{data.birthdayRank} means {data.birthdayRank < 183 
                  ? `your birthday is more common than average.` 
                  : `your birthday is less common than average.`}
              </p>
            </div>
          </div>

          {/* Generation Badge */}
          <div className="inline-flex items-center gap-3 bg-dark-brown text-vintage-cream px-8 py-4 rounded-full mx-auto mb-10">
            <span className="font-body text-sm uppercase tracking-wider">Generation:</span>
            <span className="font-display text-xl">{data.generation}</span>
            <span className="font-body text-sm opacity-70">({data.generationSpan})</span>
          </div>

          {/* Celebrity Birthdays */}
          <div className="text-center">
            <p className="font-body text-sm text-sepia-brown uppercase tracking-wider mb-4">
              You share your birthday with
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.celebrities.map((celeb, i) => (
                <span 
                  key={i}
                  className="bg-aged-paper px-4 py-2 rounded font-body text-base text-dark-brown"
                >
                  {celeb}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <span className="text-sepia-brown text-3xl">↓</span>
          </div>
        </section>

        {/* Content Sections - LEFT ALIGNED for readability */}
        {SECTIONS.slice(1).map((section, index) => {
          const content = getSectionContent(section.id)
          if (!content) return null
          
          return (
            <section
              key={section.id}
              ref={el => sectionRefs.current[index + 1] = el}
              className="min-h-screen flex flex-col justify-center py-24 border-t border-sepia-brown/20"
            >
              <div className="text-center mb-12">
                <span className="text-5xl mb-4 block">{section.icon}</span>
                <h2 className="font-display text-4xl text-dark-brown">
                  {section.title}
                </h2>
              </div>
              
              {/* LEFT-ALIGNED prose for readability */}
              <div 
                className="font-body text-dark-brown/90 text-lg leading-relaxed
                         [&>h2]:hidden 
                         [&>p]:mb-8 
                         [&>p]:leading-[1.8]
                         [&>p:first-of-type]:text-xl 
                         [&>p:first-of-type]:font-accent
                         [&>p:first-of-type]:text-dark-brown
                         [&>strong]:text-dark-brown
                         [&>strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </section>
          )
        })}

        {/* Footer */}
        <footer className="py-20 border-t border-sepia-brown/20">
          <p className="font-body text-sm text-sepia-brown/60 max-w-lg leading-relaxed">
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
