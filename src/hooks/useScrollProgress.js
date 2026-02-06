import { useState, useEffect } from 'react'

// Returns a 0-1 value representing scroll progress through the page
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const maxScroll = scrollHeight - clientHeight
      setProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial value

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
