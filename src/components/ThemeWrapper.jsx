import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TAB_SLUGS } from '../config/constants'
import { parseBirthdayFromUrl } from '../utils/dateUrl'
import { assembleReport } from '../utils/assembleReport'
import { useMetaTags } from '../hooks/useMetaTags'
import { loadReportFonts } from '../utils/loadFonts'
import LoadingScreen from './LoadingScreen'

// Wrapper for timeline theme with tab state from URL (slug-based)
export default function ThemeWrapper({ ThemeComponent }) {
  const { birthday, tab } = useParams()
  const navigate = useNavigate()
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

  // Parse birthday from URL - memoize to avoid infinite loops
  const parsedDate = useMemo(() => parseBirthdayFromUrl(birthday), [birthday])

  // Update meta tags for social sharing
  useMetaTags(reportData, birthday, 'timeline')

  // Load report fonts
  useEffect(() => {
    loadReportFonts()
  }, [])

  // Redirect to landing if invalid date
  useEffect(() => {
    if (!parsedDate) {
      navigate('/life-story', { replace: true })
    }
  }, [parsedDate, navigate])

  // Load report data from URL params
  useEffect(() => {
    if (!parsedDate) return

    // Reset data state
    setReportData(null)
    setIsLoading(true)

    // Show loading screen only for first visit to this birthday
    // (skip on theme switches where data is already cached)
    const cacheKey = `life-story-report-${birthday}`
    const hasCachedData = sessionStorage.getItem(cacheKey) !== null
    setShowLoading(!hasCachedData)

    let cancelled = false

    const loadReport = async () => {
      const cachedReport = sessionStorage.getItem(cacheKey)

      let report = null

      // Try session cache first
      if (cachedReport) {
        try {
          report = JSON.parse(cachedReport)
        } catch (e) {
          sessionStorage.removeItem(cacheKey)
        }
      }

      // No cache hit, load fresh
      if (!report) {
        try {
          report = await assembleReport(parsedDate)
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(report))
          } catch (e) {
            // sessionStorage may be full or unavailable (private browsing)
          }
        } catch (error) {
          if (!cancelled) {
            console.error('Failed to load report:', error)
            navigate('/life-story', { replace: true })
          }
          return
        }
      }

      if (!cancelled) {
        setReportData(report)
        setIsLoading(false)
      }
    }

    loadReport()

    return () => { cancelled = true }
  }, [birthday, parsedDate, navigate])

  // Handle loading screen completion - stable reference to prevent animation restarts
  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false)
  }, [])

  // Show loading screen while animation plays
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={parsedDate?.year} />
  }

  // Still loading data (animation done but data not ready yet)
  if (isLoading || !reportData) {
    return null
  }

  // Convert slug to tab index
  const tabIndex = tab ? TAB_SLUGS.indexOf(tab) : 0
  const currentTab = tabIndex >= 0 ? tabIndex : 0

  // Redirect if invalid tab
  if (tab && tabIndex < 0) {
    navigate(`/life-story/${birthday}/timeline`, { replace: true })
    return null
  }

  const setTab = (newTabIndex) => {
    const slug = TAB_SLUGS[newTabIndex] || 'overview'
    if (newTabIndex === 0) {
      navigate(`/life-story/${birthday}/timeline`)
    } else {
      navigate(`/life-story/${birthday}/timeline/${slug}`)
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary-50" />}>
      <ThemeComponent data={reportData} currentTab={currentTab} setTab={setTab} />
    </Suspense>
  )
}
