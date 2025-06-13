import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CalendarIcon,
  TrendingUpIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useVeteran } from '../contexts/VeteranContext'
import { useCrisis } from '../contexts/CrisisContext'
import { useAlexAI } from '../contexts/AlexAIContext'

export default function Dashboard() {
  const { user } = useAuth()
  const { profile, assessments } = useVeteran()
  const { isInCrisis, crisisLevel } = useCrisis()
  const { currentSession } = useAlexAI()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Good morning')
    } else if (hour < 17) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }, [])

  const latestAssessment = assessments?.[0]
  const daysSinceLastAssessment = latestAssessment 
    ? Math.floor((Date.now() - new Date(latestAssessment.assessment_date).getTime()) / (1000 * 60 * 60 * 24))
    : null

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-healing-600 bg-healing-50 border-healing-200'
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'crisis': return 'text-crisis-600 bg-crisis-50 border-crisis-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const quickActions = [
    {
      name: 'Talk to Alex',
      description: 'Chat with your AI companion',
      href: '/alex',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-military-600 hover:bg-military-700'
    },
    {
      name: 'Take Assessment',
      description: 'Check your mental health status',
      href: '/assessment',
      icon: ClipboardDocumentCheckIcon,
      color: 'bg-honor-600 hover:bg-honor-700'
    },
    {
      name: 'Peer Support',
      description: 'Connect with other veterans',
      href: '/peer-support',
      icon: UserGroupIcon,
      color: 'bg-strength-600 hover:bg-strength-700'
    },
    {
      name: 'Family Resources',
      description: 'Support for your family',
      href: '/family',
      icon: HeartIcon,
      color: 'bg-healing-600 hover:bg-healing-700'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {greeting}, {profile?.rank || 'Service Member'}
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome to your VetSupport dashboard. How are you feeling today?
        </p>
      </div>

      {/* Crisis Alert */}
      {isInCrisis && (
        <div className="mb-8 bg-crisis-50 border border-crisis-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-crisis-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-crisis-800">
                Crisis Support Available
              </h3>
              <p className="text-crisis-700 mt-1">
                We've detected you may need immediate support. Help is available 24/7.
              </p>
            </div>
            <Link
              to="/crisis"
              className="bg-crisis-600 hover:bg-crisis-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Get Help Now
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group relative bg-white p-6 rounded-lg shadow-military hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-military-600">
                        {action.name}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-military p-6">
              <div className="space-y-4">
                {currentSession && (
                  <div className="flex items-center p-3 bg-military-50 rounded-lg">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-military-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Active Alex session
                      </p>
                      <p className="text-xs text-gray-600">
                        {currentSession.message_count} messages exchanged
                      </p>
                    </div>
                    <Link
                      to="/alex"
                      className="text-sm text-military-600 hover:text-military-700 font-medium"
                    >
                      Continue
                    </Link>
                  </div>
                )}

                {latestAssessment && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Last assessment completed
                      </p>
                      <p className="text-xs text-gray-600">
                        {daysSinceLastAssessment} days ago
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(latestAssessment.risk_level)}`}>
                      {latestAssessment.risk_level}
                    </span>
                  </div>
                )}

                {!currentSession && !latestAssessment && (
                  <div className="text-center py-8 text-gray-500">
                    <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activity. Start by talking to Alex or taking an assessment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mental Health Status */}
          <div className="bg-white rounded-lg shadow-military p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mental Health Status</h3>
            
            {latestAssessment ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Risk Level</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getRiskLevelColor(latestAssessment.risk_level)}`}>
                    {latestAssessment.risk_level.charAt(0).toUpperCase() + latestAssessment.risk_level.slice(1)}
                  </span>
                </div>

                {latestAssessment.pcl5_score && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">PCL-5 Score</span>
                    <span className="text-sm font-medium">{latestAssessment.pcl5_score}/80</span>
                  </div>
                )}

                {latestAssessment.phq9_score && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">PHQ-9 Score</span>
                    <span className="text-sm font-medium">{latestAssessment.phq9_score}/27</span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/assessment"
                    className="w-full btn-secondary text-center block"
                  >
                    Take New Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <ClipboardDocumentCheckIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm text-gray-600 mb-4">
                  No assessments completed yet. Take your first assessment to track your mental health.
                </p>
                <Link
                  to="/assessment"
                  className="btn-primary w-full"
                >
                  Take Assessment
                </Link>
              </div>
            )}
          </div>

          {/* Service Information */}
          <div className="bg-white rounded-lg shadow-military p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Service Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Branch</span>
                <span className="text-sm font-medium">
                  {profile?.service_branch?.toUpperCase() || 'Not specified'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rank</span>
                <span className="text-sm font-medium">
                  {profile?.rank || 'Not specified'}
                </span>
              </div>

              {profile?.service_years && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Service Years</span>
                  <span className="text-sm font-medium">
                    {profile.service_years.start} - {profile.service_years.end || 'Present'}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4">
              <Link
                to="/profile"
                className="text-sm text-military-600 hover:text-military-700 font-medium"
              >
                Update Profile →
              </Link>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="bg-crisis-50 border border-crisis-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-crisis-800 mb-4">Crisis Resources</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = 'tel:988'}
                className="w-full flex items-center justify-center px-4 py-2 bg-crisis-600 hover:bg-crisis-700 text-white rounded-lg font-medium"
              >
                Call 988
              </button>

              <button
                onClick={() => window.location.href = 'sms:838255'}
                className="w-full flex items-center justify-center px-4 py-2 border border-crisis-600 text-crisis-600 hover:bg-crisis-50 rounded-lg font-medium"
              >
                Text 838255
              </button>

              <Link
                to="/crisis"
                className="block text-center text-sm text-crisis-600 hover:text-crisis-700 font-medium"
              >
                View All Resources →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
