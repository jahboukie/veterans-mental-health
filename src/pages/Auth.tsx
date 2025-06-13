import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type AuthFormData = z.infer<typeof authSchema>

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp, resetPassword, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    try {
      if (isSignUp) {
        await signUp(data.email, data.password, {
          service_member: true,
          app_name: 'veterans-mental-health'
        })
        toast.success('Account created! Please check your email to verify your account.')
      } else {
        await signIn(data.email, data.password)
        navigate(from, { replace: true })
      }
    } catch (error: any) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    const email = watch('email')
    if (!email) {
      toast.error('Please enter your email address first')
      return
    }

    try {
      await resetPassword(email)
    } catch (error) {
      console.error('Password reset error:', error)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    try {
      // Demo credentials
      const demoEmail = 'demo.veteran@vetsupport.com'
      const demoPassword = 'VetSupport2024!'

      toast.success('Logging in with demo account...')
      await signIn(demoEmail, demoPassword)
      navigate(from, { replace: true })
    } catch (error: any) {
      // If demo account doesn't exist, create it
      try {
        toast.success('Creating demo account...')
        await signUp(demoEmail, demoPassword, {
          service_member: true,
          app_name: 'veterans-mental-health',
          demo_account: true
        })
        toast.success('Demo account created! You can now sign in.')
      } catch (signUpError) {
        console.error('Demo account creation error:', signUpError)
        toast.error('Demo login failed. Please try the development bypass instead.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShieldCheckIcon className="h-12 w-12 text-military-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {isSignUp ? 'Join VetSupport' : 'Welcome Back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="font-medium text-military-600 hover:text-military-500"
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              New to VetSupport?{' '}
              <button
                onClick={toggleMode}
                className="font-medium text-military-600 hover:text-military-500"
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-military sm:rounded-lg sm:px-10">
          {/* Privacy Notice */}
          <div className="mb-6 p-4 bg-military-50 border border-military-200 rounded-lg">
            <div className="flex items-center mb-2">
              <LockClosedIcon className="h-5 w-5 text-military-600 mr-2" />
              <span className="text-sm font-medium text-military-800">
                Military-Grade Privacy
              </span>
            </div>
            <p className="text-xs text-military-700">
              Your data is encrypted with zero-knowledge architecture. We cannot access your personal information, 
              and nothing is shared with the VA without your explicit consent.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-military-500 focus:border-military-500 sm:text-sm"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-military-500 focus:border-military-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    autoComplete="new-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-military-500 focus:border-military-500 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-military-600 hover:text-military-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-military-600 hover:bg-military-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-military-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo & Testing</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => handleDemoLogin()}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-military-300 rounded-md shadow-sm bg-military-50 text-sm font-medium text-military-700 hover:bg-military-100 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-military-600 mr-2"></div>
                ) : null}
                🎯 Demo Login (Test Account)
              </button>

              <div className="text-center">
                <span className="text-xs text-gray-500">or</span>
              </div>

              <button
                type="button"
                onClick={() => window.location.href = '/dev'}
                className="w-full flex justify-center items-center py-2 px-4 border border-honor-300 rounded-md shadow-sm bg-honor-50 text-sm font-medium text-honor-700 hover:bg-honor-100"
              >
                🚀 Development Bypass (No Auth)
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Need immediate help?</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => window.location.href = 'tel:988'}
                  className="w-full flex justify-center items-center py-2 px-4 border border-crisis-300 rounded-md shadow-sm bg-crisis-50 text-sm font-medium text-crisis-700 hover:bg-crisis-100"
                >
                  Veterans Crisis Line: 988
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
