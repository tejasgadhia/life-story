import { useEffect } from 'react'
import { updateAllMetaTags, restoreDefaultMetaTags } from '../utils/metaTags'

/**
 * Hook to manage dynamic meta tags for social sharing
 * Updates OG and Twitter Card meta tags when report data changes
 * Restores defaults on unmount (navigating away from report)
 *
 * @param {Object} reportData - The assembled report data
 * @param {string} birthday - ISO date string from URL (YYYY-MM-DD)
 * @param {string} theme - Current theme name (timeline, newspaper, casefile)
 */
export function useMetaTags(reportData, birthday, theme) {
  useEffect(() => {
    if (reportData && birthday && theme) {
      updateAllMetaTags(reportData, birthday, theme)
    }

    // Restore defaults when component unmounts (user leaves report page)
    return () => {
      restoreDefaultMetaTags()
    }
  }, [reportData, birthday, theme])
}
