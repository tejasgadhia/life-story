import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useFontSize } from '../context/FontSizeContext'
import { LayoutDashboard, Newspaper, FileText, Settings, Home, X } from 'lucide-react'

// Theme Switcher - Unified FAB with desktop popover + mobile bottom sheet
export default function ThemeSwitcher() {
  const navigate = useNavigate()
  const { birthday, tab } = useParams()
  const location = useLocation()
  const { fontSize, setFontSize } = useFontSize()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Refs for focus management
  const triggerButtonRef = useRef(null)
  const desktopPanelRef = useRef(null)
  const mobilePanelRef = useRef(null)

  // Get the active panel ref based on screen size
  const getActivePanel = () => {
    // Desktop panel is hidden on mobile via CSS, so check visibility
    if (desktopPanelRef.current && desktopPanelRef.current.offsetParent !== null) {
      return desktopPanelRef.current
    }
    return mobilePanelRef.current
  }

  // Close on click outside (desktop popover)
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e) => {
      const activePanel = getActivePanel()
      if (
        activePanel && !activePanel.contains(e.target) &&
        triggerButtonRef.current && !triggerButtonRef.current.contains(e.target)
      ) {
        closeMenu()
      }
    }

    // Small delay so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isMenuOpen) return

    // Small delay to let DOM render and CSS apply
    const setupTimer = setTimeout(() => {
      const panel = getActivePanel()
      if (!panel) return

      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const focusables = panel.querySelectorAll(focusableSelector)
      if (focusables.length > 0) {
        focusables[0].focus()
      }
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }

      if (e.key !== 'Tab') return

      const panel = getActivePanel()
      if (!panel) return

      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const focusables = panel.querySelectorAll(focusableSelector)
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
    return () => {
      clearTimeout(setupTimer)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Determine current theme from path
  const pathParts = location.pathname.split('/').filter(Boolean)
  const currentTheme = pathParts[2] || 'timeline'
  const currentSlug = tab || 'overview'

  const themes = [
    { id: 'timeline', label: 'Timeline', Icon: LayoutDashboard },
    { id: 'newspaper', label: 'Newspaper', Icon: Newspaper },
    { id: 'casefile', label: 'Case File', Icon: FileText },
  ]

  const fontSizes = [
    { id: 'sm', label: 'Small', icon: 'A' },
    { id: 'base', label: 'Medium', icon: 'A' },
    { id: 'lg', label: 'Large', icon: 'A' },
  ]

  const handleThemeChange = (themeId) => {
    if (currentSlug === 'overview') {
      navigate(`/life-story/${birthday}/${themeId}`)
    } else {
      navigate(`/life-story/${birthday}/${themeId}/${currentSlug}`)
    }
    setIsMenuOpen(false)
  }

  const handleFontSizeChange = (sizeId) => {
    setFontSize(sizeId)
    setIsMenuOpen(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    triggerButtonRef.current?.focus()
  }

  // Shared panel content (used by both desktop popover and mobile bottom sheet)
  const panelContent = (
    <>
      {/* Theme selection */}
      <div className="mb-5">
        <p className="text-xs font-body text-vintage-cream uppercase tracking-wider mb-3">
          Theme
        </p>
        <div className="flex gap-2 md:gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`flex-1 py-3 md:py-2.5 px-3 rounded-lg transition-all flex flex-col items-center gap-1.5
                ${currentTheme === theme.id
                  ? 'bg-vintage-cream text-dark-brown'
                  : 'bg-vintage-cream/10 text-vintage-cream hover:bg-vintage-cream/20 active:bg-vintage-cream/20'
                }`}
            >
              <theme.Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font size selection */}
      <div>
        <p className="text-xs font-body text-vintage-cream uppercase tracking-wider mb-3">
          Text Size
        </p>
        <div className="flex gap-2 md:gap-3">
          {fontSizes.map((size, idx) => (
            <button
              key={size.id}
              onClick={() => handleFontSizeChange(size.id)}
              className={`flex-1 py-3 md:py-2.5 px-3 rounded-lg transition-all flex flex-col items-center gap-1.5 font-body
                ${fontSize === size.id
                  ? 'bg-vintage-cream text-dark-brown'
                  : 'bg-vintage-cream/10 text-vintage-cream hover:bg-vintage-cream/20 active:bg-vintage-cream/20'
                }`}
            >
              <span className={idx === 0 ? 'text-sm' : idx === 1 ? 'text-lg' : 'text-xl'}>
                {size.icon}
              </span>
              <span className="text-xs font-medium">{size.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* New Report */}
      <div className="mt-4 pt-3 border-t border-vintage-cream/20">
        <button
          onClick={() => { navigate('/life-story/'); setIsMenuOpen(false); }}
          className="w-full py-3 md:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 bg-vintage-cream/10 text-vintage-cream hover:bg-vintage-cream/20 active:bg-vintage-cream/20"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-medium">New Report</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* FAB trigger - visible on all screen sizes */}
      <button
        ref={triggerButtonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 cursor-pointer backdrop-blur
                   rounded-full shadow-xl flex items-center justify-center
                   active:scale-95 transition-all
                   focus:outline-none focus:ring-2 focus:ring-vintage-cream focus:ring-offset-2 focus:ring-offset-dark-brown
                   ${isMenuOpen ? 'bg-vintage-cream text-dark-brown' : 'bg-dark-brown/95 text-vintage-cream'}`}
        aria-label={isMenuOpen ? 'Close theme settings' : 'Open theme settings'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen
          ? <X className="w-5 h-5" aria-hidden="true" />
          : <Settings className="w-5 h-5" aria-hidden="true" />
        }
      </button>

      {/* Desktop popover - hidden on mobile */}
      {isMenuOpen && (
        <div
          ref={desktopPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Theme settings"
          className="fixed bottom-20 right-6 z-50 hidden md:block
                     w-72 bg-dark-brown/95 backdrop-blur rounded-xl p-5 shadow-2xl
                     animate-fade-up motion-reduce:animate-none"
        >
          {panelContent}
        </div>
      )}

      {/* Mobile bottom sheet - hidden on desktop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMenu}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Bottom sheet */}
          <div
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Theme settings"
            className="absolute bottom-0 left-0 right-0 bg-dark-brown rounded-t-2xl p-6 pb-8
                       animate-slide-up motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-vintage-cream/30 rounded-full mx-auto mb-6" />

            {panelContent}

            {/* Close button - mobile only */}
            <button
              onClick={closeMenu}
              className="mt-4 w-full py-4 bg-vintage-cream/10 text-vintage-cream rounded-lg
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
