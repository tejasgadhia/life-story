/**
 * Font loading utilities for lazy loading non-critical fonts
 *
 * Critical fonts (DM Sans, Fraunces) are preloaded in index.html for landing page.
 * Report fonts and theme-specific fonts are loaded on demand.
 */

/**
 * Lazy load fonts needed for report pages
 * Loads: Playfair Display, Courier Prime, Lora
 */
export function loadReportFonts() {
  // Skip if already loaded
  if (document.querySelector('[data-report-fonts]')) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Courier+Prime:wght@400;700&family=Lora:wght@400;600;700&display=swap'
  link.dataset.reportFonts = 'true'
  document.head.appendChild(link)
}

/**
 * Lazy load theme-specific fonts
 * @param {string} theme - Theme name: 'newspaper' or 'casefile'
 */
export function loadThemeFonts(theme) {
  const themeFonts = {
    newspaper: 'UnifrakturMaguntia',
    casefile: 'Special+Elite'
  }

  const fontFamily = themeFonts[theme]
  if (!fontFamily) return

  // Skip if already loaded
  if (document.querySelector(`[data-theme-font="${theme}"]`)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`
  link.dataset.themeFont = theme
  document.head.appendChild(link)
}
