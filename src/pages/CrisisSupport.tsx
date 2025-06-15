import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const CRISIS_RESOURCES = [
  {
    id: 'vac-crisis-line',
    name: 'Veterans Affairs Canada Crisis Line',
    phone: '1-800-268-7708',
    extension: '',
    text: '',
    website: 'https://www.veterans.gc.ca',
    description: 'Free, confidential 24/7 crisis support for Canadian Veterans and their families.',
    available: '24/7',
    veteran_specific: true,
    features: ['Crisis counseling', 'Suicide prevention', 'Family support', 'Canadian VAC services']
  },
  {
    id: 'canada-suicide-prevention',
    name: 'Canada Suicide Prevention Service',
    phone: '1-833-456-4566',
    description: 'National suicide prevention service available to all Canadians.',
    available: '24/7',
    veteran_specific: false,
    features: ['Crisis counseling', 'Suicide prevention', 'Text support', 'Available in French']
  },
  {
    id: 'osiss-support',
    name: 'OSISS (Operational Stress Injury Social Support)',
    phone: '1-800-883-6094',
    website: 'https://www.veterans.gc.ca/eng/health-support/mental-health-wellness/understand-mental-health/osiss',
    description: 'Peer support network for Canadian military members, veterans, and their families.',
    available: 'Varies by location',
    veteran_specific: true,
    features: ['Peer support', 'Family programs', 'Group sessions', 'Professional referrals']
  },
  {
    id: 'emergency-services',
    name: 'Emergency Services',
    phone: '911',
    description: 'Immediate emergency response for life-threatening situations.',
    available: '24/7',
    veteran_specific: false,
    features: ['Emergency response', 'Paramedics', 'Police', 'Fire services']
  }
]

const IMMEDIATE_ACTIONS = [
  {
    title: 'Call VAC Crisis Line',
    subtitle: '1-800-268-7708',
    description: 'Speak with a trained crisis counselor who understands Canadian military culture',
    action: () => window.location.href = 'tel:1-800-268-7708',
    color: 'bg-crisis-600 hover:bg-crisis-700',
    icon: PhoneIcon
  },
  {
    title: 'Call 911',
    subtitle: 'Emergency Services',
    description: 'For immediate life-threatening emergencies',
    action: () => window.location.href = 'tel:911',
    color: 'bg-red-600 hover:bg-red-700',
    icon: PhoneIcon
  },
  {
    title: 'Canada Suicide Prevention',
    subtitle: '1-833-456-4566',
    description: 'National crisis line available 24/7 in English and French',
    action: () => window.location.href = 'tel:1-833-456-4566',
    color: 'bg-honor-600 hover:bg-honor-700',
    icon: PhoneIcon
  }
]

const SAFETY_PLANNING = [
  {
    step: 1,
    title: 'Recognize Warning Signs',
    description: 'Identify thoughts, feelings, or situations that might lead to a crisis',
    examples: ['Feeling hopeless', 'Increased substance use', 'Social isolation', 'Anniversary dates']
  },
  {
    step: 2,
    title: 'Use Coping Strategies',
    description: 'Activities you can do on your own to help you feel better',
    examples: ['Deep breathing', 'Physical exercise', 'Listen to music', 'Talk to Alex AI']
  },
  {
    step: 3,
    title: 'Contact Support People',
    description: 'People who can help distract you and provide support',
    examples: ['Battle buddy', 'Family member', 'Trusted friend', 'Chaplain']
  },
  {
    step: 4,
    title: 'Contact Professionals',
    description: 'Mental health professionals or agencies to contact during a crisis',
    examples: ['VAC Crisis Line', 'Canadian Mental Health', 'Local emergency services']
  },
  {
    step: 5,
    title: 'Make Environment Safe',
    description: 'Remove or limit access to lethal means',
    examples: ['Secure firearms', 'Remove medications', 'Ask someone to stay with you']
  }
]

