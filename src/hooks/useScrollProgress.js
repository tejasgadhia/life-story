import { useRef, useEffect, useCallback } from 'react'

// Attaches a passive scroll listener that writes transform: scaleX()
// directly to the ref'd DOM element, bypassing React state entirely.
// scaleX is composite-only (GPU) — no layout or paint per frame.
export function useScrollProgress() {
  const barRef = useRef(null)

  const handleScroll = useCallback(() => {
    const el = barRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const maxScroll = scrollHeight - clientHeight
    const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
    el.style.transform = `scaleX(${progress})`
    el.setAttribute('aria-valuenow', Math.round(progress * 100))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return barRef
}
