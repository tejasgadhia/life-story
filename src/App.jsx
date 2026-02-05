import { useState, useEffect, useMemo, useRef, createContext, useContext, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import DatePicker from './components/DatePicker'
import LoadingScreen from './components/LoadingScreen'

import { assembleReport } from './utils/assembleReport'
import { useMetaTags } from './hooks/useMetaTags'
import { loadReportFonts, loadThemeFonts } from './utils/loadFonts'

// Lazy load theme components for code splitting
const TimelineTheme = lazy(() => import('./components/themes/TimelineTheme'))
const NewspaperTheme = lazy(() => import('./components/themes/NewspaperTheme'))
const CaseFileTheme = lazy(() => import('./components/themes/CaseFileTheme'))

// Font size context
const FontSizeContext = createContext({ fontSize: 'base', setFontSize: () => {} })

// Tab slugs - shared across all themes
const TAB_SLUGS = ['overview', 'formative-years', 'world-events', 'personal-insights']

// Valid year range
const MIN_YEAR = 1946
const MAX_YEAR = 2012

/**
 * Parse and validate birthday from URL parameter
 * @param {string} birthday - Expected format: YYYY-MM-DD (ISO)
 * @returns {{ year: number, month: number, day: number } | null}
 */
function parseBirthdayFromUrl(birthday) {
  if (!birthday) return null

  const match = birthday.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const day = parseInt(match[3], 10)

  // Validate ranges
  if (year < MIN_YEAR || year > MAX_YEAR) return null
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null

  // Validate actual date (handles month lengths and leap years)
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return { year, month, day }
}

/**
 * Format date object to ISO string for URL
 * @param {{ year: number, month: number, day: number }} date
 * @returns {string} YYYY-MM-DD
 */
function formatBirthdayForUrl({ year, month, day }) {
  const m = String(month).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

// Theme Switcher - Desktop sidebar + Mobile FAB with bottom sheet
function ThemeSwitcher() {
  const navigate = useNavigate()
  const { birthday, tab } = useParams()
  const location = useLocation()
  const { fontSize, setFontSize } = useContext(FontSizeContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for focus management
  const triggerButtonRef = useRef(null)
  const bottomSheetRef = useRef(null)

  // Focus trap for mobile bottom sheet
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const sheet = bottomSheetRef.current
    if (!sheet) return

    // Get all focusable elements
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const getFocusableElements = () => sheet.querySelectorAll(focusableSelector)

    // Focus first element when sheet opens
    const focusables = getFocusableElements()
    if (focusables.length > 0) {
      focusables[0].focus()
    }

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        triggerButtonRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const focusables = getFocusableElements()
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Determine current theme from path
  const pathParts = location.pathname.split('/').filter(Boolean)
  // Path: life-story / birthday / theme / tab?
  const currentTheme = pathParts[2] || 'timeline'
  const currentSlug = tab || 'overview'

  const themes = [
    { id: 'timeline', label: 'Timeline', icon: '📊' },
    { id: 'newspaper', label: 'Newspaper', icon: '📰' },
    { id: 'casefile', label: 'Case File', icon: '📁' },
  ]

  const fontSizes = [
    { id: 'sm', label: 'Small', icon: 'A' },
    { id: 'base', label: 'Medium', icon: 'A' },
    { id: 'lg', label: 'Large', icon: 'A' },
  ]

  const handleThemeChange = (themeId) => {
    // Preserve birthday and current tab when switching themes
    if (currentSlug === 'overview') {
      navigate(`/life-story/${birthday}/${themeId}`)
    } else {
      navigate(`/life-story/${birthday}/${themeId}/${currentSlug}`)
    }
    setIsMobileMenuOpen(false)
  }

  const handleFontSizeChange = (sizeId) => {
    setFontSize(sizeId)
    setIsMobileMenuOpen(false)
  }

  // Close menu and return focus to trigger button
  const closeMenu = () => {
    setIsMobileMenuOpen(false)
    triggerButtonRef.current?.focus()
  }

  return (
    <>
      {/* Desktop sidebar - hidden on mobile */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="bg-dark-brown/95 backdrop-blur rounded-r-lg py-3 px-2 shadow-xl flex flex-col gap-1">
          <p className="text-[10px] font-body text-vintage-cream/50 uppercase tracking-wider text-center mb-1 px-1">
            Theme
          </p>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`group relative px-3 py-2 rounded transition-all
                active:scale-[0.98] focus:ring-2 focus:ring-vintage-cream/50 focus:outline-none
                ${currentTheme === theme.id
                  ? 'bg-vintage-cream text-dark-brown'
                  : 'text-vintage-cream/70 hover:bg-vintage-cream/20 hover:text-vintage-cream'
                }`}
              title={theme.label}
            >
              <span className="text-lg">{theme.icon}</span>
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dark-brown text-vintage-cream
                             text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100
                             transition-opacity pointer-events-none shadow-lg">
                {theme.label}
              </span>
            </button>
          ))}

          <div className="h-px bg-vintage-cream/20 my-2" />

          <p className="text-[10px] font-body text-vintage-cream/50 uppercase tracking-wider text-center mb-1 px-1">
            Size
          </p>
          <div className="flex flex-col gap-1">
            {fontSizes.map((size, idx) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`group relative px-3 py-1.5 rounded transition-all font-body
                  active:scale-[0.98] focus:ring-2 focus:ring-vintage-cream/50 focus:outline-none
                  ${fontSize === size.id
                    ? 'bg-vintage-cream text-dark-brown'
                    : 'text-vintage-cream/70 hover:bg-vintage-cream/20 hover:text-vintage-cream'
                  }`}
                title={size.label}
              >
                <span className={idx === 0 ? 'text-xs' : idx === 1 ? 'text-sm' : 'text-base'}>
                  {size.icon}
                </span>
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dark-brown text-vintage-cream
                               text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100
                               transition-opacity pointer-events-none shadow-lg">
                  {size.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile FAB - visible only on mobile */}
      <button
        ref={triggerButtonRef}
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-dark-brown/95 backdrop-blur
                   rounded-full shadow-xl flex items-center justify-center text-2xl
                   active:scale-95 transition-transform"
        aria-label="Open theme settings"
      >
        <span className="text-vintage-cream">⚙️</span>
      </button>

      {/* Mobile bottom sheet overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={closeMenu}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Bottom sheet */}
          <div
            ref={bottomSheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Theme settings"
            className="absolute bottom-0 left-0 right-0 bg-dark-brown rounded-t-2xl p-6 pb-8
                       animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-vintage-cream/30 rounded-full mx-auto mb-6" />

            {/* Theme selection */}
            <div className="mb-6">
              <p className="text-xs font-body text-vintage-cream/50 uppercase tracking-wider mb-3">
                Theme
              </p>
              <div className="flex gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`flex-1 py-4 px-4 rounded-lg transition-all flex flex-col items-center gap-2
                      ${currentTheme === theme.id
                        ? 'bg-vintage-cream text-dark-brown'
                        : 'bg-vintage-cream/10 text-vintage-cream/70 active:bg-vintage-cream/20'
                      }`}
                  >
                    <span className="text-2xl">{theme.icon}</span>
                    <span className="text-sm font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font size selection */}
            <div>
              <p className="text-xs font-body text-vintage-cream/50 uppercase tracking-wider mb-3">
                Text Size
              </p>
              <div className="flex gap-3">
                {fontSizes.map((size, idx) => (
                  <button
                    key={size.id}
                    onClick={() => handleFontSizeChange(size.id)}
                    className={`flex-1 py-4 px-4 rounded-lg transition-all flex flex-col items-center gap-2 font-body
                      ${fontSize === size.id
                        ? 'bg-vintage-cream text-dark-brown'
                        : 'bg-vintage-cream/10 text-vintage-cream/70 active:bg-vintage-cream/20'
                      }`}
                  >
                    <span className={idx === 0 ? 'text-base' : idx === 1 ? 'text-xl' : 'text-2xl'}>
                      {size.icon}
                    </span>
                    <span className="text-sm font-medium">{size.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeMenu}
              className="mt-6 w-full py-4 bg-vintage-cream/10 text-vintage-cream rounded-lg
                         font-medium active:bg-vintage-cream/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// Generic wrapper for themes with tab state from URL (slug-based)
function ThemeWrapper({ ThemeComponent, themePath }) {
  const { birthday, tab } = useParams()
  const navigate = useNavigate()
  const { fontSize } = useContext(FontSizeContext)
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

  // Parse birthday from URL - memoize to avoid infinite loops
  const parsedDate = useMemo(() => parseBirthdayFromUrl(birthday), [birthday])

  // Update meta tags for social sharing
  useMetaTags(reportData, birthday, themePath)

  // Load report fonts and theme-specific fonts
  useEffect(() => {
    loadReportFonts()
    loadThemeFonts(themePath)
  }, [themePath])

  // Redirect to landing if invalid date
  useEffect(() => {
    if (!parsedDate) {
      navigate('/life-story', { replace: true })
    }
  }, [parsedDate, navigate])

  // Load report data from URL params
  useEffect(() => {
    if (!parsedDate) return

    const loadReport = async () => {
      // Check session cache first
      const cacheKey = `life-story-report-${birthday}`
      const cachedReport = sessionStorage.getItem(cacheKey)

      if (cachedReport) {
        try {
          setReportData(JSON.parse(cachedReport))
          setIsLoading(false)
          return
        } catch (e) {
          sessionStorage.removeItem(cacheKey)
        }
      }

      // No cache, need to load - show loading screen
      setShowLoading(true)

      try {
        const report = await assembleReport(parsedDate)
        sessionStorage.setItem(cacheKey, JSON.stringify(report))
        setReportData(report)
      } catch (error) {
        console.error('Failed to load report:', error)
        navigate('/life-story', { replace: true })
      }
    }

    loadReport()
  }, [birthday, parsedDate, navigate])

  // Handle loading screen completion
  const handleLoadingComplete = () => {
    setShowLoading(false)
    setIsLoading(false)
  }

  // Show loading screen if needed
  if (showLoading && reportData) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={reportData.birthYear} />
  }

  // Still loading (either parsing or assembling)
  if (isLoading || !reportData) {
    return null
  }

  // Convert slug to tab index
  const tabIndex = tab ? TAB_SLUGS.indexOf(tab) : 0
  const currentTab = tabIndex >= 0 ? tabIndex : 0

  // Redirect if invalid tab
  if (tab && tabIndex < 0) {
    navigate(`/life-story/${birthday}/${themePath}`, { replace: true })
    return null
  }

  const setTab = (newTabIndex) => {
    const slug = TAB_SLUGS[newTabIndex] || 'overview'
    if (newTabIndex === 0) {
      navigate(`/life-story/${birthday}/${themePath}`)
    } else {
      navigate(`/life-story/${birthday}/${themePath}/${slug}`)
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal-50" />}>
      <ThemeComponent data={reportData} currentTab={currentTab} setTab={setTab} fontSize={fontSize} />
    </Suspense>
  )
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      {children}
    </div>
  )
}

// Landing page with DatePicker
function LandingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleDateSubmit = async ({ year, month, day }) => {
    setIsLoading(true)

    try {
      // Pre-load the report
      const report = await assembleReport({ year, month, day })

      // Cache it
      const dateStr = formatBirthdayForUrl({ year, month, day })
      const cacheKey = `life-story-report-${dateStr}`
      sessionStorage.setItem(cacheKey, JSON.stringify(report))

      // Navigate to report URL
      navigate(`/life-story/${dateStr}/timeline`)
      return true
    } catch (error) {
      console.error('Failed to assemble report:', error)
      setIsLoading(false)
      throw error
    }
  }

  return <DatePicker onSubmit={handleDateSubmit} isLoading={isLoading} />
}

// Redirect handler for old URL format (without birthday)
function LegacyRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/life-story', { replace: true })
  }, [navigate])

  return null
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/life-story" element={<LandingPage />} />

      {/* Report routes with birthday in URL */}
      {/* Timeline */}
      <Route path="/life-story/:birthday/timeline" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/:birthday/timeline/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />

      {/* Newspaper */}
      <Route path="/life-story/:birthday/newspaper" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />
      <Route path="/life-story/:birthday/newspaper/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />

      {/* Case File */}
      <Route path="/life-story/:birthday/casefile" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />
      <Route path="/life-story/:birthday/casefile/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />

      {/* Legacy redirects - old URLs without birthday */}
      <Route path="/life-story/timeline" element={<LegacyRedirect />} />
      <Route path="/life-story/timeline/:tab" element={<LegacyRedirect />} />
      <Route path="/life-story/newspaper" element={<LegacyRedirect />} />
      <Route path="/life-story/newspaper/:tab" element={<LegacyRedirect />} />
      <Route path="/life-story/casefile" element={<LegacyRedirect />} />
      <Route path="/life-story/casefile/:tab" element={<LegacyRedirect />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/life-story" replace />} />
    </Routes>
  )
}

function App() {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('life-story-font-size') || 'base'
  })

  // Persist font size
  useEffect(() => {
    localStorage.setItem('life-story-font-size', fontSize)
  }, [fontSize])

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FontSizeContext.Provider>
  )
}

export default App
