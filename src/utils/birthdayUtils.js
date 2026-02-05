import { MIN_YEAR, MAX_YEAR } from '../config/constants'

/**
 * Parse and validate birthday from URL parameter
 * @param {string} birthday - Expected format: YYYY-MM-DD (ISO)
 * @returns {{ year: number, month: number, day: number } | null}
 */
export function parseBirthdayFromUrl(birthday) {
  if (!birthday) return null

  const match = birthday.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const day = parseInt(match[3], 10)

  // Validate ranges
  if (year < MIN_YEAR || year > MAX_YEAR) return null
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null

  // Validate actual date (handles month lengths and leap years)
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return { year, month, day }
}

/**
 * Format date object to ISO string for URL
 * @param {{ year: number, month: number, day: number }} date
 * @returns {string} YYYY-MM-DD
 */
export function formatBirthdayForUrl({ year, month, day }) {
  const m = String(month).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}
