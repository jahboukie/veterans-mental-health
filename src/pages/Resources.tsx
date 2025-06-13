import { BookOpenIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <BookOpenIcon className="h-12 w-12 text-military-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Veteran Resources</h1>
        <p className="text-gray-600">
          Comprehensive mental health resources designed for veterans
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-military p-8 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-6">
          We're curating a comprehensive library of veteran-specific mental health resources.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• PTSD education and coping strategies</p>
          <p>• Transition support materials</p>
          <p>• Family and relationship resources</p>
          <p>• Career and education guidance</p>
        </div>
      </div>
    </div>
  )
}
