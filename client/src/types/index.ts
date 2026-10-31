export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  domain: 'education' | 'healthcare' | 'social_welfare' | 'disability_services';
  ministry: string;
  jurisdiction: string;
  description: string;
  summary: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  officialUrl: string;
  portalName: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  status: 'Active' | 'Superseded' | 'Under Review';
  applicableLanguages: string[];
}

export interface PolicyDocument {
  id: string;
  schemeId: string;
  title: string;
  category: 'education' | 'healthcare' | 'social_welfare' | 'disability_services';
  ministry: string;
  jurisdiction: string;
  language: string;
  publicationDate: string;
  effectiveFrom: string;
  effectiveTo?: string;
  version: string;
  status: 'Verified' | 'Needs Review' | 'Superseded';
  sourceUrl: string;
  pageCount: number;
  reviewer: string;
  auditDate: string;
  summary: string;
  passages: {
    section: string;
    page: number;
    text: string;
  }[];
}

export interface ClaimVerification {
  claimText: string;
  status: 'VERIFIED' | 'PARTIALLY_SUPPORTED' | 'OUTDATED_WARNING' | 'UNSUPPORTED';
  confidenceScore: number;
  sourceDocId?: string;
  sourceDocTitle?: string;
  section?: string;
  page?: number;
  policyDate?: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  field: string;
  options: string[];
  whyNeeded: string;
}

export interface RAGResponse {
  answer: string;
  language: string;
  detectedDomain: string;
  isAbstention: boolean;
  abstentionReason?: string;
  requiredDocuments: string[];
  eligibilityConditions: string[];
  officialSources: {
    id: string;
    title: string;
    ministry: string;
    version: string;
    status: 'Verified' | 'Needs Review' | 'Superseded';
    lastUpdated: string;
    sourceUrl: string;
    section: string;
    page: number;
  }[];
  claimVerifications: ClaimVerification[];
  nextSteps: string[];
  clarificationQuestions?: ClarificationQuestion[];
  metrics: {
    retrievalScore: number;
    faithfulnessScore: number;
    policyVersionChecked: boolean;
    activeVersionEnforced: boolean;
    latencyMs: number;
  };
}

export interface ExperimentRunResult {
  systemVersion: 'A' | 'B' | 'C';
  systemName: string;
  totalQuestions: number;
  retrievalRecallAt5: number;
  citationPrecision: number;
  unsupportedClaimRate: number;
  policyVersionAccuracy: number;
  crossLanguageConsistency: number;
  abstentionPrecision: number;
  abstentionRecall: number;
  averageLatencyMs: number;
  estimatedCostPerQueryUSD: number;
  sampleEvaluations: {
    questionId: string;
    question: string;
    type: string;
    action: string;
    status: 'PASS' | 'WARN' | 'FAIL';
    explanation: string;
  }[];
}
