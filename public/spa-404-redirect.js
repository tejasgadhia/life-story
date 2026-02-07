/**
 * GitHub Pages 404-to-SPA redirect encoder.
 *
 * When GitHub Pages encounters a route it doesn't know (e.g., /life-story/1988-06-09/timeline),
 * it serves 404.html. This script saves the original path and redirects to index.html.
 *
 * Primary: saves path to sessionStorage (clean URL during redirect).
 * Fallback: encodes path as query param if sessionStorage is unavailable.
 *
 * Extracted from inline <script> for CSP compliance (no 'unsafe-inline').
 *
 * @see spa-redirect.js for the decoder on the index.html side
 */
;(function () {
  var loc = window.location
  try {
    // Primary: save path in sessionStorage for a clean redirect URL
    sessionStorage.setItem('spa-redirect', JSON.stringify({
      pathname: loc.pathname,
      search: loc.search,
      hash: loc.hash
    }))
    loc.replace(
      loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '') +
      '/life-story/'
    )
  } catch (e) {
    // Fallback: encode path as query param (original spa-github-pages method)
    var pathSegmentsToKeep = 1
    loc.replace(
      loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '') +
      loc.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      loc.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (loc.search ? '&' + loc.search.slice(1).replace(/&/g, '~and~') : '') +
      loc.hash
    )
  }
})()
