// Simulate a real API with delays and potential failures
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

// Mock data that simulates a real backend
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Portfolio Builder',
    description: 'Dynamic portfolio generator using OpenAI GPT-4 API with real-time preview and component library.',
    status: 'in-progress',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Framer Motion'],
    github: 'https://github.com/Hana-pham/HanaPortfolio',
    demo: 'https://hanapham.com',
    progress: 85,
    createdAt: '2025-08-15',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
  },
  {
    id: '2', 
    title: 'Real-time Chat with Flowerist',
    description: 'WebSocket-based chat app with rooms, file sharing, and message encryption.',
    status: 'completed',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT Auth'],
    github: 'https://github.com/Hana-pham/SpringPetals',
    demo: 'https://spring-petals.com',
    progress: 100,
    createdAt: '2025-09-01',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400'
  },
  {
    id: '3',
    title: 'Microservice app for women',
    description: 'Women health tracking based on women cycle',
    status: 'planning',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Chart.js', 'Stripe API'],
    github: 'https://github.com/Hana-pham/Luna',
    demo: '#',
    progress: 15,
    createdAt: '2025-09-01',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
  }
]

const MOCK_STATS = {
  totalProjects: 3,
  completedProjects: 1,
  githubStars: 47,
  yearsExperience: 0
}

// Simulate network delay and potential failures
const simulateNetworkCall = async <T>(data: T, delay: number = 1000, failRate: number = 0.1): Promise<ApiResponse<T>> => {
  await new Promise(resolve => setTimeout(resolve, delay))
  
  // Simulate random failures
  if (Math.random() < failRate) {
    throw new Error('Network request failed')
  }
  
  return {
    data,
    success: true,
    message: 'Data fetched successfully'
  }
}

// API functions
export const projectsApi = {
  // Fetch all projects
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    try {
      return await simulateNetworkCall(MOCK_PROJECTS, 1500, 0.05)
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch projects'
      }
    }
  },

  // Fetch single project
  getById: async (id: string): Promise<ApiResponse<Project | null>> => {
    try {
      const project = MOCK_PROJECTS.find(p => p.id === id)
      return await simulateNetworkCall(project || null, 800, 0.1)
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Failed to fetch project'
      }
    }
  },

  // Get portfolio stats
  getStats: async (): Promise<ApiResponse<typeof MOCK_STATS>> => {
    try {
      return await simulateNetworkCall(MOCK_STATS, 600, 0.05)
    } catch (error) {
      return {
        data: { totalProjects: 0, completedProjects: 0, githubStars: 0, yearsExperience: 0 },
        success: false,
        message: 'Failed to fetch stats'
      }
    }
  }
}

// Contact form submission
export const contactApi = {
  submit: async (formData: any): Promise<ApiResponse<{ message: string }>> => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Random success/failure for testing
      if (Math.random() < 0.8) {
        return {
          data: { message: 'Thank you! I\'ll get back to you within 24 hours.' },
          success: true
        }
      } else {
        throw new Error('Server error')
      }
    } catch (error) {
      return {
        data: { message: 'Failed to send message. Please try again.' },
        success: false
      }
    }
  }
}