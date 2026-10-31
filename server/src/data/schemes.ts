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

export const SCHEMES: Scheme[] = [
  {
    id: "SCH-EDU-001",
    name: "National Scholarship Portal - Central Sector Scheme for Higher Education",
    shortName: "NSP Higher Education Scholarship",
    domain: "education",
    ministry: "Ministry of Education (Department of Higher Education)",
    jurisdiction: "All India / Central",
    description: "Financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing higher studies in college and universities.",
    summary: "Annual financial support up to ₹20,000/year for undergraduate & postgraduate studies for students above 80th percentile in Class 12.",
    eligibility: [
      "Student must have scored above 80th percentile in relevant stream in Class 12 (10+2)",
      "Pursuing a regular (not correspondence or distance) degree course in recognized colleges/universities",
      "Gross parental/family annual income must not exceed ₹4,50,000 per annum",
      "Beneficiary must not be receiving any other government scholarship"
    ],
    benefits: [
      "₹12,000 per annum at graduation level for the first three years of college",
      "₹20,000 per annum at postgraduate level (or 4th/5th year of integrated courses)",
      "Direct Benefit Transfer (DBT) into Aadhaar-seeded student bank account"
    ],
    requiredDocuments: [
      "Income Certificate (issued by competent revenue authority, e.g. Tahsildar)",
      "Caste Certificate (if claiming reservation quota: SC/ST/OBC)",
      "Academic Records (Class 10 and Class 12 Marksheets)",
      "Aadhaar Card (linked with active mobile number)",
      "Bank Account Details (passbook with IFSC code, Aadhaar seeded)",
      "Bonafide Student Certificate issued by Head of Institution"
    ],
    officialUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP 2.0)",
    effectiveDate: "2024-04-01",
    lastUpdated: "2024-06-12",
    version: "v4.2 (2024-25 Guidelines)",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  },
  {
    id: "SCH-EDU-002",
    name: "Karnataka State Scholarship Portal (SSP) - Post-Matric Scholarship",
    shortName: "Karnataka SSP Post-Matric",
    domain: "education",
    ministry: "Social Welfare & Backward Classes Welfare Dept, Govt. of Karnataka",
    jurisdiction: "Karnataka",
    description: "State-sponsored post-matric fee concession and maintenance allowance for SC, ST, OBC and minority students enrolled in PUC, Diploma, UG, and PG programs in Karnataka.",
    summary: "Full college fee reimbursement and monthly maintenance allowance for eligible Karnataka resident students.",
    eligibility: [
      "Must be a permanent resident of Karnataka State",
      "Enrolled in recognized Post-Matriculation courses (PUC, ITI, Diploma, Degree, Masters)",
      "Annual household income limits: SC/ST up to ₹2.5 Lakhs (Group A) or ₹10 Lakhs (Govt quota); OBC Category 1 up to ₹2.5 Lakhs, 2A/3A/3B up to ₹1 Lakh",
      "Minimum 75% attendance in the current academic year"
    ],
    benefits: [
      "Full or partial reimbursement of tuition fees directly credited to the institution",
      "Monthly student maintenance allowance credited via DBT",
      "Hostel fee assistance for students staying in recognized government or private hostels"
    ],
    requiredDocuments: [
      "RD Number for Income & Caste Certificate (issued via Nadakacheri portal)",
      "Karnataka Domicile Proof / Ration Card",
      "SSLC (Class 10) Marks Card and Registration Number",
      "Aadhaar Card of student and parents",
      "College Admission Receipt & Fee Structure",
      "Bank Account Passbook (NPCI mapped for DBT)"
    ],
    officialUrl: "https://ssp.postmatric.karnataka.gov.in",
    portalName: "State Scholarship Portal Karnataka",
    effectiveDate: "2024-05-15",
    lastUpdated: "2024-08-01",
    version: "v3.1 (AY 2024-25)",
    status: "Active",
    applicableLanguages: ["en", "kn"]
  },
  {
    id: "SCH-HLT-001",
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    shortName: "Ayushman Bharat PM-JAY",
    domain: "healthcare",
    ministry: "Ministry of Health & Family Welfare / National Health Authority (NHA)",
    jurisdiction: "All India / Central",
    description: "The world's largest government-financed health insurance/assurance scheme, offering secondary and tertiary hospitalization cover of up to ₹5 lakh per family per year.",
    summary: "Cashless and paperless secondary and tertiary hospital treatment cover up to ₹5,00,000 per family annually across 29,000+ empanelled hospitals.",
    eligibility: [
      "Identified families based on Socio-Economic Caste Census (SECC 2011) deprivation criteria (D1-D7)",
      "Active Rashtriya Swasthya Bima Yojana (RSBY) beneficiary families",
      "All senior citizens aged 70 years and above irrespective of income (newly expanded 2024 benefit)",
      "No restriction on family size, age, or gender"
    ],
    benefits: [
      "Cashless health cover up to ₹5,00,000 per eligible family per year",
      "Covers up to 3 days pre-hospitalization and 15 days post-hospitalization expenses",
      "Over 1,949 medical packages covering oncology, cardiology, neurosurgery, orthopedics, etc.",
      "Portability across India in all public and empanelled private hospitals"
    ],
    requiredDocuments: [
      "Aadhaar Card or valid government-issued photo ID",
      "Ration Card or proof of family composition (e.g., Samagra ID / NFSA card)",
      "PMJAY / Ayushman Card or verification letter with HHID/SECC number",
      "Mobile number linked to Aadhaar for OTP verification at Ayushman Mitra desk"
    ],
    officialUrl: "https://pmjay.gov.in",
    portalName: "National Health Authority PM-JAY Portal",
    effectiveDate: "2023-09-23",
    lastUpdated: "2024-09-15",
    version: "v5.0 (Expanded Senior 70+ Coverage)",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  },
  {
    id: "SCH-HLT-002",
    name: "Ayushman Bharat - Arogya Karnataka (AB-ArK)",
    shortName: "Arogya Karnataka (AB-ArK)",
    domain: "healthcare",
    ministry: "Department of Health & Family Welfare, Govt. of Karnataka / Suvarna Arogya Suraksha Trust (SAST)",
    jurisdiction: "Karnataka",
    description: "Universal health scheme co-branded with PM-JAY for residents of Karnataka, providing free secondary and tertiary care for eligible BPL families and subsidized care for APL families.",
    summary: "Up to ₹5 lakh free cashless healthcare for BPL ration card holders, and 30% co-payment package rates for APL families in Karnataka.",
    eligibility: [
      "Resident of Karnataka with valid BPL (NFSA/PHH) or APL ration card",
      "Primary care treatment and referrals must normally originate from Taluk/District Public Hospitals",
      "Emergency situations directly admitted to empanelled super-specialty hospitals"
    ],
    benefits: [
      "100% free treatment up to ₹5,00,000/year for eligible (BPL) families",
      "30% subsidized package cost up to ₹1,50,000 for non-eligible (APL) families",
      "Coverage across 500+ empanelled government and private hospitals in Karnataka"
    ],
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Karnataka Food & Civil Supplies Ration Card (BPL/APL)",
      "Referral letter from Government Medical Officer (except designated emergencies)"
    ],
    officialUrl: "https://arogya.karnataka.gov.in",
    portalName: "Suvarna Arogya Suraksha Trust Portal",
    effectiveDate: "2023-11-01",
    lastUpdated: "2024-05-10",
    version: "v2.8",
    status: "Active",
    applicableLanguages: ["en", "kn"]
  },
  {
    id: "SCH-SOC-001",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    shortName: "IGNOAPS Old Age Pension",
    domain: "social_welfare",
    ministry: "Ministry of Rural Development (National Social Assistance Programme - NSAP)",
    jurisdiction: "All India / Central & States",
    description: "Non-contributory monthly social pension for destitute elderly citizens living below the poverty line to ensure dignity and basic livelihood security.",
    summary: "Monthly non-contributory pension for elderly BPL citizens aged 60+, with higher rates for citizens aged 80 and above.",
    eligibility: [
      "Applicant must be 60 years of age or older",
      "Must belong to a household living below the official poverty line (BPL card holder)",
      "Must not be receiving pension from other institutional employment sources"
    ],
    benefits: [
      "Central contribution: ₹200/month (ages 60-79) and ₹500/month (ages 80+)",
      "State top-up supplement: In Karnataka, top-up enhances total pension to ₹1,200/month",
      "Direct DBT transfer to postal savings or bank account every month"
    ],
    requiredDocuments: [
      "Proof of Age (Birth certificate, Voter ID, School Leaving Certificate or Tahsildar Medical Certificate)",
      "BPL Ration Card or SECC inclusion certificate",
      "Aadhaar Card",
      "Single-holder Bank / Post Office passbook copy with IFSC",
      "Passport size photographs (2 copies)"
    ],
    officialUrl: "https://nsap.nic.in",
    portalName: "NSAP National Social Assistance Portal",
    effectiveDate: "2023-01-01",
    lastUpdated: "2024-04-18",
    version: "v3.0",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  },
  {
    id: "SCH-SOC-002",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)",
    shortName: "PM Matru Vandana Yojana",
    domain: "social_welfare",
    ministry: "Ministry of Women and Child Development",
    jurisdiction: "All India / Central",
    description: "Maternity benefit conditional cash transfer scheme providing compensation for wage loss during pregnancy and childbirth and encouraging institutional delivery and immunizations.",
    summary: "Financial incentive of ₹5,000 in two installments for the first live child, and ₹6,000 in a single installment for the second girl child.",
    eligibility: [
      "Pregnant Women and Lactating Mothers (PW&LM) aged 19 years or above",
      "Belonging to socially/economically disadvantaged categories (e.g. SC/ST, BPL, EWS, Divyangjan, PMJAY or MGNREGA job card holders)",
      "Women in regular employment with Central/State Govt or PSUs are not eligible"
    ],
    benefits: [
      "First Child: ₹5,000 (1st installment ₹3,000 on ANC registration; 2nd installment ₹2,000 on birth registration and full vaccination)",
      "Second Child (if female): ₹6,000 directly after birth and 14-week immunization",
      "Promotes infant health, institutional delivery, and nutritional care"
    ],
    requiredDocuments: [
      "Mother and Child Protection (MCP) Card registered with Anganwadi/Health facility",
      "Aadhaar Cards of both beneficiary mother and husband",
      "Bank Account details of the mother (Aadhaar-seeded DBT)",
      "Disadvantage proof (Caste certificate, BPL ration card, or MGNREGA card)"
    ],
    officialUrl: "https://pmmvy.wcd.gov.in",
    portalName: "PMMVY Beneficiary Portal",
    effectiveDate: "2023-04-01",
    lastUpdated: "2024-05-20",
    version: "v2.0 (Mission Shakti)",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  },
  {
    id: "SCH-DIS-001",
    name: "Unique Disability ID (UDID) & Swavlamban Card Programme",
    shortName: "UDID National Disability Card",
    domain: "disability_services",
    ministry: "Department of Empowerment of Persons with Disabilities (DEPwD), MoSJE",
    jurisdiction: "All India / Central & States",
    description: "National unified digital identity and certification system for Persons with Disabilities (Divyangjan) ensuring pan-India portability of government schemes and concessions.",
    summary: "One national digital smart card recognized nationwide for railway/bus concessions, scholarship access, and assistive technology distribution.",
    eligibility: [
      "Any Indian citizen with 40% or more benchmark disability as categorized under the RPwD Act 2016 (21 recognized disabilities)",
      "Certified by designated Medical Authority / District Medical Board"
    ],
    benefits: [
      "Pan-India validity: no need to carry multiple physical medical certificates",
      "Direct integration with central and state welfare benefit portals (ADIP, scholarships, pensions)",
      "Avails railway concessions (50-75% discount) and state bus transport concessions",
      "Free medical aid, assistive aids, and priority government services"
    ],
    requiredDocuments: [
      "Existing Disability Certificate issued by CMO/District Hospital (if available) or fresh appointment",
      "Aadhaar Card or Photo Voter ID Card",
      "Passport size colour photograph (showing disability clearly where visible)",
      "Signature or Left Thumb Impression scan",
      "Address Proof (Ration card / Electricity bill / Domicile certificate)"
    ],
    officialUrl: "https://swavlambancard.gov.in",
    portalName: "Swavlamban Card Portal (DEPwD)",
    effectiveDate: "2023-01-01",
    lastUpdated: "2024-07-10",
    version: "v3.2",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  },
  {
    id: "SCH-DIS-002",
    name: "ADIP Scheme - Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances",
    shortName: "ADIP Assistive Devices Scheme",
    domain: "disability_services",
    ministry: "Department of Empowerment of Persons with Disabilities, MoSJE / ALIMCO",
    jurisdiction: "All India / Central",
    description: "Provides modern, durable, sophisticated, and scientifically manufactured aids and assistive appliances (wheelchairs, hearing aids, braille kits, motorized tricycles) to persons with disabilities.",
    summary: "Free or 50% subsidized assistive aids, motorized tricycles, smart canes, and hearing aids manufactured by ALIMCO.",
    eligibility: [
      "Indian citizen with minimum 40% disability (certified by competent medical board or UDID card)",
      "Monthly income from all sources does not exceed ₹20,000 per month (for 100% concession)",
      "Monthly income between ₹20,001 and ₹30,000 per month (eligible for 50% concession)",
      "Has not received assistance for the same aid during the last 3 years (1 year for children under 12)"
    ],
    benefits: [
      "Free distribution of motorized tricycles, wheelchairs, smart canes, Daisy players, Braille kits",
      "Cochlear implants up to ₹6,00,000 for children with severe hearing impairment (under 5 years)",
      "Free fitting and maintenance support provided through ALIMCO distribution camps"
    ],
    requiredDocuments: [
      "Disability Certificate or UDID Card (minimum 40% benchmark disability)",
      "Income Certificate from Tahsildar / Revenue Inspector (certifying monthly income under ₹20,000)",
      "Aadhaar Card",
      "Passport photograph showing the disability",
      "Medical prescription/recommendation by government orthopedic/audiologist specialist"
    ],
    officialUrl: "https://adip.depwd.gov.in",
    portalName: "ADIP Beneficiary Portal",
    effectiveDate: "2023-06-01",
    lastUpdated: "2024-06-30",
    version: "v4.1",
    status: "Active",
    applicableLanguages: ["en", "kn", "hi", "ta"]
  }
];
