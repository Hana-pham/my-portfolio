'use client'
import { memo, useMemo } from 'react'
import { useApi } from '@/hooks/useApi'
import { projectsApi, Project } from '@/services/api'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { config } from '@/config'

export default function ProjectsSection() {
  console.log('🔄 ProjectsSection rendered!')
  
  // ✅ CONTEXT API: Get theme from context (no props needed)
  const { isDarkMode } = useTheme()
  
  // ✅ CUSTOM HOOK: Reusable API logic with loading/error states
  const { data: projects, loading, error, retry } = useApi(projectsApi.getAll)
  
  // Local state for filtering (not in localStorage - temporary filter)
  const [activeFilter, setActiveFilter] = useState('all')

  // ✅ USEMEMO #1: Only filter when projects or activeFilter changes
  const filteredProjects = useMemo(() => {
    console.log('🔍 Filtering projects...')
    
    if (!projects) return []
    
    return projects.filter(project => 
      activeFilter === 'all' || project.status === activeFilter
    )
  }, [projects, activeFilter])

  // ✅ USEMEMO #2: Only calculate stats when projects change (NOT when filter changes)
  const projectStats = useMemo(() => {
    console.log('📊 Calculating project stats...')
    
    if (!projects) return { total: 0, completed: 0, inProgress: 0, planning: 0 }
    
    return {
      total: projects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      inProgress: projects.filter(p => p.status === 'in-progress').length,
      planning: projects.filter(p => p.status === 'planning').length
    }
  }, [projects])

  // ✅ USEMEMO #3: Only sort when filtered projects change
  const sortedProjects = useMemo(() => {
    console.log('🔢 Sorting projects...')
    
    return [...filteredProjects].sort((a, b) => {
      // Business logic: Sort completed projects first, then by creation date
      if (a.status === 'completed' && b.status !== 'completed') return -1
      if (a.status !== 'completed' && b.status === 'completed') return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [filteredProjects])

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <section className={`py-20 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold mb-8 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Projects
          </h2>
          
          {/* Loading spinner with environment info */}
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className={`transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Loading projects{config.dev.enableMockData ? ' (mock data)' : ''}...
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <section className={`py-20 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold mb-8 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Projects
          </h2>
          
          {/* Error message with retry button */}
          <div className={`border rounded-lg p-6 transition-colors ${
            isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'
          }`}>
            <p className={`mb-4 transition-colors ${
              isDarkMode ? 'text-red-300' : 'text-red-800'
            }`}>
              ❌ {error}
            </p>
            <button 
              onClick={retry}
              className={`px-4 py-2 rounded transition-colors ${
                isDarkMode 
                  ? 'bg-red-700 text-red-100 hover:bg-red-600' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Try Again
            </button>
            
            {/* Show GitHub link as fallback */}
            <p className={`mt-4 text-sm transition-colors ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              Or view my work on{' '}
              <a 
                href={config.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ========== SUCCESS STATE ==========
  return (
    <section id="projects" className={`py-20 transition-colors ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Projects
          </h2>
          <p className={`text-lg transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Here are some projects I've been working on
          </p>
          
          {/* ✅ ENVIRONMENT CONFIG: Show data source info in development */}
          {config.dev.showDebugInfo && (
            <p className={`text-sm mt-2 transition-colors ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              🔧 Using {config.dev.enableMockData ? 'mock' : 'real'} data from {config.api.baseUrl}
            </p>
          )}
        </div>

        {/* ========== PROJECT STATS (uses memoized data) ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            value={projectStats.total}
            label="Total Projects"
            color="blue"
            isDarkMode={isDarkMode}
          />
          <StatCard
            value={projectStats.completed}
            label="Completed"
            color="green"
            isDarkMode={isDarkMode}
          />
          <StatCard
            value={projectStats.inProgress}
            label="In Progress"
            color="yellow"
            isDarkMode={isDarkMode}
          />
          <StatCard
            value={projectStats.planning}
            label="Planning"
            color="purple"
            isDarkMode={isDarkMode}
          />
        </div>

        {/* ========== FILTER BUTTONS ========== */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {['all', 'completed', 'in-progress', 'planning'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-lg capitalize transition-colors text-sm md:text-base ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.replace('-', ' ')} ({
                filter === 'all' ? projectStats.total :
                filter === 'completed' ? projectStats.completed :
                filter === 'in-progress' ? projectStats.inProgress :
                projectStats.planning
              })
            </button>
          ))}
        </div>

        {/* ========== PROJECTS GRID ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project} 
              isDarkMode={isDarkMode} 
            />
          ))}
        </div>

        {/* ========== EMPTY STATE ========== */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className={`text-lg mb-2 transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No projects found for "{activeFilter.replace('-', ' ')}" filter
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-sm underline transition-colors ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ✅ MEMOIZED STAT CARD: Reusable statistics component
const StatCard = memo(function StatCard({ 
  value, 
  label, 
  color, 
  isDarkMode 
}: { 
  value: number; 
  label: string; 
  color: string; 
  isDarkMode: boolean 
}) {
  const colorClasses = {
    blue: isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600',
    green: isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-600',
    yellow: isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-50 text-yellow-600',
    purple: isDarkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'
  }

  return (
    <div className={`p-4 rounded-lg text-center transition-colors ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-2xl font-bold mb-1">
        {value}
      </div>
      <div className={`text-sm transition-colors ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {label}
      </div>
    </div>
  )
})

// ✅ MEMOIZED PROJECT CARD: Only re-renders if project or isDarkMode changes
const ProjectCard = memo(function ProjectCard({ 
  project, 
  isDarkMode 
}: { 
  project: Project; 
  isDarkMode: boolean 
}) {
  console.log(`🃏 ProjectCard ${project.id} rendered!`)
  
  // Status indicators
  const statusConfig = {
    'completed': { icon: '✅', color: isDarkMode ? 'text-green-400' : 'text-green-600' },
    'in-progress': { icon: '🚧', color: isDarkMode ? 'text-yellow-400' : 'text-yellow-600' },
    'planning': { icon: '📋', color: isDarkMode ? 'text-purple-400' : 'text-purple-600' }
  }
  
  const statusInfo = statusConfig[project.status] || { icon: '📋', color: 'text-gray-500' }
  
  return (
    <div className={`rounded-lg border p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 ${
      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
    }`}>
      
      {/* Project Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        <span className={`text-sm ${statusInfo.color}`}>
          {statusInfo.icon} {project.status.replace('-', ' ')}
        </span>
      </div>
      
      {/* Project Description */}
      <p className={`mb-4 text-sm md:text-base transition-colors ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {project.description}
      </p>
      
      {/* Progress Bar (for in-progress projects) */}
      {project.status === 'in-progress' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{project.progress}%</span>
          </div>
          <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Technology Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 4).map((tech, index) => (
          <span 
            key={index}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
            }`}
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
            isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            +{project.tech.length - 4} more
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 text-center py-2 px-3 rounded transition-colors text-sm ${
            isDarkMode 
              ? 'bg-gray-600 text-white hover:bg-gray-500' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          💻 Code
        </a>
        
        {project.demo !== '#' ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border border-blue-600 text-blue-600 py-2 px-3 rounded hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            🚀 Demo
          </a>
        ) : (
            <span className={`flex-1 text-center py-2 px-3 rounded border border-gray-400 text-sm transition-colors ${
            isDarkMode 
              ? 'text-gray-500 border-gray-600' 
              : 'text-gray-400 border-gray-300'
          }`}>
            🚧 Coming Soon
          </span>
        )}
      </div>
      
      {/* Creation Date */}
      <p className={`text-xs mt-3 transition-colors ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
})

