import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BirthdayHeatMap from './BirthdayHeatMap'

// Mock the dynamic import of heatmap data
vi.mock('../../data/heatmap.json', () => {
  // Build mock data: 12 months with realistic day counts
  const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const data = {}
  for (let m = 1; m <= 12; m++) {
    data[String(m)] = Array.from({ length: DAYS[m - 1] }, (_, i) => {
      const rank = (m - 1) * 30 + i + 1
      const percentile = Math.round((1 - rank / 366) * 100)
      return [rank, percentile]
    })
  }
  return { default: data }
})

const defaultProps = {
  userMonth: 6,
  userDay: 9,
  birthdayRank: 121,
  birthdayPercentile: 67,
  variant: 'timeline',
  isOpen: true,
  onClose: vi.fn(),
}

describe('BirthdayHeatMap', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <BirthdayHeatMap {...defaultProps} isOpen={false} />
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders the dialog when isOpen is true', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('displays the user birthday rank and percentile', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    await screen.findByRole('dialog')
    expect(screen.getByText('#121')).toBeInTheDocument()
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('renders day cells after data loads', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    // Wait for the legend to appear (confirms data loaded and grid rendered)
    await screen.findByText('Less common')
    // Verify SVG exists with rects - use waitFor for jsdom SVG timing
    await waitFor(() => {
      const rects = document.querySelectorAll('svg g rect')
      // 366 fill rects + 1 extra border rect for user's birthday = 367
      expect(rects.length).toBe(367)
    })
  })

  it('highlights the user birthday cell', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    await screen.findByText('Less common')
    // Find title containing "Your birthday" - use waitFor for jsdom SVG timing
    await waitFor(() => {
      const titles = document.querySelectorAll('svg g title')
      let birthdayTitle = null
      titles.forEach(t => {
        if (t.textContent.includes('Your birthday')) {
          birthdayTitle = t
        }
      })
      expect(birthdayTitle).not.toBeNull()
      expect(birthdayTitle.textContent).toContain('June 9')
      // The parent <g> should have 2 rects (fill + border)
      const parentG = birthdayTitle.parentElement
      const rects = parentG.querySelectorAll('rect')
      expect(rects.length).toBe(2)
    })
  })

  it('closes when Escape key is pressed', async () => {
    const onClose = vi.fn()
    render(<BirthdayHeatMap {...defaultProps} onClose={onClose} />)
    await screen.findByRole('dialog')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when backdrop is clicked', async () => {
    const onClose = vi.fn()
    render(<BirthdayHeatMap {...defaultProps} onClose={onClose} />)
    await screen.findByRole('dialog')
    const backdrop = document.querySelector('.fixed.inset-0')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<BirthdayHeatMap {...defaultProps} onClose={onClose} />)
    await screen.findByRole('dialog')
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders legend with color gradient', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    await screen.findByRole('dialog')
    expect(screen.getByText('Less common')).toBeInTheDocument()
    expect(screen.getByText('More common')).toBeInTheDocument()
  })

  it('has accessible SVG', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    await screen.findByText('Less common')
    await waitFor(() => {
      const svg = document.querySelector('svg')
      expect(svg).not.toBeNull()
      expect(svg.getAttribute('role')).toBe('img')
      expect(svg.getAttribute('aria-label')).toContain('Calendar heat map grid')
    })
  })

  it('renders all 12 month rows', async () => {
    render(<BirthdayHeatMap {...defaultProps} />)
    await screen.findByText('Less common')
    await waitFor(() => {
      const titles = document.querySelectorAll('svg g title')
      const months = new Set()
      titles.forEach(t => {
        const match = t.textContent.match(/^(\w+) \d+:/)
        if (match) months.add(match[1])
      })
      expect(months.size).toBe(12)
    })
  })

  it('supports newspaper variant', async () => {
    render(<BirthdayHeatMap {...defaultProps} variant="newspaper" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })

  it('supports casefile variant', async () => {
    render(<BirthdayHeatMap {...defaultProps} variant="casefile" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })
})
