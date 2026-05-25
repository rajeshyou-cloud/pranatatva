'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type DesignTheme = 'A' | 'B' | 'C' | 'D'

interface ThemeCtxValue {
  theme: DesignTheme
  setTheme: (t: DesignTheme) => void
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'A', setTheme: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<DesignTheme>('A')
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
