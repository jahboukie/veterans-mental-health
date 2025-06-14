/**
 * VETERANS AFFAIRS CANADA - SUPPORT RESOURCES INTEGRATION
 * Canadian-specific veteran mental health resources and crisis support
 */

export interface CanadianVeteranResource {
  id: string;
  name: string;
  type: 'crisis' | 'mental_health' | 'benefits' | 'employment' | 'family' | 'housing';
  phoneNumber?: string;
  website?: string;
  email?: string;
  hours: string;
  description: string;
  eligibility: string[];
  languages: string[];
  regions: string[];
}

export interface ProvincialResource {
  province: string;
  provincialCode: string;
  crisisLine: string;
  mentalHealthServices: string[];
  veteranCenters: string[];
}

export class CanadianVeteranSupport {
  
  /**
   * Primary Canadian veteran crisis and support resources
   */
  public readonly CANADIAN_VETERAN_RESOURCES: CanadianVeteranResource[] = [
    {
      id: 'vac_crisis_line',
      name: 'Veterans Affairs Canada Crisis Line',
      type: 'crisis',
      phoneNumber: '1-800-268-7708',
      website: 'https://www.veterans.gc.ca/eng/contact/talk-to-a-professional',
      hours: '24/7',
      description: 'Immediate crisis support for Canadian veterans and their families',
      eligibility: ['Canadian Armed Forces veterans', 'RCMP veterans', 'Family members'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    },
    {
      id: 'canada_suicide_prevention',
      name: 'Canada Suicide Prevention Service',
      type: 'crisis',
      phoneNumber: '1-833-456-4566',
      website: 'https://talksuicide.ca/',
      hours: '24/7',
      description: 'National suicide prevention service available to all Canadians',
      eligibility: ['All Canadians'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    },
    {
      id: 'vac_mental_health',
      name: 'VAC Mental Health Benefits',
      type: 'mental_health',
      phoneNumber: '1-866-522-2122',
      website: 'https://www.veterans.gc.ca/eng/health-support/mental-health-wellness',
      hours: 'Monday-Friday 8:30 AM - 4:30 PM',
      description: 'Comprehensive mental health coverage for treatment and medication',
      eligibility: ['Veterans with service-related injuries', 'Modern veterans'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    },
    {
      id: 'oss_veteran_family',
      name: 'Operational Stress Injury Social Support (OSISS)',
      type: 'family',
      phoneNumber: '1-800-883-6094',
      website: 'https://www.veterans.gc.ca/eng/health-support/mental-health-wellness/understand-mental-health/osiss',
      hours: 'Varies by location',
      description: 'Peer support network for veterans and families affected by operational stress injuries',
      eligibility: ['CF/RCMP veterans', 'Spouses', 'Family members'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    },
    {
      id: 'vac_family_information',
      name: 'VAC Family Information Line',
      type: 'family',
      phoneNumber: '1-866-522-2122',
      website: 'https://www.veterans.gc.ca/eng/family',
      hours: 'Monday-Friday 8:30 AM - 4:30 PM',
      description: 'Information and support for veteran families and survivors',
      eligibility: ['Veteran families', 'Survivors', 'Caregivers'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    },
    {
      id: 'vac_rehabilitation',
      name: 'VAC Rehabilitation Services',
      type: 'mental_health',
      phoneNumber: '1-866-522-2122',
      website: 'https://www.veterans.gc.ca/eng/health-support/physical-health-and-rehabilitation',
      hours: 'Monday-Friday 8:30 AM - 4:30 PM',
      description: 'Comprehensive rehabilitation programs including mental health treatment',
      eligibility: ['Veterans with service-related conditions'],
      languages: ['English', 'French'],
      regions: ['All provinces and territories']
    }
  ];

  /**
   * Provincial mental health resources for veterans
   */
  public readonly PROVINCIAL_RESOURCES: ProvincialResource[] = [
    {
      province: 'Ontario',
      provincialCode: 'ON',
      crisisLine: '1-866-531-2600',
      mentalHealthServices: [
        'Connex Ontario Mental Health Services',
        'Ontario Structured Psychotherapy Program'
      ],
      veteranCenters: [
        'Toronto Veterans Centre',
        'Ottawa Veterans Centre', 
        'London Veterans Centre'
      ]
    },
    {
      province: 'British Columbia',
      provincialCode: 'BC',
      crisisLine: '1-800-784-2433',
      mentalHealthServices: [
        'BC Crisis Centre',
        'BC Mental Health Support'
      ],
      veteranCenters: [
        'Vancouver Veterans Centre',
        'Victoria Veterans Centre'
      ]
    },
    {
      province: 'Alberta',
      provincialCode: 'AB',
      crisisLine: '1-877-303-2642',
      mentalHealthServices: [
        'Alberta Health Services Mental Health',
        'Calgary Distress Centre'
      ],
      veteranCenters: [
        'Calgary Veterans Centre',
        'Edmonton Veterans Centre'
      ]
    },
    {
      province: 'Quebec',
      provincialCode: 'QC',
      crisisLine: '1-866-277-3553',
      mentalHealthServices: [
        'Suicide Action Montreal',
        'Quebec Mental Health Services'
      ],
      veteranCenters: [
        'Montreal Veterans Centre',
        'Quebec City Veterans Centre'
      ]
    },
    {
      province: 'Nova Scotia',
      provincialCode: 'NS',
      crisisLine: '1-888-429-8167',
      mentalHealthServices: [
        'Nova Scotia Health Mental Health Services',
        'IWK Mobile Crisis Team'
      ],
      veteranCenters: [
        'Halifax Veterans Centre'
      ]
    },
    {
      province: 'New Brunswick',
      provincialCode: 'NB',
      crisisLine: '1-800-667-5005',
      mentalHealthServices: [
        'New Brunswick Mental Health Services',
        'Chimo Crisis Centre'
      ],
      veteranCenters: [
        'Fredericton Veterans Centre'
      ]
    }
  ];

  /**
   * Get resources by veteran location
   */
  getResourcesByProvince(province: string): {
    national: CanadianVeteranResource[];
    provincial: ProvincialResource | undefined;
  } {
    return {
      national: this.CANADIAN_VETERAN_RESOURCES,
      provincial: this.PROVINCIAL_RESOURCES.find(p => 
        p.province.toLowerCase() === province.toLowerCase() ||
        p.provincialCode.toLowerCase() === province.toLowerCase()
      )
    };
  }

  /**
   * Get crisis resources immediately
   */
  getCrisisResources(): CanadianVeteranResource[] {
    return this.CANADIAN_VETERAN_RESOURCES.filter(resource => 
      resource.type === 'crisis'
    );
  }

  /**
   * Get family support resources
   */
  getFamilyResources(): CanadianVeteranResource[] {
    return this.CANADIAN_VETERAN_RESOURCES.filter(resource => 
      resource.type === 'family'
    );
  }

  /**
   * Format phone number for Canadian dialing
   */
  formatCanadianPhone(phoneNumber: string): {
    display: string;
    dialable: string;
    international: string;
  } {
    // Remove any existing formatting
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format for display
    let display = phoneNumber;
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      const number = cleaned.substring(1);
      display = `1-${number.substring(0,3)}-${number.substring(3,6)}-${number.substring(6)}`;
    }

    return {
      display,
      dialable: cleaned,
      international: cleaned.startsWith('1') ? `+${cleaned}` : `+1${cleaned}`
    };
  }

  /**
   * Get veteran eligibility information
   */
  getVeteranEligibility(): {
    regularForce: string[];
    reserveForce: string[];
    rcmp: string[];
    family: string[];
  } {
    return {
      regularForce: [
        'Served in Canadian Armed Forces Regular Force',
        'Released with service-related injury or illness',
        'Minimum service requirements met'
      ],
      reserveForce: [
        'Served in Canadian Armed Forces Reserve',
        'Deployed on operations or training',
        'Service-related injury or illness'
      ],
      rcmp: [
        'Served as RCMP member',
        'Service-related operational stress injury',
        'Minimum service requirements'
      ],
      family: [
        'Spouse or common-law partner of veteran',
        'Children of veterans',
        'Survivors of deceased veterans',
        'Primary caregivers'
      ]
    };
  }

  /**
   * Generate Canadian veteran crisis safety plan
   */
  generateCanadianCrisisPlan(province: string): {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    emergencyContacts: any[];
  } {
    const provincialResource = this.PROVINCIAL_RESOURCES.find(p => 
      p.province.toLowerCase() === province.toLowerCase()
    );

    return {
      step1: 'Recognize warning signs: changes in mood, sleep, appetite, or thoughts',
      step2: 'Use personal coping strategies: breathing exercises, grounding techniques, physical activity',
      step3: `Contact support person: family member, friend, or buddy from service`,
      step4: `Call VAC Crisis Line: 1-800-268-7708 (available 24/7 in English and French)`,
      step5: provincialResource ? 
        `Call provincial crisis line: ${provincialResource.crisisLine} or emergency services: 911` :
        'Call emergency services: 911 if in immediate danger',
      emergencyContacts: [
        {
          name: 'VAC Crisis Line',
          phone: '1-800-268-7708',
          available: '24/7',
          type: 'veteran_specific'
        },
        {
          name: 'Canada Suicide Prevention',
          phone: '1-833-456-4566',
          available: '24/7',
          type: 'general_crisis'
        },
        {
          name: 'Emergency Services',
          phone: '911',
          available: '24/7',
          type: 'emergency'
        }
      ]
    };
  }

  /**
   * Get VAC service standards and wait times
   */
  getVACServiceInfo(): {
    disabilityBenefits: string;
    mentalHealthCoverage: string;
    rehabilitationServices: string;
    familySupport: string;
  } {
    return {
      disabilityBenefits: 'Target: 16 weeks for first application, 16 weeks for review',
      mentalHealthCoverage: 'Immediate coverage available for urgent mental health needs',
      rehabilitationServices: 'Assessment within 30 days of referral',
      familySupport: 'Family information and support available immediately'
    };
  }
}

export default CanadianVeteranSupport;