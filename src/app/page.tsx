'use client'

import { useState } from 'react'
import ContactForm from '@/components/ContactForm'

// Project data with more detail for learning
const projectsData = [
  {
    id: 1,
    title: "AI Landing Page Builder",
    description: "Dynamic landing page generator using OpenAI GPT-4 API with real-time preview and component library.",
    status: "in-progress",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "OpenAI API", "Framer Motion"],
    github: "https://github.com/yourusername/ai-landing-builder",
    demo: "#",
    progress: 75,
    learnings: [
      "API integration and streaming responses", 
      "Real-time UI updates with React state",
      "TypeScript interfaces for AI responses",
      "Component-based architecture design"
    ]
  },
  {
    id: 2,
    title: "Real-time Collaboration Tool",
    description: "Google Docs-like editor with live cursors, conflict resolution, and WebSocket communication.",
    status: "planning",
    tech: ["React", "WebSockets", "Yjs", "Supabase", "TipTap Editor"],
    github: "#",
    demo: "#", 
    progress: 0,
    learnings: [
      "Operational Transform algorithms",
      "WebSocket real-time communication", 
      "Conflict resolution strategies",
      "Distributed system basics"
    ]
  },
  {
    id: 3,
    title: "Performance Monitoring Dashboard", 
    description: "Web vitals tracking with real-time analytics, performance budgets, and alerting system.",
    status: "upcoming",
    tech: ["React Query", "Chart.js", "Web Vitals API", "Vercel Analytics", "Webhooks"],
    github: "#",
    demo: "#",
    progress: 0,
    learnings: [
      "Performance metrics and optimization",
      "Data visualization best practices",
      "Analytics implementation patterns", 
      "Monitoring and alerting systems"
    ]
  },
  {
    id: 4,
    title: "Multi-Tenant SaaS Platform",
    description: "B2B SaaS with row-level security, usage-based billing, and organization management.",
    status: "upcoming", 
    tech: ["Next.js", "Supabase", "Stripe", "Row-Level Security", "Webhooks"],
    github: "#",
    demo: "#",
    progress: 0,
    learnings: [
      "Multi-tenancy architecture patterns",
      "Payment integration and webhooks",
      "Database security and RLS",
      "SaaS business logic implementation"
    ]
  }
]

// Project Card Component
function ProjectCard({ project }: { project: typeof projectsData[0] }) {
  const { title, description, status, tech, github, demo, progress, learnings } = project
  
  const statusConfig = {
    'in-progress': { 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      dot: 'bg-blue-500'
    },
    'planning': { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dot: 'bg-yellow-500'
    },
    'upcoming': { 
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      dot: 'bg-gray-500'
    },
    'completed': { 
      color: 'bg-green-100 text-green-800 border-green-200',
      dot: 'bg-green-500'
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
          {title}
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig[status as keyof typeof statusConfig].color}`}>
          <div className={`w-2 h-2 rounded-full ${statusConfig[status as keyof typeof statusConfig].dot}`}></div>
          <span className="text-xs font-medium capitalize">
            {status.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      {/* Progress bar for in-progress projects */}
      {status === 'in-progress' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {tech.map((techItem, index) => (
            <span 
              key={index} 
              className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium border border-gray-300 hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all"
            >
              {techItem}
            </span>
          ))}
        </div>
      </div>
      
      {/* Key Learnings */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Learnings</h4>
        <ul className="space-y-2">
          {learnings.map((learning, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{learning}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <a 
          href={github}
          className="flex-1 bg-gray-900 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-all font-medium text-sm group-hover:shadow-md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center gap-2">
            View Code
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </a>
        {demo !== '#' && (
          <a 
            href={demo}
            className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-3 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Filter projects based on status
  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true
    return project.status === activeFilter
  })
  
  const filterOptions = [
    { key: 'all', label: 'All Projects', count: projectsData.length },
    { key: 'in-progress', label: 'In Progress', count: projectsData.filter(p => p.status === 'in-progress').length },
    { key: 'planning', label: 'Planning', count: projectsData.filter(p => p.status === 'planning').length },
    { key: 'upcoming', label: 'Upcoming', count: projectsData.filter(p => p.status === 'upcoming').length }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Navigation */}
      <nav className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Hana Pham
            </h1>
            <div className="flex items-center space-x-6">
              <a href="#about" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
                About
              </a>
              <a href="#projects" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
                Projects
              </a>
              <a href="#contact" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
                Contact
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Available for Frontend Developer roles
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frontend Developer
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In Training
            </span>
          </h2>
          
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Building modern web applications with <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>. 
            Follow my journey from beginner to job-ready developer in <strong>6 months</strong>.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Projects 🚀
            </button>
            <button className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Download Resume 📄
            </button>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚛️",
              title: "Frontend",
              description: "React, Next.js, TypeScript, Tailwind CSS",
              status: "Learning Now",
              color: "blue"
            },
            {
              icon: "🛠️", 
              title: "Tools",
              description: "Git, VS Code, Vercel, Supabase, GitHub",
              status: "Day 2",
              color: "green"
            },
            {
              icon: "🚀",
              title: "Next Up",
              description: "AI Integration, Real-time Features, Backend",
              status: "Coming Soon", 
              color: "purple"
            }
          ].map((skill, index) => (
            <div key={index} className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text-3xl mb-4">{skill.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {skill.title}
              </h3>
              <p className={`mb-4 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {skill.description}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                skill.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                skill.color === 'green' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {skill.status}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Current Projects
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Building real-world applications to demonstrate modern frontend development skills
            </p>
          </div>

          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterOptions.map(option => (
              <button
                key={option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  activeFilter === option.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === option.key
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No projects found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Contact Section */}
<section id="contact" className={`py-20 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  <div className="max-w-4xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Let's Connect
      </h2>
      <p className={`text-lg max-w-2xl mx-auto transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Ready to work together? Send me a message and I'll get back to you within 24 hours.
      </p>
    </div>
    
    <ContactForm />
  </div>
</section>

    </div>
  )
}