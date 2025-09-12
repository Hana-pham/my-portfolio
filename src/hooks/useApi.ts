import { useState, useEffect } from 'react'

// Generic type for any API function
type ApiFunction<T> = () => Promise<{ data: T; success: boolean; message?: string }>

// What our hook returns
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
}

export function useApi<T>(apiFunction: ApiFunction<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      console.log('🚀 useApi: Starting fetch...')
      setLoading(true)
      setError(null)
      
      const response = await apiFunction()
      
      if (response.success) {
        console.log('✅ useApi: Success!', response.data)
        setData(response.data)
      } else {
        console.log('❌ useApi: API returned error:', response.message)
        setError(response.message || 'Something went wrong')
      }
    } catch (err) {
      console.log('💥 useApi: Network error:', err)
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  // Run on component mount
  useEffect(() => {
    fetchData()
  }, [])

  // Return data and functions that components can use
  return {
    data,
    loading,
    error,
    retry: fetchData // Allow manual retry
  }
}