'use client'
import React, { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// ✅ DEFINE WHAT THEME CONTEXT PROVIDES
interface ThemeContextType {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  toggleTheme: () => void
}

// ✅ CREATE CONTEXT: This is like a "global variable" for components
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ✅ PROVIDER COMPONENT: Wraps your app and provides theme data
interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // ✅ THEME STATE: Same logic as before, but now centralized
  const [isDarkMode, setIsDarkMode] = useLocalStorage("portfolio-theme", false)
  
  // ✅ HELPER FUNCTION: Toggle theme easily
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  // ✅ CONTEXT VALUE: What we provide to all child components
  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme
  }
  
  console.log('🎨 ThemeProvider rendered, isDarkMode:', isDarkMode)
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// ✅ CUSTOM HOOK: Easy way for components to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  
  // ✅ ERROR HANDLING: Make sure component is inside ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}