import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import CanadianVeteranSupport, { CanadianVeteranResource, ProvincialResource } from '../lib/canadian-veteran-resources'
import EcosystemIntegration, { getEcosystemConfig } from '../lib/ecosystem-integration'
import toast from 'react-hot-toast'

interface CanadianVeteranContextType {
  province: string
  setProvince: (province: string) => void
  nationalResources: CanadianVeteranResource[]
  provincialResources: ProvincialResource | undefined
  crisisResources: CanadianVeteranResource[]
  familyResources: CanadianVeteranResource[]
  generateCrisisPlan: () => any
  getVACServiceInfo: () => any
  connectToEcosystem: (data: any) => Promise<any>
  submitVCDemoData: (demoData: any) => Promise<any>
  ecosystemHealth: any
}

const CanadianVeteranContext = createContext<CanadianVeteranContextType | undefined>(undefined)

export function useCanadianVeteran() {
  const context = useContext(CanadianVeteranContext)
  if (context === undefined) {
    throw new Error('useCanadianVeteran must be used within a CanadianVeteranProvider')
  }
  return context
}

export function CanadianVeteranProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [province, setProvince] = useState<string>('Ontario') // Default to Ontario
  const [ecosystemHealth, setEcosystemHealth] = useState<any>(null)
  
  const canadianSupport = new CanadianVeteranSupport()
  const ecosystem = new EcosystemIntegration(getEcosystemConfig())

  useEffect(() => {
    checkEcosystemHealth()
    // Load province from user profile if available
    loadUserProvince()
  }, [user])

  const loadUserProvince = async () => {
    // In production, this would load from user profile
    // For now, detect from browser locale or default to Ontario
    try {
      const userLocale = navigator.language
      if (userLocale.includes('CA')) {
        // Could implement more sophisticated province detection
        setProvince('Ontario')
      }
    } catch (error) {
      console.log('Using default province: Ontario')
    }
  }

  const checkEcosystemHealth = async () => {
    try {
      const health = await ecosystem.healthCheck()
      setEcosystemHealth(health)
    } catch (error) {
      console.error('Ecosystem health check failed:', error)
      setEcosystemHealth({
        overallHealth: 'offline',
        sentimentService: false,
        analyticsEngine: false,
        aiOrchestration: false,
        apiGateway: false
      })
    }
  }

  const resources = canadianSupport.getResourcesByProvince(province)

  const generateCrisisPlan = () => {
    return canadianSupport.generateCanadianCrisisPlan(province)
  }

  const getVACServiceInfo = () => {
    return canadianSupport.getVACServiceInfo()
  }

  const connectToEcosystem = async (data: any) => {
    if (!user) {
      throw new Error('User must be authenticated to connect to ecosystem')
    }

    try {
      // Add Canadian veteran context to the data
      const canadianData = {
        ...data,
        veteranId: user.id,
        country: 'Canada',
        province: province,
        veteranType: 'Canadian Armed Forces',
        healthcareSystem: 'Veterans Affairs Canada',
        timestamp: new Date().toISOString()
      }

      // Send to ecosystem based on data type
      if (data.type === 'assessment') {
        return await ecosystem.submitAssessmentToEcosystem(canadianData, user.id)
      } else if (data.type === 'crisis') {
        return await ecosystem.triggerCrisisAlert(user.id, canadianData)
      } else if (data.type === 'sentiment') {
        return await ecosystem.analyzeSentiment(canadianData)
      } else {
        // General veteran insights
        return await ecosystem.getVeteranInsights(user.id)
      }
    } catch (error: any) {
      console.error('Ecosystem connection failed:', error)
      toast.error('Unable to connect to support network')
      throw error
    }
  }

  const submitVCDemoData = async (demoData: any) => {
    try {
      const canadianDemoData = {
        ...demoData,
        market: 'Canada',
        veteranSystem: 'Canadian Armed Forces',
        healthcareIntegration: 'Veterans Affairs Canada',
        provincialContext: province,
        demoMetrics: {
          canadianVeterans: '630,000+ veterans',
          mentalHealthNeed: '23% report mental health needs',
          govtSpending: '$4.6B annually on veteran services',
          familySupport: '85% have family support networks'
        }
      }

      return await ecosystem.submitVCDemoData(canadianDemoData)
    } catch (error: any) {
      console.error('VC demo data submission failed:', error)
      return { status: 'demo_offline', data: canadianDemoData }
    }
  }

  const value = {
    province,
    setProvince,
    nationalResources: resources.national,
    provincialResources: resources.provincial,
    crisisResources: canadianSupport.getCrisisResources(),
    familyResources: canadianSupport.getFamilyResources(),
    generateCrisisPlan,
    getVACServiceInfo,
    connectToEcosystem,
    submitVCDemoData,
    ecosystemHealth
  }

  return (
    <CanadianVeteranContext.Provider value={value}>
      {children}
    </CanadianVeteranContext.Provider>
  )
}