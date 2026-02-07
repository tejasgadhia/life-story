import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
  let onSubmit

  beforeEach(() => {
    onSubmit = vi.fn().mockResolvedValue(undefined)
  })

  // --- Rendering ---

  it('renders without crashing', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Life Story')
  })

  it('renders the date input with placeholder', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'MM / DD / YYYY')
  })

  it('renders the submit button', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByRole('button', { name: /discover your story/i })).toBeInTheDocument()
  })

  it('renders all four section preview cards', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Formative Years')).toBeInTheDocument()
    expect(screen.getByText('World Events')).toBeInTheDocument()
    expect(screen.getByText('Personal Insights')).toBeInTheDocument()
  })

  it('renders the privacy note', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByText(/no data is stored or shared/i)).toBeInTheDocument()
  })

  it('renders the supported years text', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByText(/supporting birth years from 1946 to 2012/i)).toBeInTheDocument()
  })

  // --- Input masking ---

  it('formats input with MM / DD / YYYY mask', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')

    fireEvent.change(input, { target: { value: '06' } })
    expect(input.value).toBe('06')

    fireEvent.change(input, { target: { value: '0609' } })
    expect(input.value).toBe('06 / 09')

    fireEvent.change(input, { target: { value: '06091988' } })
    expect(input.value).toBe('06 / 09 / 1988')
  })

  it('limits input to 8 digits', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')

    fireEvent.change(input, { target: { value: '060919881' } })
    // Should not change from empty since 9 digits exceeds limit
    expect(input.value).toBe('')
  })

  it('strips non-digit characters from input', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')

    fireEvent.change(input, { target: { value: 'abc06def09' } })
    expect(input.value).toBe('06 / 09')
  })

  // --- Submit button state ---

  it('disables submit button when date is incomplete', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const button = screen.getByRole('button', { name: /discover your story/i })
    expect(button).toBeDisabled()

    // Enter partial date
    const input = screen.getByLabelText('Birth date')
    fireEvent.change(input, { target: { value: '0609' } })
    expect(button).toBeDisabled()
  })

  it('enables submit button when date is complete', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const button = screen.getByRole('button', { name: /discover your story/i })

    fireEvent.change(input, { target: { value: '06091988' } })
    expect(button).not.toBeDisabled()
  })

  // --- Validation errors ---

  it('shows error for incomplete date on submit', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    // Enter incomplete date and submit
    fireEvent.change(input, { target: { value: '0609' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your complete birth date')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for invalid month (13)', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '13091988' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Month must be between 01 and 12')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for invalid month (00)', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '00091988' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Month must be between 01 and 12')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for year before 1946', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06091940' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Year must be between 1946 and 2012')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for year after 2012', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06092020' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Year must be between 1946 and 2012')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows error for invalid day (e.g., Feb 30)', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '02301988' } })
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid date. Please check the day for this month.')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears error when user starts typing again', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    // Trigger an error
    fireEvent.change(input, { target: { value: '13091988' } })
    fireEvent.submit(form)
    expect(screen.getByRole('alert')).toBeInTheDocument()

    // Start typing again - error should clear
    fireEvent.change(input, { target: { value: '06' } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  // --- Successful submission ---

  it('calls onSubmit with parsed date for a valid date', async () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06091988' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        year: 1988,
        month: 6,
        day: 9,
      })
    })
  })

  it('accepts boundary year 1946', async () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '01011946' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        year: 1946,
        month: 1,
        day: 1,
      })
    })
  })

  it('accepts boundary year 2012', async () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '12312012' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        year: 2012,
        month: 12,
        day: 31,
      })
    })
  })

  it('accepts Feb 29 in a leap year', async () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '02292000' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        year: 2000,
        month: 2,
        day: 29,
      })
    })
  })

  // --- Loading state ---

  it('shows loading text and disables input during submission', async () => {
    // Make onSubmit hang (never resolve) to keep loading state
    let resolveSubmit
    onSubmit = vi.fn(() => new Promise((resolve) => { resolveSubmit = resolve }))

    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06091988' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Loading your story...')
      expect(input).toBeDisabled()
    })

    // Clean up by resolving
    resolveSubmit()
  })

  it('shows error and restores form when onSubmit rejects', async () => {
    onSubmit = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06091988' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error')
    })

    // Input should be re-enabled
    expect(input).not.toBeDisabled()
  })

  it('shows fallback error message when onSubmit rejects without message', async () => {
    onSubmit = vi.fn().mockRejectedValue(new Error())

    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: '06091988' } })
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to load your story. Please try again.')
    })
  })

  // --- Accessibility ---

  it('has proper aria attributes on input when error is shown', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')
    const form = input.closest('form')

    // Before error: no aria-invalid
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).not.toHaveAttribute('aria-describedby')

    // Trigger error
    fireEvent.change(input, { target: { value: '13091988' } })
    fireEvent.submit(form)

    // After error: aria attributes set
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'birthdate-error')
  })

  it('renders main landmark', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  // --- Backspace handling ---

  it('handles backspace by removing last digit', () => {
    render(<DatePicker onSubmit={onSubmit} />)
    const input = screen.getByLabelText('Birth date')

    // Type a date
    fireEvent.change(input, { target: { value: '0609' } })
    expect(input.value).toBe('06 / 09')

    // Press backspace
    fireEvent.keyDown(input, { key: 'Backspace' })
    expect(input.value).toBe('06 / 0')
  })
})
