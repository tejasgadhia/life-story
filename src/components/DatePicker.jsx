import { useState, useMemo } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MIN_YEAR = 1946
const MAX_YEAR = 2012

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

export default function DatePicker({ onSubmit }) {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const years = useMemo(() => {
    const arr = []
    for (let y = MAX_YEAR; y >= MIN_YEAR; y--) {
      arr.push(y)
    }
    return arr
  }, [])

  const daysInMonth = useMemo(() => {
    if (!month || !year) return 31
    return getDaysInMonth(parseInt(year), parseInt(month))
  }, [month, year])

  const days = useMemo(() => {
    const arr = []
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(d)
    }
    return arr
  }, [daysInMonth])

  // Reset day if it exceeds days in month
  useMemo(() => {
    if (day && parseInt(day) > daysInMonth) {
      setDay('')
    }
  }, [daysInMonth, day])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!month || !day || !year) {
      setError('Please select your complete birth date')
      return
    }

    const yearNum = parseInt(year)
    const monthNum = parseInt(month)
    const dayNum = parseInt(day)

    if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
      setError(`Year must be between ${MIN_YEAR} and ${MAX_YEAR}`)
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({ year: yearNum, month: monthNum, day: dayNum })
    } catch (err) {
      setError(err.message || 'Failed to load your story. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-brown flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-vintage-cream mb-2">
            Life Story
          </h1>
          <p className="font-body text-vintage-cream/70">
            Enter your birth date to discover your personalized story
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-vintage-cream/10 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {/* Month */}
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-body text-vintage-cream/70 mb-1"
                >
                  Month
                </label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-dark-brown border border-vintage-cream/30 rounded px-3 py-2
                           text-vintage-cream font-body focus:outline-none focus:border-vintage-gold
                           transition-colors"
                  disabled={isLoading}
                >
                  <option value="">--</option>
                  {MONTHS.map((m, idx) => (
                    <option key={m} value={idx + 1}>
                      {m.slice(0, 3)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day */}
              <div>
                <label
                  htmlFor="day"
                  className="block text-sm font-body text-vintage-cream/70 mb-1"
                >
                  Day
                </label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-dark-brown border border-vintage-cream/30 rounded px-3 py-2
                           text-vintage-cream font-body focus:outline-none focus:border-vintage-gold
                           transition-colors"
                  disabled={isLoading}
                >
                  <option value="">--</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-body text-vintage-cream/70 mb-1"
                >
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-dark-brown border border-vintage-cream/30 rounded px-3 py-2
                           text-vintage-cream font-body focus:outline-none focus:border-vintage-gold
                           transition-colors"
                  disabled={isLoading}
                >
                  <option value="">--</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs font-body text-vintage-cream/50 text-center">
              Supporting birth years from {MIN_YEAR} to {MAX_YEAR}
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-body text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !month || !day || !year}
            className="w-full bg-vintage-gold text-dark-brown font-display py-3 px-6 rounded
                     hover:bg-vintage-cream transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading your story...' : 'Discover Your Story'}
          </button>
        </form>

        <p className="text-xs font-body text-vintage-cream/40 text-center mt-6">
          Your birth date is used only to generate your personalized report.
          <br />
          No data is stored or shared.
        </p>
      </div>
    </div>
  )
}
