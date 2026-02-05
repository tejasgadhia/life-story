/**
 * Helper to generate Wikipedia URL from name
 */
const getWikiUrl = (name) => `https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`

/**
 * Shared CelebrityList component for displaying birthday celebrities
 * Used by TimelineTheme and CaseFileTheme
 *
 * Celebrity lists are pre-curated to max 10 recognizable names per day,
 * so no expand/collapse is needed.
 *
 * @param {object} props
 * @param {Array} props.celebrities - Array of { name, year, description }
 * @param {string} props.variant - 'timeline' | 'casefile' for theme-specific styling
 */
export function CelebrityList({ celebrities, variant = 'timeline' }) {
  if (variant === 'casefile') {
    return (
      <div className="bg-vintage-cream/30 border-2 border-sepia-brown/20 p-4 md:p-6">
        <h4 className="font-bold text-sm md:text-base mb-3 md:mb-4 text-sepia-brown tracking-wider">
          KNOWN BIRTHDAY ASSOCIATES:
        </h4>
        <div className="bg-vintage-cream/50 p-3 md:p-4 border-2 border-sepia-brown/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2">
            {celebrities.map((celeb) => (
              <a
                key={`${celeb.name}-${celeb.year}`}
                href={getWikiUrl(celeb.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 md:py-2 text-sm md:text-base hover:text-muted-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sepia-brown/50 focus:ring-offset-1 rounded"
                title={celeb.description}
              >
                • {celeb.name} ({celeb.year})
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default: timeline variant
  return (
    <div className="bg-white/50 rounded-lg border border-sepia-brown/10 p-4 md:p-6">
      <p className="font-body text-xs text-sepia-brown uppercase tracking-wider mb-3 md:mb-4 text-center">
        You share your birthday with
      </p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2">
        {celebrities.map((celeb) => (
          <a
            key={`${celeb.name}-${celeb.year}`}
            href={getWikiUrl(celeb.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-aged-paper px-3 py-3 rounded font-body text-sm text-dark-brown
                     hover:bg-sepia-brown hover:text-vintage-cream transition-colors duration-200
                     border border-sepia-brown/20 text-center sm:text-left
                     focus:outline-none focus:ring-2 focus:ring-dark-brown/50 focus:ring-offset-1"
            title={celeb.description}
          >
            {celeb.name} ({celeb.year})
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CelebrityList
