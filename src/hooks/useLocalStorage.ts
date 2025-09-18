import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Initialize with a function that safely reads localStorage
  const [value, setValue] = useState<T>(() => {
    // Only try to read localStorage on the client side
    if (typeof window === 'undefined') {
      return defaultValue // Server-side: always use default
    }
    
    try {
      const savedValue = localStorage.getItem(key)
      if (savedValue !== null) {
        return JSON.parse(savedValue)
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
    
    return defaultValue
  })

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      console.log(`💾 Saved to localStorage:`, { key, value })
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue] as const
}