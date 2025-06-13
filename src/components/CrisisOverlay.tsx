import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  ExclamationTriangleIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'
import { useCrisis } from '../contexts/CrisisContext'

export default function CrisisOverlay() {
  const { 
    showCrisisOverlay, 
    activeAlerts, 
    crisisLevel,
    dismissCrisisOverlay,
    callCrisisLine,
    textCrisisLine,
    connectToChat,
    acknowledgeCrisisAlert
  } = useCrisis()

  const latestAlert = activeAlerts.find(alert => !alert.acknowledged)

  if (!showCrisisOverlay || !latestAlert) {
    return null
  }

  const isImmediate = crisisLevel === 'immediate'

  return (
    <Transition appear show={showCrisisOverlay} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon 
                      className={`h-8 w-8 mr-3 ${
                        isImmediate ? 'text-crisis-600 animate-pulse' : 'text-yellow-500'
                      }`} 
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {isImmediate ? 'Crisis Support Available' : 'Mental Health Resources'}
                    </Dialog.Title>
                  </div>
                  {!isImmediate && (
                    <button
                      onClick={dismissCrisisOverlay}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">
                    {latestAlert.message}
                  </p>

                  {isImmediate && (
                    <div className="bg-crisis-50 border border-crisis-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-crisis-800 font-medium mb-2">
                        🇺🇸 You're not alone. Help is available 24/7 for veterans.
                      </p>
                      <p className="text-xs text-crisis-700">
                        The Veterans Crisis Line connects you with caring, qualified responders who understand military culture and veteran experiences.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        callCrisisLine()
                        acknowledgeCrisisAlert(latestAlert.id)
                      }}
                      className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white ${
                        isImmediate 
                          ? 'bg-crisis-600 hover:bg-crisis-700 animate-pulse-slow' 
                          : 'bg-military-600 hover:bg-military-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crisis-500`}
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      Call Veterans Crisis Line: 988
                    </button>

                    <button
                      onClick={() => {
                        textCrisisLine()
                        acknowledgeCrisisAlert(latestAlert.id)
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-military-500"
                    >
                      Text: 838255
                    </button>

                    <button
                      onClick={() => {
                        connectToChat()
                        acknowledgeCrisisAlert(latestAlert.id)
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-military-500"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                      Start Confidential Chat
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      All conversations are confidential. Your privacy is protected.
                    </p>
                  </div>

                  {!isImmediate && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          acknowledgeCrisisAlert(latestAlert.id)
                          dismissCrisisOverlay()
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        I understand, continue to app
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
