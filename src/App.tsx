import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { VeteranProvider } from './contexts/VeteranContext'
import { AlexAIProvider } from './contexts/AlexAIContext'
import { CrisisProvider } from './contexts/CrisisContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import CrisisOverlay from './components/CrisisOverlay'

// Pages
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import VeteranOnboarding from './pages/VeteranOnboarding'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import AlexChat from './pages/AlexChat'
import CrisisSupport from './pages/CrisisSupport'
import PeerSupport from './pages/PeerSupport'
import Resources from './pages/Resources'
import Profile from './pages/Profile'
import FamilySupport from './pages/FamilySupport'
import ProviderNetwork from './pages/ProviderNetwork'

// Development components
import DevBypass from './components/DevBypass'

function App() {
  return (
    <AuthProvider>
      <VeteranProvider>
        <AlexAIProvider>
          <CrisisProvider>
            <div className="min-h-screen bg-gray-50">
              <CrisisOverlay />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/crisis" element={<CrisisSupport />} />

                {/* Development routes */}
                <Route path="/dev" element={<DevBypass />} />
                <Route path="/dev/dashboard" element={<Dashboard />} />
                <Route path="/dev/alex" element={<AlexChat />} />
                <Route path="/dev/assessment" element={<Assessment />} />
                
                {/* Protected routes with layout */}
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <VeteranOnboarding />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/assessment" element={
                  <ProtectedRoute>
                    <Layout>
                      <Assessment />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/alex" element={
                  <ProtectedRoute>
                    <Layout>
                      <AlexChat />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/peer-support" element={
                  <ProtectedRoute>
                    <Layout>
                      <PeerSupport />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/resources" element={
                  <ProtectedRoute>
                    <Layout>
                      <Resources />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/family" element={
                  <ProtectedRoute>
                    <Layout>
                      <FamilySupport />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/providers" element={
                  <ProtectedRoute>
                    <Layout>
                      <ProviderNetwork />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </CrisisProvider>
        </AlexAIProvider>
      </VeteranProvider>
    </AuthProvider>
  )
}

export default App
