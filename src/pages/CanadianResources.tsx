import React, { useState } from 'react'
import { 
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useCanadianVeteran } from '../contexts/CanadianVeteranContext'

const CANADIAN_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 
  'Saskatchewan', 'Yukon'
]

export default function CanadianResources() {
  const { 
    province, 
    setProvince, 
    nationalResources, 
    provincialResources, 
    crisisResources,
    familyResources,
    getVACServiceInfo 
  } = useCanadianVeteran()
  
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crisis' | 'mental_health' | 'family' | 'benefits'>('all')
  const vacInfo = getVACServiceInfo()

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'crisis': return PhoneIcon
      case 'mental_health': return HeartIcon
      case 'family': return UserGroupIcon
      case 'benefits': return ShieldCheckIcon
      default: return InformationCircleIcon
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-red-100 text-red-600'
      case 'mental_health': return 'bg-blue-100 text-blue-600'
      case 'family': return 'bg-green-100 text-green-600'
      case 'benefits': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredResources = nationalResources.filter(resource => 
    selectedCategory === 'all' || resource.type === selectedCategory
  )

  const callResource = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  const visitWebsite = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ShieldCheckIcon className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Canadian Veteran Resources</h1>
        </div>
        <p className="text-lg text-gray-600">
          Comprehensive support for Canadian Armed Forces veterans and their families
        </p>
      </div>

      {/* Province Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Select Your Province/Territory</h2>
        </div>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CANADIAN_PROVINCES.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
        {provincialResources && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">{provincialResources.province} Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-blue-800">Provincial Crisis Line</p>
                <button
                  onClick={() => callResource(provincialResources.crisisLine)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {provincialResources.crisisLine}
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Veteran Centers</p>
                <div className="space-y-1">
                  {provincialResources.veteranCenters.map((center, index) => (
                    <p key={index} className="text-sm text-blue-700">{center}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resource Categories</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Resources' },
            { key: 'crisis', label: 'Crisis Support' },
            { key: 'mental_health', label: 'Mental Health' },
            { key: 'family', label: 'Family Support' },
            { key: 'benefits', label: 'Benefits & Services' }
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crisis Resources - Always Visible */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PhoneIcon className="h-6 w-6 text-red-600" />
          <h2 className="text-lg font-semibold text-red-900">24/7 Crisis Support</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crisisResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
              <div className="space-y-2">
                {resource.phoneNumber && (
                  <button
                    onClick={() => callResource(resource.phoneNumber!)}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    <span>{resource.phoneNumber}</span>
                  </button>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>{resource.hours}</span>
                </div>
                <p className="text-sm text-gray-700">{resource.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {resource.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Resources */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {selectedCategory === 'all' ? 'All Resources' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('_', ' ')} Resources`}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type)
            return (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
                    
                    <div className="space-y-2">
                      {resource.phoneNumber && (
                        <button
                          onClick={() => callResource(resource.phoneNumber!)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <PhoneIcon className="h-4 w-4" />
                          <span className="font-medium">{resource.phoneNumber}</span>
                        </button>
                      )}
                      
                      {resource.website && (
                        <button
                          onClick={() => visitWebsite(resource.website!)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <GlobeAltIcon className="h-4 w-4" />
                          <span className="font-medium">Visit Website</span>
                        </button>
                      )}
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4" />
                        <span>{resource.hours}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Available to:</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.eligibility.map((eligibility, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                            {eligibility}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {resource.languages.map((lang) => (
                        <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* VAC Service Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Veterans Affairs Canada Service Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Disability Benefits</h3>
            <p className="text-sm text-gray-700">{vacInfo.disabilityBenefits}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Mental Health Coverage</h3>
            <p className="text-sm text-gray-700">{vacInfo.mentalHealthCoverage}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Rehabilitation Services</h3>
            <p className="text-sm text-gray-700">{vacInfo.rehabilitationServices}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Family Support</h3>
            <p className="text-sm text-gray-700">{vacInfo.familySupport}</p>
          </div>
        </div>
      </div>
    </div>
  )
}