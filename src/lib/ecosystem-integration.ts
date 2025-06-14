/**
 * ECOSYSTEM INTEGRATION - AI CORRELATION & SENTIMENT ANALYSIS
 * Connects veterans mental health app to broader healthcare intelligence platform
 */

import axios from 'axios';

export interface EcosystemConfig {
  sentimentServiceUrl: string;
  aiOrchestrationUrl: string;
  analyticsEngineUrl: string;
  apiGatewayUrl: string;
  apiKey: string;
}

export interface VeteranSentimentData {
  veteranId: string;
  sessionId: string;
  messageText: string;
  timestamp: string;
  context: {
    assessmentScores?: {
      pcl5?: number;
      phq9?: number;
    };
    riskLevel: 'low' | 'medium' | 'high' | 'crisis';
    militaryContext: {
      serviceBranch?: string;
      deploymentHistory?: boolean;
      combatExposure?: boolean;
    };
    sessionType: 'assessment' | 'ai_chat' | 'crisis_intervention' | 'family_session';
  };
}

export interface VeteranCorrelationInsight {
  veteranId: string;
  insights: {
    riskTrends: string[];
    interventionRecommendations: string[];
    familyAlerts: string[];
    providerReferrals: string[];
  };
  correlations: {
    withOtherApps: any[];
    crossPlatformPatterns: any[];
    familyDynamics: any[];
  };
  alerts: {
    crisisRisk: boolean;
    familySupport: boolean;
    providerIntervention: boolean;
  };
}

export class EcosystemIntegration {
  private config: EcosystemConfig;

  constructor(config: EcosystemConfig) {
    this.config = config;
  }

