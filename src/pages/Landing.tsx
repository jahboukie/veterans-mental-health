import { Link } from 'react-router-dom'
import { 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  UserGroupIcon,
  PhoneIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-military-gradient">
        <div className="absolute inset-0 bg-military-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <ShieldCheckIcon className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              VetSupport
            </h1>
            <p className="text-xl md:text-2xl text-military-100 mb-8 max-w-3xl mx-auto">
              Specialized mental health support designed by veterans, for veterans. 
              Your service matters. Your mental health matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="btn-primary text-lg px-8 py-4"
              >
                Get Started Today
              </Link>
              <button
                onClick={() => window.location.href = 'tel:988'}
                className="btn-crisis text-lg px-8 py-4"
              >
                <PhoneIcon className="h-5 w-5 mr-2" />
                Crisis Line: 988
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Military Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges veterans face. Our platform provides 
              culturally competent care with military-grade security and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-military">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Alex - Your AI Companion
              </h3>
              <p className="text-gray-600">
                Talk to Alex, an AI trained in military culture and trauma-informed care. 
                Available 24/7 with crisis detection and veteran-specific support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-military">
              <ShieldCheckIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Specialized Assessments
              </h3>
              <p className="text-gray-600">
                Evidence-based tools like PCL-5 and PHQ-9, designed specifically 
                for veteran mental health screening and progress tracking.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-military">
              <UserGroupIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Peer Support Network
              </h3>
              <p className="text-gray-600">
                Connect with other veterans who understand your experiences. 
                Branch-specific groups and anonymous support options available.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-military">
              <HeartIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Family Support
              </h3>
              <p className="text-gray-600">
                Resources and support for military families, spouses, and children. 
                Understanding the ripple effects of military service.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-military">
              <LockClosedIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Zero-Knowledge Privacy
              </h3>
              <p className="text-gray-600">
                Military-grade encryption with zero-knowledge architecture. 
                Your data stays private, even from us. No VA record sharing without consent.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-military">
              <CheckCircleIcon className="h-12 w-12 text-military-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Veteran Provider Network
              </h3>
              <p className="text-gray-600">
                Connect with mental health providers who specialize in veteran care 
                and understand military culture and trauma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Support Section */}
      <div className="py-16 bg-crisis-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-crisis-900 mb-4">
            Crisis Support Available 24/7
          </h2>
          <p className="text-lg text-crisis-800 mb-8">
            If you're having thoughts of suicide or are in emotional distress, 
            help is available right now. You're not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = 'tel:988'}
              className="bg-crisis-600 hover:bg-crisis-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call 988 (Press 1 for Veterans)
            </button>
            <button
              onClick={() => window.location.href = 'sms:838255'}
              className="bg-white text-crisis-600 border border-crisis-600 hover:bg-crisis-50 px-6 py-3 rounded-lg font-semibold"
            >
              Text 838255
            </button>
            <button
              onClick={() => window.open('https://www.veteranscrisisline.net/get-help-now/chat/', '_blank')}
              className="bg-white text-crisis-600 border border-crisis-600 hover:bg-crisis-50 px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-military-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">VetSupport</h3>
            <p className="text-gray-400 mb-4">
              Honoring your service by supporting your mental health journey.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link to="/auth" className="hover:text-white">Get Started</Link>
              <a href="tel:988" className="hover:text-white">Crisis Line</a>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
