import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import LoadingScreen from './components/LoadingScreen'
import TimelineTheme from './components/themes/TimelineTheme'
import NewspaperTheme from './components/themes/NewspaperTheme'
import CaseFileTheme from './components/themes/CaseFileTheme'
import yearData from './data/1988.json'
import birthdayData from './data/birthdays.json'

// Assemble report data once
const birthDate = '06-09'
const birthday = birthdayData[birthDate]
const reportData = {
  birthDate: 'June 9, 1988',
  birthYear: 1988,
  generation: yearData.generation,
  generationSpan: yearData.generation_span,
  birthdayRank: birthday.rank,
  birthdayPercentile: birthday.percentile,
  celebrities: birthday.celebrities,
  sections: yearData.sections,
  yearEvents: yearData.year_events
}

// Theme Switcher - Left sidebar
function ThemeSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine current theme and tab from path
  const pathParts = location.pathname.split('/').filter(Boolean)
  const currentTheme = pathParts[1] || 'timeline'
  const currentTab = pathParts[2] ? parseInt(pathParts[2]) : 1

  const themes = [
    { id: 'timeline', label: 'Timeline', icon: '📊' },
    { id: 'newspaper', label: 'Newspaper', icon: '📰' },
    { id: 'casefile', label: 'Case File', icon: '📁' },
  ]

  const handleThemeChange = (themeId) => {
    if (themeId === 'timeline' && currentTab === 1) {
      navigate('/life-story/')
    } else if (themeId === 'timeline') {
      navigate(`/life-story/timeline/${currentTab}`)
    } else if (currentTab === 1) {
      navigate(`/life-story/${themeId}`)
    } else {
      navigate(`/life-story/${themeId}/${currentTab}`)
    }
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-dark-brown/95 backdrop-blur rounded-r-lg py-3 px-2 shadow-xl flex flex-col gap-1">
        <p className="text-[10px] font-body text-vintage-cream/50 uppercase tracking-wider text-center mb-2 px-1">
          Theme
        </p>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`group relative px-3 py-3 rounded transition-all
              ${currentTheme === theme.id 
                ? 'bg-vintage-cream text-dark-brown' 
                : 'text-vintage-cream/70 hover:bg-vintage-cream/20 hover:text-vintage-cream'
              }`}
            title={theme.label}
          >
            <span className="text-lg">{theme.icon}</span>
            {/* Tooltip on hover */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dark-brown text-vintage-cream 
                           text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 
                           transition-opacity pointer-events-none shadow-lg">
              {theme.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Generic wrapper for themes with tab state from URL
function ThemeWrapper({ ThemeComponent, themePath }) {
  const { tab } = useParams()
  const navigate = useNavigate()
  const currentTab = tab ? parseInt(tab) - 1 : 0
  
  const setTab = (newTab) => {
    if (newTab === 0) {
      navigate(`/life-story/${themePath}`)
    } else {
      navigate(`/life-story/${themePath}/${newTab + 1}`)
    }
  }
  
  // Determine prop names based on theme
  const props = themePath === 'newspaper' 
    ? { currentPage: currentTab, setPage: setTab }
    : { currentTab: currentTab, setTab: setTab }
  
  return <ThemeComponent data={reportData} {...props} />
}

// Main layout with theme switcher
function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      {children}
    </div>
  )
}

// Protected routes wrapper
function ProtectedRoutes() {
  return (
    <Routes>
      {/* Timeline routes */}
      <Route path="/life-story" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/timeline" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/timeline/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      
      {/* Newspaper routes */}
      <Route path="/life-story/newspaper" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />
      <Route path="/life-story/newspaper/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />
      
      {/* Case File routes */}
      <Route path="/life-story/casefile" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />
      <Route path="/life-story/casefile/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/life-story" replace />} />
    </Routes>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('life-story-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setShowContent(true)
    }
  }, [])

  const handleLogin = (password) => {
    const correctPassword = '1988'
    if (password === correctPassword) {
      sessionStorage.setItem('life-story-auth', 'true')
      setIsAuthenticated(true)
      setIsLoading(true)
      return true
    }
    return false
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  if (!isAuthenticated) {
    return <PasswordGate onLogin={handleLogin} />
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={reportData.birthYear} />
  }

  if (showContent) {
    return (
      <BrowserRouter>
        <ProtectedRoutes />
      </BrowserRouter>
    )
  }

  return null
}

export default App
