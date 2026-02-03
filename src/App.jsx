import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import DatePicker from './components/DatePicker'
import LoadingScreen from './components/LoadingScreen'
import TimelineTheme from './components/themes/TimelineTheme'
import NewspaperTheme from './components/themes/NewspaperTheme'
import CaseFileTheme from './components/themes/CaseFileTheme'
import { assembleReport } from './utils/assembleReport'

// Font size context
const FontSizeContext = createContext({ fontSize: 'base', setFontSize: () => {} })

// Report data context - shared across all routes
const ReportContext = createContext(null)

// Tab slugs - shared across all themes
const TAB_SLUGS = ['overview', 'formative-years', 'world-events', 'personal-insights']

// Theme Switcher - Left sidebar
function ThemeSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const { fontSize, setFontSize } = useContext(FontSizeContext)

  const pathParts = location.pathname.split('/').filter(Boolean)
  const currentTheme = pathParts[1] || 'timeline'
  const currentSlug = pathParts[2] || 'overview'

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
    if (themeId === 'timeline' && currentSlug === 'overview') {
      navigate('/life-story/')
    } else if (themeId === 'timeline') {
      navigate(`/life-story/timeline/${currentSlug}`)
    } else if (currentSlug === 'overview') {
      navigate(`/life-story/${themeId}`)
    } else {
      navigate(`/life-story/${themeId}/${currentSlug}`)
    }
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-dark-brown/95 backdrop-blur rounded-r-lg py-3 px-2 shadow-xl flex flex-col gap-1">
        <p className="text-[10px] font-body text-vintage-cream/50 uppercase tracking-wider text-center mb-1 px-1">
          Theme
        </p>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`group relative px-3 py-2.5 rounded transition-all
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
  )
}

// Generic wrapper for themes with tab state from URL (slug-based)
function ThemeWrapper({ ThemeComponent, themePath }) {
  const { tab } = useParams()
  const navigate = useNavigate()
  const { fontSize } = useContext(FontSizeContext)
  const reportData = useContext(ReportContext)

  // Convert slug to tab index
  const tabIndex = tab ? TAB_SLUGS.indexOf(tab) : 0
  const currentTab = tabIndex >= 0 ? tabIndex : 0

  const setTab = (newTabIndex) => {
    const slug = TAB_SLUGS[newTabIndex] || 'overview'
    if (newTabIndex === 0) {
      navigate(`/life-story/${themePath}`)
    } else {
      navigate(`/life-story/${themePath}/${slug}`)
    }
  }

  const props = themePath === 'newspaper'
    ? { currentPage: currentTab, setPage: setTab, fontSize }
    : { currentTab: currentTab, setTab: setTab, fontSize }

  return <ThemeComponent data={reportData} {...props} />
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      {children}
    </div>
  )
}

function ProtectedRoutes() {
  return (
    <Routes>
      {/* Timeline */}
      <Route path="/life-story" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/timeline" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/timeline/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />

      {/* Newspaper */}
      <Route path="/life-story/newspaper" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />
      <Route path="/life-story/newspaper/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />

      {/* Case File */}
      <Route path="/life-story/casefile" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />
      <Route path="/life-story/casefile/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/life-story" replace />} />
    </Routes>
  )
}

function App() {
  const [birthDate, setBirthDate] = useState(null) // { year, month, day }
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('life-story-font-size') || 'base'
  })

  // Check for saved session
  useEffect(() => {
    const savedDate = sessionStorage.getItem('life-story-birthdate')
    const savedReport = sessionStorage.getItem('life-story-report')

    if (savedDate && savedReport) {
      try {
        setBirthDate(JSON.parse(savedDate))
        setReportData(JSON.parse(savedReport))
        setShowContent(true)
      } catch (e) {
        // Invalid saved data, clear it
        sessionStorage.removeItem('life-story-birthdate')
        sessionStorage.removeItem('life-story-report')
      }
    }
  }, [])

  // Persist font size
  useEffect(() => {
    localStorage.setItem('life-story-font-size', fontSize)
  }, [fontSize])

  const handleDateSubmit = async ({ year, month, day }) => {
    setIsLoading(true)

    try {
      const report = await assembleReport({ year, month, day })

      // Save to session
      const dateObj = { year, month, day }
      sessionStorage.setItem('life-story-birthdate', JSON.stringify(dateObj))
      sessionStorage.setItem('life-story-report', JSON.stringify(report))

      setBirthDate(dateObj)
      setReportData(report)

      // Show loading animation before content
      return true
    } catch (error) {
      console.error('Failed to assemble report:', error)
      setIsLoading(false)
      throw error
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  // Not authenticated - show date picker
  if (!birthDate || !reportData) {
    return <DatePicker onSubmit={handleDateSubmit} />
  }

  // Loading animation
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={reportData.birthYear} />
  }

  // Show content
  if (showContent) {
    return (
      <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
        <ReportContext.Provider value={reportData}>
          <BrowserRouter>
            <ProtectedRoutes />
          </BrowserRouter>
        </ReportContext.Provider>
      </FontSizeContext.Provider>
    )
  }

  return null
}

export default App
