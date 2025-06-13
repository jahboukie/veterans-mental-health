import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useVeteran } from './VeteranContext'

export interface CrisisResource {
  id: string
  name: string
  phone: string
  text?: string
  website?: string
  description: string
  available_24_7: boolean
  veteran_specific: boolean
  type: 'crisis' | 'support' | 'emergency' | 'text' | 'chat'
}

export interface CrisisAlert {
  id: string
  level: 'low' | 'moderate' | 'high' | 'immediate'
  message: string
  timestamp: string
  acknowledged: boolean
  resources: CrisisResource[]
}

interface CrisisContextType {
  isInCrisis: boolean
  crisisLevel: 'none' | 'low' | 'moderate' | 'high' | 'immediate'
  activeAlerts: CrisisAlert[]
  crisisResources: CrisisResource[]
  showCrisisOverlay: boolean
  triggerCrisisAlert: (level: CrisisAlert['level'], message: string) => void
  acknowledgeCrisisAlert: (alertId: string) => void
  dismissCrisisOverlay: () => void
  callCrisisLine: () => void
  textCrisisLine: () => void
  connectToChat: () => void
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined)

export function useCrisis() {
  const context = useContext(CrisisContext)
  if (context === undefined) {
    throw new Error('useCrisis must be used within a CrisisProvider')
  }
  return context
}

const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: 'veterans-crisis-line',
    name: 'Veterans Crisis Line',
    phone: '988',
    text: '838255',
    website: 'https://www.veteranscrisisline.net/',
    description: 'Free, confidential support for veterans in crisis and their families and friends',
    available_24_7: true,
    veteran_specific: true,
    type: 'crisis'
  },
  {
    id: 'national-suicide-prevention',
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    website: 'https://suicidepreventionlifeline.org/',
    description: 'Free and confidential emotional support to people in suicidal crisis',
    available_24_7: true,
    veteran_specific: false,
    type: 'crisis'
  },
  {
    id: 'crisis-text-line',
    name: 'Crisis Text Line',
    phone: '',
    text: '741741',
    website: 'https://www.crisistextline.org/',
    description: 'Free, 24/7 support for those in crisis via text',
    available_24_7: true,
    veteran_specific: false,
    type: 'text'
  },
  {
    id: 'emergency-services',
    name: 'Emergency Services',
    phone: '911',
    description: 'Immediate emergency response for life-threatening situations',
    available_24_7: true,
    veteran_specific: false,
    type: 'emergency'
  },
  {
    id: 'va-mental-health',
    name: 'VA Mental Health Services',
    phone: '1-877-222-8387',
    website: 'https://www.mentalhealth.va.gov/',
    description: 'VA mental health services and support',
    available_24_7: false,
    veteran_specific: true,
    type: 'support'
  }
]

export function CrisisProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { profile } = useVeteran()
  const [isInCrisis, setIsInCrisis] = useState(false)
  const [crisisLevel, setCrisisLevel] = useState<'none' | 'low' | 'moderate' | 'high' | 'immediate'>('none')
  const [activeAlerts, setActiveAlerts] = useState<CrisisAlert[]>([])
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false)

  // Monitor for crisis indicators
  useEffect(() => {
    if (profile?.risk_level) {
      switch (profile.risk_level) {
        case 'crisis':
          setCrisisLevel('immediate')
          setIsInCrisis(true)
          break
        case 'high':
          setCrisisLevel('high')
          setIsInCrisis(true)
          break
        case 'moderate':
          setCrisisLevel('moderate')
          setIsInCrisis(false)
          break
        default:
          setCrisisLevel('low')
          setIsInCrisis(false)
      }
    }
  }, [profile?.risk_level])

  const triggerCrisisAlert = (level: CrisisAlert['level'], message: string) => {
    const alert: CrisisAlert = {
      id: Date.now().toString(),
      level,
      message,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      resources: CRISIS_RESOURCES.filter(resource => 
        level === 'immediate' ? resource.available_24_7 : true
      )
    }

    setActiveAlerts(prev => [alert, ...prev])
    
    if (level === 'immediate' || level === 'high') {
      setShowCrisisOverlay(true)
      setIsInCrisis(true)
      setCrisisLevel(level)
    }

    // Log crisis event for monitoring
    console.log('Crisis alert triggered:', { level, message, userId: user?.id })
  }

  const acknowledgeCrisisAlert = (alertId: string) => {
    setActiveAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    )
  }

  const dismissCrisisOverlay = () => {
    setShowCrisisOverlay(false)
    // Don't automatically set isInCrisis to false - let assessment determine that
  }

  const callCrisisLine = () => {
    // In a real app, this would initiate a phone call
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:988'
    }
    
    // Log the action
    console.log('Crisis line call initiated for user:', user?.id)
  }

  const textCrisisLine = () => {
    // In a real app, this would open SMS app
    if (typeof window !== 'undefined') {
      window.location.href = 'sms:838255'
    }
    
    // Log the action
    console.log('Crisis text initiated for user:', user?.id)
  }

  const connectToChat = () => {
    // In a real app, this would open crisis chat
    window.open('https://www.veteranscrisisline.net/get-help-now/chat/', '_blank')
    
    // Log the action
    console.log('Crisis chat initiated for user:', user?.id)
  }

  const value = {
    isInCrisis,
    crisisLevel,
    activeAlerts,
    crisisResources: CRISIS_RESOURCES,
    showCrisisOverlay,
    triggerCrisisAlert,
    acknowledgeCrisisAlert,
    dismissCrisisOverlay,
    callCrisisLine,
    textCrisisLine,
    connectToChat,
  }

  return (
    <CrisisContext.Provider value={value}>
      {children}
    </CrisisContext.Provider>
  )
}
