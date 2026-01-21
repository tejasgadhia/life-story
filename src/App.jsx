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

// Theme Switcher with routing
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
    // Preserve current tab when switching themes
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
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur border-2 border-dark-brown rounded-lg p-3 shadow-xl">
        <p className="text-xs font-body text-sepia-brown uppercase tracking-wider mb-2 text-center">
          Theme
        </p>
        <div className="flex gap-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`px-3 py-2 rounded font-body text-sm transition-all
                ${currentTheme === theme.id 
                  ? 'bg-dark-brown text-vintage-cream' 
                  : 'bg-vintage-cream text-dark-brown hover:bg-aged-paper'
                }`}
              title={theme.label}
            >
              <span className="mr-1">{theme.icon}</span>
              <span className="hidden sm:inline">{theme.label}</span>
            </button>
          ))}
        </div>
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
