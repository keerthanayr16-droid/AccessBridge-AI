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

export const OFFICIAL_DOCUMENTS: PolicyDocument[] = [
  {
    id: "DOC-NSP-2024",
    schemeId: "SCH-EDU-001",
    title: "National Scholarship Portal Guidelines 2024-25",
    category: "education",
    ministry: "Ministry of Education (Higher Education Dept)",
    jurisdiction: "All India",
    language: "English",
    publicationDate: "2024-05-01",
    effectiveFrom: "2024-06-01",
    version: "v4.2",
    status: "Verified",
    sourceUrl: "https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guidelines.pdf",
    pageCount: 18,
    reviewer: "Dr. K. S. Rao (Policy Audit Team)",
    auditDate: "2024-06-12",
    summary: "The scheme provides financial assistance to eligible students for higher education. Merit cutoff is top 20th percentile of respective State Board Class 12.",
    passages: [
      {
        section: "Section 3: Eligibility Criteria",
        page: 4,
        text: "Students who are above 80th percentile of successful candidates in the relevant stream from a particular Board of Examination in Class XII of 10+2 pattern or equivalent and having gross parental/family annual income up to ₹4.5 lakh per annum are eligible. The candidate must not be availing of any other scholarship scheme."
      },
      {
        section: "Section 5: Required Verification Documents",
        page: 7,
        text: "Mandatory documents include: (1) Valid Income Certificate issued by Revenue Tahsildar, (2) Caste Certificate for SC/ST/OBC quota claims, (3) Class 10 and 12 Academic Marksheets, (4) Aadhaar Card with active biometric verification, (5) Student Bank Account Details mapped with Aadhaar DBT NPCI mapper, and (6) Bonafide Institutional Verification Certificate."
      },
      {
        section: "Section 7: Financial Assistance Rates",
        page: 9,
        text: "Rate of scholarship is ₹12,000 per annum at Graduation level for first three years of College and University courses and ₹20,000 per annum at Post-Graduation level."
      }
    ]
  },
  {
    id: "DOC-SSP-KA-2024",
    schemeId: "SCH-EDU-002",
    title: "Karnataka State Scholarship Portal (SSP) Post-Matric Guidelines",
    category: "education",
    ministry: "Social Welfare Department, Government of Karnataka",
    jurisdiction: "Karnataka",
    language: "English / Kannada",
    publicationDate: "2024-05-15",
    effectiveFrom: "2024-06-01",
    version: "v3.1",
    status: "Verified",
    sourceUrl: "https://ssp.postmatric.karnataka.gov.in/docs/SSP_PostMatric_Rules_2024.pdf",
    pageCount: 24,
    reviewer: "M. Ramesh (E-Governance Cell Karnataka)",
    auditDate: "2024-06-15",
    summary: "Comprehensive fee reimbursement and post-matric maintenance scholarship regulations for domicile students of Karnataka State.",
    passages: [
      {
        section: "Rule 4.1: Domicile and Family Income Cap",
        page: 5,
        text: "Applicant must be a bonafide resident of Karnataka State. Annual household income cap: SC/ST up to ₹2.5 Lakhs (or ₹10 Lakhs under fee concession quota); Category 1 up to ₹2.5 Lakhs; 2A, 3A, 3B up to ₹1.0 Lakh. Nadakacheri RD Number is required for automated revenue verification."
      },
      {
        section: "Rule 6: Mandatory Documentation",
        page: 11,
        text: "Students must submit Nadakacheri Income and Caste RD number, Aadhaar number, SSLC registration number, College admission acknowledgement, and fee paid receipts."
      }
    ]
  },
  {
    id: "DOC-AB-PMJAY-2024",
    schemeId: "SCH-HLT-001",
    title: "Ayushman Bharat National Health Protection Scheme Operational Manual",
    category: "healthcare",
    ministry: "National Health Authority, MoHFW",
    jurisdiction: "All India",
    language: "English / Hindi",
    publicationDate: "2024-04-10",
    effectiveFrom: "2024-05-01",
    version: "v5.0",
    status: "Verified",
    sourceUrl: "https://pmjay.gov.in/sites/default/files/2024-Operational-Guidelines.pdf",
    pageCount: 42,
    reviewer: "Dr. Ananya Verma (Health Systems Review)",
    auditDate: "2024-05-28",
    summary: "Cashless secondary and tertiary care hospitalization up to ₹5,00,000 per family annually with special extension to all senior citizens aged 70+.",
    passages: [
      {
        section: "Chapter 2: Beneficiary Identification & Entitlement",
        page: 6,
        text: "Eligible beneficiaries are identified based on SECC 2011 deprivation criteria. In 2024, the Union Cabinet approved expanded health coverage up to ₹5 lakh per year to all senior citizens aged 70 years and above irrespective of family income."
      },
      {
        section: "Chapter 4: Hospital Treatment & Portability",
        page: 14,
        text: "Treatment is 100% cashless at all empanelled public and private hospitals across all participating states and UTs. Pre-hospitalization expenses up to 3 days and post-hospitalization up to 15 days are covered."
      }
    ]
  },
  {
    id: "DOC-AB-ARK-2023",
    schemeId: "SCH-HLT-002",
    title: "Ayushman Bharat - Arogya Karnataka Implementation Circular",
    category: "healthcare",
    ministry: "Health & Family Welfare Dept, Govt. of Karnataka",
    jurisdiction: "Karnataka",
    language: "English / Kannada",
    publicationDate: "2023-10-01",
    effectiveFrom: "2023-11-01",
    version: "v2.8",
    status: "Verified",
    sourceUrl: "https://arogya.karnataka.gov.in/circulars/ark_scheme_rules.pdf",
    pageCount: 30,
    reviewer: "Dr. S. Patil (Karnataka Health Mission)",
    auditDate: "2024-01-10",
    summary: "Karnataka state rules governing co-branded health coverage. Direct tertiary walk-ins are covered only under notified emergencies or with district hospital referral.",
    passages: [
      {
        section: "Section 3: Referral Workflow for Tertiary Hospitals",
        page: 8,
        text: "Except for defined medical emergencies (heart attack, trauma, acute stroke), beneficiaries must obtain an e-Referral from a Taluk or District government hospital before admission to empanelled private specialty hospitals."
      }
    ]
  },
  {
    id: "DOC-NSAP-IGNOAPS-2024",
    schemeId: "SCH-SOC-001",
    title: "National Social Assistance Programme (NSAP) Guidelines for IGNOAPS",
    category: "social_welfare",
    ministry: "Ministry of Rural Development",
    jurisdiction: "All India / States",
    language: "English / Hindi",
    publicationDate: "2023-01-15",
    effectiveFrom: "2023-02-01",
    version: "v3.0",
    status: "Verified",
    sourceUrl: "https://nsap.nic.in/nsap/NSAP_Revised_Guidelines.pdf",
    pageCount: 36,
    reviewer: "P. Murugan (Social Welfare Evaluation)",
    auditDate: "2024-03-14",
    summary: "Monthly social security pension for BPL elderly persons. Central share is complemented by respective State Governments.",
    passages: [
      {
        section: "Article 2.2: Age and Means Testing",
        page: 12,
        text: "The person must be of 60 years and above. The applicant must belong to a household living below poverty line as certified by the Gram Panchayat or Urban Local Body."
      },
      {
        section: "Article 3.1: Financial Assistance",
        page: 15,
        text: "Central assistance is ₹200/month for age 60-79 years, and ₹500/month for age 80 years and above. States add supplemental pension (e.g., Karnataka provides ₹1,000 state share totaling ₹1,200/month)."
      }
    ]
  },
  {
    id: "DOC-DEPWD-UDID-2024",
    schemeId: "SCH-DIS-001",
    title: "UDID Project Implementation Guidelines for Divyangjan",
    category: "disability_services",
    ministry: "DEPwD, Ministry of Social Justice & Empowerment",
    jurisdiction: "All India",
    language: "English / Hindi",
    publicationDate: "2024-01-10",
    effectiveFrom: "2024-02-01",
    version: "v3.2",
    status: "Verified",
    sourceUrl: "https://swavlambancard.gov.in/files/UDID_Guidelines_English.pdf",
    pageCount: 28,
    reviewer: "Dr. B. K. Jena (DEPwD Technical Board)",
    auditDate: "2024-04-05",
    summary: "Standard operating procedures for UDID card generation, medical assessment boards, and integration with concession systems.",
    passages: [
      {
        section: "Clause 3: Eligibility & Assessment Standards",
        page: 5,
        text: "All persons with disabilities having 40% or more disability under any of the 21 categories recognized under the Rights of Persons with Disabilities Act, 2016 are eligible for issuance of the permanent or temporary UDID Smart Card."
      },
      {
        section: "Clause 5: Concessions and Scheme Linkages",
        page: 18,
        text: "The UDID card is accepted across all Ministries, Indian Railways, State Road Transport Corporations, and financial assistance schemes without demanding separate state-level certificates."
      }
    ]
  },
  {
    id: "DOC-ADIP-2024",
    schemeId: "SCH-DIS-002",
    title: "Scheme of Assistance to Disabled Persons for Purchase/Fitting of Aids (ADIP)",
    category: "disability_services",
    ministry: "DEPwD, Ministry of Social Justice & Empowerment",
    jurisdiction: "All India",
    language: "English",
    publicationDate: "2023-06-15",
    effectiveFrom: "2023-07-01",
    version: "v4.1",
    status: "Verified",
    sourceUrl: "https://depwd.gov.in/adip/ADIP_Scheme_2023_Final.pdf",
    pageCount: 22,
    reviewer: "Sunil Kumar (ALIMCO Logistics Team)",
    auditDate: "2024-02-20",
    summary: "Rules for providing sophisticated assistive devices to needy persons with disabilities.",
    passages: [
      {
        section: "Section 4: Income Ceilings for Assistance",
        page: 6,
        text: "Full cost of aid is subsidized for beneficiaries whose monthly family income does not exceed ₹20,000 per month. 50% cost of the aid is subsidized for monthly income between ₹20,001 and ₹30,000."
      },
      {
        section: "Section 6: Periodicity of Assistance",
        page: 9,
        text: "Normally, assistive equipment is not re-issued within 3 years for adults, or within 1 year for children below 12 years of age."
      }
    ]
  },
  {
    id: "DOC-NSP-OLD-2021",
    schemeId: "SCH-EDU-001",
    title: "National Scholarship Portal Guidelines 2021-22 (SUPERSEDED)",
    category: "education",
    ministry: "Ministry of Education",
    jurisdiction: "All India",
    language: "English",
    publicationDate: "2021-04-10",
    effectiveFrom: "2021-04-10",
    effectiveTo: "2024-03-31",
    version: "v2.1",
    status: "Superseded",
    sourceUrl: "https://scholarships.gov.in/archive/CSSS_2021_Archived.pdf",
    pageCount: 14,
    reviewer: "Historical Archive",
    auditDate: "2024-05-01",
    summary: "Old guidelines. Outdated income ceiling of ₹6,00,000 without mandatory DBT Aadhaar mapping verification.",
    passages: [
      {
        section: "Section 3: Archived Eligibility",
        page: 3,
        text: "Archived text: Family income limit was previously recorded differently prior to the 2024 harmonization rules. NOTE: Superseded by v4.2 in 2024."
      }
    ]
  }
];
