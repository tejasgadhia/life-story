/**
 * Helper to generate Wikipedia URL from name
 */
const getWikiUrl = (name) => `https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`

/**
 * Shared CelebrityList component for displaying birthday celebrities
 *
 * Celebrity lists are pre-curated to max 10 recognizable names per day,
 * so no expand/collapse is needed.
 *
 * @param {object} props
 * @param {Array} props.celebrities - Array of { name, year, description }
 */
export function CelebrityList({ celebrities }) {
  return (
    <div className="bg-white/50 rounded-lg border border-heritage-sepia/10 p-4 md:p-6">
      <p className="font-sans text-xs text-heritage-sepia uppercase tracking-wider mb-3 md:mb-4 text-center">
        You share your birthday with
      </p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2">
        {celebrities.map((celeb) => (
          <a
            key={`${celeb.name}-${celeb.year}`}
            href={getWikiUrl(celeb.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-heritage-paper px-3 py-3 rounded font-sans text-sm text-heritage-ink
                     hover:bg-heritage-sepia hover:text-heritage-cream transition-colors duration-200
                     border border-heritage-sepia/20 text-center sm:text-left
                     focus:outline-none focus:ring-2 focus:ring-heritage-ink/50 focus:ring-offset-1"
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
