'use client'
import { useState } from 'react'

interface ContactFormProps {
  isDarkMode: boolean
}

interface FormData {
  name: string
  email: string
  inquiryType: string
  message: string
}

export default function ContactForm({ isDarkMode }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "job",
    message: ""
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitMessage("Thank you! Your message has been sent successfully.")
      
      // Clear form after successful submission
      setFormData({ name: "", email: "", inquiryType: "job", message: "" })
      
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`rounded-2xl p-8 shadow-xl transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name 
                ? 'border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email 
                ? 'border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="job">Job Opportunity</option>
            <option value="freelance">Freelance Project</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.message 
                ? 'border-red-500' 
                : isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder="Tell me about your project or opportunity..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          <p className={`mt-1 text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formData.message.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`mt-4 p-3 rounded-md transition-colors ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
          <p className="text-sm">{submitMessage}</p>
        </div>
      )}
    </div>
  )
}