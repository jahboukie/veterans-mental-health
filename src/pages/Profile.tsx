import { UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <UserIcon className="h-12 w-12 text-military-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your veteran profile and privacy settings
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-military p-8 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-6">
          Profile management features are being developed.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• Update service information</p>
          <p>• Manage privacy settings</p>
          <p>• Emergency contact management</p>
          <p>• Assessment history</p>
        </div>
      </div>
    </div>
  )
}
