import React, { createContext, useContext, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { useVeteran } from './VeteranContext'
import axios from 'axios'

export interface ChatMessage {
  id: string
  role: 'user' | 'alex'
  content: string
  timestamp: string
  crisis_detected?: boolean
  assessment_triggered?: boolean
  resources_suggested?: string[]
}

export interface AlexSession {
  id: string
  started_at: string
  ended_at?: string
  message_count: number
  crisis_interventions: number
  mood_assessment?: 'positive' | 'neutral' | 'concerning' | 'crisis'
}

interface AlexAIContextType {
  messages: ChatMessage[]
  currentSession: AlexSession | null
  isTyping: boolean
  isConnected: boolean
  sendMessage: (content: string) => Promise<void>
  startSession: () => Promise<void>
  endSession: () => Promise<void>
  clearMessages: () => void
  triggerCrisisProtocol: () => void
}

const AlexAIContext = createContext<AlexAIContextType | undefined>(undefined)

export function useAlexAI() {
  const context = useContext(AlexAIContext)
  if (context === undefined) {
    throw new Error('useAlexAI must be used within an AlexAIProvider')
  }
  return context
}

export function AlexAIProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { profile } = useVeteran()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentSession, setCurrentSession] = useState<AlexSession | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)

  const alexEndpoint = import.meta.env.VITE_ALEX_AI_ENDPOINT || 'http://localhost:3003/api/alex'

  const generateContextualResponse = (message: string): string => {
    // Greeting patterns
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      if (message.includes('how are you') || message.includes('how\'s it going')) {
        return `Hello! I'm doing well, thank you for asking. I'm here and ready to support you. How are you doing today? What's on your mind?`
      }
      return `Hello! It's good to connect with you. I'm Alex, and I'm here to provide support and understanding. What would you like to talk about today?`
    }

    // Questions about Alex
    if (message.includes('who are you') || message.includes('what are you') || message.includes('tell me about yourself')) {
      return `I'm Alex, an AI mental health companion specifically designed to understand military culture and veteran experiences. I'm trained to recognize the unique challenges that come with military service - from deployment stress to civilian transition difficulties. I'm here to listen, provide support, and help connect you with resources when needed. What brings you here today?`
    }

    // Gratitude or thanks
    if (message.includes('thank you') || message.includes('thanks')) {
      return `You're very welcome. It's an honor to support someone who has served our country. Remember, seeking help and talking about your experiences takes courage - that's the same strength that got you through your service. Is there anything else you'd like to discuss?`
    }

    // General conversation starters
    if (message.includes('how are you') && !message.includes('hello')) {
      return `I'm here and ready to support you - that's what matters most to me. More importantly, how are you doing? I'm interested in hearing about what's going on in your life right now.`
    }

    // Military-related topics
    if (message.includes('military') || message.includes('service') || message.includes('army') || message.includes('navy') || message.includes('marines') || message.includes('air force')) {
      return `I understand that military service shapes who you are in profound ways. The experiences, the bonds, the challenges - they all become part of your identity. What aspect of your military experience would you like to talk about?`
    }

    // Transition topics
    if (message.includes('civilian') || message.includes('transition') || message.includes('getting out')) {
      return `The transition from military to civilian life can be one of the most challenging experiences a veteran faces. You're going from a highly structured, mission-focused environment to something completely different. It's normal to feel lost or frustrated during this time. What's been the most difficult part of your transition?`
    }

    // Sleep issues
    if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
      return `Sleep issues are incredibly common among veterans. Your mind and body went through a lot during service, and sometimes it takes time to learn how to truly rest again. Have you noticed any patterns with your sleep difficulties? Are there specific things that keep you awake?`
    }

    // General support for unclear messages
    return `I hear you, and I want to make sure I understand what you're going through. Military service creates unique experiences and perspectives. Could you tell me a bit more about what's on your mind? I'm here to listen and support you however I can.`
  }

  const generateAlexResponse = useCallback(async (userMessage: string, context: any): Promise<ChatMessage> => {
    // This would integrate with your AI service
    // For now, we'll simulate Alex's responses based on veteran context
    
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself']
    const ptsdKeywords = ['flashback', 'nightmare', 'triggered', 'combat', 'deployment']
    const anxietyKeywords = ['panic', 'anxiety', 'worried', 'scared', 'nervous']
    
    const isCrisis = crisisKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    )
    
    const isPTSD = ptsdKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    )
    
    const isAnxiety = anxietyKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    )

    let response = ''
    let crisisDetected = false
    let resourcesSuggested: string[] = []

    if (isCrisis) {
      crisisDetected = true
      response = `I'm really concerned about what you're sharing with me. Your life has value, and there are people who want to help. I want to connect you with immediate support right now. 

The Veterans Crisis Line is available 24/7 at 988 (Press 1) or text 838255. They have specially trained counselors who understand military experiences.

You're not alone in this. Many veterans have felt this way and found their way through. Can you tell me if you're in a safe place right now?`
      
      resourcesSuggested = ['Veterans Crisis Line: 988 Press 1', 'Crisis Text: 838255', 'Emergency: 911']
    } else if (isPTSD) {
      response = `Thank you for sharing that with me. PTSD symptoms like ${isPTSD ? 'flashbacks and nightmares' : 'what you\'re experiencing'} are common responses to combat trauma. Your brain is trying to process experiences that were overwhelming.

This doesn't mean you're broken or weak - it means you're human and you've been through something significant. There are evidence-based treatments like CPT and EMDR that have helped many veterans find relief.

What's been the most challenging part of dealing with these symptoms?`
      
      resourcesSuggested = ['VA PTSD Treatment Locator', 'Vet Centers', 'PTSD Coach App']
    } else if (isAnxiety) {
      response = `Anxiety after military service is very common. The hypervigilance that kept you safe in service can sometimes stick around when you don't need it anymore. 

Some veterans find breathing exercises, grounding techniques, or progressive muscle relaxation helpful. The key is finding what works for you.

Have you noticed any particular triggers that tend to increase your anxiety?`
      
      resourcesSuggested = ['Mindfulness Apps', 'VA Mental Health Services', 'Breathing Exercises']
    } else {
      // Intelligent response based on message content
      response = generateContextualResponse(userMessage.toLowerCase())
    }

    return {
      id: Date.now().toString(),
      role: 'alex',
      content: response,
      timestamp: new Date().toISOString(),
      crisis_detected: crisisDetected,
      resources_suggested: resourcesSuggested.length > 0 ? resourcesSuggested : undefined
    }
  }, [])

  const sendMessage = async (content: string) => {
    // Allow chat in development mode even without authentication
    const isDevelopmentMode = window.location.pathname.startsWith('/dev')
    if (!isDevelopmentMode && (!user || !currentSession)) return
    if (isDevelopmentMode && !currentSession) {
      await startSession()
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

      const alexResponse = await generateAlexResponse(content, {
        profile,
        sessionHistory: messages,
        currentSession
      })

      setMessages(prev => [...prev, alexResponse])

      // Update session
      setCurrentSession(prev => prev ? {
        ...prev,
        message_count: prev.message_count + 2,
        crisis_interventions: prev.crisis_interventions + (alexResponse.crisis_detected ? 1 : 0)
      } : null)

      // Trigger crisis protocol if needed
      if (alexResponse.crisis_detected) {
        triggerCrisisProtocol()
      }

    } catch (error) {
      console.error('Error sending message to Alex:', error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'alex',
        content: 'I\'m having trouble connecting right now. If this is an emergency, please call 988 (Press 1) for the Veterans Crisis Line or 911 for immediate help.',
        timestamp: new Date().toISOString(),
        crisis_detected: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const startSession = async () => {
    // Allow session start in development mode even without authentication
    const isDevelopmentMode = window.location.pathname.startsWith('/dev')
    if (!isDevelopmentMode && !user) return

    const session: AlexSession = {
      id: Date.now().toString(),
      started_at: new Date().toISOString(),
      message_count: 0,
      crisis_interventions: 0
    }

    setCurrentSession(session)

    // Alex's greeting message
    const mockRank = isDevelopmentMode ? 'SSG' : null
    const displayRank = profile?.rank || mockRank

    const greeting: ChatMessage = {
      id: Date.now().toString(),
      role: 'alex',
      content: `Hello${displayRank ? ` ${displayRank}` : ''}. I'm Alex, your AI mental health companion. I'm here to provide support and understanding as someone who gets military culture and the unique challenges veterans face.

This is a safe, confidential space where you can share what's on your mind. Whether you're dealing with transition challenges, stress, or just need someone to talk to - I'm here to listen and help.

How are you doing today?`,
      timestamp: new Date().toISOString()
    }

    setMessages([greeting])
  }

  const endSession = async () => {
    if (!currentSession) return

    setCurrentSession(prev => prev ? {
      ...prev,
      ended_at: new Date().toISOString()
    } : null)

    // Save session data if needed
    // await saveSessionData(currentSession)
  }

  const clearMessages = () => {
    setMessages([])
    setCurrentSession(null)
  }

  const triggerCrisisProtocol = () => {
    // This would trigger crisis intervention protocols
    // For now, we'll just log it
    console.log('Crisis protocol triggered - connecting to Veterans Crisis Line')
    
    // In a real implementation, this might:
    // - Show crisis resources overlay
    // - Automatically dial crisis line
    // - Alert emergency contacts
    // - Connect to live crisis counselor
  }

  const value = {
    messages,
    currentSession,
    isTyping,
    isConnected,
    sendMessage,
    startSession,
    endSession,
    clearMessages,
    triggerCrisisProtocol,
  }

  return (
    <AlexAIContext.Provider value={value}>
      {children}
    </AlexAIContext.Provider>
  )
}
