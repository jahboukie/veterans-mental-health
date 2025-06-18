import { useState } from 'react'
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  HeartIcon, 
  UserGroupIcon,
  PhoneIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  BuildingOfficeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface Slide {
  id: string
  title: string
  icon: any
  content: JSX.Element
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 'title',
      title: 'Executive Summary',
      icon: PresentationChartBarIcon,
      content: (
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img src="/maple-leaf.svg" alt="Canada" className="h-12 w-12 text-red-600" />
              <h1 className="text-5xl font-bold text-gray-900">VeteranSupport.ca</h1>
              <ShieldCheckIcon className="h-12 w-12 text-military-600" />
            </div>
            <h2 className="text-3xl font-semibold text-military-700">
              Canadian Veterans Mental Health Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              A comprehensive dual-app platform serving 630,000+ Canadian veterans and their families 
              with military-grade security, AI-powered crisis intervention, and seamless Veterans Affairs Canada integration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-military-50 border border-military-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <HeartIcon className="h-8 w-8 text-military-600 mr-3" />
                <h3 className="text-xl font-semibold text-military-800">Veteran Mental Health App</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• PCL-5 & PHQ-9 clinical assessments</li>
                <li>• Alex AI companion (military culture-aware)</li>
                <li>• Crisis detection & intervention</li>
                <li>• VAC integration & benefits access</li>
                <li>• Zero-knowledge encryption</li>
              </ul>
            </div>
            
            <div className="bg-honor-50 border border-honor-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-8 w-8 text-honor-600 mr-3" />
                <h3 className="text-xl font-semibold text-honor-800">Family Support App</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Real-time veteran status monitoring</li>
                <li>• Crisis alerts & intervention guidance</li>
                <li>• Family education & resources</li>
                <li>• Support network coordination</li>
                <li>• OSISS family support integration</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-military-600 to-honor-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Investment Opportunity</h3>
            <p className="text-lg mb-4">
              Seeking $2.5M CAD to complete development and hire Lead Full Stack Engineer
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">630K+</div>
                <div className="text-sm opacity-90">Canadian Veterans</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$4.6B</div>
                <div className="text-sm opacity-90">Annual VAC Budget</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1.5M+</div>
                <div className="text-sm opacity-90">Family Members</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'The Crisis We\'re Solving',
      icon: ExclamationTriangleIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-crisis-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Canadian Veteran Mental Health Crisis</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Canadian veterans face unique challenges that existing solutions fail to address comprehensively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-crisis-50 border border-crisis-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-crisis-800 mb-4">Alarming Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crisis-600 rounded-full mr-3"></div>
                    <span><strong>23%</strong> of veterans report mental health needs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crisis-600 rounded-full mr-3"></div>
                    <span><strong>2.3x higher</strong> suicide rate than general population</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crisis-600 rounded-full mr-3"></div>
                    <span><strong>67%</strong> don't seek help due to stigma</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crisis-600 rounded-full mr-3"></div>
                    <span><strong>85%</strong> of families feel unprepared for crises</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Solution Gaps</h3>
                <div className="space-y-2 text-gray-700">
                  <div>• Generic mental health apps lack military context</div>
                  <div>• No integrated family support systems</div>
                  <div>• Limited crisis detection capabilities</div>
                  <div>• Poor VAC integration and benefits access</div>
                  <div>• Privacy concerns with government systems</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-military-50 border border-military-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-military-800 mb-4">Market Opportunity</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-military-600">630,000+</div>
                    <div className="text-sm text-gray-600">Canadian Veterans</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-honor-600">1.5M+</div>
                    <div className="text-sm text-gray-600">Family Members</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold text-strength-600">$4.6B</div>
                    <div className="text-sm text-gray-600">Annual VAC Budget</div>
                  </div>
                </div>
              </div>

              <div className="bg-healing-50 border border-healing-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-healing-800 mb-4">Why Now?</h3>
                <div className="space-y-2 text-gray-700">
                  <div>• Post-Afghanistan veteran mental health surge</div>
                  <div>• Government prioritizing veteran care</div>
                  <div>• Digital health adoption accelerated</div>
                  <div>• Family support systems overwhelmed</div>
                  <div>• AI technology maturity for healthcare</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Our Comprehensive Solution',
      icon: CheckCircleIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-healing-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dual-App Ecosystem Architecture</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The first comprehensive platform designed specifically for Canadian veterans and their families, 
              featuring military-grade security and seamless government integration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Veteran App */}
            <div className="bg-gradient-to-br from-military-50 to-military-100 border border-military-200 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <HeartIcon className="h-10 w-10 text-military-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-military-800">Veteran Mental Health App</h3>
                  <p className="text-military-600">Primary veteran-facing platform</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🧠 Clinical Assessments</h4>
                  <p className="text-sm text-gray-600">PCL-5 (PTSD) & PHQ-9 (Depression) with real-time risk analysis</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🤖 Alex AI Companion</h4>
                  <p className="text-sm text-gray-600">Military culture-aware AI trained in veteran experiences</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🆘 Crisis Intervention</h4>
                  <p className="text-sm text-gray-600">Automatic detection with immediate VAC crisis line connection</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🍁 VAC Integration</h4>
                  <p className="text-sm text-gray-600">Direct access to benefits, services, and provincial resources</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🔒 Military-Grade Security</h4>
                  <p className="text-sm text-gray-600">Zero-knowledge encryption with PIPEDA compliance</p>
                </div>
              </div>
            </div>

            {/* Family App */}
            <div className="bg-gradient-to-br from-honor-50 to-honor-100 border border-honor-200 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <UserGroupIcon className="h-10 w-10 text-honor-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-honor-800">Family Support App</h3>
                  <p className="text-honor-600">Companion family-facing platform</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📊 Real-Time Monitoring</h4>
                  <p className="text-sm text-gray-600">Veteran status updates with permission-based sharing</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🚨 Crisis Alerts</h4>
                  <p className="text-sm text-gray-600">Immediate family notifications with intervention guidance</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📚 Family Education</h4>
                  <p className="text-sm text-gray-600">Military mental health education and support strategies</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🤝 Support Network</h4>
                  <p className="text-sm text-gray-600">Multi-family coordination and community connections</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🍁 OSISS Integration</h4>
                  <p className="text-sm text-gray-600">Direct connection to family support services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-strength-600 to-courage-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Ecosystem Intelligence</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 mx-auto mb-2 opacity-90" />
                <h4 className="font-semibold mb-2">AI Correlation</h4>
                <p className="text-sm opacity-90">Cross-app data analysis for predictive insights</p>
              </div>
              <div className="text-center">
                <PhoneIcon className="h-12 w-12 mx-auto mb-2 opacity-90" />
                <h4 className="font-semibold mb-2">Crisis Coordination</h4>
                <p className="text-sm opacity-90">Synchronized veteran-family crisis response</p>
              </div>
              <div className="text-center">
                <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-2 opacity-90" />
                <h4 className="font-semibold mb-2">Provider Bridge</h4>
                <p className="text-sm opacity-90">Seamless healthcare provider integration</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technology',
      title: 'Technology & Security',
      icon: ShieldCheckIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <ShieldCheckIcon className="h-16 w-16 text-military-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Military-Grade Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Built with enterprise-grade security and scalability to serve Canada's veteran population.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-military-50 border border-military-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-military-800 mb-4">🔒 Security Architecture</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-military-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Zero-Knowledge Encryption</div>
                      <div className="text-sm text-gray-600">AES-256-GCM with client-side encryption</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-military-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">PIPEDA Compliance</div>
                      <div className="text-sm text-gray-600">Canadian privacy law compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-military-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Multi-Factor Authentication</div>
                      <div className="text-sm text-gray-600">TOTP, biometric, hardware tokens</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-military-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Audit Trail Logging</div>
                      <div className="text-sm text-gray-600">Complete HIPAA compliance tracking</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-strength-50 border border-strength-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-strength-800 mb-4">🤖 AI & Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-strength-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Alex AI Companion</div>
                      <div className="text-sm text-gray-600">Military culture-aware conversational AI</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-strength-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Crisis Detection</div>
                      <div className="text-sm text-gray-600">Real-time sentiment analysis & risk assessment</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-strength-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Predictive Analytics</div>
                      <div className="text-sm text-gray-600">Cross-app correlation for intervention timing</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-strength-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Bilingual Processing</div>
                      <div className="text-sm text-gray-600">English and French language support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-honor-50 border border-honor-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-honor-800 mb-4">⚡ Technical Stack</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-800">Frontend</div>
                    <div className="text-sm text-gray-600">React 18 + TypeScript + Vite</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Backend</div>
                    <div className="text-sm text-gray-600">Supabase (PostgreSQL) + Node.js</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Security</div>
                    <div className="text-sm text-gray-600">crypto-js, argon2, BLAKE3 hashing</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Infrastructure</div>
                    <div className="text-sm text-gray-600">Vercel, Canadian CDN (Toronto edge)</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Monitoring</div>
                    <div className="text-sm text-gray-600">Real-time analytics & health monitoring</div>
                  </div>
                </div>
              </div>

              <div className="bg-courage-50 border border-courage-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-courage-800 mb-4">🍁 Government Integration</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-courage-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Veterans Affairs Canada API</div>
                      <div className="text-sm text-gray-600">Direct benefits and services access</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-courage-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Provincial Crisis Lines</div>
                      <div className="text-sm text-gray-600">13 province/territory integration</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-courage-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">OSISS Network</div>
                      <div className="text-sm text-gray-600">Family support service connection</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-courage-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Healthcare Systems</div>
                      <div className="text-sm text-gray-600">Provincial mental health service integration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-military-600 to-strength-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Scalability & Performance</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-sm opacity-90">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">&lt;2s</div>
                <div className="text-sm opacity-90">Crisis Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2M+</div>
                <div className="text-sm opacity-90">User Capacity</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">AI Availability</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'market',
      title: 'Market & Business Model',
      icon: ChartBarIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <ChartBarIcon className="h-16 w-16 text-strength-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Canadian Market Opportunity</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Addressing a $4.6B annual market with proven demand and government support.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-strength-50 border border-strength-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-strength-800 mb-4">📊 Market Size</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Canadian Veterans</span>
                    <span className="text-xl font-bold text-strength-600">630,000+</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Family Members</span>
                    <span className="text-xl font-bold text-honor-600">1.5M+</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Annual VAC Budget</span>
                    <span className="text-xl font-bold text-military-600">$4.6B</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Mental Health Spending</span>
                    <span className="text-xl font-bold text-crisis-600">$1.2B</span>
                  </div>
                </div>
              </div>

              <div className="bg-honor-50 border border-honor-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-honor-800 mb-4">🎯 Target Segments</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-military-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">Post-9/11 Veterans</div>
                      <div className="text-sm text-gray-600">Afghanistan/Iraq deployment veterans (highest need)</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-honor-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">Military Families</div>
                      <div className="text-sm text-gray-600">Spouses, children, and support networks</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-strength-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">Healthcare Providers</div>
                      <div className="text-sm text-gray-600">VAC-contracted mental health professionals</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-courage-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">Government Agencies</div>
                      <div className="text-sm text-gray-600">VAC, provincial health ministries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-military-50 border border-military-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-military-800 mb-4">💰 Revenue Model</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border-l-4 border-military-600">
                    <div className="font-medium text-military-800">Government Contracts</div>
                    <div className="text-sm text-gray-600 mt-1">VAC licensing for veteran services</div>
                    <div className="text-lg font-bold text-military-600 mt-2">$2.5M annually</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-honor-600">
                    <div className="font-medium text-honor-800">Provincial Licensing</div>
                    <div className="text-sm text-gray-600 mt-1">13 province/territory health systems</div>
                    <div className="text-lg font-bold text-honor-600 mt-2">$1.8M annually</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-strength-600">
                    <div className="font-medium text-strength-800">Healthcare Integration</div>
                    <div className="text-sm text-gray-600 mt-1">Provider platform subscriptions</div>
                    <div className="text-lg font-bold text-strength-600 mt-2">$800K annually</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-courage-600">
                    <div className="font-medium text-courage-800">Enterprise Wellness</div>
                    <div className="text-sm text-gray-600 mt-1">Corporate veteran employee programs</div>
                    <div className="text-lg font-bold text-courage-600 mt-2">$1.2M annually</div>
                  </div>
                </div>
              </div>

              <div className="bg-healing-50 border border-healing-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-healing-800 mb-4">📈 Growth Projections</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Year 1 Revenue</span>
                    <span className="text-lg font-bold text-healing-600">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Year 2 Revenue</span>
                    <span className="text-lg font-bold text-healing-600">$3.8M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Year 3 Revenue</span>
                    <span className="text-lg font-bold text-healing-600">$6.3M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Break-even</span>
                    <span className="text-lg font-bold text-healing-600">Month 18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-strength-600 to-courage-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Competitive Advantages</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <ShieldCheckIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">Military Specialization</h4>
                <p className="text-sm opacity-90">Only platform designed specifically for Canadian veterans</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">Family Integration</h4>
                <p className="text-sm opacity-90">First dual-app ecosystem for veteran families</p>
              </div>
              <div className="text-center">
                <MapPinIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">Government Partnership</h4>
                <p className="text-sm opacity-90">Direct VAC integration and provincial support</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'investment',
      title: 'Investment Opportunity',
      icon: CurrencyDollarIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <CurrencyDollarIcon className="h-16 w-16 text-strength-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Request</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Seeking $2.5M CAD to complete development and scale the platform to serve all Canadian veterans.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-strength-50 to-strength-100 border border-strength-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-strength-800 mb-6">💰 Funding Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Lead Full Stack Engineer</div>
                      <div className="text-sm text-gray-600">Senior developer with healthcare experience</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$180K</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Development Team</div>
                      <div className="text-sm text-gray-600">2 additional developers (18 months)</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$540K</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Infrastructure & Security</div>
                      <div className="text-sm text-gray-600">Cloud hosting, security audits, compliance</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$300K</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Government Relations</div>
                      <div className="text-sm text-gray-600">VAC integration, regulatory compliance</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$200K</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Clinical Validation</div>
                      <div className="text-sm text-gray-600">Research studies, clinical trials</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$150K</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold">Marketing & Outreach</div>
                      <div className="text-sm text-gray-600">Veteran community engagement</div>
                    </div>
                    <div className="text-xl font-bold text-strength-600">$130K</div>
                  </div>
                  <div className="border-t-2 border-strength-200 pt-4">
                    <div className="flex justify-between items-center p-4 bg-strength-100 rounded-lg">
                      <div className="font-bold text-lg">Total Investment</div>
                      <div className="text-2xl font-bold text-strength-600">$2.5M CAD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-military-50 to-military-100 border border-military-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-military-800 mb-6">🎯 Milestones & Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-military-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                    <div className="flex-1">
                      <div className="font-semibold">Months 1-3: Team Assembly</div>
                      <div className="text-sm text-gray-600">Hire Lead Full Stack Engineer and core team</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-military-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                    <div className="flex-1">
                      <div className="font-semibold">Months 4-8: Core Development</div>
                      <div className="text-sm text-gray-600">Complete both apps, security implementation</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-military-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                    <div className="flex-1">
                      <div className="font-semibold">Months 9-12: VAC Integration</div>
                      <div className="text-sm text-gray-600">Government partnerships, compliance certification</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-military-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                    <div className="flex-1">
                      <div className="font-semibold">Months 13-15: Beta Testing</div>
                      <div className="text-sm text-gray-600">Veteran community testing, clinical validation</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-military-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">5</div>
                    <div className="flex-1">
                      <div className="font-semibold">Months 16-18: National Launch</div>
                      <div className="text-sm text-gray-600">Full deployment across Canada</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-honor-50 to-honor-100 border border-honor-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-honor-800 mb-6">📊 Expected Returns</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Year 1 Revenue</span>
                      <span className="text-lg font-bold text-honor-600">$1.2M</span>
                    </div>
                    <div className="text-sm text-gray-600">Initial VAC contracts and pilot programs</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Year 3 Revenue</span>
                      <span className="text-lg font-bold text-honor-600">$6.3M</span>
                    </div>
                    <div className="text-sm text-gray-600">Full national deployment and expansion</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Break-even Point</span>
                      <span className="text-lg font-bold text-honor-600">Month 18</span>
                    </div>
                    <div className="text-sm text-gray-600">Sustainable operations achieved</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">5-Year Valuation</span>
                      <span className="text-lg font-bold text-honor-600">$25M+</span>
                    </div>
                    <div className="text-sm text-gray-600">Based on comparable healthcare platforms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-military-600 to-strength-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Invest Now?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrophyIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">First-Mover Advantage</h4>
                <p className="text-sm opacity-90">No comprehensive veteran family platform exists in Canada</p>
              </div>
              <div className="text-center">
                <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">Government Support</h4>
                <p className="text-sm opacity-90">Strong political will and funding for veteran mental health</p>
              </div>
              <div className="text-center">
                <HeartIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h4 className="font-semibold mb-2">Social Impact</h4>
                <p className="text-sm opacity-90">Directly saving veteran lives and supporting families</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'demo',
      title: 'Live Demo & Next Steps',
      icon: DocumentTextIcon,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <DocumentTextIcon className="h-16 w-16 text-healing-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience the Platform</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              See both applications in action and understand the complete veteran family support ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-military-50 to-military-100 border border-military-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-military-800 mb-6">🎖️ Veteran App Demo</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Crisis Assessment Simulation</h4>
                  <p className="text-sm text-gray-600 mb-3">Experience PCL-5/PHQ-9 with real-time risk analysis</p>
                  <a
                    href="/dev/assessment"
                    className="inline-flex items-center px-4 py-2 bg-military-600 text-white rounded-lg hover:bg-military-700 transition-colors"
                  >
                    Try Assessment <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Alex AI Companion</h4>
                  <p className="text-sm text-gray-600 mb-3">Chat with military culture-aware AI</p>
                  <a
                    href="/dev/alex"
                    className="inline-flex items-center px-4 py-2 bg-military-600 text-white rounded-lg hover:bg-military-700 transition-colors"
                  >
                    Chat with Alex <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Veteran Dashboard</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete veteran experience overview</p>
                  <a
                    href="/dev/dashboard"
                    className="inline-flex items-center px-4 py-2 bg-military-600 text-white rounded-lg hover:bg-military-700 transition-colors"
                  >
                    View Dashboard <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-honor-50 to-honor-100 border border-honor-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-honor-800 mb-6">👨‍👩‍👧‍👦 Family App Demo</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Family Dashboard</h4>
                  <p className="text-sm text-gray-600 mb-3">Real-time veteran status monitoring</p>
                  <a
                    href="http://localhost:3015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-honor-600 text-white rounded-lg hover:bg-honor-700 transition-colors"
                  >
                    Open Family App <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Crisis Coordination</h4>
                  <p className="text-sm text-gray-600 mb-3">Family crisis response simulation</p>
                  <button className="inline-flex items-center px-4 py-2 bg-honor-600 text-white rounded-lg hover:bg-honor-700 transition-colors">
                    Simulate Crisis <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Support Network</h4>
                  <p className="text-sm text-gray-600 mb-3">Multi-family coordination features</p>
                  <button className="inline-flex items-center px-4 py-2 bg-honor-600 text-white rounded-lg hover:bg-honor-700 transition-colors">
                    View Network <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-healing-600 to-strength-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Ready to Partner with Us?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">🤝 Government Organizations</h4>
                <div className="space-y-2 text-sm opacity-90">
                  <div>• Veterans Affairs Canada partnership opportunities</div>
                  <div>• Provincial health ministry integration</div>
                  <div>• Military Family Resource Centre collaboration</div>
                  <div>• Research and development partnerships</div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">💼 Venture Capital</h4>
                <div className="space-y-2 text-sm opacity-90">
                  <div>• Series A funding opportunity</div>
                  <div>• Healthcare technology investment</div>
                  <div>• Social impact investing</div>
                  <div>• Canadian innovation support</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="text-lg font-semibold mb-2">Contact Information</div>
              <div className="text-sm opacity-90">
                Email: partnerships@veteransupport.ca | Phone: +1 (613) 555-VETS
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Immediate Next Steps</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-military-50 rounded-lg">
                <div className="w-12 h-12 bg-military-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h4 className="font-semibold mb-2">Schedule Deep Dive</h4>
                <p className="text-sm text-gray-600">Technical demonstration and business model review</p>
              </div>
              <div className="text-center p-6 bg-honor-50 rounded-lg">
                <div className="w-12 h-12 bg-honor-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h4 className="font-semibold mb-2">Due Diligence</h4>
                <p className="text-sm text-gray-600">Financial projections and technical architecture review</p>
              </div>
              <div className="text-center p-6 bg-strength-50 rounded-lg">
                <div className="w-12 h-12 bg-strength-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h4 className="font-semibold mb-2">Partnership Agreement</h4>
                <p className="text-sm text-gray-600">Investment terms and collaboration framework</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ShieldCheckIcon className="h-8 w-8 text-military-600" />
              <h1 className="text-2xl font-bold text-gray-900">VeteranSupport.ca - Investor Brief</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <div className="flex space-x-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-military-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  index === currentSlide
                    ? 'border-military-600 text-military-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <slide.icon className="h-4 w-4" />
                <span>{slide.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 min-h-[600px]">
          {slides[currentSlide].content}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSlide === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-military-600 text-white hover:bg-military-700'
            }`}
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {slides[currentSlide].title}
            </p>
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-military-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSlide === slides.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-military-600 text-white hover:bg-military-700'
            }`}
          >
            <span>Next</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
