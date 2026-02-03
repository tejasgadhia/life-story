/**
 * Generation definitions and utilities
 * Maps birth years to generations and provides generation metadata
 */

export const GENERATIONS = {
  boomer: {
    id: 'boomer',
    name: 'Baby Boomer',
    shortName: 'Boomer',
    span: '1946-1964',
    startYear: 1946,
    endYear: 1964,
    description: 'Post-WWII generation that shaped modern consumer culture',
  },
  genx: {
    id: 'genx',
    name: 'Generation X',
    shortName: 'Gen X',
    span: '1965-1980',
    startYear: 1965,
    endYear: 1980,
    description: 'The "latchkey" generation, independent and skeptical',
  },
  millennial: {
    id: 'millennial',
    name: 'Millennial',
    shortName: 'Millennial',
    span: '1981-1996',
    startYear: 1981,
    endYear: 1996,
    description: 'Digital pioneers who came of age around the millennium',
  },
  genz: {
    id: 'genz',
    name: 'Generation Z',
    shortName: 'Gen Z',
    span: '1997-2012',
    startYear: 1997,
    endYear: 2012,
    description: 'True digital natives, born into smartphones and social media',
  },
}

/**
 * Get generation ID from birth year
 * @param {number} year - Birth year (1946-2012)
 * @returns {string} - Generation ID (boomer, genx, millennial, genz)
 */
export function getGenerationId(year) {
  if (year >= 1946 && year <= 1964) return 'boomer'
  if (year >= 1965 && year <= 1980) return 'genx'
  if (year >= 1981 && year <= 1996) return 'millennial'
  if (year >= 1997 && year <= 2012) return 'genz'
  throw new Error(`Year ${year} is outside supported range (1946-2012)`)
}

/**
 * Get generation metadata from birth year
 * @param {number} year - Birth year (1946-2012)
 * @returns {object} - Generation metadata object
 */
export function getGeneration(year) {
  const id = getGenerationId(year)
  return GENERATIONS[id]
}

/**
 * Check if a year is within supported range
 * @param {number} year - Year to validate
 * @returns {boolean}
 */
export function isValidYear(year) {
  return year >= 1946 && year <= 2012
}

/**
 * Get all supported years
 * @returns {number[]} - Array of years from 1946-2012
 */
export function getSupportedYears() {
  const years = []
  for (let y = 1946; y <= 2012; y++) {
    years.push(y)
  }
  return years
}

export default {
  GENERATIONS,
  getGenerationId,
  getGeneration,
  isValidYear,
  getSupportedYears,
}
