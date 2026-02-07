import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Extracts the "page key" from a pathname — the route minus the tab slug.
 * Tab changes within the same page should NOT trigger a focus/scroll reset.
 *
 * Examples:
 *   /life-story/1988-06-09/timeline             → /life-story/1988-06-09/timeline
 *   /life-story/1988-06-09/timeline/overview     → /life-story/1988-06-09/timeline
 *   /life-story/1988-06-09/timeline/world-events → /life-story/1988-06-09/timeline
 *   /life-story                                  → /life-story
 *
 * @param {string} pathname
 * @returns {string} The page-level key (without tab segment)
 */
export function getPageKey(pathname) {
  const segments = pathname.split('/').filter(Boolean)

  // Report routes have 4 segments: ['life-story', 'YYYY-MM-DD', 'theme', 'tab']
  // Drop the tab segment to get the page key
  if (segments.length >= 4) {
    return '/' + segments.slice(0, 3).join('/')
  }

  return pathname
}

/**
 * Resets scroll position and focus to the main content area on page-level
 * route changes. Tab-only changes (within the same theme/birthday) are ignored
 * to preserve tab navigation UX.
 *
 * Works for programmatic navigation (navigate()), browser back/forward,
 * and direct URL entry.
 *
 * @param {string} mainContentId - The id of the main content element (default: 'main-content')
 */
export function useRouteChangeReset(mainContentId = 'main-content') {
  const { pathname } = useLocation()
  const pageKey = getPageKey(pathname)
  const previousPageKey = useRef(pageKey)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip the initial mount — don't steal focus from wherever the browser places it
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousPageKey.current = pageKey
      return
    }

    // Only reset when the page-level route changes, not on tab switches
    if (pageKey === previousPageKey.current) {
      return
    }

    previousPageKey.current = pageKey

    // Scroll to top
    window.scrollTo(0, 0)

    // Move focus to the main content area for screen readers and keyboard users
    const mainContent = document.getElementById(mainContentId)
    if (mainContent) {
      // tabIndex -1 allows programmatic focus without adding to tab order
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1')
      }
      mainContent.focus({ preventScroll: true })
    }
  }, [pageKey, mainContentId])
}
