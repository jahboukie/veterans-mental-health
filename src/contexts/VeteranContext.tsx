import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

export interface VeteranProfile {
  id: string
  email: string
  service_branch: 'army' | 'navy' | 'air-force' | 'marines' | 'coast-guard' | 'space-force' | null
  service_years: {
    start: string
    end: string | null
  } | null
  rank: string | null
  deployment_history: Array<{
    location: string
    start_date: string
    end_date: string
    combat_exposure: boolean
  }>
  crisis_contacts: Array<{
    name: string
    relationship: string
    phone: string
    primary: boolean
  }>
  privacy_settings: {
    share_with_va: boolean
    anonymous_mode: boolean
    family_access: boolean
  }
  onboarding_completed: boolean
  last_assessment_date: string | null
  risk_level: 'low' | 'moderate' | 'high' | 'crisis' | null
  created_at: string
  updated_at: string
}

export interface AssessmentScore {
  pcl5_score: number | null
  phq9_score: number | null
  gad7_score: number | null
  assessment_date: string
  risk_level: 'low' | 'moderate' | 'high' | 'crisis'
  recommendations: string[]
}

interface VeteranContextType {
  profile: VeteranProfile | null
  assessments: AssessmentScore[]
  loading: boolean
  updateProfile: (updates: Partial<VeteranProfile>) => Promise<void>
  completeOnboarding: (profileData: Partial<VeteranProfile>) => Promise<void>
  submitAssessment: (assessment: Omit<AssessmentScore, 'assessment_date'>) => Promise<void>
  refreshProfile: () => Promise<void>
}

const VeteranContext = createContext<VeteranContextType | undefined>(undefined)

export function useVeteran() {
  const context = useContext(VeteranContext)
  if (context === undefined) {
    throw new Error('useVeteran must be used within a VeteranProvider')
  }
  return context
}

export function VeteranProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<VeteranProfile | null>(null)
  const [assessments, setAssessments] = useState<AssessmentScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchVeteranProfile()
      fetchAssessments()
    } else {
      setProfile(null)
      setAssessments([])
      setLoading(false)
    }
  }, [user])

  const fetchVeteranProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('veteran_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setProfile({
          ...data,
          service_branch: data.profile_data?.service_branch || null,
          service_years: data.profile_data?.service_years || null,
          rank: data.profile_data?.rank || null,
          deployment_history: data.profile_data?.deployment_history || [],
          crisis_contacts: data.profile_data?.crisis_contacts || [],
          privacy_settings: data.profile_data?.privacy_settings || {
            share_with_va: false,
            anonymous_mode: true,
            family_access: false
          },
          onboarding_completed: data.profile_data?.onboarding_completed || false,
          last_assessment_date: data.profile_data?.last_assessment_date || null,
          risk_level: data.profile_data?.risk_level || null,
        })
      }
    } catch (error) {
      console.error('Error fetching veteran profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAssessments = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('veteran_assessments')
        .select('*')
        .eq('veteran_id', user.id)
        .order('assessment_date', { ascending: false })
        .limit(10)

      if (error) {
        throw error
      }

      setAssessments(data || [])
    } catch (error) {
      console.error('Error fetching assessments:', error)
    }
  }

  const updateProfile = async (updates: Partial<VeteranProfile>) => {
    if (!user || !profile) return

    try {
      const updatedProfileData = {
        ...profile,
        ...updates,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('veteran_profiles')
        .update({
          profile_data: {
            service_branch: updatedProfileData.service_branch,
            service_years: updatedProfileData.service_years,
            rank: updatedProfileData.rank,
            deployment_history: updatedProfileData.deployment_history,
            crisis_contacts: updatedProfileData.crisis_contacts,
            privacy_settings: updatedProfileData.privacy_settings,
            onboarding_completed: updatedProfileData.onboarding_completed,
            last_assessment_date: updatedProfileData.last_assessment_date,
            risk_level: updatedProfileData.risk_level,
          },
          updated_at: updatedProfileData.updated_at
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }

      setProfile(updatedProfileData)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const completeOnboarding = async (profileData: Partial<VeteranProfile>) => {
    await updateProfile({
      ...profileData,
      onboarding_completed: true
    })
  }

  const submitAssessment = async (assessment: Omit<AssessmentScore, 'assessment_date'>) => {
    if (!user) return

    try {
      const assessmentData = {
        ...assessment,
        assessment_date: new Date().toISOString(),
        veteran_id: user.id
      }

      const { error } = await supabase
        .from('veteran_assessments')
        .insert(assessmentData)

      if (error) {
        throw error
      }

      // Update profile with latest assessment info
      await updateProfile({
        last_assessment_date: assessmentData.assessment_date,
        risk_level: assessment.risk_level
      })

      // Refresh assessments
      await fetchAssessments()
    } catch (error) {
      console.error('Error submitting assessment:', error)
      throw error
    }
  }

  const refreshProfile = async () => {
    setLoading(true)
    await fetchVeteranProfile()
    await fetchAssessments()
  }

  const value = {
    profile,
    assessments,
    loading,
    updateProfile,
    completeOnboarding,
    submitAssessment,
    refreshProfile,
  }

  return (
    <VeteranContext.Provider value={value}>
      {children}
    </VeteranContext.Provider>
  )
}
