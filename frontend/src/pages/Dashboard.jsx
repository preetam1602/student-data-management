import { useState, useEffect } from 'react'
import StudentList from '../components/StudentList'
import StudentForm from '../components/StudentForm'
import Navbar from '../components/Navbar'
import Statistics from '../components/Statistics'


export default function Dashboard({ user, onLogout }) {
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch students on mount
  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/v1/posts/all')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        console.error('Failed to fetch students')
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique branches
  const branches = [...new Set(students.map(s => s.branch))]

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.usn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = !filterBranch || student.branch === filterBranch
    return matchesSearch && matchesBranch
  })

  const handleAddStudent = async (formData) => {
    try {
      if (editingStudent) {
        // Update existing student
        const response = await fetch(`http://localhost:5000/api/v1/posts/update/${editingStudent._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          await fetchStudents() // Refresh the list
          alert('Student updated successfully!')
        } else {
          const error = await response.json()
          alert(`Error: ${error.message}`)
        }
        setEditingStudent(null)
      } else {
        // Add new student
        const response = await fetch('http://localhost:5000/api/v1/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          await fetchStudents() // Refresh the list
          alert('Student added successfully!')
        } else {
          const error = await response.json()
          alert(`Error: ${error.message}`)
        }
      }
      setShowForm(false)
    } catch (error) {
      console.error('Error saving student:', error)
      alert('Failed to save student. Please try again.')
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDeleteStudent = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/posts/delete/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await fetchStudents() // Refresh the list
          alert('Student deleted successfully!')
        } else {
          const error = await response.json()
          alert(`Error: ${error.message}`)
        }
      } catch (error) {
        console.error('Error deleting student:', error)
        alert('Failed to delete student. Please try again.')
      }
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingStudent(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Management</h1>
          <p className="text-gray-600">Manage and track student information efficiently</p>
        </div>

        {/* Statistics */}
        <Statistics students={students} branches={branches} />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h2>
                <StudentForm
                  onSubmit={handleAddStudent}
                  onCancel={handleCancelForm}
                  initialData={editingStudent}
                />
              </div>
            </div>
          )}

          {/* Right Column - List and Filters */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {/* Filters and Add Button */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Search */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Search by name or USN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Branch Filter */}
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>

                {/* Add Button */}
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Student
                  </button>
                )}
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-500 mt-3">
                Showing {filteredStudents.length} of {students.length} students
              </p>
            </div>

            {/* Student List */}
            <StudentList
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 text-lg">No students found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

