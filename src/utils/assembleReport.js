/**
 * Report assembly utilities
 * Loads year data and birthday data, resolves placeholders,
 * and returns the complete report object
 */

import { getGeneration } from './generations'
import { buildPlaceholderMap, resolveInSections, resolvePlaceholders } from './placeholders'
import { MIN_YEAR, MAX_YEAR } from '../config/constants'

/**
 * Format month-day as MM-DD string (zero-padded)
 * @param {number} month - 1-12
 * @param {number} day - 1-31
 * @returns {string} - e.g., "06-09"
 */
export function formatBirthdayKey(month, day) {
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${mm}-${dd}`
}

/**
 * Format full date as readable string
 * @param {number} year
 * @param {number} month - 1-12
 * @param {number} day - 1-31
 * @returns {string} - e.g., "June 9, 1988"
 */
export function formatFullDate(year, month, day) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${monthNames[month - 1]} ${day}, ${year}`
}

/**
 * Dynamically import year data
 * @param {number} year - 1946-2012
 * @returns {Promise<object>}
 */
async function loadYearData(year) {
  try {
    const module = await import(`../data/years/${year}.json`)
    return module.default || module
  } catch (error) {
    console.error(`Failed to load year data for ${year}:`, error)
    throw new Error(`Year data not available for ${year}`)
  }
}

/**
 * Month names for dynamic imports
 */
const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june',
                     'july', 'august', 'september', 'october', 'november', 'december']

/**
 * Dynamically import birthday data for a specific month/day
 * @param {number} month - 1-12
 * @param {number} day - 1-31
 * @returns {Promise<object>} - Birthday data for that day
 */
async function loadBirthdayData(month, day) {
  try {
    const monthName = MONTH_NAMES[month - 1]
    const module = await import(`../data/birthdays/${monthName}.json`)
    const monthData = module.default || module
    const dayKey = String(day).padStart(2, '0')
    const birthday = monthData[dayKey]
    if (!birthday) {
      throw new Error(`Birthday data not found for ${month}-${day}`)
    }
    return birthday
  } catch (error) {
    console.error(`Failed to load birthday data for ${month}-${day}:`, error)
    throw new Error(`Birthday data not available for ${month}-${day}`)
  }
}

/**
 * Assemble complete report data for a given birth date
 * @param {object} params
 * @param {number} params.year - Birth year (1946-2012)
 * @param {number} params.month - Birth month (1-12)
 * @param {number} params.day - Birth day (1-31)
 * @returns {Promise<object>} - Complete report data
 */
export async function assembleReport({ year, month, day }) {
  // Load all data in parallel
  const [yearData, birthday] = await Promise.all([
    loadYearData(year),
    loadBirthdayData(month, day)
  ])

  // Build placeholder map for this specific date
  const placeholderMap = buildPlaceholderMap({
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    yearData: yearData
  })

  // Resolve placeholders in all sections
  // (All content lives in year-specific files; generation-level sections removed in v2.1)
  const resolvedSections = resolveInSections(yearData.sections, placeholderMap)

  // Get generation metadata
  const generation = getGeneration(year)

  // Extract and sort celebrities
  const allCelebrities = Object.values(birthday.celebrities_categorized || {})
    .flat()
    .sort((a, b) => a.year - b.year)

  // Resolve year events (may contain placeholders)
  const resolvedYearEvents = (yearData.year_events || []).map(
    event => resolvePlaceholders(event, placeholderMap)
  )

  return {
    birthDate: formatFullDate(year, month, day),
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    generation: generation.name,
    generationId: generation.id,
    generationSpan: generation.span,
    birthdayRank: birthday.rank,
    birthdayPercentile: birthday.percentile,
    celebrities: allCelebrities,
    celebritiesCategorized: birthday.celebrities_categorized,
    sections: resolvedSections,
    yearEvents: resolvedYearEvents,
    // Expose placeholder map for any additional uses
    placeholders: placeholderMap
  }
}

/**
 * Validate a date is within supported range
 * @param {number} year
 * @param {number} month - 1-12
 * @param {number} day - 1-31
 * @returns {object} - { valid: boolean, error?: string }
 */
export function validateDate(year, month, day) {
  // Check year range
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return {
      valid: false,
      error: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`
    }
  }

  // Check month range
  if (month < 1 || month > 12) {
    return {
      valid: false,
      error: 'Month must be between 1 and 12'
    }
  }

  // Check day is valid for month
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) {
    return {
      valid: false,
      error: `Day must be between 1 and ${daysInMonth} for this month`
    }
  }

  return { valid: true }
}

export default {
  assembleReport,
  validateDate,
  formatBirthdayKey,
  formatFullDate,
}
