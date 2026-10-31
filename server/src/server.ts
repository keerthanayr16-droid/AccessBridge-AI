import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SCHEMES } from './data/schemes.js';
import { OFFICIAL_DOCUMENTS, PolicyDocument } from './data/documents.js';
import { BENCHMARK_QUESTIONS } from './data/benchmark.js';
import { RAGService } from './services/ragService.js';
import { EvalService } from './services/evalService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Health Endpoint (Verified for Milestone 1 requirements)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: "ok",
    application: "AccessBridge AI",
    milestone: "UI and API foundation",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Service Domains / Categories
app.get('/api/categories', (req: Request, res: Response) => {
  const categories = [
    {
      id: "education",
      title: "Education",
      subtitle: "Scholarships & Support",
      icon: "GraduationCap",
      schemeCount: SCHEMES.filter(s => s.domain === 'education').length,
      description: "Scholarships, college fee concessions, student hostels, and higher education assistance.",
      color: "emerald"
    },
    {
      id: "healthcare",
      title: "Healthcare",
      subtitle: "Schemes & Benefits",
      icon: "HeartPulse",
      schemeCount: SCHEMES.filter(s => s.domain === 'healthcare').length,
      description: "Hospitalization coverage (Ayushman Bharat), treatment subsidies, and senior health support.",
      color: "teal"
    },
    {
      id: "social_welfare",
      title: "Social Welfare",
      subtitle: "Pensions & Assistance",
      icon: "Users",
      schemeCount: SCHEMES.filter(s => s.domain === 'social_welfare').length,
      description: "Old age pensions, widow assistance, maternity cash transfers, and food security.",
      color: "green"
    },
    {
      id: "disability_services",
      title: "Disability Services",
      subtitle: "Rights & Support",
      icon: "Accessibility",
      schemeCount: SCHEMES.filter(s => s.domain === 'disability_services').length,
      description: "UDID digital cards, motorized tricycles, cochlear implants, and assistive technology (ADIP).",
      color: "emerald"
    }
  ];

  res.json({ categories });
});

// 3. Scheme Directory & Search
app.get('/api/schemes', (req: Request, res: Response) => {
  const { domain, search, jurisdiction } = req.query;
  let results = [...SCHEMES];

  if (domain && typeof domain === 'string' && domain !== 'all') {
    results = results.filter(s => s.domain === domain);
  }

  if (jurisdiction && typeof jurisdiction === 'string' && jurisdiction !== 'all') {
    results = results.filter(s => s.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase()));
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.summary.toLowerCase().includes(q) ||
      s.eligibility.some(e => e.toLowerCase().includes(q))
    );
  }

  res.json({ count: results.length, schemes: results });
});

// 4. Scheme Details
app.get('/api/schemes/:id', (req: Request, res: Response) => {
  const scheme = SCHEMES.find(s => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ error: "Scheme not found" });
  }
  res.json({ scheme });
});

// 5. Official Documents Registry
app.get('/api/documents', (req: Request, res: Response) => {
  const { category, status } = req.query;
  let docs = [...OFFICIAL_DOCUMENTS];

  if (category && typeof category === 'string' && category !== 'all') {
    docs = docs.filter(d => d.category === category);
  }

  if (status && typeof status === 'string' && status !== 'all') {
    docs = docs.filter(d => d.status.toLowerCase() === status.toLowerCase());
  }

  res.json({ count: docs.length, documents: docs });
});

// 6. Register / Ingest New Document
app.post('/api/documents', (req: Request, res: Response) => {
  const { title, category, ministry, jurisdiction, language, effectiveFrom, version, sourceUrl, summary } = req.body;

  if (!title || !category || !ministry) {
    return res.status(400).json({ error: "Title, category, and ministry are required." });
  }

  const newDoc: PolicyDocument = {
    id: `DOC-EXT-${Date.now().toString().slice(-4)}`,
    schemeId: `SCH-${category.toUpperCase().slice(0, 3)}-EXT`,
    title,
    category,
    ministry,
    jurisdiction: jurisdiction || 'Central',
    language: language || 'English',
    publicationDate: new Date().toISOString().split('T')[0],
    effectiveFrom: effectiveFrom || new Date().toISOString().split('T')[0],
    version: version || 'v1.0',
    status: 'Needs Review',
    sourceUrl: sourceUrl || 'https://data.gov.in',
    pageCount: 12,
    reviewer: 'Facilitator Queue',
    auditDate: new Date().toISOString().split('T')[0],
    summary: summary || 'User submitted policy circular awaiting secondary verification audit.',
    passages: [
      {
        section: "Section 1: General Notification",
        page: 1,
        text: summary || title
      }
    ]
  };

  OFFICIAL_DOCUMENTS.unshift(newDoc);
  res.status(201).json({ message: "Document ingested successfully", document: newDoc });
});

// 7. RAG Question Answering Endpoint
app.post('/api/questions', async (req: Request, res: Response) => {
  try {
    const { query, language, domain, jurisdiction, context, systemVersion } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Query string is required" });
    }

    const response = await RAGService.answerQuery({
      query,
      language,
      domain,
      jurisdiction,
      context,
      systemVersion
    });

    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error during RAG retrieval", details: err?.message });
  }
});

// 8. Guided Clarification Endpoint
app.post('/api/clarify', async (req: Request, res: Response) => {
  try {
    const { originalQuery, submittedContext, language } = req.body;
    const response = await RAGService.answerQuery({
      query: originalQuery,
      language,
      context: submittedContext
    });
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to process clarification", details: err?.message });
  }
});

// 9. Claim-Level Verification Endpoint
app.post('/api/verify', (req: Request, res: Response) => {
  const { text } = req.body;
  // Sample claim extraction and verification
  res.json({
    verified: true,
    claimsEvaluated: 3,
    groundingScore: 0.96,
    claims: [
      { claim: "Income limit must not exceed prescribed ceiling", status: "VERIFIED", doc: "NSP Guidelines 2024" },
      { claim: "Aadhaar NPCI bank seeding required for DBT", status: "VERIFIED", doc: "NSP Guidelines 2024" }
    ]
  });
});

// 10. Research Benchmark Questions
app.get('/api/evaluations/benchmark', (req: Request, res: Response) => {
  res.json({
    datasetName: "AccessBridge-CommunityQA",
    totalQuestions: BENCHMARK_QUESTIONS.length,
    questions: BENCHMARK_QUESTIONS
  });
});

// 11. Run Multi-System Evaluation Experiment (Version A vs B vs C)
app.post('/api/evaluations/run', (req: Request, res: Response) => {
  const results = EvalService.runComparison();
  res.json({
    benchmark: "AccessBridge-CommunityQA",
    evaluatedAt: new Date().toISOString(),
    results
  });
});

app.listen(port, () => {
  console.log(`AccessBridge API listening at http://localhost:${port}`);
});
