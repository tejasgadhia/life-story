import { useState, useEffect, useMemo, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFontSize } from '../context/FontSizeContext'
import { TAB_SLUGS } from '../config/constants'
import { parseBirthdayFromUrl } from '../utils/dateUrl'
import { assembleReport } from '../utils/assembleReport'
import { useMetaTags } from '../hooks/useMetaTags'
import { loadReportFonts, loadThemeFonts } from '../utils/loadFonts'
import LoadingScreen from './LoadingScreen'

// Generic wrapper for themes with tab state from URL (slug-based)
export default function ThemeWrapper({ ThemeComponent, themePath }) {
  const { birthday, tab } = useParams()
  const navigate = useNavigate()
  const { fontSize } = useFontSize()
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(false)

  // Parse birthday from URL - memoize to avoid infinite loops
  const parsedDate = useMemo(() => parseBirthdayFromUrl(birthday), [birthday])

  // Update meta tags for social sharing
  useMetaTags(reportData, birthday, themePath)

  // Load report fonts and theme-specific fonts
  useEffect(() => {
    loadReportFonts()
    loadThemeFonts(themePath)
  }, [themePath])

  // Redirect to landing if invalid date
  useEffect(() => {
    if (!parsedDate) {
      navigate('/life-story', { replace: true })
    }
  }, [parsedDate, navigate])

  // Load report data from URL params
  useEffect(() => {
    if (!parsedDate) return

    // Reset state when birthday changes to avoid showing stale data
    setReportData(null)
    setIsLoading(true)
    setShowLoading(false)

    const loadReport = async () => {
      const cacheKey = `life-story-report-${birthday}`
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
          sessionStorage.setItem(cacheKey, JSON.stringify(report))
        } catch (error) {
          console.error('Failed to load report:', error)
          navigate('/life-story', { replace: true })
          return
        }
      }

      setReportData(report)
      setShowLoading(true)
    }

    loadReport()
  }, [birthday, parsedDate, navigate])

  // Handle loading screen completion
  const handleLoadingComplete = () => {
    setShowLoading(false)
    setIsLoading(false)
  }

  // Show loading screen if needed
  if (showLoading && reportData) {
    return <LoadingScreen onComplete={handleLoadingComplete} birthYear={reportData.birthYear} />
  }

  // Still loading (either parsing or assembling)
  if (isLoading || !reportData) {
    return null
  }

  // Convert slug to tab index
  const tabIndex = tab ? TAB_SLUGS.indexOf(tab) : 0
  const currentTab = tabIndex >= 0 ? tabIndex : 0

  // Redirect if invalid tab
  if (tab && tabIndex < 0) {
    navigate(`/life-story/${birthday}/${themePath}`, { replace: true })
    return null
  }

  const setTab = (newTabIndex) => {
    const slug = TAB_SLUGS[newTabIndex] || 'overview'
    if (newTabIndex === 0) {
      navigate(`/life-story/${birthday}/${themePath}`)
    } else {
      navigate(`/life-story/${birthday}/${themePath}/${slug}`)
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal-50" />}>
      <ThemeComponent data={reportData} currentTab={currentTab} setTab={setTab} fontSize={fontSize} />
    </Suspense>
  )
}
