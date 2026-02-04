import { useState } from 'react'

/**
 * Hook for managing tab state that supports both controlled and uncontrolled modes
 *
 * @param {number} propTab - Tab index from props (controlled mode)
 * @param {function} propSetTab - Tab setter from props (controlled mode)
 * @returns {[number, function]} - [activeTab, setActiveTab]
 */
export function useTabState(propTab = 0, propSetTab = null) {
  const [internalTab, setInternalTab] = useState(propTab)

  // Use prop values if setTab is provided (controlled), otherwise use internal state
  const activeTab = propSetTab ? propTab : internalTab
  const setActiveTab = propSetTab || setInternalTab

  return [activeTab, setActiveTab]
}
