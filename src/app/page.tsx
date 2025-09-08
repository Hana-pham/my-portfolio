export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Hana Pham
            </h1>
            <div className="space-x-6">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Frontend Developer
            <span className="block text-blue-600">In Training</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Building modern web applications with React, Next.js, and TypeScript. 
            Follow my journey from beginner to job-ready developer.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              View My Projects
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Download Resume
            </button>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Frontend</h3>
            <p className="text-gray-600">React, Next.js, TypeScript, Tailwind CSS</p>
            <div className="mt-4 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full inline-block">
              Learning Now
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Tools</h3>
            <p className="text-gray-600">Git, VS Code, Vercel, GitHub</p>
            <div className="mt-4 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-block">
              Day 1
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Next Up</h3>
            <p className="text-gray-600">AI Integration, Real-time Features</p>
            <div className="mt-4 bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full inline-block">
              Coming Soon
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}