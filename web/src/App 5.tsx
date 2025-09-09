import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { Lesson } from './pages/Lesson'
import { FinalProject } from './pages/FinalProject'
import { Dashboard } from './pages/Dashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { AuthProvider } from './hooks/useAuth'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NotificationProvider } from './components/NotificationSystem'

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/lessons/:id" element={<Lesson />} />
                  <Route path="/final-project" element={<FinalProject />} />
                </Routes>
              </main>
            </div>
          </div>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
  )
}

export default App 