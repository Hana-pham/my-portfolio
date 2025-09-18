'use client'
import { useState, useEffect } from 'react'
import { projectsApi, Project } from '@/services/api'

interface ProjectSectionProps {
  isDarkMode: boolean
}
export default function ProjectsSection({isDarkMode}: ProjectSectionProps) {
  // State for projects data
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await projectsApi.getAll()
        
        if (response.success) {
          setProjects(response.data)
        } else {
          setError(response.message || 'Failed to load projects')
        }
      } catch (err) {
        setError('Something went wrong. Please try again.')
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, []) // Empty dependency array = run once on mount

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    return project.status === activeFilter
  })

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">My Projects</h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Loading awesome projects...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">My Projects</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <span className="text-red-500 text-2xl">⚠️</span>
                <div>
                  <p className="text-red-800 font-medium">Oops! Something went wrong</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Success state with data
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some projects I've built to solve real-world problems
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: `All (${projects.length})` },
            { key: 'completed', label: `Completed (${projects.filter(p => p.status === 'completed').length})` },
            { key: 'in-progress', label: `In Progress (${projects.filter(p => p.status === 'in-progress').length})` },
            { key: 'planning', label: `Planning (${projects.filter(p => p.status === 'planning').length})` }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const statusConfig = {
    'completed': { color: 'bg-green-100 text-green-800', icon: '✅' },
    'in-progress': { color: 'bg-blue-100 text-blue-800', icon: '🚧' },
    'planning': { color: 'bg-yellow-100 text-yellow-800', icon: '📝' }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Project Image */}
      {project.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex-1">{project.title}</h3>
          <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[project.status].color}`}>
            {statusConfig[project.status].icon} {project.status.replace('-', ' ')}
          </span>
        </div>

        {/* Progress bar for in-progress projects */}
        {project.status === 'in-progress' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

{/* Action Buttons */}
<div className="flex gap-3">
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
  >
    View Code
  </a>

  {project.demo !== '#' && (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
    >
      Live Demo
    </a>
  )}
</div>

      </div>
    </div>
  )
}