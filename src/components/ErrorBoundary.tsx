'use client'
import React from 'react'

// ✅ TYPES: Define what props and state look like
interface ErrorBoundaryProps {
  children: React.ReactNode  // The components we're protecting
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>  // Custom error UI
}

interface ErrorBoundaryState {
  hasError: boolean  // Is there currently an error?
  error?: Error      // The actual error object
}

// ✅ CLASS COMPONENT: Required for error boundaries
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  
  constructor(props: ErrorBoundaryProps) {
    super(props)
    // ✅ INITIAL STATE: Start with no errors
    this.state = { hasError: false }
  }

  // ✅ CATCH ERRORS: This runs when a child component crashes
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('🚨 Error caught by boundary:', error.message)
    
    // Return new state that triggers error UI
    return {
      hasError: true,  // Switch to error mode
      error           // Store the error for display
    }
  }

  // ✅ LOG ERRORS: This runs after error is caught (for reporting)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('💥 Component crashed with details:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
    
    // 🔮 FUTURE: In production, send to error monitoring service
    // sendToErrorService(error, errorInfo)
  }

  // ✅ RETRY MECHANISM: Reset error state to try again
  handleRetry = () => {
    console.log('🔄 User clicked retry, resetting error state')
    this.setState({ 
      hasError: false,    // Turn off error mode
      error: undefined   // Clear the error
    })
  }

  // ✅ DECISION MAKER: Show error UI or normal content
  render() {
    if (this.state.hasError) {
      // Show custom error UI or default one
      const FallbackComponent = this.props.fallback || DefaultErrorUI
      
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={this.handleRetry}
        />
      )
    }

    // No error: show normal children
    return this.props.children
  }
}

// ✅ DEFAULT ERROR UI: User-friendly error message
function DefaultErrorUI({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <div className="min-h-[300px] flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="text-center max-w-md">
        {/* Friendly emoji instead of scary error */}
        <div className="text-4xl mb-4">😵</div>
        
        <h2 className="text-xl font-bold text-red-800 mb-3">
          Oops! Something went wrong
        </h2>
        
        <p className="text-red-600 mb-4 text-sm">
          {error?.message || "Don't worry, it's not your fault! Please try again."}
        </p>
        
        {/* User actions */}
        <div className="space-y-2">
          <button
            onClick={retry}
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            🔄 Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary