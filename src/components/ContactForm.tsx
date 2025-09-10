'user client'
import { resolve } from "path"
import React, { useState } from "react"
import { Tracing } from "trace_events"
import { serialize } from "v8"
//define form data 
interface FormData{
    name: string
    email: string 
    message: string
    inquiryType: 'job' | 'freelance' | 'collaboration'
}
//define form data error 
interface FormErrors{
    name?: string
    email?: string
    message?: string
}

export default function ContactForm(){
    //set up state 
   const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    inquiryType: 'kjob'
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  //handle input changes 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    const {name, value} = e.target

    //Update the form data
    setFormData(previous => ({
      ...previous,
      [name]: value
    }))

    //clear any error for this field
    if(errors[name as keyof FormErrors]){
        setErrors(previous => ({
            ...previous,
            [name]: undefined
        }))
    }
  }
  //validate the form 
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    //name field validation
    if (!formData.name.trim()){
        newErrors.name = 'Name is required'
    } else if (formData.name.trim.length < 2){
        newErrors.name = 'Name must be at least 2 characters'
    }

    //Email validation 
    if (formData.email.trim()){
        newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    //Message validation
    if (!formData.message.trim()){
        newErrors.message = 'Message is required'
    } else if (formData.message.trim().length <10){
        newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle data after the form got submitted 
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // prevent refresh 

    //Validate data first 
    if (!validateForm()){
        return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
        await new Promise(resolve => setTimeout(resolve, 2000))

        //simulate random sucess / failing for testing 
        if (Math.random() > 0.2){
            setSubmitMessage('Messsage sent to Hana, I will get back to you soon.')
            //reset form on sucess 
            setFormData({
                name: '',
                email: '',
                message: '',
                inquiryType: 'job'
            })
        } else {
            setSubmitMessage('Failed to submit your request, please try again.')
        }
    } catch (error){
        setSubmitMessage('Something went wrong, please try again.')
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
    <h2 className="text-2xl font-bold md-6 text-grey-800">Contact Me</h2>

    <form onSubmit={HandleSubmit} className="space-y-4">
    {/*Name input*/}
    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name *
        </label>
        <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="job">Job Opportunity</option>
            <option value="freelance">Freelance Project</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell me about your project or opportunity..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          <p className="mt-1 text-sm text-gray-500">
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
        <div className="mt-4 p-3 rounded-md bg-gray-100">
          <p className="text-sm">{submitMessage}</p>
        </div>
      )}
    </div>
  )
}