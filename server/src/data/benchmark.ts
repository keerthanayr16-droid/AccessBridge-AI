export interface BenchmarkQuestion {
  question_id: string;
  domain: 'education' | 'healthcare' | 'social_welfare' | 'disability_services';
  question: string;
  language: 'en' | 'kn' | 'hi' | 'ta';
  jurisdiction: string;
  question_type: 'factual' | 'conditional' | 'multi_doc' | 'version_conflict' | 'cross_language' | 'abstention';
  required_context: string[];
  expected_action: 'answer' | 'clarify' | 'abstain';
  expected_answer: string | null;
  evidence: {
    document_id: string;
    section: string;
    page: number;
  }[];
  unsupported_claims: string[];
  review_status: 'human_verified';
}

export const BENCHMARK_QUESTIONS: BenchmarkQuestion[] = [
  // 1. Direct Factual
  {
    question_id: "AB001",
    domain: "education",
    question: "What documents are required for a scholarship for higher education in Karnataka?",
    language: "en",
    jurisdiction: "Karnataka",
    question_type: "factual",
    required_context: [],
    expected_action: "answer",
    expected_answer: "Required documents include Income Certificate (Nadakacheri RD number), Caste Certificate (if applicable), Academic Records (SSLC & PUC/12th), Aadhaar Card, and Bank Account Details seeded with DBT.",
    evidence: [{ document_id: "DOC-SSP-KA-2024", section: "Rule 6: Mandatory Documentation", page: 11 }],
    unsupported_claims: ["Original passport is mandatory", "Any income level qualifies without limit"],
    review_status: "human_verified"
  },
  {
    question_id: "AB002",
    domain: "healthcare",
    question: "What is the annual hospitalization coverage under Ayushman Bharat PM-JAY?",
    language: "en",
    jurisdiction: "All India",
    question_type: "factual",
    required_context: [],
    expected_action: "answer",
    expected_answer: "Ayushman Bharat PM-JAY provides cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year across all empanelled hospitals.",
    evidence: [{ document_id: "DOC-AB-PMJAY-2024", section: "Chapter 4: Hospital Treatment & Portability", page: 14 }],
    unsupported_claims: ["Outpatient prescription drugs outside hospital are 100% free everywhere", "Maximum limit is ₹10 Lakhs"],
    review_status: "human_verified"
  },
  {
    question_id: "AB003",
    domain: "social_welfare",
    question: "What is the qualifying age for the Indira Gandhi National Old Age Pension Scheme?",
    language: "en",
    jurisdiction: "All India",
    question_type: "factual",
    required_context: [],
    expected_action: "answer",
    expected_answer: "The applicant must be 60 years of age or older and belong to a household living below the official poverty line (BPL).",
    evidence: [{ document_id: "DOC-NSAP-IGNOAPS-2024", section: "Article 2.2: Age and Means Testing", page: 12 }],
    unsupported_claims: ["Eligible from age 55 without poverty criteria"],
    review_status: "human_verified"
  },
  {
    question_id: "AB004",
    domain: "disability_services",
    question: "What minimum percentage of disability is required to obtain a UDID smart card?",
    language: "en",
    jurisdiction: "All India",
    question_type: "factual",
    required_context: [],
    expected_action: "answer",
    expected_answer: "A minimum benchmark disability of 40% certified by an authorized medical board under the RPwD Act 2016 is required.",
    evidence: [{ document_id: "DOC-DEPWD-UDID-2024", section: "Clause 3: Eligibility & Assessment Standards", page: 5 }],
    unsupported_claims: ["Any degree of temporary impairment regardless of percentage"],
    review_status: "human_verified"
  },

  // 2. Conditional Questions
  {
    question_id: "AB025",
    domain: "education",
    question: "Can an engineering student with family income of ₹3.5 Lakhs qualify for Central Sector Scholarship?",
    language: "en",
    jurisdiction: "All India",
    question_type: "conditional",
    required_context: ["Class 12 percentile rank", "Regular college admission status"],
    expected_action: "clarify",
    expected_answer: "Income is within the ₹4.5 Lakh limit, but eligibility also strictly depends on scoring above the 80th percentile in Class 12 and studying full-time without other scholarships.",
    evidence: [{ document_id: "DOC-NSP-2024", section: "Section 3: Eligibility Criteria", page: 4 }],
    unsupported_claims: ["Automatically eligible based on income alone"],
    review_status: "human_verified"
  },
  {
    question_id: "AB026",
    domain: "healthcare",
    question: "Can an 82-year-old grandfather obtain Ayushman Bharat if the family is above poverty line?",
    language: "en",
    jurisdiction: "All India",
    question_type: "conditional",
    required_context: [],
    expected_action: "answer",
    expected_answer: "Yes, under the 2024 PM-JAY expansion, all senior citizens aged 70 years and above are entitled to ₹5 Lakh annual health coverage regardless of family income.",
    evidence: [{ document_id: "DOC-AB-PMJAY-2024", section: "Chapter 2: Beneficiary Identification & Entitlement", page: 6 }],
    unsupported_claims: ["APL senior citizens are strictly ineligible"],
    review_status: "human_verified"
  },
  {
    question_id: "AB027",
    domain: "disability_services",
    question: "What concession rate does an adult receive for assistive appliances under ADIP if monthly income is ₹24,000?",
    language: "en",
    jurisdiction: "All India",
    question_type: "conditional",
    required_context: ["Disability certificate status", "Prior aid within 3 years"],
    expected_action: "answer",
    expected_answer: "Beneficiaries with monthly household income between ₹20,001 and ₹30,000 receive a 50% subsidy on the cost of assistive devices (provided they have 40%+ disability and received no aid in the past 3 years).",
    evidence: [{ document_id: "DOC-ADIP-2024", section: "Section 4: Income Ceilings for Assistance", page: 6 }],
    unsupported_claims: ["100% free assistance for income above ₹20,000"],
    review_status: "human_verified"
  },

  // 3. Multi-Document Questions
  {
    question_id: "AB049",
    domain: "education",
    question: "How do the income eligibility criteria compare between Karnataka State Post-Matric Scholarship and Central Sector NSP?",
    language: "en",
    jurisdiction: "Karnataka vs Central",
    question_type: "multi_doc",
    required_context: [],
    expected_action: "answer",
    expected_answer: "Karnataka Post-Matric sets category-specific limits (SC/ST ₹2.5L/₹10L, Cat-1 ₹2.5L, 2A/3A/3B ₹1.0L), whereas Central Sector NSP sets a flat gross family ceiling of ₹4.5 Lakhs combined with an 80th percentile merit cutoff.",
    evidence: [
      { document_id: "DOC-SSP-KA-2024", section: "Rule 4.1: Domicile and Family Income Cap", page: 5 },
      { document_id: "DOC-NSP-2024", section: "Section 3: Eligibility Criteria", page: 4 }
    ],
    unsupported_claims: ["Both have identical universal income caps of ₹5 Lakhs"],
    review_status: "human_verified"
  },

  // 4. Outdated / Conflicting Policy
  {
    question_id: "AB067",
    domain: "education",
    question: "Is the parental income ceiling for Central Sector College Scholarship ₹6 Lakhs or ₹4.5 Lakhs?",
    language: "en",
    jurisdiction: "All India",
    question_type: "version_conflict",
    required_context: [],
    expected_action: "answer",
    expected_answer: "Under the current active 2024-25 guidelines (v4.2), the ceiling is strictly ₹4.5 Lakhs per annum. Older superseded circulars quoting ₹6 Lakhs are no longer legally valid.",
    evidence: [
      { document_id: "DOC-NSP-2024", section: "Section 3: Eligibility Criteria", page: 4 },
      { document_id: "DOC-NSP-OLD-2021", section: "Section 3: Archived Eligibility", page: 3 }
    ],
    unsupported_claims: ["₹6 Lakhs ceiling is currently active"],
    review_status: "human_verified"
  },

  // 5. Cross-Language Questions
  {
    question_id: "AB085",
    domain: "education",
    question: "ಕರ್ನಾಟಕದಲ್ಲಿ ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?",
    language: "kn",
    jurisdiction: "Karnataka",
    question_type: "cross_language",
    required_context: [],
    expected_action: "answer",
    expected_answer: "ಅಗತ್ಯ ದಾಖಲೆಗಳು: ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (ನಾಡಕಚೇರಿ RD ಸಂಖ್ಯೆ), ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ಅನ್ವಯಿಸಿದರೆ), ಅಂಕಪಟ್ಟಿಗಳು (SSLC ಮತ್ತು PUC), ಆಧಾರ್ ಕಾರ್ಡ್, ಮತ್ತು DBT ಸಕ್ರಿಯವಾಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು.",
    evidence: [{ document_id: "DOC-SSP-KA-2024", section: "Rule 6: Mandatory Documentation", page: 11 }],
    unsupported_claims: ["ಪಾಸ್‌ಪೋರ್ಟ್ ಕಡ್ಡಾಯ"],
    review_status: "human_verified"
  },
  {
    question_id: "AB086",
    domain: "healthcare",
    question: "आयुष्मान भारत योजना के तहत प्रति परिवार कितना इलाज मुफ्त मिलता है?",
    language: "hi",
    jurisdiction: "All India",
    question_type: "cross_language",
    required_context: [],
    expected_action: "answer",
    expected_answer: "आयुष्मान भारत (PM-JAY) योजना के तहत प्रत्येक पात्र परिवार को प्रति वर्ष ₹5,00,000 (5 लाख रुपये) तक का कैशलेस इलाज सूचीबद्ध अस्पतालों में उपलब्ध कराया जाता है।",
    evidence: [{ document_id: "DOC-AB-PMJAY-2024", section: "Chapter 4: Hospital Treatment & Portability", page: 14 }],
    unsupported_claims: ["प्रति व्यक्ति ₹10 लाख"],
    review_status: "human_verified"
  },
  {
    question_id: "AB087",
    domain: "disability_services",
    question: "மாற்றுத்திறனாளிகளுக்கான தேசிய அடையாள அட்டை (UDID) பெற குறைந்தபட்ச ஊனம் எவ்வளவு இருக்க வேண்டும்?",
    language: "ta",
    jurisdiction: "All India",
    question_type: "cross_language",
    required_context: [],
    expected_action: "answer",
    expected_answer: "UDID அட்டை பெற அங்கீகரிக்கப்பட்ட மருத்துவ வாரியத்தால் சான்றளிக்கப்பட்ட குறைந்தபட்சம் 40% மாற்றுத்திறன் (Benchmark Disability) அவசியமாகும்.",
    evidence: [{ document_id: "DOC-DEPWD-UDID-2024", section: "Clause 3: Eligibility & Assessment Standards", page: 5 }],
    unsupported_claims: ["எந்த அளவிலும் ஊனம் தேவையில்லை"],
    review_status: "human_verified"
  },

  // 6. Insufficient Evidence / Abstention
  {
    question_id: "AB103",
    domain: "healthcare",
    question: "Does the local primary health sub-centre in Nelamangala have an active dialysis unit operating today?",
    language: "en",
    jurisdiction: "Karnataka",
    question_type: "abstention",
    required_context: [],
    expected_action: "abstain",
    expected_answer: null,
    evidence: [],
    unsupported_claims: ["Nelamangala sub-centre has 4 working dialysis machines today with free slots"],
    review_status: "human_verified"
  },
  {
    question_id: "AB104",
    domain: "social_welfare",
    question: "Has my uncle's pending pension application submitted at Ramanagara Taluk Office been approved this morning?",
    language: "en",
    jurisdiction: "Karnataka",
    question_type: "abstention",
    required_context: [],
    expected_action: "abstain",
    expected_answer: null,
    evidence: [],
    unsupported_claims: ["Application approved with sanction number #98212"],
    review_status: "human_verified"
  }
];
