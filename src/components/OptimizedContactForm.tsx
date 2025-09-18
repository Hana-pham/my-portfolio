'use client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useState, useEffect, useCallback, memo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { config } from '@/config'
import { contactApi } from '@/services/api'

interface FormData {
  name: string
  email: string
  inquiryType: string
  message: string
}

export default function ContactForm() {
  console.log('🔄 ContactForm rendered!')
  
  // ✅ CONTEXT API: Get theme from context (no props needed)
  const { isDarkMode } = useTheme()
  
  // ✅ PERSISTENT DRAFT: Auto-saves form data to localStorage
  const [formDraft, setFormDraft] = useLocalStorage<FormData>("contact-form-draft", {
    name: "",
    email: "",
    inquiryType: "job",
    message: ""
  })
  
  // Form state management
  const [formData, setFormData] = useState<FormData>(formDraft) // Initialize from saved draft
  const [errors, setErrors] = useState<Partial<FormData>>({}) // Validation errors
  const [isSubmitting, setIsSubmitting] = useState(false) // Loading state
  const [submitMessage, setSubmitMessage] = useState("") // Success/error feedback

  // ✅ AUTO-SAVE DRAFT: Debounced saving to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormDraft(formData) // Save to localStorage after user stops typing
      console.log("💾 Form draft saved automatically!")
    }, 500) // 500ms delay after last change

    return () => clearTimeout(timeoutId) // Cleanup on unmount or change
  }, [formData, setFormDraft])

  // ✅ USECALLBACK: Memoized input change handler (stable function reference)
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    console.log('📝 Input changed:', e.target.name)
    
    const { name, value } = e.target
    
    // Functional update pattern (doesn't need formData in dependencies)
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing (immediate feedback)
    setErrors(prev => ({ ...prev, [name]: "" }))
  }, []) // Empty dependencies = function never recreated = optimal performance

  // ✅ USECALLBACK: Memoized validation (recreated only when formData changes)
  const validateForm = useCallback((): boolean => {
    console.log('✅ Validating form...')
    
    const newErrors: Partial<FormData> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Return true if no errors
  }, [formData]) // Recreate when formData changes (needs current values)

  // ✅ USECALLBACK: Memoized submit handler with real API integration
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    console.log('🚀 Form submitted!')
    
    e.preventDefault() // Prevent default form submission
    
    if (!validateForm()) return // Stop if validation fails

    setIsSubmitting(true) // Show loading state
    setSubmitMessage("") // Clear previous messages

    try {
      // ✅ ENVIRONMENT CONFIG: Use real API or mock based on config
      const response = await contactApi.submit(formData)
      
      if (response.success) {
        // Success feedback with environment-aware message
        setSubmitMessage(response.data.message || `Thank you! I'll get back to you at ${config.contact.email}.`)
        
        // Clear form and draft after successful submission
        const emptyForm = { name: "", email: "", inquiryType: "job", message: "" }
        setFormData(emptyForm)
        setFormDraft(emptyForm)
        
        console.log("🗑️ Form draft cleared after successful submission")
      } else {
        setSubmitMessage(response.data?.message || "Something went wrong. Please try again.")
      }
      
    } catch (error) {
      // Error handling with fallback contact info
      setSubmitMessage(
        `Failed to send message. Please email me directly at ${config.contact.email}`
      )
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false) // Always hide loading state
    }
  }, [validateForm, setFormDraft, formData])

  // Check if user has started typing (for draft indicator)
  const hasDraft = formData.name || formData.email || formData.message
  
  return (
    <div className={`rounded-2xl p-8 shadow-xl transition-colors ${
      isDarkMode ? 'bg-gray-700' : 'bg-white'
    }`}>
      
      {/* ========== DRAFT INDICATOR ========== */}
      {hasDraft && (
        <div className={`mb-4 p-3 rounded-lg border transition-colors ${
          isDarkMode 
            ? 'bg-blue-900 border-blue-700 text-blue-300' 
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <p className="text-sm flex items-center">
            💾 <span className="ml-2">Draft saved automatically</span>
          </p>
        </div>
      )}

      {/* ✅ ENVIRONMENT CONFIG: Show development info */}
      {config.dev.showDebugInfo && (
        <div className={`mb-4 p-3 rounded-lg border transition-colors ${
          isDarkMode 
            ? 'bg-yellow-900 border-yellow-700 text-yellow-300' 
            : 'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}>
          <p className="text-sm">
            🔧 <strong>Dev Mode:</strong> Using {config.dev.enableMockData ? 'mock' : 'real'} API
          </p>
        </div>
      )}

      {/* ========== CONTACT FORM ========== */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ✅ OPTIMIZED FORM FIELDS: Memoized components with stable onChange */}
        <FormField
          id="name"
          label="Name *"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Your full name"
          isDarkMode={isDarkMode}
        />

        <FormField
          id="email"
          label="Email *"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="your.email@example.com"
          isDarkMode={isDarkMode}
        />

        {/* Inquiry Type Dropdown */}
        <div>
          <label htmlFor="inquiryType" className={`block text-sm font-medium mb-1 transition-colors ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
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

        <FormField
          id="message"
          label="Message *"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          placeholder="Tell me about your project or opportunity..."
          isDarkMode={isDarkMode}
          rows={4}
        />

        {/* Character count */}
        <div className={`text-sm transition-colors ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {formData.message.length}/500 characters
        </div>

        {/* ========== SUBMIT BUTTON ========== */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message 🚀'
          )}
        </button>
      </form>

      {/* ========== SUCCESS/ERROR MESSAGE ========== */}
      {submitMessage && (
        <div className={`mt-4 p-4 rounded-md transition-colors ${
          submitMessage.includes('Thank you') || submitMessage.includes('success')
            ? isDarkMode ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200'
            : isDarkMode ? 'bg-red-900 text-red-300 border border-red-700' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <p className="text-sm">{submitMessage}</p>
          
          {/* Show alternative contact methods on error */}
          {!submitMessage.includes('Thank you') && (
            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
              <p className="text-xs font-medium mb-2">Alternative contact methods:</p>
              <div className="space-y-1 text-xs">
                <p>📧 <a href={`mailto:${config.contact.email}`} className="underline">{config.contact.email}</a></p>
                <p>💼 <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ✅ MEMOIZED FORM FIELD: Only re-renders when its specific props change
const FormField = memo(function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  isDarkMode,
  rows
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  placeholder: string
  isDarkMode: boolean
  rows?: number
}) {
  console.log(`🎯 FormField ${id} rendered!`)
  
  // Shared CSS classes for inputs
  const inputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error 
      ? 'border-red-500' 
      : isDarkMode 
        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
  }`

  return (
    <div>
      {/* Field Label */}
      <label htmlFor={id} className={`block text-sm font-medium mb-1 transition-colors ${
        isDarkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {label}
      </label>
      
      {/* Conditional Input/Textarea Rendering */}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      
      {/* Error Message Display */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})