/**
 * Early-boot script for GitHub Pages SPA support and non-blocking font loading.
 *
 * This script is external (not inline) to comply with CSP script-src without
 * 'unsafe-inline'. It runs synchronously before React/Vite module scripts.
 *
 * 1) SPA redirect: GitHub Pages serves 404.html for unknown routes, which
 *    encodes the path as a query parameter. This decodes it back so React
 *    Router can handle the original URL.
 *
 * 2) Font swap: Converts the <link rel="preload"> for critical fonts into a
 *    stylesheet link. This replaces the old onload="this.media='all'" inline
 *    event handler pattern that required 'unsafe-inline' in CSP.
 */

// --- SPA redirect ---
;(function (l) {
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
// Convert preload to stylesheet after the browser has fetched it without blocking render.
// The preload ensures the font CSS is fetched early; converting to stylesheet applies it.
;(function () {
  var fontLink = document.getElementById('critical-fonts')
  if (fontLink) {
    fontLink.rel = 'stylesheet'
  }
})()
