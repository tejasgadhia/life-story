import { createContext, useContext } from 'react'

export const FontSizeContext = createContext({ fontSize: 'base', setFontSize: () => {} })

export function useFontSize() {
  return useContext(FontSizeContext)
}
