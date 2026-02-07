import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { FontSizeContext } from '../context/FontSizeContext'
import ThemeSwitcher from './ThemeSwitcher'

// Helper to render ThemeSwitcher with router and context
function renderWithProviders({
  initialPath = '/life-story/1988-06-09/timeline',
  fontSize = 'base',
  setFontSize = vi.fn(),
} = {}) {
  const fontSizeValue = { fontSize, setFontSize }

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <FontSizeContext.Provider value={fontSizeValue}>
        <Routes>
          <Route path="/life-story/:birthday/:theme" element={<ThemeSwitcher />} />
          <Route path="/life-story/:birthday/:theme/:tab" element={<ThemeSwitcher />} />
          <Route path="/life-story" element={<ThemeSwitcher />} />
          <Route path="*" element={<ThemeSwitcher />} />
        </Routes>
      </FontSizeContext.Provider>
    </MemoryRouter>
  )
}

describe('ThemeSwitcher', () => {
  // --- FAB trigger button ---

  it('renders the FAB trigger button', () => {
    renderWithProviders()
    const fab = screen.getByRole('button', { name: /open theme settings/i })
    expect(fab).toBeInTheDocument()
  })

  it('FAB has correct aria-expanded=false when menu is closed', () => {
    renderWithProviders()
    const fab = screen.getByRole('button', { name: /open theme settings/i })
    expect(fab).toHaveAttribute('aria-expanded', 'false')
  })

  // --- Opening and closing the menu ---

  it('opens the menu when FAB is clicked', () => {
    renderWithProviders()
    const fab = screen.getByRole('button', { name: /open theme settings/i })

    fireEvent.click(fab)

    // Menu should be open - FAB label changes
    expect(screen.getByRole('button', { name: /close theme settings/i })).toBeInTheDocument()
  })

  it('sets aria-expanded=true when menu is open', () => {
    renderWithProviders()
    const fab = screen.getByRole('button', { name: /open theme settings/i })
    fireEvent.click(fab)

    const closeFab = screen.getByRole('button', { name: /close theme settings/i })
    expect(closeFab).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the menu when FAB is clicked again', () => {
    renderWithProviders()
    const fab = screen.getByRole('button', { name: /open theme settings/i })

    // Open
    fireEvent.click(fab)
    expect(screen.getByRole('button', { name: /close theme settings/i })).toBeInTheDocument()

    // Close
    fireEvent.click(screen.getByRole('button', { name: /close theme settings/i }))
    expect(screen.getByRole('button', { name: /open theme settings/i })).toBeInTheDocument()
  })

  // --- Theme buttons ---

  it('renders all three theme buttons when menu is open', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    // Each theme button appears twice (desktop dialog + mobile sheet)
    const timelineButtons = screen.getAllByRole('button', { name: /timeline/i })
    const newspaperButtons = screen.getAllByRole('button', { name: /newspaper/i })
    const caseFileButtons = screen.getAllByRole('button', { name: /case file/i })

    expect(timelineButtons.length).toBeGreaterThanOrEqual(1)
    expect(newspaperButtons.length).toBeGreaterThanOrEqual(1)
    expect(caseFileButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders font size buttons when menu is open', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    const smallButtons = screen.getAllByRole('button', { name: /small/i })
    const mediumButtons = screen.getAllByRole('button', { name: /medium/i })
    const largeButtons = screen.getAllByRole('button', { name: /large/i })

    expect(smallButtons.length).toBeGreaterThanOrEqual(1)
    expect(mediumButtons.length).toBeGreaterThanOrEqual(1)
    expect(largeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the "New Report" button when menu is open', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    const newReportButtons = screen.getAllByRole('button', { name: /new report/i })
    expect(newReportButtons.length).toBeGreaterThanOrEqual(1)
  })

  // --- Dialog semantics ---

  it('renders dialogs with proper ARIA attributes when open', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    const dialogs = screen.getAllByRole('dialog')
    expect(dialogs.length).toBeGreaterThanOrEqual(1)

    dialogs.forEach((dialog) => {
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('aria-label', 'Theme settings')
    })
  })

  it('does not render dialogs when menu is closed', () => {
    renderWithProviders()
    expect(screen.queryAllByRole('dialog')).toHaveLength(0)
  })

  // --- Escape key ---

  it('closes the menu on Escape key', async () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    // Verify menu is open
    expect(screen.getAllByRole('dialog').length).toBeGreaterThanOrEqual(1)

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' })

    // Menu should be closed
    expect(screen.queryAllByRole('dialog')).toHaveLength(0)
    expect(screen.getByRole('button', { name: /open theme settings/i })).toBeInTheDocument()
  })

  // --- Mobile close button ---

  it('renders mobile Close button inside the bottom sheet', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    // The mobile bottom sheet has an explicit "Close" button
    const closeButtons = screen.getAllByRole('button', { name: /^close$/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
  })

  // --- Theme section labels ---

  it('renders Theme and Text Size section labels', () => {
    renderWithProviders()
    fireEvent.click(screen.getByRole('button', { name: /open theme settings/i }))

    // Labels appear in both desktop and mobile panels
    const themeLabels = screen.getAllByText('Theme')
    const textSizeLabels = screen.getAllByText('Text Size')

    expect(themeLabels.length).toBeGreaterThanOrEqual(1)
    expect(textSizeLabels.length).toBeGreaterThanOrEqual(1)
  })
})
