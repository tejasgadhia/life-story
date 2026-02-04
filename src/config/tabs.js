/**
 * Shared tab configuration for all themes
 * Each theme may extend this with theme-specific metadata
 */

export const TABS = [
  {
    id: 'overview',
    slug: 'overview',
    title: 'Overview',
    sections: ['birthday', 'generation', 'comparison']
  },
  {
    id: 'formative',
    slug: 'formative-years',
    title: 'Formative Years',
    sections: ['childhood', 'popculture', 'technology']
  },
  {
    id: 'world',
    slug: 'world-events',
    title: 'World Events',
    sections: ['history', 'career', 'financial']
  },
  {
    id: 'personal',
    slug: 'personal-insights',
    title: 'Personal Insights',
    sections: ['relationships', 'blindspots', 'roadmap']
  },
]

/**
 * Section key mapping - maps section IDs to data keys
 */
export const SECTION_KEYS = {
  birthday: null,  // Special handling (no data key)
  generation: 'generational_identity',
  comparison: 'comparison',
  childhood: 'childhood_context',
  popculture: 'pop_culture',
  technology: 'technology',
  history: 'historical_milestones',
  career: 'career',
  financial: 'financial',
  relationships: 'relationships',
  blindspots: 'blind_spots',
  roadmap: 'life_roadmap',
}

/**
 * Get content for a section by ID
 * @param {object} sections - The data.sections object
 * @param {string} sectionId - Section ID (e.g., 'generation')
 * @returns {string|null} - HTML content or null
 */
export function getSectionContent(sections, sectionId) {
  const key = SECTION_KEYS[sectionId]
  if (!key) return null
  return sections[key]?.html || null
}
