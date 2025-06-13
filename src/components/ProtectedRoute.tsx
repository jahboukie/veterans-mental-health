import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useVeteran } from '../contexts/VeteranContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireOnboarding?: boolean
}

export default function ProtectedRoute({ 
  children, 
  requireOnboarding = true 
}: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useVeteran()
  const location = useLocation()

  // Show loading while checking authentication
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-military-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Redirect to onboarding if required and not completed
  if (requireOnboarding && profile && !profile.onboarding_completed && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  // Redirect to dashboard if trying to access onboarding when already completed
  if (location.pathname === '/onboarding' && profile?.onboarding_completed) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