export default function CrisisSupport() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-crisis-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Crisis Support</h1>
            <p className="text-xl text-crisis-100 mb-8 max-w-3xl mx-auto">
              If you're having thoughts of suicide or are in emotional distress, 
              you're not alone. Help is available right now.
            </p>
            <div className="bg-crisis-700 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-medium mb-2">🍁 For Canadian Veterans in Crisis</p>
              <p className="text-crisis-100">
                Veterans Affairs Canada Crisis Line connects you with caring, qualified responders 
                who understand Canadian military culture and veteran experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Help Right Now</h2>
          <p className="text-xl text-gray-600">
            These resources are available 24/7 and specifically trained to help veterans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {IMMEDIATE_ACTIONS.map((action, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-lg font-medium text-gray-700 mb-2">{action.subtitle}</p>
              <p className="text-gray-600 mb-6">{action.description}</p>
              <button
                onClick={action.action}
                className={`w-full ${action.color} text-white py-3 px-6 rounded-lg font-semibold transition-colors`}
              >
                {action.title}
              </button>
            </div>
          ))}
        </div>

        {/* Crisis Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Crisis Resources</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {CRISIS_RESOURCES.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-military p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{resource.name}</h3>
                    {resource.veteran_specific && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-military-100 text-military-800">
                        <ShieldCheckIcon className="h-3 w-3 mr-1" />
                        Veteran Specific
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {resource.available}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{resource.description}</p>

                <div className="space-y-3 mb-4">
                  {resource.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">{resource.phone}</span>
                      {resource.extension && (
                        <span className="ml-2 text-sm text-gray-500">({resource.extension})</span>
                      )}
                    </div>
                  )}

                  {resource.text && (
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span>Text: {resource.text}</span>
                    </div>
                  )}

                  {resource.website && (
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-3 text-gray-400">🌐</span>
                      <a 
                        href={resource.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-military-600 hover:text-military-700 underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Planning */}
        <div className="bg-white rounded-lg shadow-military p-8">
          <div className="text-center mb-8">
            <HeartIcon className="h-12 w-12 text-healing-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Planning</h2>
            <p className="text-xl text-gray-600">
              A safety plan is a personalized, practical plan to help you stay safe during a crisis
            </p>
          </div>

          <div className="space-y-6">
            {SAFETY_PLANNING.map((step) => (
              <div key={step.step} className="flex">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-military-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.examples.map((example, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-military-50 text-military-700 text-sm rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-healing-50 border border-healing-200 rounded-lg">
            <div className="flex items-center mb-3">
              <UserGroupIcon className="h-6 w-6 text-healing-600 mr-2" />
              <h3 className="text-lg font-semibold text-healing-800">Need Help Creating Your Safety Plan?</h3>
            </div>
            <p className="text-healing-700 mb-4">
              Talk to Alex, your AI companion, or connect with a mental health professional 
              to create a personalized safety plan that works for you.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.location.href = '/alex'}
                className="bg-healing-600 hover:bg-healing-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Talk to Alex
              </button>
              <button
                onClick={() => window.location.href = '/providers'}
                className="border border-healing-600 text-healing-600 hover:bg-healing-50 px-4 py-2 rounded-lg font-medium"
              >
                Find a Provider
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mt-16 bg-crisis-50 border border-crisis-200 rounded-lg p-6">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-crisis-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-crisis-800 mb-2">Emergency Situations</h3>
            <p className="text-crisis-700 mb-4">
              If you or someone you know is in immediate danger, call 911 or go to your nearest emergency room.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = 'tel:911'}
                className="bg-crisis-600 hover:bg-crisis-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Call 911
              </button>
              <button
                onClick={() => window.open('https://www.google.com/maps/search/emergency+room+near+me', '_blank')}
                className="border border-crisis-600 text-crisis-600 hover:bg-crisis-50 px-6 py-2 rounded-lg font-semibold flex items-center"
              >
                <MapPinIcon className="h-4 w-4 mr-2" />
                Find ER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
