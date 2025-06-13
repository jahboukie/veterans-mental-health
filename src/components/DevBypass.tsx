import { Link } from 'react-router-dom'
import { 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CodeBracketIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function DevBypass() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <CodeBracketIcon className="h-16 w-16 text-military-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Development & Demo Access
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Multiple ways to test the Veterans Mental Health Platform
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-800">
                Development Mode - Remove bypass routes before production
              </span>
            </div>
          </div>
        </div>

        {/* Demo Login Information */}
        <div className="mb-8 bg-honor-50 border border-honor-200 rounded-lg p-6">
          <h3 className="font-medium text-honor-800 mb-3 flex items-center">
            <UserIcon className="h-5 w-5 mr-2" />
            Demo Login Credentials
          </h3>
          <div className="text-sm text-honor-700 space-y-2">
            <p><strong>Email:</strong> demo.veteran@vetsupport.com</p>
            <p><strong>Password:</strong> VetSupport2024!</p>
            <p className="text-xs text-honor-600 mt-3">
              Use these credentials on the <Link to="/auth" className="underline hover:text-honor-800">authentication page</Link> to test the full authentication flow with Supabase.
            </p>
          </div>
        </div>

        {/* Access Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-military p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="h-6 w-6 text-honor-600 mr-2" />
              Demo Login (Full Auth Flow)
            </h3>
            <p className="text-gray-600 mb-4">
              Test the complete authentication system with Supabase, including onboarding and profile creation.
            </p>
            <div className="space-y-3">
              <Link
                to="/auth"
                className="block w-full text-center bg-honor-600 hover:bg-honor-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                🎯 Go to Demo Login
              </Link>
              <div className="text-xs text-gray-500">
                • Full authentication flow
                • Supabase integration
                • Veteran onboarding process
                • Profile creation and management
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-military p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CodeBracketIcon className="h-6 w-6 text-military-600 mr-2" />
              Development Bypass (No Auth)
            </h3>
            <p className="text-gray-600 mb-4">
              Skip authentication entirely and jump straight to testing features with mock data.
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Link
                  to="/dev/dashboard"
                  className="block text-center bg-military-600 hover:bg-military-700 text-white py-2 px-3 rounded text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dev/alex"
                  className="block text-center bg-military-600 hover:bg-military-700 text-white py-2 px-3 rounded text-sm font-medium"
                >
                  Alex AI Chat
                </Link>
                <Link
                  to="/dev/assessment"
                  className="block text-center bg-military-600 hover:bg-military-700 text-white py-2 px-3 rounded text-sm font-medium"
                >
                  Assessments
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                • No authentication required
                • Mock veteran data included
                • Instant access to all features
              </div>
            </div>
          </div>
        </div>

        {/* Feature Testing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-military p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-military-600 rounded-lg text-white">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dashboard
                </h3>
                <p className="text-sm text-gray-600">Veteran-specific metrics</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Test the main dashboard with veteran service information, assessment history, and quick actions.
            </p>
            <div className="space-y-2">
              <Link to="/dev/dashboard" className="block text-military-600 hover:text-military-700 text-sm">
                → Bypass Dashboard
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-military p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-honor-600 rounded-lg text-white">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Alex AI Chat
                </h3>
                <p className="text-sm text-gray-600">Military culture-aware AI</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Test the AI companion trained in military culture with crisis detection and veteran-specific support.
            </p>
            <div className="space-y-2">
              <Link to="/dev/alex" className="block text-honor-600 hover:text-honor-700 text-sm">
                → Test Alex AI
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-military p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-strength-600 rounded-lg text-white">
                <ClipboardDocumentCheckIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Assessments
                </h3>
                <p className="text-sm text-gray-600">PCL-5 & PHQ-9 tools</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Test the specialized mental health assessment tools designed for veterans with crisis detection.
            </p>
            <div className="space-y-2">
              <Link to="/dev/assessment" className="block text-strength-600 hover:text-strength-700 text-sm">
                → Test Assessments
              </Link>
            </div>
          </div>
        </div>

        {/* Mock User Profile */}
        <div className="bg-white rounded-lg shadow-military p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon className="h-6 w-6 text-military-600 mr-2" />
            Mock Veteran Profile (Bypass Routes)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Service Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">Army</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rank:</span>
                  <span className="font-medium">SSG (Staff Sergeant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Years:</span>
                  <span className="font-medium">2015 - 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deployments:</span>
                  <span className="font-medium">2 (Afghanistan, Iraq)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Assessment History</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last PCL-5:</span>
                  <span className="font-medium text-yellow-600">35/80 (Moderate)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last PHQ-9:</span>
                  <span className="font-medium text-yellow-600">12/27 (Moderate)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Moderate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Notes */}
        <div className="bg-military-50 border border-military-200 rounded-lg p-6">
          <h3 className="font-medium text-military-800 mb-3 flex items-center">
            <HeartIcon className="h-5 w-5 mr-2" />
            Development Notes
          </h3>
          <div className="text-sm text-military-700 space-y-2">
            <p>• <strong>Demo Login:</strong> Full authentication flow with Supabase integration</p>
            <p>• <strong>Bypass Routes:</strong> Skip auth entirely, use mock data for instant testing</p>
            <p>• <strong>Alex AI:</strong> Requires your Anthropic API key in .env file</p>
            <p>• <strong>Crisis Detection:</strong> All crisis intervention protocols are active</p>
            <p>• <strong>Military Theming:</strong> Complete veteran-specific styling and terminology</p>
            <p>• <strong>Security:</strong> Remember to remove /dev routes before production</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <Link
              to="/auth"
              className="btn-primary"
            >
              🎯 Try Demo Login
            </Link>
            <Link
              to="/dev/dashboard"
              className="btn-secondary"
            >
              🚀 Bypass to Dashboard
            </Link>
            <Link
              to="/dev/alex"
              className="btn-secondary"
            >
              💬 Test Alex AI Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
