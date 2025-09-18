// src/services/api.ts
import { config, isDevelopment } from '@/config'

export interface Project {
  id: string
  title: string
  description: string
  status: 'in-progress' | 'completed' | 'planning'
  tech: string[]
  github: string
  demo: string
  image?: string
  createdAt: string
  progress: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// ✅ MOCK DATA: Configurable based on environment
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Portfolio Builder',
    description: 'Dynamic portfolio generator using OpenAI GPT-4 API with real-time preview and component library.',
    status: 'in-progress',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Framer Motion'],
    github: config.contact.github,
    demo: '#',
    progress: 85,
    createdAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
  },
  {
    id: '2', 
    title: 'Contact Form with Auto-Save',
    description: 'Professional contact form with real-time validation, auto-save drafts, and error boundaries.',
    status: 'completed',
    tech: ['React', 'TypeScript', 'useLocalStorage', 'useCallback', 'Error Boundaries'],
    github: config.contact.github,
    demo: '#',
    progress: 100,
    createdAt: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400'
  },
  {
    id: '3',
    title: 'Performance Optimized Dashboard',
    description: 'Analytics dashboard with React.memo, useMemo, and useCallback optimizations for large datasets.',
    status: 'planning',
    tech: ['Next.js', 'React.memo', 'useMemo', 'useCallback', 'Chart.js'],
    github: config.contact.github,
    demo: '#',
    progress: 15,
    createdAt: '2024-02-01',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
  }
]

// ✅ CONFIGURABLE API SIMULATION
const simulateNetworkCall = async <T>(data: T): Promise<ApiResponse<T>> => {
  // Use configured delay
  await new Promise(resolve => setTimeout(resolve, config.dev.mockApiDelay))
  
  // Simulate occasional failures (only in development)
  if (isDevelopment && Math.random() < 0.1) {
    throw new Error('Simulated network error for testing')
  }
  
  return {
    data,
    success: true,
    message: 'Data fetched successfully'
  }
}

// ✅ API FUNCTIONS: Environment-aware
export const projectsApi = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    try {
      if (config.dev.enableMockData) {
        // Use mock data in development
        return await simulateNetworkCall(MOCK_PROJECTS)
      } else {
        // Make real API call
        const response = await fetch(`${config.api.baseUrl}/projects`)
        const data = await response.json()
        return data
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch projects. Please try again.'
      }
    }
  }
}

// ✅ CONTACT API: Environment-aware
export const contactApi = {
  submit: async (formData: any): Promise<ApiResponse<{ message: string }>> => {
    try {
      if (config.dev.enableMockData) {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        return {
          data: { message: `Thank you! I'll get back to you at ${config.contact.email}.` },
          success: true
        }
      } else {
        // Make real API call
        const response = await fetch(`${config.api.baseUrl}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const data = await response.json()
        return data
      }
    } catch (error) {
      return {
        data: { message: 'Failed to send message. Please try again.' },
        success: false
      }
    }
  }
}

// ✅ DEBUG INFO
if (isDevelopment && config.dev.showDebugInfo) {
  console.log('🌐 API Configuration:', {
    baseUrl: config.api.baseUrl,
    mockData: config.dev.enableMockData,
    mockDelay: config.dev.mockApiDelay
  })
}