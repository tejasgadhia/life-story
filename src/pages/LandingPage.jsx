import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../components/DatePicker'
import { assembleReport } from '../utils/assembleReport'
import { formatBirthdayForUrl } from '../utils/dateUrl'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleDateSubmit = async ({ year, month, day }) => {
    setIsLoading(true)

    try {
      // Pre-load the report
      const report = await assembleReport({ year, month, day })

      // Cache it
      const dateStr = formatBirthdayForUrl({ year, month, day })
      const cacheKey = `life-story-report-${dateStr}`
      sessionStorage.setItem(cacheKey, JSON.stringify(report))

      // Navigate to report URL
      navigate(`/life-story/${dateStr}/timeline`)
      return true
    } catch (error) {
      console.error('Failed to assemble report:', error)
      setIsLoading(false)
      throw error
    }
  }

  return <DatePicker onSubmit={handleDateSubmit} isLoading={isLoading} />
}
