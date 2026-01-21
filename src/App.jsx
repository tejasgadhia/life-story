import { useState, useEffect } from 'react'
import PasswordGate from './components/PasswordGate'
import ThemeSwitcher from './components/ThemeSwitcher'
import TimelineTheme from './components/themes/TimelineTheme'
import NewspaperTheme from './components/themes/NewspaperTheme'
import CaseFileTheme from './components/themes/CaseFileTheme'
import yearData from './data/1988.json'
import birthdayData from './data/birthdays.json'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('timeline')
  const [reportData, setReportData] = useState(null)

  useEffect(() => {
    // Check if already authenticated this session
    const auth = sessionStorage.getItem('life-story-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }

    // Assemble report data
    const birthDate = '06-09'
    const birthday = birthdayData[birthDate]
    
    const assembled = {
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
    
    setReportData(assembled)
  }, [])

  const handleLogin = (password) => {
    // Simple password check - in production, use env variable
    const correctPassword = '1988'
    if (password === correctPassword) {
      sessionStorage.setItem('life-story-auth', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  if (!isAuthenticated) {
    return <PasswordGate onLogin={handleLogin} />
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vintage-cream">
        <p className="font-body text-sepia-brown">Loading your report...</p>
      </div>
    )
  }

  const renderTheme = () => {
    switch (currentTheme) {
      case 'newspaper':
        return <NewspaperTheme data={reportData} />
      case 'casefile':
        return <CaseFileTheme data={reportData} />
      default:
        return <TimelineTheme data={reportData} />
    }
  }

  return (
    <div className="min-h-screen">
      <ThemeSwitcher 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
      />
      {renderTheme()}
    </div>
  )
}

export default App
