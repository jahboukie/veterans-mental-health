import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useVeteran } from '../contexts/VeteranContext'
import { useCrisis } from '../contexts/CrisisContext'
import toast from 'react-hot-toast'

// PCL-5 Questions (PTSD Checklist for DSM-5)
const PCL5_QUESTIONS = [
  "Repeated, disturbing, and unwanted memories of the stressful experience?",
  "Repeated, disturbing dreams of the stressful experience?",
  "Suddenly feeling or acting as if the stressful experience were actually happening again?",
  "Feeling very upset when something reminded you of the stressful experience?",
  "Having strong physical reactions when something reminded you of the stressful experience?",
  "Avoiding memories, thoughts, or feelings related to the stressful experience?",
  "Avoiding external reminders of the stressful experience?",
  "Trouble remembering important parts of the stressful experience?",
  "Having strong negative beliefs about yourself, other people, or the world?",
  "Blaming yourself or someone else for the stressful experience or what happened after it?",
  "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
  "Loss of interest in activities that you used to enjoy?",
  "Feeling distant or cut off from other people?",
  "Trouble experiencing positive feelings?",
  "Irritable behavior, angry outbursts, or acting aggressively?",
  "Taking too many risks or doing things that could cause you harm?",
  "Being 'superalert' or watchful or on guard?",
  "Feeling jumpy or easily startled?",
  "Having difficulty concentrating?",
  "Trouble falling or staying asleep?"
]

// PHQ-9 Questions (Patient Health Questionnaire-9)
const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
]

const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "A little bit" },
  { value: 2, label: "Moderately" },
  { value: 3, label: "Quite a bit" },
  { value: 4, label: "Extremely" }
]

const PHQ9_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
]

