export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">USN</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Branch</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.usn}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.age}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {student.branch}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="md:hidden space-y-4 p-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.usn}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {student.branch}
              </span>
            </div>

            <div className="mb-4 space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Age:</span> {student.age}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(student)}
                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-medium text-sm flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(student._id)}
                className="flex-1 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium text-sm flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
