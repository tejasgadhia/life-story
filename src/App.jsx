import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FontSizeContext } from './context/FontSizeContext'
import AppRoutes from './routes/AppRoutes'

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
