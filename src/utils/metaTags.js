/**
 * Meta tag utilities for dynamic Open Graph and Twitter Card metadata
 */

const BASE_URL = 'https://tejasgadhia.github.io/life-story'

// Default meta values (landing page)
const DEFAULTS = {
  title: 'Life Story - Your Personal Historical Report',
  description: 'Discover your personalized historical report. Enter your birth date to explore your generation\'s defining moments, cultural touchstones, and historical context.',
  url: BASE_URL + '/',
  image: BASE_URL + '/og-image.png'
}

/**
 * Update or create a meta tag by property or name
 * @param {string} attribute - 'property' or 'name'
 * @param {string} value - The attribute value (e.g., 'og:title' or 'twitter:title')
 * @param {string} content - The content to set
 */
function updateMetaTag(attribute, value, content) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

/**
 * Update the canonical link
 * @param {string} url - The canonical URL
 */
function updateCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

/**
 * Generate page title from report data
 * @param {Object} reportData - The assembled report data
 * @returns {string} - Page title
 */
export function generateTitle(reportData) {
  if (!reportData) return DEFAULTS.title

  const { birthDate, generation } = reportData
  return `Born ${birthDate} - A ${generation} Story | Life Story`
}

/**
 * Generate meta description from report data
 * @param {Object} reportData - The assembled report data
 * @returns {string} - Meta description (max 160 chars)
 */
export function generateDescription(reportData) {
  if (!reportData) return DEFAULTS.description

  const { generation, generationSpan } = reportData

  return `Explore your generation's defining moments, cultural touchstones, and historical context. ${generation} (${generationSpan}).`
}

/**
 * Generate canonical URL from birthday and theme
 * @param {string} birthday - ISO date string (YYYY-MM-DD)
 * @param {string} theme - Theme name
 * @returns {string} - Full URL
 */
export function generateUrl(birthday, theme) {
  if (!birthday) return DEFAULTS.url
  return `${BASE_URL}/${birthday}/${theme}`
}

/**
 * Update all meta tags with report data
 * @param {Object} reportData - The assembled report data
 * @param {string} birthday - ISO date string from URL
 * @param {string} theme - Current theme
 */
export function updateAllMetaTags(reportData, birthday, theme) {
  const title = generateTitle(reportData)
  const description = generateDescription(reportData)
  const url = generateUrl(birthday, theme)

  // Update document title
  document.title = title

  // Update standard meta
  updateMetaTag('name', 'description', description)

  // Update Open Graph
  updateMetaTag('property', 'og:title', title)
  updateMetaTag('property', 'og:description', description)
  updateMetaTag('property', 'og:url', url)

  // Update Twitter Card
  updateMetaTag('name', 'twitter:title', title)
  updateMetaTag('name', 'twitter:description', description)

  // Update canonical
  updateCanonical(url)
}

/**
 * Restore default meta tags (for landing page)
 */
export function restoreDefaultMetaTags() {
  document.title = DEFAULTS.title

  updateMetaTag('name', 'description', DEFAULTS.description)

  updateMetaTag('property', 'og:title', DEFAULTS.title)
  updateMetaTag('property', 'og:description', DEFAULTS.description)
  updateMetaTag('property', 'og:url', DEFAULTS.url)

  updateMetaTag('name', 'twitter:title', DEFAULTS.title)
  updateMetaTag('name', 'twitter:description', DEFAULTS.description)

  updateCanonical(DEFAULTS.url)
}
