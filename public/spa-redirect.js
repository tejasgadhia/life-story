/**
 * Early-boot script for GitHub Pages SPA support and non-blocking font loading.
 *
 * This script is external (not inline) to comply with CSP script-src without
 * 'unsafe-inline'. It runs synchronously before React/Vite module scripts.
 *
 * 1) SPA redirect: Restores the original URL saved by 404.html's redirect.
 *    Primary: reads from sessionStorage (clean URL redirect).
 *    Fallback: reads from query param (/?/path format).
 *
 * 2) Font swap: Converts the <link rel="preload"> for critical fonts into a
 *    stylesheet link. This replaces the old onload="this.media='all'" inline
 *    event handler pattern that required 'unsafe-inline' in CSP.
 */

// --- SPA redirect ---
;(function (l) {
  // Primary: restore path from sessionStorage (set by 404.html)
  try {
    var saved = sessionStorage.getItem('spa-redirect')
    if (saved) {
      sessionStorage.removeItem('spa-redirect')
      var redirect = JSON.parse(saved)
      if (redirect.pathname !== l.pathname || redirect.search !== l.search) {
        window.history.replaceState(null, null,
          redirect.pathname + redirect.search + redirect.hash
        )
      }
      return
    }
  } catch (e) {
    // sessionStorage unavailable — fall through to query-param check
  }
  // Fallback: restore path from query param (/?/path/here format)
  if (l.search[1] === '/') {
    var decoded = l.search
      .slice(1)
      .split('&')
      .map(function (s) {
        return s.replace(/~and~/g, '&')
      })
      .join('?')
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash)
  }
})(window.location)

// --- Non-blocking font loading ---
;(function () {
  var fontLink = document.getElementById('critical-fonts')
  if (fontLink) {
    fontLink.rel = 'stylesheet'
  }
})()
