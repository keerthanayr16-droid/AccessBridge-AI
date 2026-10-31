import { Scheme, PolicyDocument, RAGResponse, ExperimentRunResult } from '../types';

export const API_BASE = '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to load categories');
    return res.json();
  },

  async getSchemes(params?: { domain?: string; search?: string; jurisdiction?: string }) {
    const url = new URL(`${API_BASE}/schemes`, window.location.origin);
    if (params?.domain) url.searchParams.set('domain', params.domain);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.jurisdiction) url.searchParams.set('jurisdiction', params.jurisdiction);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch schemes');
    return res.json() as Promise<{ count: number; schemes: Scheme[] }>;
  },

  async getDocuments(params?: { category?: string; status?: string }) {
    const url = new URL(`${API_BASE}/documents`, window.location.origin);
    if (params?.category) url.searchParams.set('category', params.category);
    if (params?.status) url.searchParams.set('status', params.status);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json() as Promise<{ count: number; documents: PolicyDocument[] }>;
  },

  async uploadDocument(data: Partial<PolicyDocument>) {
    const res = await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
  },

  async askQuestion(payload: {
    query: string;
    language?: string;
    domain?: string;
    jurisdiction?: string;
    context?: Record<string, string>;
    systemVersion?: 'A' | 'B' | 'C';
  }): Promise<RAGResponse> {
    const res = await fetch(`${API_BASE}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to process question');
    return res.json();
  },

  async submitClarification(payload: {
    originalQuery: string;
    submittedContext: Record<string, string>;
    language?: string;
  }): Promise<RAGResponse> {
    const res = await fetch(`${API_BASE}/clarify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit clarification');
    return res.json();
  },

  async getBenchmark() {
    const res = await fetch(`${API_BASE}/evaluations/benchmark`);
    if (!res.ok) throw new Error('Failed to fetch benchmark');
    return res.json();
  },

  async runEvaluation(): Promise<{
    benchmark: string;
    evaluatedAt: string;
    results: Record<'A' | 'B' | 'C', ExperimentRunResult>;
  }> {
    const res = await fetch(`${API_BASE}/evaluations/run`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to run evaluation experiment');
    return res.json();
  }
};
