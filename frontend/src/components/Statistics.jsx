export default function Statistics({ students, branches }) {
  const totalStudents = students.length
  const averageAge = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + parseInt(s.age), 0) / students.length)
    : 0
  const totalBranches = branches.length

  const branchCount = {}
  branches.forEach(branch => {
    branchCount[branch] = students.filter(s => s.branch === branch).length
  })

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 006-6V4a6 6 0 00-6-6H6a6 6 0 00-6 6v10a6 6 0 006 6z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Average Age',
      value: averageAge,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Branches',
      value: totalBranches,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    }
  ]

  return (
    <>
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-6 shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className={`${stat.textColor} text-3xl font-bold mt-2`}>{stat.value}</p>
              </div>
              <div className={`${stat.textColor} opacity-50`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Breakdown */}
      {branches.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Students by Branch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {branches.map(branch => (
              <div key={branch} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-1">{branch}</p>
                <p className="text-2xl font-bold text-blue-600">{branchCount[branch]}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalStudents > 0 ? Math.round((branchCount[branch] / totalStudents) * 100) : 0}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
