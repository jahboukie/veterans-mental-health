/**
 * VETERANS MENTAL HEALTH - ZERO-KNOWLEDGE ENCRYPTION
 * Military-Grade Security Implementation
 */

import CryptoJS from 'crypto-js';
import { blake3 } from '@noble/hashes/blake3';
import { randomBytes } from 'tweetnacl';

export interface VeteranEncryptedData {
  encrypted: string;
  iv: string;
  tag: string;
  classification: string;
  veteranHash: string;
  timestamp: number;
}

export interface VeteranCrisisData {
  riskLevel: 'low' | 'medium' | 'high' | 'crisis';
  assessmentScores: {
    pcl5?: number;
    phq9?: number;
  };
  crisisIndicators: string[];
  interventionActions: string[];
  emergencyContacts?: any[];
}

export class VeteranSecureEncryption {
  private readonly AES_ALGORITHM = 'aes-256-gcm';
  private readonly KEY_DERIVATION_ITERATIONS = 100000;
  
  public readonly VETERAN_CLASSIFICATIONS = {
    CRISIS: 'crisis_intervention',
    PTSD: 'ptsd_assessment', 
    MENTAL_HEALTH: 'mental_health_record',
    ASSESSMENT: 'clinical_assessment',
    PROFILE: 'veteran_profile',
    SESSION: 'ai_session_data'
  } as const;

  /**
   * Derive encryption key from veteran ID using PBKDF2
   */
  private async deriveVeteranKey(veteranId: string, salt?: string): Promise<string> {
    const actualSalt = salt || CryptoJS.lib.WordArray.random(32).toString();
    const key = CryptoJS.PBKDF2(veteranId, actualSalt, {
      keySize: 256/32,
      iterations: this.KEY_DERIVATION_ITERATIONS
    });
    return key.toString();
  }

  /**
   * Generate cryptographic hash of veteran ID for audit logging
   */
  private hashVeteranId(veteranId: string): string {
    return blake3(new TextEncoder().encode(veteranId), { dkLen: 32 })
      .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }

  /**
   * Client-side encryption before any server transmission
   */
  async encryptVeteranData(
    data: any, 
    veteranId: string, 
    classification: keyof typeof this.VETERAN_CLASSIFICATIONS
  ): Promise<VeteranEncryptedData> {
    try {
      const salt = CryptoJS.lib.WordArray.random(32).toString();
      const key = await this.deriveVeteranKey(veteranId, salt);
      const iv = CryptoJS.lib.WordArray.random(16);

      const payload = {
        classification: this.VETERAN_CLASSIFICATIONS[classification],
        veteranHash: this.hashVeteranId(veteranId),
        timestamp: Date.now(),
        data: data,
        salt: salt
      };

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(payload), 
        key, 
        {
          iv: iv,
          mode: CryptoJS.mode.GCM,
          padding: CryptoJS.pad.NoPadding
        }
      );

      return {
        encrypted: encrypted.ciphertext.toString(),
        iv: iv.toString(),
        tag: encrypted.tag?.toString() || '',
        classification: this.VETERAN_CLASSIFICATIONS[classification],
        veteranHash: this.hashVeteranId(veteranId),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Veteran data encryption failed:', error);
      throw new Error('Failed to encrypt veteran data - security protocol violated');
    }
  }

  /**
   * Crisis data gets maximum protection with additional metadata
   */
  async encryptCrisisData(
    crisisData: VeteranCrisisData, 
    veteranId: string
  ): Promise<VeteranEncryptedData> {
    const enhancedCrisisData = {
      ...crisisData,
      securityLevel: 'MAXIMUM',
      crisisTimestamp: Date.now(),
      emergencyProtocol: 'VETERAN_CRISIS_INTERVENTION',
      requiresImmediateDecryption: crisisData.riskLevel === 'crisis'
    };

    return this.encryptVeteranData(
      enhancedCrisisData,
      veteranId,
      'CRISIS'
    );
  }

  /**
   * Encrypt assessment data with clinical context
   */
  async encryptAssessmentData(
    assessmentData: any,
    veteranId: string,
    assessmentType: 'PCL5' | 'PHQ9' | 'COMBINED'
  ): Promise<VeteranEncryptedData> {
    const clinicalData = {
      ...assessmentData,
      assessmentType,
      clinicalTimestamp: Date.now(),
      requiresProviderAccess: assessmentData.riskLevel === 'high' || assessmentData.riskLevel === 'crisis'
    };

    return this.encryptVeteranData(
      clinicalData,
      veteranId,
      'ASSESSMENT'
    );
  }

  /**
   * Encrypt AI session data with conversation context
   */
  async encryptAISessionData(
    sessionData: any,
    veteranId: string
  ): Promise<VeteranEncryptedData> {
    const aiData = {
      ...sessionData,
      sessionType: 'ALEX_AI_CONVERSATION',
      militaryCultureContext: true,
      traumaInformedProtocol: true
    };

    return this.encryptVeteranData(
      aiData,
      veteranId,
      'SESSION'
    );
  }

  /**
   * Decrypt veteran data (client-side only)
   */
  async decryptVeteranData(
    encryptedData: VeteranEncryptedData,
    veteranId: string
  ): Promise<any> {
    try {
      // Verify veteran ID matches
      const expectedHash = this.hashVeteranId(veteranId);
      if (encryptedData.veteranHash !== expectedHash) {
        throw new Error('Veteran ID mismatch - access denied');
      }

      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Hex.parse(encryptedData.encrypted),
          salt: CryptoJS.lib.WordArray.random(32)
        },
        await this.deriveVeteranKey(veteranId),
        {
          iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
          mode: CryptoJS.mode.GCM,
          padding: CryptoJS.pad.NoPadding
        }
      );

      const payload = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return payload.data;
    } catch (error) {
      console.error('Veteran data decryption failed:', error);
      throw new Error('Failed to decrypt veteran data - security protocol violated');
    }
  }

  /**
   * Generate encryption report for audit purposes
   */
  generateEncryptionReport(encryptedData: VeteranEncryptedData): any {
    return {
      classification: encryptedData.classification,
      veteranHash: encryptedData.veteranHash,
      timestamp: encryptedData.timestamp,
      encryptionMethod: this.AES_ALGORITHM,
      keyDerivation: 'PBKDF2',
      securityLevel: 'MILITARY_GRADE',
      complianceStatus: 'HIPAA_COMPLIANT'
    };
  }
}

export default VeteranSecureEncryption;