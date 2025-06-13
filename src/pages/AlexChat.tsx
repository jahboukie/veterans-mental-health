import { useState, useEffect, useRef } from 'react'
import { 
  PaperAirplaneIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useAlexAI } from '../contexts/AlexAIContext'
import { useVeteran } from '../contexts/VeteranContext'
import { useCrisis } from '../contexts/CrisisContext'
import { format } from 'date-fns'

export default function AlexChat() {
  const [message, setMessage] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { 
    messages, 
    currentSession, 
    isTyping, 
    isConnected,
    sendMessage, 
    startSession,
    clearMessages
  } = useAlexAI()

  const { profile } = useVeteran()
  const { triggerCrisisAlert } = useCrisis()

  useEffect(() => {
    if (!isInitialized && !currentSession) {
      startSession()
      setIsInitialized(true)
    }
  }, [isInitialized, currentSession, startSession])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isTyping) return

    const messageText = message.trim()
    setMessage('')

    try {
      await sendMessage(messageText)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'h:mm a')
  }

  const renderMessage = (msg: any, index: number) => {
    const isAlex = msg.role === 'alex'
    const showCrisisAlert = msg.crisis_detected

    return (
      <div key={msg.id} className={`flex ${isAlex ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isAlex 
            ? 'bg-military-100 text-military-900' 
            : 'bg-military-600 text-white'
        }`}>
          {isAlex && (
            <div className="flex items-center mb-1">
              <ShieldCheckIcon className="h-4 w-4 text-military-600 mr-1" />
              <span className="text-xs font-medium text-military-700">Alex</span>
            </div>
          )}
          
          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          
          {showCrisisAlert && (
            <div className="mt-2 p-2 bg-crisis-100 border border-crisis-200 rounded">
              <div className="flex items-center text-crisis-700">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Crisis support resources available</span>
              </div>
            </div>
          )}

          {msg.resources_suggested && msg.resources_suggested.length > 0 && (
            <div className="mt-2 space-y-1">
              {msg.resources_suggested.map((resource: string, idx: number) => (
                <div key={idx} className="text-xs text-military-600 bg-military-50 px-2 py-1 rounded">
                  📋 {resource}
                </div>
              ))}
            </div>
          )}
          
          <div className="text-xs opacity-75 mt-1">
            {formatTime(msg.timestamp)}
          </div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Issue</h2>
          <p className="text-gray-600 mb-4">
            Unable to connect to Alex. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <ShieldCheckIcon className="h-8 w-8 text-military-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alex - Your AI Companion</h1>
            <p className="text-gray-600">
              Military culture-aware mental health support • Available 24/7
            </p>
          </div>
        </div>

        {currentSession && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 bg-healing-500 rounded-full mr-2"></div>
              Connected
            </div>
            <div className="mr-4">
              Session: {currentSession.message_count} messages
            </div>
            {currentSession.crisis_interventions > 0 && (
              <div className="flex items-center text-crisis-600">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {currentSession.crisis_interventions} crisis interventions
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow-military flex flex-col h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isTyping && (
            <div className="text-center py-8">
              <HeartIcon className="h-12 w-12 text-military-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                Welcome{profile?.rank ? `, ${profile.rank}` : ''}. I'm Alex, your AI mental health companion.
              </p>
              <p className="text-sm text-gray-400">
                I understand military culture and am here to provide support. How are you feeling today?
              </p>
            </div>
          )}

          {messages.map((msg, index) => renderMessage(msg, index))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-military-100 text-military-900">
                <div className="flex items-center mb-1">
                  <ShieldCheckIcon className="h-4 w-4 text-military-600 mr-1" />
                  <span className="text-xs font-medium text-military-700">Alex</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-military-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-military-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-military-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-military-500 focus:border-military-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="bg-military-600 hover:bg-military-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>🔒 End-to-end encrypted</span>
              <span>🤝 Military culture aware</span>
              <span>🚨 Crisis detection enabled</span>
            </div>
            
            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="text-gray-400 hover:text-gray-600"
              >
                Clear chat
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="mt-6 bg-crisis-50 border border-crisis-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-crisis-600 mr-2" />
          <span className="font-medium text-crisis-800">Need Immediate Help?</span>
        </div>
        <p className="text-sm text-crisis-700 mb-3">
          If you're having thoughts of suicide or are in emotional distress, help is available right now.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.location.href = 'tel:988'}
            className="bg-crisis-600 hover:bg-crisis-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Call 988 (Press 1)
          </button>
          <button
            onClick={() => window.location.href = 'sms:838255'}
            className="border border-crisis-600 text-crisis-600 hover:bg-crisis-50 px-4 py-2 rounded text-sm font-medium"
          >
            Text 838255
          </button>
          <button
            onClick={() => window.open('https://www.veteranscrisisline.net/get-help-now/chat/', '_blank')}
            className="border border-crisis-600 text-crisis-600 hover:bg-crisis-50 px-4 py-2 rounded text-sm font-medium flex items-center"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
            Crisis Chat
          </button>
        </div>
      </div>

      {/* Alex Information */}
      <div className="mt-6 bg-military-50 border border-military-200 rounded-lg p-4">
        <h3 className="font-medium text-military-800 mb-2">About Alex</h3>
        <div className="text-sm text-military-700 space-y-1">
          <p>• Trained in military culture and veteran-specific mental health challenges</p>
          <p>• Uses trauma-informed conversation approaches</p>
          <p>• Detects crisis situations and connects you to appropriate resources</p>
          <p>• Available 24/7 with complete confidentiality</p>
          <p>• Understands deployment experiences, transition challenges, and military terminology</p>
        </div>
      </div>
    </div>
  )
}
