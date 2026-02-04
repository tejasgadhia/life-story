import { describe, it, expect } from 'vitest'
import { formatBirthdayKey, formatFullDate, validateDate } from './assembleReport'

describe('formatBirthdayKey', () => {
  it('formats single-digit month and day with zero padding', () => {
    expect(formatBirthdayKey(1, 5)).toBe('01-05')
  })

  it('formats double-digit month and day correctly', () => {
    expect(formatBirthdayKey(12, 25)).toBe('12-25')
  })

  it('handles June 9 (the original test date)', () => {
    expect(formatBirthdayKey(6, 9)).toBe('06-09')
  })

  it('handles edge cases - January 1', () => {
    expect(formatBirthdayKey(1, 1)).toBe('01-01')
  })

  it('handles edge cases - December 31', () => {
    expect(formatBirthdayKey(12, 31)).toBe('12-31')
  })
})

describe('formatFullDate', () => {
  it('formats date as readable string', () => {
    expect(formatFullDate(1988, 6, 9)).toBe('June 9, 1988')
  })

  it('handles January dates', () => {
    expect(formatFullDate(2000, 1, 15)).toBe('January 15, 2000')
  })

  it('handles December dates', () => {
    expect(formatFullDate(1975, 12, 25)).toBe('December 25, 1975')
  })

  it('handles single digit days', () => {
    expect(formatFullDate(1990, 3, 5)).toBe('March 5, 1990')
  })
})

describe('validateDate', () => {
  describe('year validation', () => {
    it('accepts years within range (1946-2012)', () => {
      expect(validateDate(1988, 6, 9)).toEqual({ valid: true })
      expect(validateDate(1946, 1, 1)).toEqual({ valid: true })
      expect(validateDate(2012, 12, 31)).toEqual({ valid: true })
    })

    it('rejects years before 1946', () => {
      const result = validateDate(1945, 6, 9)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('1946')
    })

    it('rejects years after 2012', () => {
      const result = validateDate(2013, 6, 9)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('2012')
    })
  })

  describe('month validation', () => {
    it('rejects month 0', () => {
      const result = validateDate(1988, 0, 15)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Month')
    })

    it('rejects month 13', () => {
      const result = validateDate(1988, 13, 15)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Month')
    })
  })

  describe('day validation', () => {
    it('rejects day 0', () => {
      const result = validateDate(1988, 6, 0)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Day')
    })

    it('rejects day 32', () => {
      const result = validateDate(1988, 1, 32)
      expect(result.valid).toBe(false)
    })

    it('validates February days in non-leap year', () => {
      // 1999 is not a leap year
      expect(validateDate(1999, 2, 28)).toEqual({ valid: true })
      const result = validateDate(1999, 2, 29)
      expect(result.valid).toBe(false)
    })

    it('validates February 29 in leap year', () => {
      // 1988 and 2000 are leap years
      expect(validateDate(1988, 2, 29)).toEqual({ valid: true })
      expect(validateDate(2000, 2, 29)).toEqual({ valid: true })
    })

    it('validates months with 30 days', () => {
      // April, June, September, November have 30 days
      expect(validateDate(1988, 4, 30)).toEqual({ valid: true })
      const result = validateDate(1988, 4, 31)
      expect(result.valid).toBe(false)
    })

    it('validates months with 31 days', () => {
      expect(validateDate(1988, 1, 31)).toEqual({ valid: true })
      expect(validateDate(1988, 3, 31)).toEqual({ valid: true })
      expect(validateDate(1988, 12, 31)).toEqual({ valid: true })
    })
  })
})
