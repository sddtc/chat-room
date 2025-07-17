import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'

import { useAuthStore } from './stores/useAuthStore'
import { useThemeStore } from './stores/useThemeStore'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="default-background">
        <Loader className="loader" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App