export default function Assessment() {
  const [currentAssessment, setCurrentAssessment] = useState<'select' | 'pcl5' | 'phq9' | 'results'>('select')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)
  
  const { submitAssessment } = useVeteran()
  const { triggerCrisisAlert } = useCrisis()

  const { register, handleSubmit, watch, reset } = useForm()

  const calculatePCL5Score = (data: any) => {
    let total = 0
    for (let i = 0; i < 20; i++) {
      total += parseInt(data[`pcl5_${i}`] || 0)
    }
    return total
  }

  const calculatePHQ9Score = (data: any) => {
    let total = 0
    for (let i = 0; i < 9; i++) {
      total += parseInt(data[`phq9_${i}`] || 0)
    }
    return total
  }

  const getRiskLevel = (pcl5Score: number, phq9Score: number) => {
    // Crisis indicators
    if (phq9Score >= 20 || pcl5Score >= 50) {
      return 'crisis'
    }
    // High risk
    if (phq9Score >= 15 || pcl5Score >= 38) {
      return 'high'
    }
    // Moderate risk
    if (phq9Score >= 10 || pcl5Score >= 31) {
      return 'moderate'
    }
    // Low risk
    return 'low'
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const pcl5Score = currentAssessment === 'pcl5' ? calculatePCL5Score(data) : null
      const phq9Score = currentAssessment === 'phq9' ? calculatePHQ9Score(data) : null
      
      // Check for crisis indicators
      const suicidalThoughts = currentAssessment === 'phq9' && parseInt(data.phq9_8) >= 1
      
      if (suicidalThoughts) {
        triggerCrisisAlert('immediate', 'Suicidal ideation detected in assessment. Immediate support recommended.')
      }

      const riskLevel = getRiskLevel(pcl5Score || 0, phq9Score || 0)
      
      const assessmentData = {
        pcl5_score: pcl5Score,
        phq9_score: phq9Score,
        risk_level: riskLevel as 'low' | 'moderate' | 'high' | 'crisis',
        recommendations: generateRecommendations(riskLevel, pcl5Score, phq9Score, suicidalThoughts)
      }

      await submitAssessment(assessmentData)
      
      setResults({
        ...assessmentData,
        suicidalThoughts
      })
      
      setCurrentAssessment('results')
      toast.success('Assessment completed successfully')
      
    } catch (error) {
      console.error('Error submitting assessment:', error)
      toast.error('Error submitting assessment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateRecommendations = (riskLevel: string, pcl5: number | null, phq9: number | null, suicidal: boolean) => {
    const recommendations = []
    
    if (suicidal) {
      recommendations.push('Immediate crisis intervention recommended')
      recommendations.push('Contact Veterans Crisis Line: 988')
    }
    
    if (riskLevel === 'crisis' || riskLevel === 'high') {
      recommendations.push('Professional mental health evaluation recommended')
      recommendations.push('Consider contacting your VA mental health provider')
    }
    
    if (pcl5 && pcl5 >= 31) {
      recommendations.push('PTSD screening with qualified provider recommended')
      recommendations.push('Consider trauma-focused therapy (CPT, PE, EMDR)')
    }
    
    if (phq9 && phq9 >= 10) {
      recommendations.push('Depression screening with qualified provider recommended')
      recommendations.push('Consider counseling or therapy for depression')
    }
    
    recommendations.push('Continue regular check-ins with Alex AI companion')
    recommendations.push('Engage with peer support groups')
    
    return recommendations
  }

  const renderAssessmentSelection = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <ClipboardDocumentCheckIcon className="h-12 w-12 text-military-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Assessment</h1>
        <p className="text-gray-600">
          Evidence-based screening tools designed specifically for veterans
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-military p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">PCL-5 Assessment</h3>
          <p className="text-gray-600 mb-4">
            PTSD Checklist for DSM-5. Screens for post-traumatic stress symptoms 
            related to military service and combat exposure.
          </p>
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <InformationCircleIcon className="h-4 w-4 mr-1" />
              <span>20 questions • 5-10 minutes</span>
            </div>
            <div className="text-sm text-gray-500">
              Assesses symptoms over the past month
            </div>
          </div>
          <button
            onClick={() => setCurrentAssessment('pcl5')}
            className="w-full btn-primary"
          >
            Start PCL-5 Assessment
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-military p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">PHQ-9 Assessment</h3>
          <p className="text-gray-600 mb-4">
            Patient Health Questionnaire-9. Screens for depression symptoms 
            and severity levels.
          </p>
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <InformationCircleIcon className="h-4 w-4 mr-1" />
              <span>9 questions • 3-5 minutes</span>
            </div>
            <div className="text-sm text-gray-500">
              Assesses symptoms over the past two weeks
            </div>
          </div>
          <button
            onClick={() => setCurrentAssessment('phq9')}
            className="w-full btn-primary"
          >
            Start PHQ-9 Assessment
          </button>
        </div>
      </div>

      <div className="mt-8 bg-military-50 border border-military-200 rounded-lg p-6">
        <h3 className="font-medium text-military-800 mb-2">Privacy & Confidentiality</h3>
        <div className="text-sm text-military-700 space-y-1">
          <p>• Your assessment results are encrypted and stored securely</p>
          <p>• Results are not shared with the VA unless you explicitly consent</p>
          <p>• Anonymous mode protects your identity in all communications</p>
          <p>• Crisis detection automatically connects you to appropriate resources</p>
        </div>
      </div>
    </div>
  )

  const renderPCL5Assessment = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => setCurrentAssessment('select')}
          className="text-military-600 hover:text-military-700 mb-4"
        >
          ← Back to assessments
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PCL-5 Assessment</h1>
        <p className="text-gray-600">
          Below is a list of problems that people sometimes have in response to a very stressful experience. 
          Please read each problem carefully and then circle one of the numbers to indicate how much you have been bothered by that problem <strong>in the past month</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-military p-6">
          {PCL5_QUESTIONS.map((question, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <p className="text-gray-900 mb-4 font-medium">
                {index + 1}. In the past month, how much were you bothered by: {question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {RESPONSE_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      {...register(`pcl5_${index}`, { required: true })}
                      type="radio"
                      value={option.value}
                      className="mr-2 text-military-600 focus:ring-military-500"
                    />
                    <div>
                      <div className="font-medium text-sm">{option.value}</div>
                      <div className="text-xs text-gray-600">{option.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary px-8"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Complete Assessment'
            )}
          </button>
        </div>
      </form>
    </div>
  )

  const renderPHQ9Assessment = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => setCurrentAssessment('select')}
          className="text-military-600 hover:text-military-700 mb-4"
        >
          ← Back to assessments
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PHQ-9 Assessment</h1>
        <p className="text-gray-600">
          Over the <strong>last 2 weeks</strong>, how often have you been bothered by any of the following problems?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-military p-6">
          {PHQ9_QUESTIONS.map((question, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <p className="text-gray-900 mb-4 font-medium">
                {index + 1}. {question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {PHQ9_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      {...register(`phq9_${index}`, { required: true })}
                      type="radio"
                      value={option.value}
                      className="mr-2 text-military-600 focus:ring-military-500"
                    />
                    <div>
                      <div className="font-medium text-sm">{option.value}</div>
                      <div className="text-xs text-gray-600">{option.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary px-8"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Complete Assessment'
            )}
          </button>
        </div>
      </form>
    </div>
  )

  const renderResults = () => {
    if (!results) return null

    const getRiskColor = (level: string) => {
      switch (level) {
        case 'low': return 'text-healing-600 bg-healing-50 border-healing-200'
        case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
        case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
        case 'crisis': return 'text-crisis-600 bg-crisis-50 border-crisis-200'
        default: return 'text-gray-600 bg-gray-50 border-gray-200'
      }
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <CheckCircleIcon className="h-12 w-12 text-healing-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete</h1>
          <p className="text-gray-600">
            Your results have been securely saved and are available in your dashboard.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-military p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {results.pcl5_score !== null && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">PCL-5 Score</h3>
                <div className="text-2xl font-bold text-military-600 mb-1">
                  {results.pcl5_score}/80
                </div>
                <p className="text-sm text-gray-600">
                  {results.pcl5_score >= 31 ? 'Suggests possible PTSD symptoms' : 'Below clinical threshold'}
                </p>
              </div>
            )}

            {results.phq9_score !== null && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">PHQ-9 Score</h3>
                <div className="text-2xl font-bold text-military-600 mb-1">
                  {results.phq9_score}/27
                </div>
                <p className="text-sm text-gray-600">
                  {results.phq9_score >= 10 ? 'Suggests possible depression symptoms' : 'Minimal depression symptoms'}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Risk Level</h3>
            <span className={`px-4 py-2 rounded-full border font-medium ${getRiskColor(results.risk_level)}`}>
              {results.risk_level.charAt(0).toUpperCase() + results.risk_level.slice(1)} Risk
            </span>
          </div>

          {results.suicidalThoughts && (
            <div className="mb-6 p-4 bg-crisis-50 border border-crisis-200 rounded-lg">
              <div className="flex items-center mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-crisis-600 mr-2" />
                <span className="font-medium text-crisis-800">Immediate Support Available</span>
              </div>
              <p className="text-crisis-700 text-sm mb-3">
                Your responses indicate you may be having thoughts of self-harm. Please reach out for support immediately.
              </p>
              <button
                onClick={() => window.location.href = 'tel:988'}
                className="bg-crisis-600 hover:bg-crisis-700 text-white px-4 py-2 rounded font-medium"
              >
                Call Veterans Crisis Line: 988
              </button>
            </div>
          )}

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {results.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-healing-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setCurrentAssessment('select')
              setResults(null)
              reset()
            }}
            className="btn-secondary"
          >
            Take Another Assessment
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="btn-primary"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  switch (currentAssessment) {
    case 'pcl5':
      return renderPCL5Assessment()
    case 'phq9':
      return renderPHQ9Assessment()
    case 'results':
      return renderResults()
    default:
      return renderAssessmentSelection()
  }
}
