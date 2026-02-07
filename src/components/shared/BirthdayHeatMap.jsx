import { useState, useEffect, useRef, useCallback } from 'react'

// Days per month (index 0 = January). Feb has 29 for leap year inclusion.
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_LABELS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Theme config
const THEME_CONFIG = {
  overlay: 'bg-white/95 backdrop-blur-sm',
  header: 'font-display text-dark-brown',
  subtext: 'font-sans text-sepia-brown',
  legend: 'font-sans text-dark-brown',
  close: 'bg-dark-brown text-vintage-cream hover:bg-sepia-brown',
  border: 'border-sepia-brown/20',
  monthLabel: 'fill-sepia-brown font-sans',
  tooltip: 'bg-dark-brown text-vintage-cream',
  colorScale: ['#E8DCC4', '#C4A97D', '#8B7355', '#3E2723'], // aged-paper → dark-brown
}

/**
 * Interpolate between color stops based on a 0-100 percentile.
 * 4-stop gradient: 0→25→50→75-100
 */
function getColor(percentile, colorScale) {
  const t = percentile / 100
  const idx = Math.min(Math.floor(t * (colorScale.length - 1)), colorScale.length - 2)
  const localT = (t * (colorScale.length - 1)) - idx

  const from = colorScale[idx]
  const to = colorScale[idx + 1]

  // Parse hex to RGB, interpolate, return hex
  const r1 = parseInt(from.slice(1, 3), 16)
  const g1 = parseInt(from.slice(3, 5), 16)
  const b1 = parseInt(from.slice(5, 7), 16)
  const r2 = parseInt(to.slice(1, 3), 16)
  const g2 = parseInt(to.slice(3, 5), 16)
  const b2 = parseInt(to.slice(5, 7), 16)

  const r = Math.round(r1 + (r2 - r1) * localT)
  const g = Math.round(g1 + (g2 - g1) * localT)
  const b = Math.round(b1 + (b2 - b1) * localT)

  return `rgb(${r},${g},${b})`
}

/**
 * BirthdayHeatMap - Full 366-day calendar grid overlay
 *
 * @param {number} userMonth - 1-12
 * @param {number} userDay - 1-31
 * @param {number} birthdayRank - 1-366
 * @param {number} birthdayPercentile - 0-100
 * @param {boolean} isOpen
 * @param {function} onClose
 */
