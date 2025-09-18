'use client'

import { useState, useEffect } from 'react'
import ContactForm from '@/components/OptimizedContactForm'
import ProjectsSection from '@/components/OptimizedProjectsSection'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { config } from '@/config'

export default function Home() {
  return (
    // ✅ CONTEXT API: Wrap entire app for global theme state
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

// ✅ MAIN APP COMPONENT: Uses theme context instead of props
function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme()  // ✅ No prop drilling!
  const [mounted, setMounted] = useState(false)

  // ✅ HYDRATION SAFETY: Prevent server/client mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Server renders nothing, client renders with correct theme
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      
      {/* ========== NAVIGATION BAR ========== */}
      <nav className={`border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* ✅ ENVIRONMENT CONFIG: App name from environment variables */}
            <h1 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {config.app.name}
            </h1>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a href="#about" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                About
              </a>
              <a href="#projects" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Projects
              </a>
              <a href="#contact" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Contact
              </a>
              
              {/* ✅ CONTEXT API: Theme toggle using context function */}
              <button
                onClick={toggleTheme}  // ✅ Clean function from context
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
          }`}>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Available for Frontend Developer roles
          </div>
          
          {/* Main Heading */}
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frontend Developer
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In Training
            </span>
          </h2>
          
          {/* ✅ ENVIRONMENT CONFIG: Description from config */}
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {config.app.description}. Building modern web applications with <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>. 
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
            <button className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Download Resume 📄
            </button>
          </div>
        </div>

        {/* ========== SKILLS PREVIEW CARDS ========== */}
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
              description: "Git, VS Code, Vercel, Environment Config, Error Boundaries",
              status: "Day 6", // ✅ Updated progress
              color: "green"
            },
            {
              icon: "🚀",
              title: "Next Up",
              description: "Real API Integration, Testing, Deployment",
              status: "Coming Soon", 
              color: "purple"
            }
          ].map((skill, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="text-3xl mb-4">{skill.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {skill.title}
              </h3>
              <p className={`mb-4 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {skill.description}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                skill.color === 'blue' 
                  ? isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                  : skill.color === 'green' 
                  ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                  : isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
              }`}>
                {skill.status}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ DEVELOPMENT DEBUG INFO: Shows config in development */}
        {config.dev.showDebugInfo && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">🔧 Debug Info (Development Only)</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Environment:</strong> {config.app.environment}</p>
              <p><strong>Version:</strong> {config.app.version}</p>
              <p><strong>Mock Data:</strong> {config.dev.enableMockData ? 'Enabled' : 'Disabled'}</p>
              <p><strong>API URL:</strong> {config.api.baseUrl}</p>
              <p><strong>Contact Email:</strong> {config.contact.email}</p>
            </div>
          </div>
        )}
      </main>

      {/* ✅ ERROR BOUNDARY: Projects section with custom error UI */}
      <ErrorBoundary fallback={ProjectsErrorUI}>
        <ProjectsSection />  {/* ✅ No isDarkMode prop needed! */}
      </ErrorBoundary>

      {/* ✅ ERROR BOUNDARY: Contact section with custom error UI */}
      <ErrorBoundary fallback={ContactErrorUI}>
        <ContactSection />  {/* ✅ No isDarkMode prop needed! */}
      </ErrorBoundary>
    </div>
  )
}

// ✅ CONTACT SECTION: Uses context instead of props
function ContactSection() {
  const { isDarkMode } = useTheme()  // ✅ Get theme from context
  
  return (
    <section id="contact" className={`py-20 transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Let's Connect
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to work together? Send me a message and I'll get back to you within 24 hours.
          </p>
        </div>
        
        {/* ✅ OPTIMIZED CONTACT FORM: No props needed */}
        <ContactForm />
      </div>
    </section>
  )
}

// ✅ CUSTOM ERROR UI: Projects section specific
function ProjectsErrorUI({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h2 className="text-3xl font-bold text-red-800 mb-4">Projects Temporarily Unavailable</h2>
        <p className="text-red-600 mb-6 max-w-md mx-auto">
          We're having trouble loading the projects section. This might be due to a network issue or temporary glitch.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={retry}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🔄 Reload Projects
          </button>
          
          <p className="text-sm text-red-500">
            In the meantime, you can still contact me below!
          </p>
        </div>

        {/* ✅ DEVELOPMENT: Show error details in dev mode */}
        {config.dev.showDebugInfo && error && (
          <details className="mt-6 text-left max-w-md mx-auto">
            <summary className="cursor-pointer text-red-700 font-medium">
              🔍 Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto text-red-800">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </section>
  )
}

// ✅ CUSTOM ERROR UI: Contact section specific
function ContactErrorUI({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-3xl font-bold text-red-800 mb-4">Contact Form Issue</h2>
        <p className="text-red-600 mb-6">
          The contact form is experiencing technical difficulties. But don't worry - you can still reach me!
        </p>
        
        <div className="space-y-4">
          <button
            onClick={retry}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🔄 Reload Contact Form
          </button>
          
          {/* ✅ ENVIRONMENT CONFIG: Alternative contact methods from config */}
          <div className="bg-white p-6 rounded-lg border border-red-200">
            <h3 className="font-bold text-gray-800 mb-3">Alternative Contact Methods:</h3>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: 
                <a 
                  href={`mailto:${config.contact.email}`} 
                  className="text-blue-600 underline ml-1"
                >
                  {config.contact.email}
                </a>
              </p>
              <p>💼 LinkedIn: 
                <a 
                  href={config.contact.linkedin} 
                  className="text-blue-600 underline ml-1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </p>
              <p>🐙 GitHub: 
                <a 
                  href={config.contact.github} 
                  className="text-blue-600 underline ml-1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ✅ DEVELOPMENT: Show error details in dev mode */}
        {config.dev.showDebugInfo && error && (
          <details className="mt-6 text-left max-w-md mx-auto">
            <summary className="cursor-pointer text-red-700 font-medium">
              🔍 Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto text-red-800">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </section>
  )
}