  /**
   * Send veteran message to sentiment analysis service
   */
  async analyzeSentiment(data: VeteranSentimentData): Promise<any> {
    try {
      const response = await axios.post(
        `${this.config.sentimentServiceUrl}/api/sentiment/analyze`,
        {
          ...data,
          metadata: {
            source: 'veterans-mental-health',
            classification: 'veteran_mental_health',
            militaryContext: true,
            traumaInformed: true
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Sentiment analysis failed:', error);
      return {
        sentiment: 'neutral',
        confidence: 0,
        riskIndicators: [],
        error: 'Sentiment analysis unavailable'
      };
    }
  }

  /**
   * Get AI-driven insights and correlations for veteran
   */
  async getVeteranInsights(veteranId: string): Promise<VeteranCorrelationInsight> {
    try {
      const response = await axios.get(
        `${this.config.analyticsEngineUrl}/api/insights/veteran/${veteranId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Veteran insights failed:', error);
      return {
        veteranId,
        insights: {
          riskTrends: [],
          interventionRecommendations: ['Continue monitoring'],
          familyAlerts: [],
          providerReferrals: []
        },
        correlations: {
          withOtherApps: [],
          crossPlatformPatterns: [],
          familyDynamics: []
        },
        alerts: {
          crisisRisk: false,
          familySupport: false,
          providerIntervention: false
        }
      };
    }
  }

  /**
   * Submit veteran assessment data to analytics engine
   */
  async submitAssessmentToEcosystem(assessmentData: any, veteranId: string): Promise<any> {
    try {
      const correlationData = {
        userId: veteranId,
        appSource: 'veterans-mental-health',
        dataType: 'clinical_assessment',
        assessment: {
          ...assessmentData,
          veteranSpecific: true,
          militaryContext: true,
          timestamp: new Date().toISOString()
        },
        correlationRequest: {
          checkFamilyApps: true,
          checkProviderNetwork: true,
          checkCrisisPatterns: true
        }
      };

      const response = await axios.post(
        `${this.config.analyticsEngineUrl}/api/correlation/veteran-assessment`,
        correlationData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Assessment correlation failed:', error);
      return {
        correlationId: null,
        insights: [],
        recommendations: []
      };
    }
  }

  /**
   * Real-time crisis alert to ecosystem
   */
  async triggerCrisisAlert(veteranId: string, crisisData: any): Promise<any> {
    try {
      const alertData = {
        alertType: 'VETERAN_CRISIS',
        veteranId,
        severity: 'HIGH',
        timestamp: new Date().toISOString(),
        source: 'veterans-mental-health',
        crisisData: {
          ...crisisData,
          veteranSpecific: true,
          canadianVeteran: true
        },
        requiredActions: [
          'NOTIFY_FAMILY_SUPPORT_APP',
          'ALERT_PROVIDER_NETWORK',
          'TRIGGER_CRISIS_PROTOCOL'
        ]
      };

      const response = await axios.post(
        `${this.config.aiOrchestrationUrl}/api/crisis/veteran-alert`,
        alertData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-App-Source': 'veterans-mental-health',
            'X-Priority': 'CRITICAL'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Crisis alert failed:', error);
      // Crisis alerts must not fail - implement backup protocols
      await this.backupCrisisAlert(veteranId, crisisData);
      return { status: 'backup_triggered' };
    }
  }

  /**
   * Connect veteran to family support network
   */
  async connectFamilySupport(veteranId: string, familyMembers: any[]): Promise<any> {
    try {
      const familyData = {
        veteranId,
        familyMembers: familyMembers.map(member => ({
          ...member,
          relationship: member.relationship,
          accessLevel: member.accessLevel || 'basic',
          crisisContact: member.crisisContact || false
        })),
        integrationRequest: {
          createFamilyApp: true,
          enableCorrelation: true,
          shareBasicStatus: true,
          emergencyAccess: true
        }
      };

      const response = await axios.post(
        `${this.config.apiGatewayUrl}/api/family/veteran-integration`,
        familyData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Family integration failed:', error);
      return {
        familyAppUrl: null,
        integrationStatus: 'failed',
        backupContacts: familyMembers
      };
    }
  }

  /**
   * Get ecosystem health dashboard for veteran
   */
  async getVeteranEcosystemDashboard(veteranId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.config.analyticsEngineUrl}/api/dashboard/veteran/${veteranId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return {
        veteranStatus: response.data.veteranStatus,
        familyEngagement: response.data.familyEngagement,
        providerConnections: response.data.providerConnections,
        crossAppInsights: response.data.crossAppInsights,
        riskAssessment: response.data.riskAssessment,
        recommendations: response.data.recommendations
      };
    } catch (error: any) {
      console.error('Dashboard data failed:', error);
      return {
        veteranStatus: 'unknown',
        familyEngagement: 'none',
        providerConnections: [],
        crossAppInsights: [],
        riskAssessment: 'unavailable',
        recommendations: []
      };
    }
  }

  /**
   * Submit veteran data for Canadian VC demo analytics
   */
  async submitVCDemoData(demoData: any): Promise<any> {
    try {
      const canadianDemoData = {
        ...demoData,
        market: 'Canada',
        veteranType: 'Canadian Armed Forces',
        healthcareSystem: 'Veterans Affairs Canada',
        demoContext: {
          vcPresentation: true,
          canadianMarket: true,
          governmentPartnership: true,
          militaryGradeCompliance: true
        }
      };

      const response = await axios.post(
        `${this.config.analyticsEngineUrl}/api/demo/canadian-veteran-analytics`,
        canadianDemoData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-Demo-Market': 'Canada',
            'X-App-Source': 'veterans-mental-health'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('VC demo data submission failed:', error);
      return { status: 'demo_fallback' };
    }
  }

  /**
   * Backup crisis alert when ecosystem is unavailable
   */
  private async backupCrisisAlert(veteranId: string, crisisData: any): Promise<void> {
    // Log locally and trigger manual intervention protocols
    console.error('[VETERAN_CRISIS_BACKUP]', {
      veteranId,
      crisisData,
      timestamp: new Date().toISOString(),
      action: 'MANUAL_INTERVENTION_REQUIRED'
    });

    // In production, this would trigger:
    // 1. Local crisis intervention protocols
    // 2. Direct communication to emergency contacts
    // 3. Manual notification to crisis team
  }

  /**
   * Health check ecosystem connectivity
   */
  async healthCheck(): Promise<{
    sentimentService: boolean;
    analyticsEngine: boolean;
    aiOrchestration: boolean;
    apiGateway: boolean;
    overallHealth: 'healthy' | 'degraded' | 'offline';
  }> {
    const services = {
      sentimentService: false,
      analyticsEngine: false,
      aiOrchestration: false,
      apiGateway: false
    };

    try {
      // Check each service
      const checks = await Promise.allSettled([
        axios.get(`${this.config.sentimentServiceUrl}/api/health`),
        axios.get(`${this.config.analyticsEngineUrl}/api/health`),
        axios.get(`${this.config.aiOrchestrationUrl}/api/health`),
        axios.get(`${this.config.apiGatewayUrl}/api/health`)
      ]);

      services.sentimentService = checks[0].status === 'fulfilled';
      services.analyticsEngine = checks[1].status === 'fulfilled';
      services.aiOrchestration = checks[2].status === 'fulfilled';
      services.apiGateway = checks[3].status === 'fulfilled';

    } catch (error) {
      console.error('Health check failed:', error);
    }

    const healthyServices = Object.values(services).filter(Boolean).length;
    let overallHealth: 'healthy' | 'degraded' | 'offline';

    if (healthyServices === 4) overallHealth = 'healthy';
    else if (healthyServices >= 2) overallHealth = 'degraded';
    else overallHealth = 'offline';

    return {
      ...services,
      overallHealth
    };
  }
}

/**
 * Default ecosystem configuration for development
 */
export const getEcosystemConfig = (): EcosystemConfig => {
  return {
    sentimentServiceUrl: process.env.VITE_SENTIMENT_SERVICE_URL || 'http://localhost:3005',
    aiOrchestrationUrl: process.env.VITE_AI_ORCHESTRATION_URL || 'http://localhost:3003',
    analyticsEngineUrl: process.env.VITE_ANALYTICS_ENGINE_URL || 'http://localhost:3002',
    apiGatewayUrl: process.env.VITE_API_GATEWAY_URL || 'http://localhost:3000',
    apiKey: process.env.VITE_ECOSYSTEM_API_KEY || 'dev-key-veterans-mental-health'
  };
};

export default EcosystemIntegration;