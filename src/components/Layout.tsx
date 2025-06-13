import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  BookOpenIcon,
  HeartIcon,
  UserIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useVeteran } from '../contexts/VeteranContext'
import { useCrisis } from '../contexts/CrisisContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Talk to Alex', href: '/alex', icon: ChatBubbleLeftRightIcon },
  { name: 'Assessment', href: '/assessment', icon: ClipboardDocumentCheckIcon },
  { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'Family Support', href: '/family', icon: HeartIcon },
  { name: 'Find Providers', href: '/providers', icon: ShieldCheckIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { signOut } = useAuth()
  const { profile } = useVeteran()
  const { isInCrisis, crisisLevel, callCrisisLine } = useCrisis()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Crisis Banner */}
      {isInCrisis && (
        <div className="bg-crisis-600 text-white px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {crisisLevel === 'immediate' 
                  ? 'Crisis support is available 24/7' 
                  : 'Mental health resources are available'}
              </span>
            </div>
            <button
              onClick={callCrisisLine}
              className="bg-white text-crisis-600 px-4 py-1 rounded font-semibold hover:bg-gray-100 transition-colors"
            >
              Call 988
            </button>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-military-600" />
              <span className="ml-2 text-lg font-bold text-military-900">VetSupport</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={isActive ? 'nav-link-active' : 'nav-link'}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-military-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-military-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.rank ? `${profile.rank}` : 'Veteran'}
                </p>
                <p className="text-xs text-gray-500">
                  {profile?.service_branch ? profile.service_branch.toUpperCase() : 'Service Member'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left text-sm text-gray-700 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <ShieldCheckIcon className="h-8 w-8 text-military-600" />
            <span className="ml-2 text-lg font-bold text-military-900">VetSupport</span>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={isActive ? 'nav-link-active' : 'nav-link'}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-military-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-military-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.rank ? `${profile.rank}` : 'Veteran'}
                </p>
                <p className="text-xs text-gray-500">
                  {profile?.service_branch ? profile.service_branch.toUpperCase() : 'Service Member'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left text-sm text-gray-700 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-2 lg:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Crisis hotline button */}
              <button
                onClick={callCrisisLine}
                className="flex items-center px-3 py-2 text-sm font-medium text-crisis-600 hover:text-crisis-700 border border-crisis-200 rounded-lg hover:bg-crisis-50 transition-colors"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                Crisis Line: 988
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
