import { useState, useEffect, useRef } from 'react'
import { Sparkles, Clock, Globe, Compass } from 'lucide-react'

const MIN_YEAR = 1946
const MAX_YEAR = 2012

const SECTION_CARDS = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'Understand',
    highlight: 'why your generation',
    suffix: 'sees the world differently',
    Icon: Sparkles,
  },
  {
    id: 'formative',
    title: 'Formative Years',
    description: 'The',
    highlight: 'songs, shows, and tech',
    suffix: 'of your youth',
    Icon: Clock,
  },
  {
    id: 'world',
    title: 'World Events',
    description: '',
    highlight: 'Politics, economics,',
    suffix: 'and job market shifts',
    Icon: Globe,
  },
  {
    id: 'insights',
    title: 'Personal Insights',
    description: 'Discover',
    highlight: 'patterns you can\'t see',
    suffix: 'on your own',
    Icon: Compass,
  },
]

function isValidDate(month, day, year) {
  if (!month || !day || !year) return false
  const m = parseInt(month)
  const d = parseInt(day)
  const y = parseInt(year)

  if (m < 1 || m > 12) return false
  if (d < 1 || d > 31) return false
  if (y < MIN_YEAR || y > MAX_YEAR) return false

  // Check days in month
  const daysInMonth = new Date(y, m, 0).getDate()
  if (d > daysInMonth) return false

  return true
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)

    const handler = (e) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return isDark
}

export default function DatePicker({ onSubmit }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const isDark = useDarkMode()

  // Parse the masked input value
  const parseInput = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const month = cleaned.slice(0, 2)
    const day = cleaned.slice(2, 4)
    const year = cleaned.slice(4, 8)
    return { month, day, year }
  }

  // Format with mask
  const formatWithMask = (value) => {
    const cleaned = value.replace(/\D/g, '')
    let formatted = ''

    if (cleaned.length > 0) {
      formatted = cleaned.slice(0, 2)
    }
    if (cleaned.length > 2) {
      formatted += ' / ' + cleaned.slice(2, 4)
    }
    if (cleaned.length > 4) {
      formatted += ' / ' + cleaned.slice(4, 8)
    }

    return formatted
  }

  const handleInputChange = (e) => {
    const raw = e.target.value
    const cleaned = raw.replace(/\D/g, '')

    // Limit to 8 digits (MMDDYYYY)
    if (cleaned.length <= 8) {
      setInputValue(formatWithMask(raw))
      setError('')
    }
  }

  const handleKeyDown = (e) => {
    // Allow backspace to work naturally
    if (e.key === 'Backspace') {
      const cleaned = inputValue.replace(/\D/g, '')
      if (cleaned.length > 0) {
        const newCleaned = cleaned.slice(0, -1)
        setInputValue(formatWithMask(newCleaned))
        e.preventDefault()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { month, day, year } = parseInput(inputValue)

    if (!month || !day || !year || year.length < 4) {
      setError('Please enter your complete birth date')
      return
    }

    if (!isValidDate(month, day, year)) {
      const m = parseInt(month)
      const y = parseInt(year)

      if (m < 1 || m > 12) {
        setError('Month must be between 01 and 12')
        return
      }
      if (y < MIN_YEAR || y > MAX_YEAR) {
        setError(`Year must be between ${MIN_YEAR} and ${MAX_YEAR}`)
        return
      }
      setError('Invalid date. Please check the day for this month.')
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
      })
    } catch (err) {
      setError(err.message || 'Failed to load your story. Please try again.')
      setIsLoading(false)
    }
  }

  const { month, day, year } = parseInput(inputValue)
  const isComplete = month.length === 2 && day.length === 2 && year.length === 4

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-b from-charcoal-950 to-charcoal-900'
        : 'bg-gradient-to-b from-charcoal-50 to-charcoal-100'
    }`}>
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`font-heading text-5xl md:text-[52px] font-semibold mb-3 transition-colors ${
            isDark ? 'text-charcoal-50' : 'text-charcoal-800'
          }`}>
            Life Story
          </h1>
          <p className={`font-sans text-[17px] transition-colors ${
            isDark ? 'text-charcoal-400' : 'text-charcoal-500'
          }`}>
            Enter your birth date to discover your personalized story
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="birthdate" className="sr-only">
              Birth date
            </label>
            <input
              ref={inputRef}
              id="birthdate"
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="MM / DD / YYYY"
              disabled={isLoading}
              className={`w-full px-5 py-4 text-lg font-sans text-center rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                isDark
                  ? 'bg-charcoal-900 border-charcoal-700 text-charcoal-50 placeholder-charcoal-500 focus:border-amber focus:ring-2 focus:ring-amber/20'
                  : 'bg-white border-charcoal-200 text-charcoal-800 placeholder-charcoal-400 focus:border-amber focus:ring-2 focus:ring-amber/20'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              autoComplete="off"
            />
            <p className={`text-xs font-sans text-center mt-2 transition-colors ${
              isDark ? 'text-charcoal-500' : 'text-charcoal-400'
            }`}>
              Supporting birth years from {MIN_YEAR} to {MAX_YEAR}
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-sans text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !isComplete}
            className={`w-full py-4 px-6 text-base font-sans font-semibold rounded-xl transition-all duration-200 ${
              isLoading || !isComplete
                ? 'bg-charcoal-300 text-charcoal-500 cursor-not-allowed'
                : 'bg-amber text-charcoal-900 hover:bg-amber-dark active:scale-[0.98] shadow-lg shadow-amber/20'
            }`}
          >
            {isLoading ? 'Loading your story...' : 'Discover Your Story'}
          </button>
        </form>

        {/* Section Preview Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          {SECTION_CARDS.map(({ id, title, description, highlight, suffix, Icon }) => (
            <div
              key={id}
              className={`p-4 rounded-xl transition-all duration-200 ${
                isDark
                  ? 'bg-charcoal-900 hover:bg-charcoal-800'
                  : 'bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                isDark ? 'bg-charcoal-800' : 'bg-charcoal-50'
              }`}>
                <Icon className={`w-4 h-4 ${isDark ? 'text-amber' : 'text-amber'}`} />
              </div>
              <h3 className={`font-sans text-[13px] font-semibold mb-1 transition-colors ${
                isDark ? 'text-charcoal-100' : 'text-charcoal-800'
              }`}>
                {title}
              </h3>
              <p className={`font-sans text-[12px] leading-relaxed transition-colors ${
                isDark ? 'text-charcoal-400' : 'text-charcoal-500'
              }`}>
                {description}{description && ' '}
                <span className="text-amber font-medium">{highlight}</span>
                {suffix && ` ${suffix}`}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p className={`text-xs font-sans text-center mt-8 transition-colors ${
          isDark ? 'text-charcoal-500' : 'text-charcoal-400'
        }`}>
          Your birth date is used only to generate your personalized report.
          <br />
          No data is stored or shared.
        </p>
      </div>
    </div>
  )
}
