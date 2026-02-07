import { useState, useRef } from 'react'
import { Sparkles, Clock, Globe, Compass } from 'lucide-react'
import { MIN_YEAR, MAX_YEAR } from '../config/constants'

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

export default function DatePicker({ onSubmit }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

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
    <main id="main-content" className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-secondary-50 to-secondary-100">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] font-semibold mb-2 sm:mb-3 text-secondary-800">
            Life Story
          </h1>
          <p className="font-sans text-base sm:text-[17px] text-secondary-500 px-2">
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
              aria-describedby={error ? 'birthdate-error' : undefined}
              aria-invalid={error ? 'true' : undefined}
              className={`w-full px-5 py-4 text-lg font-sans text-center rounded-xl border-2 transition-all duration-200 focus:outline-none bg-white border-secondary-200 text-secondary-800 placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              autoComplete="off"
            />
            <p className="text-xs font-sans text-center mt-2 text-secondary-600">
              Supporting birth years from {MIN_YEAR} to {MAX_YEAR}
            </p>
          </div>

          {error && (
            <p id="birthdate-error" className="text-red-500 text-sm font-sans text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !isComplete}
            className={`w-full py-4 px-6 text-base font-sans font-semibold rounded-xl transition-all duration-200 ${
              isLoading || !isComplete
                ? 'bg-secondary-300 text-secondary-500 cursor-not-allowed'
                : 'bg-primary-500 text-secondary-900 hover:bg-primary-600 active:scale-[0.98] shadow-lg shadow-primary-500/20 focus:ring-2 focus:ring-primary-500/50 focus:outline-none'
            }`}
          >
            {isLoading ? 'Loading your story...' : 'Discover Your Story'}
          </button>
        </form>

        {/* Section Preview Cards */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {SECTION_CARDS.map(({ id, title, description, highlight, suffix, Icon }) => (
            <div
              key={id}
              className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-secondary-50">
                <Icon className="w-4 h-4 text-primary-500" />
              </div>
              <h2 className="font-sans text-sm sm:text-[13px] font-semibold mb-1 text-secondary-800">
                {title}
              </h2>
              <p className="font-sans text-xs sm:text-[12px] leading-relaxed text-secondary-600">
                {description}{description && ' '}
                <span className="text-primary-800 font-medium">{highlight}</span>
                {suffix && ` ${suffix}`}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p className="text-xs font-sans text-center mt-6 md:mt-8 text-secondary-600 px-2">
          Your birth date is used only to generate your personalized report.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          No data is stored or shared.
        </p>
      </div>
    </main>
  )
}
