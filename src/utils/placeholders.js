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
 * Get a descriptive phrase for an age (for "You were X when Y happened")
 * @param {number} age - Age at the time of the event
 * @returns {string} - Descriptive phrase like "a toddler" or "in high school"
 */
function getAgeDescriptor(age) {
  if (age < 0) return 'not yet born'
  if (age === 0) return 'a newborn'
  if (age === 1) return 'a baby'
  if (age >= 2 && age <= 3) return 'a toddler'
  if (age >= 4 && age <= 5) return 'in preschool'
  if (age >= 6 && age <= 10) return 'in elementary school'
  if (age >= 11 && age <= 13) return 'in middle school'
  if (age >= 14 && age <= 17) return 'in high school'
  if (age === 18) return 'graduating high school'
  if (age >= 19 && age <= 22) return 'in college'
  if (age >= 23 && age <= 29) return 'in your twenties'
  if (age >= 30 && age <= 39) return 'in your thirties'
  if (age >= 40 && age <= 49) return 'in your forties'
  if (age >= 50 && age <= 59) return 'in your fifties'
  if (age >= 60 && age <= 69) return 'in your sixties'
  if (age >= 70) return 'in your seventies or beyond'
  return `${age} years old`
}

/**
 * Get the grade level for an age (US school system)
 * @param {number} age - Age to get grade for
 * @returns {string} - Grade level like "3rd grade" or "freshman year"
 */
function getGradeLevel(age) {
  if (age < 5) return 'not yet in school'
  if (age === 5) return 'kindergarten'
  if (age === 6) return '1st grade'
  if (age === 7) return '2nd grade'
  if (age === 8) return '3rd grade'
  if (age === 9) return '4th grade'
  if (age === 10) return '5th grade'
  if (age === 11) return '6th grade'
  if (age === 12) return '7th grade'
  if (age === 13) return '8th grade'
  if (age === 14) return 'freshman year of high school'
  if (age === 15) return 'sophomore year of high school'
  if (age === 16) return 'junior year of high school'
  if (age === 17) return 'senior year of high school'
  if (age === 18) return 'freshman year of college'
  if (age === 19) return 'sophomore year of college'
  if (age === 20) return 'junior year of college'
  if (age === 21) return 'senior year of college'
  return 'out of school'
}

/**
 * Get life stage descriptor for current age
 * @param {number} age - Current age
 * @returns {string} - Life stage like "in your early thirties"
 */
function getLifeStage(age) {
  if (age < 13) return 'in childhood'
  if (age >= 13 && age <= 19) return 'in your teenage years'
  if (age >= 20 && age <= 24) return 'in your early twenties'
  if (age >= 25 && age <= 29) return 'in your late twenties'
  if (age >= 30 && age <= 34) return 'in your early thirties'
  if (age >= 35 && age <= 39) return 'in your late thirties'
  if (age >= 40 && age <= 44) return 'in your early forties'
  if (age >= 45 && age <= 49) return 'in your late forties'
  if (age >= 50 && age <= 54) return 'in your early fifties'
  if (age >= 55 && age <= 59) return 'in your late fifties'
  if (age >= 60 && age <= 64) return 'in your early sixties'
  if (age >= 65 && age <= 69) return 'in your late sixties'
  if (age >= 70) return 'in your seventies or beyond'
  return `${age} years old`
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
    // Descriptive age phrases for storytelling
    'AGE_DESCRIPTOR_911': getAgeDescriptor(2001 - birthYear),
    'AGE_DESCRIPTOR_IPHONE': getAgeDescriptor(2007 - birthYear),
    'AGE_DESCRIPTOR_2008_CRISIS': getAgeDescriptor(2008 - birthYear),
    'AGE_DESCRIPTOR_COVID': getAgeDescriptor(2020 - birthYear),
    'AGE_DESCRIPTOR_FACEBOOK': getAgeDescriptor(2004 - birthYear),
    // Grade levels at key events
    'GRADE_AT_911': getGradeLevel(2001 - birthYear),
    'GRADE_AT_IPHONE': getGradeLevel(2007 - birthYear),
    'GRADE_AT_2008_CRISIS': getGradeLevel(2008 - birthYear),
    // Current life stage
    'LIFE_STAGE_NOW': getLifeStage(currentAge),
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

