import { UserGroupIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PeerSupport() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <UserGroupIcon className="h-12 w-12 text-military-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Support Network</h1>
        <p className="text-gray-600">
          Connect with fellow veterans who understand your experiences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-military p-8 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-6">
          We're building a secure peer support network where veterans can connect, 
          share experiences, and support each other through their mental health journeys.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• Branch-specific support groups</p>
          <p>• Anonymous chat options</p>
          <p>• Moderated discussions</p>
          <p>• Crisis intervention protocols</p>
        </div>
      </div>
    </div>
  )
}
