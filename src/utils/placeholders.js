/**
 * Placeholder resolution utilities
 * Resolves {{PLACEHOLDER}} tokens at runtime based on birth date
 */

/**
 * Calculate current age from birth date
 * @param {number} birthYear
 * @param {number} birthMonth - 1-12
 * @param {number} birthDay - 1-31
 * @returns {number}
 */
function calculateAge(birthYear, birthMonth, birthDay) {
  const today = new Date()
  const thisYear = today.getFullYear()
  const thisMonth = today.getMonth() + 1
  const thisDay = today.getDate()

  let age = thisYear - birthYear

  // Subtract 1 if birthday hasn't occurred yet this year
  if (thisMonth < birthMonth || (thisMonth === birthMonth && thisDay < birthDay)) {
    age -= 1
  }

  return age
}

/**
 * Format number with commas (e.g., 3900000 -> "3,900,000")
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

/**
 * Build placeholder map from birth date and year data
 * @param {object} params
 * @param {number} params.birthYear - e.g., 1988
 * @param {number} params.birthMonth - 1-12
 * @param {number} params.birthDay - 1-31
 * @param {object} params.yearData - Year-specific data (may contain birth_year_cohort)
 * @returns {object} - Map of placeholder names to values
 */
export function buildPlaceholderMap({ birthYear, birthMonth, birthDay, yearData = {} }) {
  const currentAge = calculateAge(birthYear, birthMonth, birthDay)

  // Month names for formatting
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const monthName = monthNames[birthMonth - 1]
  const formattedBirthDate = `${monthName} ${birthDay}, ${birthYear}`

  // Birth year cohort (from year data or default estimate)
  const birthYearCohort = yearData.birth_year_cohort || 3900000

  return {
    'BIRTH_YEAR': birthYear,
    'BIRTH_DATE': formattedBirthDate,
    'BIRTH_MONTH': monthName,
    'BIRTH_DAY': birthDay,
    'CURRENT_AGE': currentAge,
    'CHILDHOOD_END_YEAR': birthYear + 12,
    'CHILDHOOD_START_YEAR': birthYear,
    'TEEN_START_YEAR': birthYear + 13,
    'TEEN_END_YEAR': birthYear + 19,
    'TWENTIES_START': birthYear + 20,
    'TWENTIES_END': birthYear + 30,
    'THIRTIES_START': birthYear + 30,
    'THIRTIES_END': birthYear + 40,
    'FORTIES_START': birthYear + 40,
    'FORTIES_END': birthYear + 50,
    'FIFTIES_START': birthYear + 50,
    'FIFTIES_END': birthYear + 60,
    'SIXTIES_START': birthYear + 60,
    'SIXTIES_PLUS': birthYear + 60,
    'BIRTH_YEAR_COHORT': formatNumber(birthYearCohort),
    // Age at specific historical events (common ones)
    'AGE_AT_911': Math.max(0, 2001 - birthYear),
    'AGE_AT_2008_CRISIS': Math.max(0, 2008 - birthYear),
    'AGE_AT_COVID': Math.max(0, 2020 - birthYear),
    'AGE_AT_IPHONE': Math.max(0, 2007 - birthYear),
    'AGE_AT_FACEBOOK': Math.max(0, 2004 - birthYear),
    // Graduation estimates (approximate)
    'HS_GRADUATION_YEAR': birthYear + 18,
    'COLLEGE_GRADUATION_YEAR': birthYear + 22,
    // Work entry (approximate)
    'WORKFORCE_ENTRY_YEAR': birthYear + 22,
  }
}

/**
 * Resolve all placeholders in a string
 * @param {string} text - Text containing {{PLACEHOLDER}} tokens
 * @param {object} placeholderMap - Map from buildPlaceholderMap
 * @returns {string} - Text with placeholders resolved
 */
export function resolvePlaceholders(text, placeholderMap) {
  if (!text || typeof text !== 'string') return text

  return text.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
    if (placeholder in placeholderMap) {
      return placeholderMap[placeholder]
    }
    // Return original if placeholder not found (don't break content)
    console.warn(`Unknown placeholder: ${placeholder}`)
    return match
  })
}

/**
 * Resolve placeholders in an entire sections object (recursive)
 * @param {object} sections - Sections object with html properties
 * @param {object} placeholderMap - Map from buildPlaceholderMap
 * @returns {object} - New sections object with placeholders resolved
 */
export function resolveInSections(sections, placeholderMap) {
  const resolved = {}

  for (const [key, value] of Object.entries(sections)) {
    if (value && typeof value === 'object') {
      if ('html' in value) {
        resolved[key] = {
          ...value,
          html: resolvePlaceholders(value.html, placeholderMap)
        }
      } else {
        // Recursively resolve nested objects
        resolved[key] = resolveInSections(value, placeholderMap)
      }
    } else if (typeof value === 'string') {
      resolved[key] = resolvePlaceholders(value, placeholderMap)
    } else {
      resolved[key] = value
    }
  }

  return resolved
}

export default {
  buildPlaceholderMap,
  resolvePlaceholders,
  resolveInSections,
}
