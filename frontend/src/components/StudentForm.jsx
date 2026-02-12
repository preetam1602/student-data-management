import { useState, useEffect } from 'react'

export default function StudentForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    age: '',
    branch: ''
  })
  const [errors, setErrors] = useState({})

  const branches = ['CSE', 'ECE', 'ME', 'CIVIL', 'EEE']

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.usn.trim()) {
      newErrors.usn = 'USN is required'
    } else if (!/^USN\d{3,}$/.test(formData.usn)) {
      newErrors.usn = 'USN must start with "USN" followed by numbers'
    }

    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || formData.age < 15 || formData.age > 30) {
      newErrors.age = 'Age must be between 15 and 30'
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch is required'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    setFormData({
      name: '',
      usn: '',
      age: '',
      branch: ''
    })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Rajesh Kumar"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* USN Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          USN
        </label>
        <input
          type="text"
          name="usn"
          value={formData.usn}
          onChange={handleChange}
          placeholder="e.g., USN001"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            errors.usn ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.usn && <p className="text-red-500 text-xs mt-1">{errors.usn}</p>}
      </div>

      {/* Age Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="e.g., 20"
          min="15"
          max="30"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
      </div>

      {/* Branch Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Branch
        </label>
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            errors.branch ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Branch</option>
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
        {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {initialData ? 'Update Student' : 'Add Student'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
