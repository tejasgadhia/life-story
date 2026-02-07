/**
 * GitHub Pages 404-to-SPA redirect encoder.
 *
 * When GitHub Pages encounters a route it doesn't know (e.g., /life-story/1988-06-09/timeline),
 * it serves 404.html. This script encodes the original path as a query parameter
 * and redirects to the SPA's index.html, where spa-redirect.js decodes it back.
 *
 * Extracted from inline <script> in 404.html for CSP compliance.
 *
 * @see spa-redirect.js for the decoder on the index.html side
 */
var pathSegmentsToKeep = 1 // life-story is the repo name
var l = window.location
l.replace(
  l.protocol +
    '//' +
    l.hostname +
    (l.port ? ':' + l.port : '') +
    l.pathname
      .split('/')
      .slice(0, 1 + pathSegmentsToKeep)
      .join('/') +
    '/?/' +
    l.pathname
      .slice(1)
      .split('/')
      .slice(pathSegmentsToKeep)
      .join('/')
      .replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
)
