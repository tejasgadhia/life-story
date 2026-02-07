/**
 * Font loading utilities for non-render-blocking lazy font loading
 *
 * Critical fonts (DM Sans, Fraunces) are preloaded in index.html for landing page.
 * Report fonts and theme-specific fonts are loaded on demand using a non-blocking
 * pattern: media="print" with onload switching to media="all".
 *
 * All Google Fonts URLs include &display=swap to ensure text remains visible
 * with fallback fonts while custom fonts download.
 */

/**
 * Create a non-render-blocking font stylesheet link.
 * Uses the media="print" onload pattern - the browser fetches the stylesheet
 * without blocking rendering, then switches to media="all" once loaded.
 * @param {string} href - Google Fonts CSS URL
 * @returns {HTMLLinkElement} The configured link element
 */
function createNonBlockingFontLink(href) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.media = 'print'
  link.onload = function () {
    this.media = 'all'
  }
  return link
}

/**
 * Lazy load fonts needed for report pages (non-render-blocking)
 * Loads: Playfair Display, Courier Prime, Lora
 */
export function loadReportFonts() {
  // Skip if already loaded
  if (document.querySelector('[data-report-fonts]')) return

  const link = createNonBlockingFontLink(
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Courier+Prime:wght@400;700&family=Lora:wght@400;600;700&display=swap'
  )
  link.dataset.reportFonts = 'true'
  document.head.appendChild(link)
}

/**
 * Lazy load theme-specific fonts (non-render-blocking)
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

  const link = createNonBlockingFontLink(
    `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`
  )
  link.dataset.themeFont = theme
  document.head.appendChild(link)
}
