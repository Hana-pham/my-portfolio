'use client'

import { useState } from 'react'
import ContactForm from '@/components/ContactForm'
import ProjectsSection from '@/components/ProjectsSection'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

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
              status: "Day 4",
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

      {/* Use the separate ProjectsSection component */}
      <ProjectsSection />

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