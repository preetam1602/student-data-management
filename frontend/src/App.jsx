import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
