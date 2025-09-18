// src/config/index.ts

// ✅ ENVIRONMENT CONFIGURATION: Centralized config management

// Helper function to get environment variables with defaults
function getEnvVar(key: string, defaultValue: string = ''): string {
  const value = process.env[key]
  if (!value && !defaultValue) {
    console.warn(`⚠️ Environment variable ${key} is not set`)
  }
  return value || defaultValue
}

// Helper function to get boolean environment variables
function getBooleanEnvVar(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key]
  if (value === undefined) return defaultValue
  return value.toLowerCase() === 'true'
}

// Helper function to get number environment variables
function getNumberEnvVar(key: string, defaultValue: number = 0): number {
  const value = process.env[key]
  if (value === undefined) return defaultValue
  const numValue = parseInt(value, 10)
  return isNaN(numValue) ? defaultValue : numValue
}

// ✅ APP CONFIGURATION
export const config = {
  // App Information
  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Portfolio'),
    description: getEnvVar('NEXT_PUBLIC_APP_DESCRIPTION', 'Developer Portfolio'),
    environment: getEnvVar('NEXT_PUBLIC_ENVIRONMENT', 'development'),
    version: process.env.npm_package_version || '1.0.0'
  },

  // Contact Information
  contact: {
    email: getEnvVar('NEXT_PUBLIC_CONTACT_EMAIL', 'hello@example.com'),
    linkedin: getEnvVar('NEXT_PUBLIC_LINKEDIN_URL', '#'),
    github: getEnvVar('NEXT_PUBLIC_GITHUB_URL', '#')
  },

  // API Configuration
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:3000/api'),
    timeout: getNumberEnvVar('NEXT_PUBLIC_API_TIMEOUT', 10000),
    retryAttempts: getNumberEnvVar('NEXT_PUBLIC_API_RETRY_ATTEMPTS', 3)
  },

  // Development Settings
  dev: {
    mockApiDelay: getNumberEnvVar('NEXT_PUBLIC_MOCK_API_DELAY', 1500),
    enableMockData: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_MOCK_DATA', true),
    showDebugInfo: getBooleanEnvVar('NEXT_PUBLIC_SHOW_DEBUG_INFO', false)
  },

  // Feature Flags
  features: {
    analytics: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
    errorReporting: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_ERROR_REPORTING', false),
    darkMode: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_DARK_MODE', true),
    contactForm: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_CONTACT_FORM', true)
  },

  // Private Configuration (server-side only)
  private: {
    databaseUrl: getEnvVar('DATABASE_URL'),
    emailApiKey: getEnvVar('EMAIL_SERVICE_API_KEY'),
    analyticsSecret: getEnvVar('ANALYTICS_SECRET')
  }
}

// ✅ ENVIRONMENT HELPERS
export const isDevelopment = config.app.environment === 'development'
export const isProduction = config.app.environment === 'production'
export const isStaging = config.app.environment === 'staging'

// ✅ DEBUG HELPER
export function logConfig() {
  if (isDevelopment && config.dev.showDebugInfo) {
    console.log('🔧 App Configuration:', {
      environment: config.app.environment,
      apiBaseUrl: config.api.baseUrl,
      features: config.features,
      dev: config.dev
    })
  }
}

// Log configuration on import (development only)
logConfig()