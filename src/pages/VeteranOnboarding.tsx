import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  ShieldCheckIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  CheckCircleIcon,
  LockClosedIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useVeteran } from '../contexts/VeteranContext'
import toast from 'react-hot-toast'

const onboardingSchema = z.object({
  service_branch: z.enum(['army', 'navy', 'air-force', 'marines', 'coast-guard', 'space-force']),
  rank: z.string().min(1, 'Please enter your rank'),
  service_start: z.string().min(1, 'Please enter service start date'),
  service_end: z.string().optional(),
  currently_serving: z.boolean(),
  deployment_history: z.array(z.object({
    location: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    combat_exposure: z.boolean()
  })).optional(),
  emergency_contact_name: z.string().min(1, 'Please enter emergency contact name'),
  emergency_contact_phone: z.string().min(10, 'Please enter valid phone number'),
  emergency_contact_relationship: z.string().min(1, 'Please specify relationship'),
  share_with_va: z.boolean(),
  anonymous_mode: z.boolean(),
  family_access: z.boolean()
})

type OnboardingFormData = z.infer<typeof onboardingSchema>

const SERVICE_BRANCHES = [
  { value: 'army', label: 'Army', emoji: '🪖' },
  { value: 'navy', label: 'Navy', emoji: '⚓' },
  { value: 'air-force', label: 'Air Force', emoji: '✈️' },
  { value: 'marines', label: 'Marines', emoji: '🦅' },
  { value: 'coast-guard', label: 'Coast Guard', emoji: '🚢' },
  { value: 'space-force', label: 'Space Force', emoji: '🚀' }
]

export default function VeteranOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { completeOnboarding } = useVeteran()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      currently_serving: false,
      share_with_va: false,
      anonymous_mode: true,
      family_access: false,
      deployment_history: []
    }
  })

  const currentlyServing = watch('currently_serving')
  const serviceBranch = watch('service_branch')

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const getFieldsForStep = (step: number): (keyof OnboardingFormData)[] => {
    switch (step) {
      case 1:
        return ['service_branch', 'rank', 'service_start', 'currently_serving']
      case 2:
        return ['emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship']
      case 3:
        return ['share_with_va', 'anonymous_mode', 'family_access']
      default:
        return []
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true)
    try {
      const profileData = {
        service_branch: data.service_branch,
        rank: data.rank,
        service_years: {
          start: data.service_start,
          end: data.currently_serving ? null : data.service_end || null
        },
        deployment_history: data.deployment_history || [],
        crisis_contacts: [{
          name: data.emergency_contact_name,
          phone: data.emergency_contact_phone,
          relationship: data.emergency_contact_relationship,
          primary: true
        }],
        privacy_settings: {
          share_with_va: data.share_with_va,
          anonymous_mode: data.anonymous_mode,
          family_access: data.family_access
        },
        onboarding_completed: true
      }

      await completeOnboarding(profileData)
      toast.success('Welcome to VetSupport! Your profile has been set up.')
      navigate('/dashboard')
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error('Error completing onboarding. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Information</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Branch of Service
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICE_BRANCHES.map((branch) => (
                    <button
                      key={branch.value}
                      type="button"
                      onClick={() => setValue('service_branch', branch.value as any)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        serviceBranch === branch.value
                          ? 'border-military-500 bg-military-50 text-military-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{branch.emoji}</span>
                        <span className="font-medium">{branch.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service_branch && (
                  <p className="mt-1 text-sm text-red-600">{errors.service_branch.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rank/Rate
                  </label>
                  <input
                    {...register('rank')}
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                    placeholder="e.g., SSG, PO2, Capt"
                  />
                  {errors.rank && (
                    <p className="mt-1 text-sm text-red-600">{errors.rank.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Start Date
                  </label>
                  <input
                    {...register('service_start')}
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                  />
                  {errors.service_start && (
                    <p className="mt-1 text-sm text-red-600">{errors.service_start.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    {...register('currently_serving')}
                    type="checkbox"
                    className="rounded border-gray-300 text-military-600 focus:ring-military-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I am currently serving
                  </span>
                </label>
              </div>

              {!currentlyServing && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service End Date
                  </label>
                  <input
                    {...register('service_end')}
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
              <p className="text-sm text-gray-600 mb-6">
                This person will be contacted in case of a mental health emergency.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Name
                  </label>
                  <input
                    {...register('emergency_contact_name')}
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                    placeholder="Full name"
                  />
                  {errors.emergency_contact_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    {...register('emergency_contact_phone')}
                    type="tel"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                    placeholder="(555) 123-4567"
                  />
                  {errors.emergency_contact_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Relationship
                  </label>
                  <select
                    {...register('emergency_contact_relationship')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-military-500 focus:border-military-500"
                  >
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="child">Child</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.emergency_contact_relationship && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_relationship.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
              <p className="text-sm text-gray-600 mb-6">
                Control how your information is shared and accessed.
              </p>

              <div className="space-y-6">
                <div className="bg-military-50 border border-military-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <LockClosedIcon className="h-5 w-5 text-military-600 mr-2" />
                    <span className="font-medium text-military-800">Zero-Knowledge Architecture</span>
                  </div>
                  <p className="text-sm text-military-700">
                    Your data is encrypted end-to-end. Even we cannot access your personal information 
                    without your explicit permission.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      {...register('anonymous_mode')}
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-military-600 focus:ring-military-500"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-700">
                        Anonymous Mode (Recommended)
                      </span>
                      <p className="text-xs text-gray-500">
                        Use anonymous identifiers in peer support and group discussions
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start">
                    <input
                      {...register('share_with_va')}
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-military-600 focus:ring-military-500"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-700">
                        Share with VA (Optional)
                      </span>
                      <p className="text-xs text-gray-500">
                        Allow sharing of assessment results with VA healthcare providers
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start">
                    <input
                      {...register('family_access')}
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-military-600 focus:ring-military-500"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-700">
                        Family Access
                      </span>
                      <p className="text-xs text-gray-500">
                        Allow family members to access family support resources
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <CheckCircleIcon className="h-16 w-16 text-healing-500 mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to VetSupport</h3>
              <p className="text-gray-600">
                Your profile is ready. You now have access to all veteran-specific mental health resources.
              </p>
            </div>
            
            <div className="bg-healing-50 border border-healing-200 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <HeartIcon className="h-5 w-5 text-healing-600 mr-2" />
                <span className="font-medium text-healing-800">Thank you for your service</span>
              </div>
              <p className="text-sm text-healing-700">
                We're honored to support you on your mental health journey.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <ShieldCheckIcon className="h-12 w-12 text-military-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Service Member</h1>
          <p className="text-gray-600 mt-2">
            Let's set up your profile to provide the best support for your needs
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-military-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white shadow-military rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Previous
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-military-600 hover:bg-military-700"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center px-6 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-healing-600 hover:bg-healing-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : null}
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
