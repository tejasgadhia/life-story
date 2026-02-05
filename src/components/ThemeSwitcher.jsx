import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useFontSize } from '../context/FontSizeContext'

// Theme Switcher - Desktop sidebar + Mobile FAB with bottom sheet
export default function ThemeSwitcher() {
  const navigate = useNavigate()
  const { birthday, tab } = useParams()
  const location = useLocation()
  const { fontSize, setFontSize } = useFontSize()
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
          <p className="text-[10px] font-body text-vintage-cream/80 uppercase tracking-wider text-center mb-1 px-1">
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
              <span className="text-lg" aria-hidden="true">{theme.icon}</span>
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dark-brown text-vintage-cream
                             text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100
                             transition-opacity pointer-events-none shadow-lg">
                {theme.label}
              </span>
            </button>
          ))}

          <div className="h-px bg-vintage-cream/20 my-2" />

          <p className="text-[10px] font-body text-vintage-cream/80 uppercase tracking-wider text-center mb-1 px-1">
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
        <span className="text-vintage-cream" aria-hidden="true">⚙️</span>
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
              <p className="text-xs font-body text-vintage-cream/80 uppercase tracking-wider mb-3">
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
                    <span className="text-2xl" aria-hidden="true">{theme.icon}</span>
                    <span className="text-sm font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font size selection */}
            <div>
              <p className="text-xs font-body text-vintage-cream/80 uppercase tracking-wider mb-3">
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
