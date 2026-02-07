import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTabState } from './useTabState'

describe('useTabState', () => {
  // --- Uncontrolled mode (no propSetTab) ---

  describe('uncontrolled mode', () => {
    it('returns initial tab index of 0 by default', () => {
      const { result } = renderHook(() => useTabState())
      const [activeTab] = result.current
      expect(activeTab).toBe(0)
    })

    it('returns custom initial tab index when provided', () => {
      const { result } = renderHook(() => useTabState(2))
      const [activeTab] = result.current
      expect(activeTab).toBe(2)
    })

    it('can update the active tab with setActiveTab', () => {
      const { result } = renderHook(() => useTabState(0))

      act(() => {
        const [, setActiveTab] = result.current
        setActiveTab(3)
      })

      const [activeTab] = result.current
      expect(activeTab).toBe(3)
    })

    it('can set tab to 0 explicitly', () => {
      const { result } = renderHook(() => useTabState(2))

      act(() => {
        const [, setActiveTab] = result.current
        setActiveTab(0)
      })

      const [activeTab] = result.current
      expect(activeTab).toBe(0)
    })

    it('handles multiple tab switches', () => {
      const { result } = renderHook(() => useTabState(0))

      act(() => {
        result.current[1](1)
      })
      expect(result.current[0]).toBe(1)

      act(() => {
        result.current[1](3)
      })
      expect(result.current[0]).toBe(3)

      act(() => {
        result.current[1](0)
      })
      expect(result.current[0]).toBe(0)
    })
  })

  // --- Controlled mode (with propSetTab) ---

  describe('controlled mode', () => {
    it('uses propTab as the active tab', () => {
      const setTab = vi.fn()
      const { result } = renderHook(() => useTabState(2, setTab))
      const [activeTab] = result.current
      expect(activeTab).toBe(2)
    })

    it('uses propSetTab as the setter', () => {
      const setTab = vi.fn()
      const { result } = renderHook(() => useTabState(0, setTab))
      const [, setActiveTab] = result.current

      // The returned setter should be the prop setter, not internal setState
      expect(setActiveTab).toBe(setTab)
    })

    it('calls propSetTab when setActiveTab is invoked', () => {
      const setTab = vi.fn()
      const { result } = renderHook(() => useTabState(0, setTab))

      act(() => {
        result.current[1](2)
      })

      expect(setTab).toHaveBeenCalledWith(2)
    })

    it('reflects updated propTab on rerender', () => {
      const setTab = vi.fn()
      const { result, rerender } = renderHook(
        ({ tab, setter }) => useTabState(tab, setter),
        { initialProps: { tab: 0, setter: setTab } }
      )

      expect(result.current[0]).toBe(0)

      // Simulate parent updating the tab
      rerender({ tab: 3, setter: setTab })
      expect(result.current[0]).toBe(3)
    })
  })

  // --- Return value shape ---

  it('returns an array with exactly two elements', () => {
    const { result } = renderHook(() => useTabState())
    expect(result.current).toHaveLength(2)
    expect(typeof result.current[0]).toBe('number')
    expect(typeof result.current[1]).toBe('function')
  })

  it('supports destructuring like useState', () => {
    const { result } = renderHook(() => useTabState(1))
    const [activeTab, setActiveTab] = result.current
    expect(activeTab).toBe(1)
    expect(typeof setActiveTab).toBe('function')
  })
})