export default function BirthdayHeatMap({
  userMonth,
  userDay,
  birthdayRank,
  birthdayPercentile,
  isOpen,
  onClose,
}) {
  const [heatmapData, setHeatmapData] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const overlayRef = useRef(null)
  const closeButtonRef = useRef(null)
  const theme = THEME_CONFIG

  // Load heatmap data lazily when first opened
  useEffect(() => {
    if (isOpen && !heatmapData) {
      import('../../data/heatmap.json').then((mod) => {
        setHeatmapData(mod.default || mod)
      })
    }
  }, [isOpen, heatmapData])

  // Focus management + Escape key
  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap
      if (e.key !== 'Tab') return
      const panel = overlayRef.current
      if (!panel) return

      const focusableSelector = 'button, [href], [tabindex]:not([tabindex="-1"])'
      const focusables = Array.from(panel.querySelectorAll(focusableSelector))
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleCellInteraction = useCallback((month, day, rank, percentile) => {
    setTooltip({ month, day, rank, percentile })
  }, [])

  const clearTooltip = useCallback(() => {
    setTooltip(null)
  }, [])

  if (!isOpen) return null

  // SVG grid dimensions
  const cellSize = 14
  const cellGap = 2
  const labelWidth = 32
  const headerHeight = 0
  const gridWidth = labelWidth + (31 * (cellSize + cellGap))
  const gridHeight = headerHeight + (12 * (cellSize + cellGap))
  const svgWidth = gridWidth + 8  // small right padding
  const svgHeight = gridHeight + 8

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Modal */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Birthday popularity heat map showing all 366 days of the year"
        className={`relative w-full md:max-w-2xl md:mx-4 max-h-[90vh] overflow-y-auto
                   rounded-t-2xl md:rounded-xl p-4 sm:p-5 md:p-6 shadow-2xl
                   animate-slide-up md:animate-fade-up motion-reduce:animate-none
                   ${theme.overlay}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle */}
        <div className="w-10 h-1 bg-current opacity-20 rounded-full mx-auto mb-4 md:hidden" aria-hidden="true" />

        {/* Header */}
        <div className="text-center mb-4 md:mb-5">
          <h2 className={`text-xl md:text-2xl font-bold ${theme.header}`}>
            Birthday Popularity
          </h2>
          <p className={`text-sm mt-1 ${theme.subtext}`}>
            How common is each birthday across the calendar year
          </p>

          {/* User's birthday stat */}
          <div className={`inline-flex items-center gap-3 md:gap-4 mt-3 px-4 py-2 rounded-lg border ${theme.border}`}>
            <div className="text-center">
              <span className={`text-lg md:text-xl font-bold ${theme.header}`}>#{birthdayRank}</span>
              <span className={`block text-xs ${theme.subtext}`}>Rank</span>
            </div>
            <div className={`w-px h-8 opacity-30 bg-current`} />
            <div className="text-center">
              <span className={`text-lg md:text-xl font-bold ${theme.header}`}>{birthdayPercentile}%</span>
              <span className={`block text-xs ${theme.subtext}`}>Popularity</span>
            </div>
          </div>
        </div>

        {/* Heat map grid */}
        {heatmapData ? (
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[320px]"
              role="img"
              aria-label="Calendar heat map grid. Each cell represents one day of the year colored by birthday popularity."
            >
              {/* Month rows */}
              {Array.from({ length: 12 }, (_, monthIdx) => {
                const monthNum = monthIdx + 1
                const monthData = heatmapData[String(monthNum)] || []
                const daysInThisMonth = DAYS_IN_MONTH[monthIdx]
                const y = headerHeight + monthIdx * (cellSize + cellGap)

                return (
                  <g key={monthNum}>
                    {/* Month label */}
                    <text
                      x={labelWidth - 4}
                      y={y + cellSize * 0.75}
                      textAnchor="end"
                      className={`text-[7px] ${theme.monthLabel}`}
                    >
                      {MONTH_LABELS[monthIdx]}
                    </text>

                    {/* Day cells */}
                    {Array.from({ length: daysInThisMonth }, (_, dayIdx) => {
                      const dayNum = dayIdx + 1
                      const dayData = monthData[dayIdx] // [rank, percentile]
                      if (!dayData) return null

                      const x = labelWidth + dayIdx * (cellSize + cellGap)
                      const [rank, percentile] = dayData
                      const isUserBirthday = monthNum === userMonth && dayNum === userDay
                      const fill = getColor(percentile, theme.colorScale)

                      return (
                        <g
                          key={`${monthNum}-${dayNum}`}
                          onMouseEnter={() => handleCellInteraction(monthNum, dayNum, rank, percentile)}
                          onMouseLeave={clearTooltip}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCellInteraction(monthNum, dayNum, rank, percentile)
                          }}
                          className="cursor-pointer"
                        >
                          <title>
                            {MONTH_LABELS_FULL[monthIdx]} {dayNum}: Rank #{rank}, {percentile}th percentile
                            {isUserBirthday ? ' (Your birthday)' : ''}
                          </title>
                          <rect
                            x={x}
                            y={y}
                            width={cellSize}
                            height={cellSize}
                            rx={2}
                            fill={fill}
                            className={isUserBirthday ? 'heatmap-pulse' : ''}
                          />
                          {isUserBirthday && (
                            <rect
                              x={x - 1}
                              y={y - 1}
                              width={cellSize + 2}
                              height={cellSize + 2}
                              rx={3}
                              fill="none"
                              stroke="#3E2723"
                              strokeWidth={2}
                              className="heatmap-pulse"
                            />
                          )}
                        </g>
                      )
                    })}
                  </g>
                )
              })}
            </svg>
          </div>
        ) : (
          <div className={`text-center py-8 ${theme.subtext}`}>Loading...</div>
        )}

        {/* Tooltip */}
        {tooltip && (
          <div
            className={`text-center text-sm py-2 px-3 mt-2 rounded ${theme.tooltip}`}
            aria-live="polite"
          >
            {MONTH_LABELS_FULL[tooltip.month - 1]} {tooltip.day}
            {tooltip.month === userMonth && tooltip.day === userDay ? ' (Your birthday)' : ''}
            {' — '}Rank #{tooltip.rank} • {tooltip.percentile}th percentile
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
          <span className={`text-xs ${theme.legend}`}>Less common</span>
          <div className="flex gap-0.5">
            {[0, 25, 50, 75, 100].map((p) => (
              <div
                key={p}
                className="w-4 h-3 rounded-sm"
                style={{ backgroundColor: getColor(p, theme.colorScale) }}
              />
            ))}
          </div>
          <span className={`text-xs ${theme.legend}`}>More common</span>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className={`mt-4 w-full py-3 md:py-2.5 rounded-lg text-sm font-medium transition-colors
                     focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme.close}`}
        >
          Close
        </button>
      </div>
    </div>
  )
}
