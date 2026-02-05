import { useState, useEffect, useRef } from 'react'
import { Sparkles, Flower2 } from 'lucide-react'

const LOADING_STAGES = [
  { text: 'Accessing historical archives...', duration: 600 },
  { text: 'Analyzing birth year data...', duration: 500 },
  { text: 'Cross-referencing generational markers...', duration: 700 },
  { text: 'Compiling cultural touchstones...', duration: 600 },
  { text: 'Processing economic indicators...', duration: 500 },
  { text: 'Generating personalized insights...', duration: 800 },
  { text: 'Finalizing your Life Story report...', duration: 600 },
]

function LoadingScreen({ onComplete, birthYear = 1988 }) {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const stageRef = useRef(0)

  // Keep ref in sync with state
  useEffect(() => {
    stageRef.current = currentStage
  }, [currentStage])

  useEffect(() => {
    let stageTimeout
    let progressInterval

    // Progress bar animation - use ref to avoid stale closure
    progressInterval = setInterval(() => {
      setProgress(prev => {
        const target = ((stageRef.current + 1) / LOADING_STAGES.length) * 100
        const increment = 0.5
        if (prev < target) {
          return Math.min(prev + increment, target)
        }
        return prev
      })
    }, 20)

    // Stage progression
    const advanceStage = () => {
      if (stageRef.current < LOADING_STAGES.length - 1) {
        setCurrentStage(prev => prev + 1)
        stageTimeout = setTimeout(advanceStage, LOADING_STAGES[stageRef.current + 1]?.duration || 500)
      } else {
        // Final stage complete
        setTimeout(() => {
          setProgress(100)
          setTimeout(() => {
            setShowReport(true)
            setTimeout(onComplete, 400)
          }, 300)
        }, 400)
      }
    }

    stageTimeout = setTimeout(advanceStage, LOADING_STAGES[0].duration)

    return () => {
      clearTimeout(stageTimeout)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-50">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className={`relative text-center transition-all duration-500 px-4 ${showReport ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Logo/Brand */}
        <div className="mb-8 md:mb-12">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-amber mb-3 md:mb-4"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Life Story
          </h1>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-12 md:w-16 h-px bg-charcoal-300" />
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber" aria-hidden="true" />
            <div className="w-12 md:w-16 h-px bg-charcoal-300" />
          </div>
        </div>

        {/* Year being analyzed */}
        <div className="mb-8 md:mb-10">
          <p className="text-charcoal-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2">
            Generating Report For
          </p>
          <p className="text-charcoal-800 text-3xl md:text-4xl font-heading">{birthYear}</p>
        </div>

        {/* Progress bar container */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 md:mb-8">
          <div className="h-2 bg-charcoal-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber to-amber-light rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-center mt-2 text-xs">
            <span className="font-medium text-charcoal-600 tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current stage text */}
        <div className="h-8 px-2">
          <p className="text-charcoal-600 text-sm md:text-base font-sans animate-pulse">
            {LOADING_STAGES[currentStage].text}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 md:mt-12 flex justify-center gap-1.5 md:gap-2">
          {LOADING_STAGES.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                idx <= currentStage
                  ? 'bg-amber'
                  : 'bg-charcoal-200'
              }`}
            />
          ))}
        </div>

        {/* Typewriter effect dots */}
        <div className="mt-6 md:mt-8 flex justify-center gap-1">
          <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Corner decorations - hidden on small screens */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 hidden sm:block" aria-hidden="true">
        <Flower2 className="w-5 h-5 md:w-7 md:h-7 text-charcoal-200" />
      </div>
      <div className="absolute top-4 md:top-8 right-4 md:right-8 hidden sm:block" aria-hidden="true">
        <Flower2 className="w-5 h-5 md:w-7 md:h-7 text-charcoal-200 scale-x-[-1]" />
      </div>
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 hidden sm:block" aria-hidden="true">
        <Flower2 className="w-5 h-5 md:w-7 md:h-7 text-charcoal-200 rotate-180 scale-x-[-1]" />
      </div>
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 hidden sm:block" aria-hidden="true">
        <Flower2 className="w-5 h-5 md:w-7 md:h-7 text-charcoal-200 rotate-180" />
      </div>
    </div>
  )
}

export default LoadingScreen
