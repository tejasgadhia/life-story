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
  
  const currentTheme = location.pathname.includes('/newspaper') ? 'newspaper' 
    : location.pathname.includes('/casefile') ? 'casefile' 
    : 'timeline'

  const themes = [
    { id: 'timeline', label: 'Timeline', icon: '📊', path: '/life-story/' },
    { id: 'newspaper', label: 'Newspaper', icon: '📰', path: '/life-story/newspaper' },
    { id: 'casefile', label: 'Case File', icon: '📁', path: '/life-story/casefile' },
  ]

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
              onClick={() => navigate(theme.path)}
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

// Wrapper for Newspaper with page state from URL
function NewspaperWrapper() {
  const { page } = useParams()
  const navigate = useNavigate()
  const currentPage = page ? parseInt(page) - 1 : 0
  
  const setPage = (newPage) => {
    if (newPage === 0) {
      navigate('/life-story/newspaper')
    } else {
      navigate(`/life-story/newspaper/${newPage + 1}`)
    }
  }
  
  return <NewspaperTheme data={reportData} currentPage={currentPage} setPage={setPage} />
}

// Wrapper for CaseFile with tab state from URL
function CaseFileWrapper() {
  const { tab } = useParams()
  const navigate = useNavigate()
  const currentTab = tab ? parseInt(tab) - 1 : 0
  
  const setTab = (newTab) => {
    if (newTab === 0) {
      navigate('/life-story/casefile')
    } else {
      navigate(`/life-story/casefile/${newTab + 1}`)
    }
  }
  
  return <CaseFileTheme data={reportData} currentTab={currentTab} setTab={setTab} />
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
      <Route path="/life-story" element={<MainLayout><TimelineTheme data={reportData} /></MainLayout>} />
      <Route path="/life-story/timeline" element={<MainLayout><TimelineTheme data={reportData} /></MainLayout>} />
      <Route path="/life-story/newspaper" element={<MainLayout><NewspaperWrapper /></MainLayout>} />
      <Route path="/life-story/newspaper/:page" element={<MainLayout><NewspaperWrapper /></MainLayout>} />
      <Route path="/life-story/casefile" element={<MainLayout><CaseFileWrapper /></MainLayout>} />
      <Route path="/life-story/casefile/:tab" element={<MainLayout><CaseFileWrapper /></MainLayout>} />
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
      // Already authenticated - skip loading on refresh
      setIsAuthenticated(true)
      setShowContent(true)
    }
  }, [])

  const handleLogin = (password) => {
    const correctPassword = '1988'
    if (password === correctPassword) {
      sessionStorage.setItem('life-story-auth', 'true')
      setIsAuthenticated(true)
      setIsLoading(true) // Trigger loading screen
      return true
    }
    return false
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  // Show password gate
  if (!isAuthenticated) {
    return <PasswordGate onLogin={handleLogin} />
  }

  // Show loading screen after authentication
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={reportData.birthYear} />
  }

  // Show main content
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
