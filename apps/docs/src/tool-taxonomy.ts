export type ToolLaunchPriority = 'P0' | 'P1' | 'P2';

export interface ToolReferenceProduct {
  name: string;
  url: string;
  focus: string;
}

export interface ToolEngineBlueprint {
  slug: string;
  name: string;
  summary: string;
  logicNotes: readonly string[];
}

export interface ToolImplementationWave {
  name: string;
  summary: string;
  categories: readonly string[];
}

export interface ToolCategory {
  slug: string;
  name: string;
  summary: string;
  launchPriority: ToolLaunchPriority;
  intentAngle: string;
  engineSlugs: readonly string[];
  accuracyNotes: readonly string[];
  referenceProducts: readonly ToolReferenceProduct[];
  tools: readonly string[];
}

export const toolEngineBlueprints: readonly ToolEngineBlueprint[] = [
  {
    slug: 'deterministic-calculators',
    name: 'Deterministic Calculators',
    summary: 'Formula-first tools where trust comes from transparent math, editable assumptions, and clear outputs.',
    logicNotes: [
      'Keep formulas deterministic and inspectable instead of hiding the main calculation behind AI.',
      'Always show assumptions such as rates, terms, tax year, filing status, mileage, or down payment.',
      'Let users edit defaults so the tool works as a planner rather than pretending to predict exact outcomes.'
    ]
  },
  {
    slug: 'ai-assisted-generators',
    name: 'AI-Assisted Generators',
    summary: 'Drafting tools that turn structured inputs into first drafts, then keep humans in control of edits.',
    logicNotes: [
      'Use structured input forms before free-form prompting so results stay anchored to the user goal.',
      'Preserve edit history and allow quick regenerate actions for tone, length, or audience changes.',
      'Separate generation from validation so a polished draft is never confused with a verified final output.'
    ]
  },
  {
    slug: 'match-and-score',
    name: 'Match and Score',
    summary: 'Comparison tools that score fit, highlight gaps, and explain why the score moved.',
    logicNotes: [
      'Start with deterministic overlap logic for skills, keywords, sections, or required inputs.',
      'Use AI for rewrite ideas and summaries after the score logic is complete, not before.',
      'Expose score drivers so users understand what matters instead of seeing a mysterious number.'
    ]
  },
  {
    slug: 'checklists-and-planners',
    name: 'Checklists and Planners',
    summary: 'Execution tools that break large tasks into timelines, stages, and status-aware steps.',
    logicNotes: [
      'Model the journey first: stages, reminders, dependencies, and progress states.',
      'Make templates opinionated enough to save time but editable enough to fit real situations.',
      'Prioritize export, print, and saved progress because repeat usage is the retention layer.'
    ]
  },
  {
    slug: 'document-workflows',
    name: 'Document Workflows',
    summary: 'Builders, organizers, and reviewers for forms, records, and reusable legal or business documents.',
    logicNotes: [
      'Use field-level schemas so every output can be re-rendered as PDF, print, or web form.',
      'Version templates and jurisdiction rules so updates do not silently change prior documents.',
      'Keep disclaimers and review checkpoints visible when the output affects compliance or rights.'
    ]
  },
  {
    slug: 'file-and-media-transform',
    name: 'File and Media Transform',
    summary: 'Converters and processors where layout fidelity, speed, and privacy are more important than copy flair.',
    logicNotes: [
      'Treat file handling as a product surface: upload states, size limits, security messaging, and previews matter.',
      'Preserve formatting, page order, and file quality before adding AI enhancements.',
      'Prefer client-side processing or explicit retention rules for sensitive documents.'
    ]
  }
] as const;

export const toolImplementationWaves: readonly ToolImplementationWave[] = [
  {
    name: 'Wave 1: High-Intent Utility Core',
    summary: 'Start with the categories that have the clearest search intent and the simplest feedback loop from search to usable output.',
    categories: ['File, PDF & Document Utilities', 'Careers', 'Personal Finance & Credit', 'Business & Freelance', 'Marketing & SEO']
  },
  {
    name: 'Wave 2: Structured Workflow Expansion',
    summary: 'Add categories that share reusable engines such as planners, builders, trackers, and comparison logic.',
    categories: ['Education & Exams', 'HR & Hiring', 'Real Estate', 'Travel & Relocation', 'E-commerce & Selling', 'Content Creator & Media']
  },
  {
    name: 'Wave 3: Compliance and Life Planning',
    summary: 'Ship the highest-risk categories after the shared engines, audit patterns, export flows, and disclaimer systems are already mature.',
    categories: ['Legal Documents', 'Tax & Payroll', 'Health Forms & Planning', 'Retirement & Benefits', 'Auto & Vehicles', 'Insurance & Claims', 'Immigration & Citizenship']
  }
] as const;

export const toolCategories: readonly ToolCategory[] = [
  {
    slug: 'careers',
    name: 'Careers',
    summary: 'A job application hub built around resume matching, rewriting, outreach, and interview readiness.',
    launchPriority: 'P0',
    intentAngle: 'High repeat usage because serious applicants rerun matching and rewriting for every application.',
    engineSlugs: ['match-and-score', 'ai-assisted-generators', 'checklists-and-planners'],
    accuracyNotes: [
      'Keep keyword, format, and evidence scoring separate so users know what to fix.',
      'Explain why a term is missing instead of treating every keyword as equally important.',
      'Use deterministic matching first, then offer AI rewrite help as a second step.'
    ],
    referenceProducts: [
      {
        name: 'Hireflow ATS Checker',
        url: 'https://www.hireflow.net/',
        focus: 'Study the upload-to-score-to-fixes loop and the way core ATS features are bundled together.'
      },
      {
        name: 'Jobscan Resume Scanner',
        url: 'https://www.jobscan.co/resume-scanner',
        focus: 'Study score drivers, missing skills detection, and how match reports explain recruiter-facing keywords.'
      },
      {
        name: 'Jobalytics ATS Score Checker',
        url: 'https://jobalytics.app/',
        focus: 'Study quick keyword gap analysis and lightweight job-seeker onboarding.'
      }
    ],
    tools: [
      'ATS Match Checker',
      'Resume vs Job Description Match',
      'Resume Score Explainer',
      'Resume Bullet Rewriter',
      'Achievement Metric Helper',
      'Role-Specific Resume Tailor',
      'Resume Headline Generator',
      'Skills Gap Detector',
      'Cover Letter Builder',
      'Recruiter Outreach Writer',
      'LinkedIn Headline Review',
      'LinkedIn About Rewrite',
      'Portfolio Review',
      'GitHub README Review',
      'Interview Question Generator',
      'Mock Answer Coach',
      'Salary Benchmark Worksheet',
      'Offer Comparison Matrix',
      'Application Tracker',
      'Follow-Up Reminder Composer'
    ]
  },
  {
    slug: 'education-exams',
    name: 'Education & Exams',
    summary: 'Study tools that transform notes, syllabi, and exam dates into active practice and structured revision.',
    launchPriority: 'P1',
    intentAngle: 'Strong seasonal demand with clear student search language around flashcards, practice tests, and study plans.',
    engineSlugs: ['ai-assisted-generators', 'checklists-and-planners', 'match-and-score'],
    accuracyNotes: [
      'Anchor generated answers and flashcards to uploaded notes or selected topics so the tool stays teachable.',
      'Show confidence and source snippets for explanations when the content comes from user material.',
      'Treat schedules as workload planners, not promises of exam outcomes.'
    ],
    referenceProducts: [
      {
        name: 'Quizlet AI Flashcard Generator',
        url: 'https://quizlet.com/features/ai-flashcard-generator',
        focus: 'Study note-to-flashcard transformation and the bridge from input material to study artifact.'
      },
      {
        name: 'Quizlet Smart Assist',
        url: 'https://quizlet.com/features/smart-assist',
        focus: 'Study fast prompt-to-study-tool generation for students who have not prepared full notes yet.'
      },
      {
        name: 'Quizlet Study Platform',
        url: 'https://quizlet.com/',
        focus: 'Study how flashcards, tests, and study guides are presented as one learning workflow.'
      }
    ],
    tools: [
      'Flashcard Generator',
      'Practice Test Generator',
      'Study Guide Generator',
      'Syllabus Parser',
      'Study Plan Scheduler',
      'Spaced Repetition Planner',
      'Exam Countdown Planner',
      'Concept Explainer',
      'Mistake Log',
      'Essay Thesis Helper',
      'Personal Statement Reviewer',
      'Citation Formatter',
      'Assignment Rubric Checker',
      'Reading Summary Builder',
      'Vocabulary Trainer',
      'Formula Sheet Builder',
      'Oral Exam Simulator',
      'Course Planner',
      'Admission Checklist',
      'GPA Target Calculator'
    ]
  },
  {
    slug: 'hr-hiring',
    name: 'HR & Hiring',
    summary: 'Hiring workflow tools for teams that need structured, repeatable recruiting and onboarding systems.',
    launchPriority: 'P1',
    intentAngle: 'Strong B2B intent because teams search for reusable job descriptions, interview kits, and evaluation workflows.',
    engineSlugs: ['ai-assisted-generators', 'match-and-score', 'checklists-and-planners', 'document-workflows'],
    accuracyNotes: [
      'Favor structured evaluation rubrics over free-form opinions to reduce bias and improve comparison quality.',
      'Keep audit trails for generated job descriptions, interview kits, and scorecards.',
      'Use AI to accelerate drafting, but require humans to approve any hiring recommendation.'
    ],
    referenceProducts: [
      {
        name: 'Workable Job Description Generator',
        url: 'https://www.workable.com/job-description-generator',
        focus: 'Study structured role inputs, generation flow, and how job description drafting branches into interview kits.'
      },
      {
        name: 'Workable Free Tools for Managers',
        url: 'https://www.workable.com/free-tools-for-managers',
        focus: 'Study how adjacent hiring tools are bundled into one manager-facing workspace.'
      },
      {
        name: 'Greenhouse Hiring Platform',
        url: 'https://www.greenhouse.com/',
        focus: 'Study end-to-end hiring workflow concepts such as structured interviews, scorecards, and candidate tracking.'
      }
    ],
    tools: [
      'AI Job Description Generator',
      'Interview Question Kit',
      'Candidate Scorecard Builder',
      'Resume Screen Summarizer',
      'Candidate Comparison Matrix',
      'Careers Page Copy Builder',
      'Offer Letter Builder',
      'Requisition Intake Form',
      'Hiring Funnel Tracker',
      'Recruiter Outreach Templates',
      'Onboarding Checklist',
      'New Hire Paperwork Organizer',
      'Reference Check Questionnaire',
      'Bias Audit Checklist',
      'Compensation Band Explainer',
      'Headcount Request Form',
      'Interview Panel Planner',
      'Evaluation Rubric Manager',
      'Debrief Summarizer',
      'Internal Transfer Posting Builder'
    ]
  },
  {
    slug: 'legal-documents',
    name: 'Legal Documents',
    summary: 'Template-driven document builders and review helpers for common business and personal paperwork.',
    launchPriority: 'P2',
    intentAngle: 'Very strong intent around templates and checklists, but trust depends on jurisdiction handling and careful disclaimers.',
    engineSlugs: ['document-workflows', 'ai-assisted-generators', 'checklists-and-planners'],
    accuracyNotes: [
      'Require jurisdiction selection before generating legal language that depends on local rules.',
      'Treat outputs as drafts and surface review checkpoints instead of implying legal advice.',
      'Version templates and track the source date for any clause library used in drafting.'
    ],
    referenceProducts: [
      {
        name: 'LegalZoom',
        url: 'https://www.legalzoom.com/',
        focus: 'Study guided legal drafting flows and how document creation is framed with support options.'
      },
      {
        name: 'Rocket Lawyer Legal Documents',
        url: 'https://www.rocketlawyer.com/legal-documents',
        focus: 'Study category organization, document discovery, and the path from template to signature workflow.'
      }
    ],
    tools: [
      'NDA Builder',
      'Independent Contractor Agreement Builder',
      'Service Agreement Builder',
      'Lease Agreement Builder',
      'Bill of Sale Builder',
      'Demand Letter Draft Assistant',
      'Privacy Policy Starter',
      'Terms and Conditions Generator',
      'Employment Offer Letter Checklist',
      'Cease and Desist Draft Assistant',
      'Clause Summarizer',
      'Red-Flag Clause Checker',
      'Document Comparison Viewer',
      'Signature Request Workflow',
      'Will Planning Checklist',
      'Power of Attorney Checklist',
      'Incorporation Document Organizer',
      'Compliance Calendar',
      'Renewal Tracker',
      'Legal Intake Questionnaire'
    ]
  },
  {
    slug: 'tax-payroll',
    name: 'Tax & Payroll',
    summary: 'Math-heavy calculators and workflow tools for take-home pay, payroll planning, withholding, and filing prep.',
    launchPriority: 'P2',
    intentAngle: 'Search demand is strong, but user trust depends on current rates, visible assumptions, and exact state or country scope.',
    engineSlugs: ['deterministic-calculators', 'document-workflows', 'checklists-and-planners'],
    accuracyNotes: [
      'Tie formulas to a clearly labeled tax year, region, and filing assumption.',
      'Timestamp the rate source and separate computation from tax advice.',
      'Explain what the tool does not cover so users know when official calculators or a professional are needed.'
    ],
    referenceProducts: [
      {
        name: 'IRS Tax Withholding Estimator',
        url: 'https://www.irs.gov/individuals/tax-withholding-estimator',
        focus: 'Study official withholding flow, required inputs, and the way assumptions are explained step by step.'
      },
      {
        name: 'QuickBooks Payroll Tools',
        url: 'https://quickbooks.intuit.com/payroll/tools/',
        focus: 'Study payroll-oriented calculators and how results are packaged for both employers and employees.'
      },
      {
        name: 'Gusto Payroll',
        url: 'https://gusto.com/',
        focus: 'Study how payroll workflows connect calculation, compliance, and employee records.'
      }
    ],
    tools: [
      'Paycheck Calculator',
      'Take-Home Pay Calculator',
      'W-4 Withholding Helper',
      '1099 Tax Set-Aside Calculator',
      'Quarterly Estimated Tax Planner',
      'Payroll Cost Calculator',
      'Overtime Pay Calculator',
      'Bonus Tax Estimator',
      'State Tax Checklist',
      'Payroll Tax Calendar',
      'Payslip Checker',
      'Gross-Up Calculator',
      'Freelance vs Salaried Compare',
      'Expense Reimbursement Tracker',
      'Payroll Glossary Explorer',
      'New Hire Tax Form Checklist',
      'Worker Classification Checklist',
      'Sales Tax Estimate Helper',
      'Year-End Payroll Checklist',
      'Benefit Deduction Planner'
    ]
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    summary: 'Home buying, renting, and property planning tools that turn confusing decisions into clearer numbers and checklists.',
    launchPriority: 'P1',
    intentAngle: 'Very high commercial intent around affordability, rent vs buy, closing costs, and lease workflows.',
    engineSlugs: ['deterministic-calculators', 'checklists-and-planners', 'document-workflows'],
    accuracyNotes: [
      'Make every major assumption editable, especially rate, down payment, taxes, fees, insurance, and rent growth.',
      'Separate renter workflows from buyer and investor workflows to avoid muddy outputs.',
      'Use local placeholders and disclaimers because real costs vary widely by market.'
    ],
    referenceProducts: [
      {
        name: 'Zillow Affordability Calculator',
        url: 'https://www.zillow.com/mortgage-calculator/house-affordability',
        focus: 'Study input handling, affordability explanation, and the way debt ratios shape outputs.'
      },
      {
        name: 'Zillow Mortgage Calculator',
        url: 'https://www.zillow.com/mortgage-calculator/',
        focus: 'Study monthly payment framing and how related mortgage tools are chained together.'
      }
    ],
    tools: [
      'Home Affordability Calculator',
      'Mortgage Calculator',
      'Rent vs Buy Calculator',
      'Closing Cost Calculator',
      'Down Payment Planner',
      'Debt-to-Income Calculator',
      'Refinance Savings Calculator',
      'Investment Property Analyzer',
      'Cap Rate Calculator',
      'Cash-on-Cash Return Calculator',
      'Rent Proration Calculator',
      'Security Deposit Tracker',
      'Lease Agreement Builder',
      'Move-In Checklist',
      'Move-Out Checklist',
      'Rental Application Checklist',
      'Tenant Screening Scorecard',
      'Neighborhood Comparison Worksheet',
      'Property Expense Tracker',
      'Open House Notes Organizer'
    ]
  },
  {
    slug: 'travel-relocation',
    name: 'Travel & Relocation',
    summary: 'Trip, move, and settlement tools that organize itineraries, documents, budgets, and logistics.',
    launchPriority: 'P1',
    intentAngle: 'Strong high-CTR searches around itinerary planning, packing, cost comparisons, and document checklists.',
    engineSlugs: ['checklists-and-planners', 'deterministic-calculators', 'document-workflows'],
    accuracyNotes: [
      'Use official government sources for passport, visa, and travel document guidance.',
      'Keep date, destination, and timezone data explicit because these tools age quickly.',
      'Treat cost-of-living outputs as comparison estimates, not quotes or guarantees.'
    ],
    referenceProducts: [
      {
        name: 'Wanderlog',
        url: 'https://wanderlog.com/',
        focus: 'Study itinerary structure, reservation aggregation, and budget plus route planning in one flow.'
      },
      {
        name: 'Numbeo Cost of Living Comparison',
        url: 'https://www.numbeo.com/cost-of-living/comparison.jsp',
        focus: 'Study city-to-city comparison framing and side-by-side cost breakdowns.'
      },
      {
        name: 'U.S. Passport Forms',
        url: 'https://travel.state.gov/content/travel/en/passports/how-apply/forms.html',
        focus: 'Study how official travel document flows categorize forms and prerequisites.'
      }
    ],
    tools: [
      'Trip Itinerary Planner',
      'Road Trip Route Optimizer',
      'Travel Budget Planner',
      'Group Expense Splitter',
      'Packing Checklist Builder',
      'Visa Document Checklist',
      'Passport Renewal Checklist',
      'Embassy Appointment Tracker',
      'Reservation Organizer',
      'Flight Status Board',
      'Travel Insurance Checklist',
      'Relocation Timeline Planner',
      'Moving Budget Calculator',
      'Cost of Living Compare',
      'City Comparison Worksheet',
      'School and Housing Hunt Checklist',
      'Utility Switch Checklist',
      'International Shipping Inventory',
      'Time Zone Meeting Planner',
      'Arrival Day Checklist'
    ]
  },
  {
    slug: 'health-forms-planning',
    name: 'Health Forms & Planning',
    summary: 'Organization-first tools for records, medications, care planning, and pre-visit paperwork.',
    launchPriority: 'P2',
    intentAngle: 'Useful and defensible if framed as planning and documentation rather than diagnosis or treatment.',
    engineSlugs: ['document-workflows', 'checklists-and-planners', 'deterministic-calculators'],
    accuracyNotes: [
      'Do not imply diagnosis, triage, or treatment decisions unless a clinically validated workflow is in place.',
      'Favor records, reminders, and structured exports over speculative health advice.',
      'Use privacy-first storage defaults and clear data retention messaging for sensitive inputs.'
    ],
    referenceProducts: [
      {
        name: 'MyChart',
        url: 'https://www.mychart.org/',
        focus: 'Study patient-facing record organization, appointment preparation, and multi-record access patterns.'
      },
      {
        name: 'AARP Caregiving',
        url: 'https://www.aarp.org/caregiving/',
        focus: 'Study caregiver planning content, document organization, and checklist-style support resources.'
      },
      {
        name: 'AARP Family Caregiving Guides',
        url: 'https://www.aarp.org/caregiving/prepare-to-care-planning-guide/',
        focus: 'Study printable planning guides, medication charts, and contact list patterns.'
      }
    ],
    tools: [
      'Medical History Form Builder',
      'Medication Tracker',
      'Appointment Prep Checklist',
      'Symptom Journal',
      'Vaccination Record Organizer',
      'Lab Result Tracker',
      'Caregiving Planner',
      'Discharge Checklist',
      'Advance Directive Checklist',
      'Insurance Card Organizer',
      'Family History Questionnaire',
      'Vitals Log',
      'Prenatal Appointment Tracker',
      'Elder Care Visit Log',
      'Child Care Schedule',
      'Provider Question List',
      'Health Expense Tracker',
      'Surgery Prep Checklist',
      'Recovery Timeline Planner',
      'Emergency Contact Sheet'
    ]
  },
  {
    slug: 'personal-finance-credit',
    name: 'Personal Finance & Credit',
    summary: 'Daily money tools focused on budgeting, debt payoff, savings, and credit improvement.',
    launchPriority: 'P0',
    intentAngle: 'Reliable search intent around calculators, payoff plans, and budgeting tools with clear personal value.',
    engineSlugs: ['deterministic-calculators', 'checklists-and-planners', 'match-and-score'],
    accuracyNotes: [
      'Keep repayment math deterministic and surface total interest, payoff date, and scenario comparisons.',
      'Label guidance as educational planning rather than individualized financial advice.',
      'Let users tune assumptions such as rates, fees, payment cadence, and extra contributions.'
    ],
    referenceProducts: [
      {
        name: 'Fidelity Budgeting & Debt Tools',
        url: 'https://www.fidelity.com/calculators-tools/budgeting-debt-management',
        focus: 'Study educational planning around debt payoff, savings, and budgeting calculators.'
      },
      {
        name: 'NerdWallet Personal Loan Calculators',
        url: 'https://www.nerdwallet.com/personal-loans/calculators',
        focus: 'Study loan math framing, comparison angles, and the way assumptions are explained.'
      },
      {
        name: 'NerdWallet Personal Loan Calculator',
        url: 'https://www.nerdwallet.com/calculator/loan-calculator',
        focus: 'Study the specific inputs and outputs users expect from a simple borrowing calculator.'
      }
    ],
    tools: [
      'Budget Planner',
      'Expense Tracker',
      'Debt Snowball Calculator',
      'Debt Avalanche Calculator',
      'Credit Utilization Checker',
      'Credit Card Payoff Calculator',
      'Personal Loan Calculator',
      'Emergency Fund Planner',
      'Net Worth Tracker',
      'Savings Goal Calculator',
      'Subscription Audit Tool',
      'Cash Envelope Planner',
      'Bill Calendar',
      'Sinking Fund Planner',
      'Debt-to-Income Calculator',
      'Refinance Savings Calculator',
      'BNPL Payment Planner',
      'Side-Hustle Tax Reserve Planner',
      'Financial Health Score',
      'Credit Improvement Roadmap'
    ]
  },
  {
    slug: 'retirement-benefits',
    name: 'Retirement & Benefits',
    summary: 'Long-horizon planning tools for saving, withdrawal strategy, benefit timing, and healthcare transitions.',
    launchPriority: 'P2',
    intentAngle: 'High-value planning category where users want calculators, timelines, and scenario comparisons rather than generic advice.',
    engineSlugs: ['deterministic-calculators', 'checklists-and-planners', 'document-workflows'],
    accuracyNotes: [
      'Use current age thresholds, contribution caps, and tax assumptions for the selected year.',
      'Keep estimate tools clearly distinct from official or personalized benefit statements.',
      'Expose inflation, return, and withdrawal assumptions because small changes materially affect outputs.'
    ],
    referenceProducts: [
      {
        name: 'Fidelity Retirement Calculator',
        url: 'https://www.fidelity.com/calculators-tools/retirement-calculator/overview',
        focus: 'Study retirement readiness framing, scenario planning, and income-oriented outputs.'
      },
      {
        name: 'SSA Get a Benefits Estimate',
        url: 'https://www.ssa.gov/prepare/get-benefits-estimate',
        focus: 'Study official benefit estimate positioning and the role of earnings history in claim-age decisions.'
      },
      {
        name: 'SSA Benefit Calculators',
        url: 'https://www.ssa.gov/OACT/anypia',
        focus: 'Study how estimate precision changes with different input depth and official assumptions.'
      }
    ],
    tools: [
      'Retirement Income Calculator',
      'Retirement Readiness Score',
      '401(k) Match Optimizer',
      'IRA Contribution Limit Helper',
      'Roth vs Traditional IRA Compare',
      'RMD Calculator',
      'Social Security Claim-Age Estimator',
      'Pension vs Lump-Sum Compare',
      'Pre-Medicare Coverage Planner',
      'Medicare Premium Budgeter',
      'Annuity Payout Estimator',
      'Withdrawal Rate Checker',
      'Longevity Scenario Planner',
      'Bridge Income Planner',
      'Sequence of Returns Simulator',
      'HSA Retirement Calculator',
      'Beneficiary Audit Checklist',
      'Survivor Benefit Worksheet',
      'Estate Cashflow Planner',
      'COLA Impact Tracker'
    ]
  },
  {
    slug: 'business-freelance',
    name: 'Business & Freelance',
    summary: 'Small business operations tools for proposals, invoicing, pricing, cash planning, and client management.',
    launchPriority: 'P0',
    intentAngle: 'Commercial and repeat usage intent is strong because these tools help people invoice faster and price work better.',
    engineSlugs: ['document-workflows', 'deterministic-calculators', 'ai-assisted-generators', 'checklists-and-planners'],
    accuracyNotes: [
      'Keep totals deterministic and recalculate immediately when quantity, rate, or tax changes.',
      'Treat document builders as reusable records with numbering, draft states, and export history.',
      'Make currencies, tax handling, and payment terms explicit from the start.'
    ],
    referenceProducts: [
      {
        name: 'Zoho Invoice Generator',
        url: 'https://www.zoho.com/invoice/free-invoice-generator.html',
        focus: 'Study how invoice creation balances speed, branding, totals, and export actions.'
      },
      {
        name: 'Zoho Invoice',
        url: 'https://www.zoho.com/invoice/',
        focus: 'Study the path from one-off generator to a fuller invoicing and payment workflow.'
      },
      {
        name: 'Shopify Free Tools',
        url: 'https://www.shopify.com/tools',
        focus: 'Study how operational tools are packaged as growth-focused utility pages for small businesses.'
      }
    ],
    tools: [
      'Invoice Generator',
      'Estimate Generator',
      'Proposal Builder',
      'Statement of Work Builder',
      'Timesheet Tracker',
      'Hourly Rate Calculator',
      'Freelance Pricing Calculator',
      'Retainer Pricing Calculator',
      'Client Onboarding Checklist',
      'Project Profitability Calculator',
      'Cash Runway Planner',
      'Burn Rate Calculator',
      'Tax Reserve Planner',
      'Receipt Generator',
      'Expense Tracker',
      'Late Fee Calculator',
      'Meeting Notes Recap Generator',
      'Contract Renewal Tracker',
      'Project Handoff Checklist',
      'Pay Stub Generator'
    ]
  },
  {
    slug: 'marketing-seo',
    name: 'Marketing & SEO',
    summary: 'Content planning and optimization tools for keyword research, metadata, briefs, and campaign assets.',
    launchPriority: 'P0',
    intentAngle: 'High-CTR category because searches for generators and SEO helpers map directly to one-task landing pages.',
    engineSlugs: ['ai-assisted-generators', 'deterministic-calculators', 'match-and-score'],
    accuracyNotes: [
      'Differentiate data-backed outputs such as search metrics from AI-generated suggestions such as titles or copy.',
      'Validate syntax for things like schema, slugs, and UTM parameters before export.',
      'Make intent classification explainable so users can trust why a page was labeled informational or commercial.'
    ],
    referenceProducts: [
      {
        name: 'Semrush Free Keyword Tool',
        url: 'https://www.semrush.com/free-tools/keyword-tool',
        focus: 'Study keyword discovery, data framing, and the relationship between search terms and content planning.'
      },
      {
        name: 'Semrush Title Generator',
        url: 'https://www.semrush.com/free-tools/title-generator/',
        focus: 'Study the fast generator pattern for titles and content ideation.'
      },
      {
        name: 'Semrush AI Text Generator',
        url: 'https://www.semrush.com/goodcontent/ai-text-generator/',
        focus: 'Study how multiple copy-generation tasks are unified under one content engine.'
      }
    ],
    tools: [
      'Keyword Research Starter',
      'Keyword Cluster Generator',
      'Topic Brief Generator',
      'Title Generator',
      'Meta Description Generator',
      'FAQ Schema Builder',
      'Internal Linking Suggester',
      'SEO Audit Checklist',
      'SERP Intent Classifier',
      'Competitor Gap Worksheet',
      'Blog Outline Generator',
      'Content Calendar Planner',
      'Ad Copy Generator',
      'Email Subject Line Tester',
      'CTA Generator',
      'UTM Builder',
      'QR Code Generator',
      'Slug Optimizer',
      'Open Graph Preview Helper',
      'A/B Hypothesis Generator'
    ]
  },
  {
    slug: 'ecommerce-selling',
    name: 'E-commerce & Selling',
    summary: 'Store-launch and product-operations tools for naming, merchandising, pricing, inventory, and policy basics.',
    launchPriority: 'P1',
    intentAngle: 'Strong transactional search behavior because merchants look for narrow tools they can use immediately.',
    engineSlugs: ['ai-assisted-generators', 'deterministic-calculators', 'document-workflows'],
    accuracyNotes: [
      'Keep margin, fee, shipping, and tax calculations explicit because small math errors break trust fast.',
      'Separate policy drafting from legal review so users do not mistake generated text for compliance clearance.',
      'Use inventory and reorder tools with editable lead times and service levels.'
    ],
    referenceProducts: [
      {
        name: 'Shopify Free Tools',
        url: 'https://www.shopify.com/tools',
        focus: 'Study how many narrow merchant tools can live under one discoverable tools hub.'
      },
      {
        name: 'Shopify Business Name Generator',
        url: 'https://www.shopify.com/tools/business-name-generator',
        focus: 'Study generator onboarding, domain availability framing, and rapid business-start intent.'
      },
      {
        name: 'Shopify Business Name Generator Terms',
        url: 'https://www.shopify.com/tools/business-name-generator/terms',
        focus: 'Study the disclaimer pattern for AI-generated names and trademark risk.'
      }
    ],
    tools: [
      'Business Name Generator',
      'Slogan Maker',
      'Domain Name Checker',
      'Logo Starter',
      'Product Title Generator',
      'Product Description Generator',
      'SKU Generator',
      'Barcode Label Helper',
      'Profit Margin Calculator',
      'Marketplace Fee Calculator',
      'Shipping Rate Estimator',
      'Bundle Pricing Calculator',
      'Subscription Pricing Calculator',
      'Return Policy Generator',
      'Terms and Conditions Generator',
      'Sales Tax Estimate Helper',
      'Size Chart Builder',
      'AOV Booster Planner',
      'Reorder Point Calculator',
      'Preorder Waitlist Builder'
    ]
  },
  {
    slug: 'content-creator-media',
    name: 'Content Creator & Media',
    summary: 'Publishing helpers for creators who need faster ideation, repurposing, captions, and packaging.',
    launchPriority: 'P1',
    intentAngle: 'High top-of-funnel and repeat intent because creators reuse hooks, captions, subtitles, and repurposing tools constantly.',
    engineSlugs: ['ai-assisted-generators', 'file-and-media-transform', 'checklists-and-planners', 'deterministic-calculators'],
    accuracyNotes: [
      'Preserve timestamps and speaker context when generating subtitles or transcripts.',
      'Keep platform formatting rules explicit for captions, threads, carousels, and media kits.',
      'Treat rate calculators as scenario planners, not market guarantees.'
    ],
    referenceProducts: [
      {
        name: 'Descript Subtitles Generator',
        url: 'https://www.descript.com/tools/subtitles-generator/',
        focus: 'Study subtitle-first entry points and creator-facing messaging around speed and accessibility.'
      },
      {
        name: 'CapCut Video to Text',
        url: 'https://www.capcut.com/tools/video-to-text',
        focus: 'Study automatic transcription flow, language support, and conversion from raw media to usable text.'
      }
    ],
    tools: [
      'Hook Generator',
      'Script Outline Builder',
      'Caption Generator',
      'Subtitles Generator',
      'Transcript Cleaner',
      'Clip Extractor Planner',
      'Thumbnail Text Ideator',
      'Hashtag Research Helper',
      'Newsletter to Thread Converter',
      'Thread to Carousel Outline',
      'Podcast Show Notes Generator',
      'Episode Title Generator',
      'Video Chapter Generator',
      'Batch Content Calendar',
      'Brand Voice Guide',
      'Sponsorship Rate Calculator',
      'Media Kit Builder',
      'Repurposing Planner',
      'Teleprompter Formatter',
      'Publishing Checklist'
    ]
  },
  {
    slug: 'auto-vehicles',
    name: 'Auto & Vehicles',
    summary: 'Ownership and purchase-decision tools for financing, fuel, maintenance, and long-term vehicle cost.',
    launchPriority: 'P2',
    intentAngle: 'High-value calculator intent because people want concrete cost comparisons before buying or refinancing.',
    engineSlugs: ['deterministic-calculators', 'checklists-and-planners', 'document-workflows'],
    accuracyNotes: [
      'Separate loan math, insurance estimates, depreciation, and maintenance assumptions so outputs stay interpretable.',
      'Let users tune annual mileage, region, fuel price, and vehicle age.',
      'If manufacturer schedules are used, label them clearly and allow manual override.'
    ],
    referenceProducts: [
      {
        name: 'Progressive Insurance Calculators & Tools',
        url: 'https://www.progressive.com/resources/insurance-calculators-and-tools/',
        focus: 'Study bundled car affordability, lease, depreciation, and coverage tools.'
      },
      {
        name: 'Edmunds True Cost to Own',
        url: 'https://www.edmunds.com/tco.html',
        focus: 'Study multi-factor ownership cost modeling across depreciation, fees, insurance, fuel, and repairs.'
      },
      {
        name: 'Edmunds TCO Method Notes',
        url: 'https://help.edmunds.com/hc/en-us/articles/206102997-What-is-True-Cost-to-Own-TCO',
        focus: 'Study how methodology and assumptions are documented for trust.'
      }
    ],
    tools: [
      'Car Affordability Calculator',
      'Monthly Payment Calculator',
      'Lease vs Buy Calculator',
      'Trade-In Worksheet',
      'Depreciation Calculator',
      'Total Cost of Ownership Calculator',
      'Fuel Cost Calculator',
      'EV vs Gas Compare',
      'Maintenance Schedule Tracker',
      'Service History Log',
      'Road Trip Fuel Estimator',
      'Insurance-Ready Checklist',
      'Used Car Inspection Checklist',
      'Registration Renewal Reminder',
      'Auto Loan Refinance Calculator',
      'Down Payment Planner',
      'Resale Target Tracker',
      'EV Charging Cost Calculator',
      'Tire Replacement Planner',
      'Accident Expense Log'
    ]
  },
  {
    slug: 'insurance-claims',
    name: 'Insurance & Claims',
    summary: 'Coverage planning and claims organization tools that help people document risk and navigate incidents.',
    launchPriority: 'P2',
    intentAngle: 'Useful because insurance is confusing, but trust depends on explaining limits, exclusions, and claim uncertainty.',
    engineSlugs: ['deterministic-calculators', 'document-workflows', 'checklists-and-planners'],
    accuracyNotes: [
      'Never imply that a calculator output equals approved coverage or a claim guarantee.',
      'Keep limit, deductible, and add-on terminology visible throughout the flow.',
      'Treat inventory and incident capture as exportable evidence tools, not just notes.'
    ],
    referenceProducts: [
      {
        name: 'Progressive Insurance Calculators & Tools',
        url: 'https://www.progressive.com/resources/insurance-calculators-and-tools/',
        focus: 'Study coverage estimation, home inventory patterns, and first-time buyer guidance.'
      },
      {
        name: 'AARP Tools and Calculators',
        url: 'https://www.aarp.org/tools/',
        focus: 'Study how life-planning tools can be organized around insurance, retirement, and caregiving decisions.'
      }
    ],
    tools: [
      'Auto Coverage Estimator',
      'Home Coverage Estimator',
      'Renters Coverage Worksheet',
      'Life Insurance Need Calculator',
      'Deductible Selector',
      'Umbrella Coverage Planner',
      'Home Inventory Builder',
      'Claim Document Checklist',
      'Claim Payout Tracker',
      'Premium Comparison Worksheet',
      'Incident Report Builder',
      'Accident Scene Checklist',
      'Renewal Reminder',
      'Beneficiary Audit Checklist',
      'Flood and Fire Gap Checklist',
      'Out-of-Pocket Risk Planner',
      'Rider Add-On Planner',
      'Coverage Glossary Explainer',
      'Disaster Recovery Checklist',
      'Policy Document Organizer'
    ]
  },
  {
    slug: 'immigration-citizenship',
    name: 'Immigration & Citizenship',
    summary: 'Document and process tools for passports, visas, immigration filing prep, and naturalization study.',
    launchPriority: 'P2',
    intentAngle: 'Strong checklist and planner demand, but accuracy depends on current official forms and fee tables.',
    engineSlugs: ['document-workflows', 'checklists-and-planners', 'deterministic-calculators'],
    accuracyNotes: [
      'Link to official form sources and edition dates wherever possible.',
      'Treat eligibility outputs as prechecks, never official determinations.',
      'Display filing fee version dates and make country or case-type selection mandatory.'
    ],
    referenceProducts: [
      {
        name: 'USCIS Civics Test Resources',
        url: 'https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test',
        focus: 'Study official naturalization study structure and versioned exam content.'
      },
      {
        name: 'U.S. Passport Forms',
        url: 'https://travel.state.gov/content/travel/en/passports/how-apply/forms.html',
        focus: 'Study official passport form routing and document prerequisites.'
      },
      {
        name: 'U.S. Passport Fees',
        url: 'https://travel.state.gov/content/travel/en/passports/how-apply/fees.html',
        focus: 'Study fee-table presentation and the need for current official pricing.'
      }
    ],
    tools: [
      'Passport Fee Calculator',
      'Passport Form Selector',
      'Passport Renewal Checklist',
      'Visa Document Checklist',
      'USCIS Filing Checklist',
      'Naturalization Civics Quiz',
      'English Interview Practice',
      'Biometrics Appointment Checklist',
      'Case Timeline Tracker',
      'Address History Organizer',
      'Affidavit of Support Checklist',
      'Translation Certification Checklist',
      'Work Authorization Renewal Reminder',
      'Embassy Appointment Tracker',
      'Travel Advisory Tracker',
      'Family Petition Checklist',
      'Green Card Renewal Checklist',
      'International Move Document Vault',
      'Eligibility Precheck Questionnaire',
      'Filing Fee Planner'
    ]
  },
  {
    slug: 'file-pdf-document-utilities',
    name: 'File, PDF & Document Utilities',
    summary: 'Mass-market utility tools for converting, merging, extracting, signing, and securing common document formats.',
    launchPriority: 'P0',
    intentAngle: 'Extremely strong search intent because users arrive with a clear action in mind and want immediate completion.',
    engineSlugs: ['file-and-media-transform', 'document-workflows'],
    accuracyNotes: [
      'Preserve layout fidelity and page order before optimizing for extra features.',
      'Be explicit about whether files are processed locally, temporarily uploaded, or retained.',
      'Use non-destructive previews and output summaries so users can verify the transformation.'
    ],
    referenceProducts: [
      {
        name: 'Adobe Acrobat Online',
        url: 'https://www.adobe.com/acrobat/online.html',
        focus: 'Study broad utility discovery, conversion flows, and how many tools can live inside one document suite.'
      },
      {
        name: 'Adobe PDF to Word',
        url: 'https://www.adobe.com/acrobat/online/pdf-to-word.html',
        focus: 'Study single-task landing page structure for a high-intent converter.'
      },
      {
        name: 'Adobe Fill and Sign',
        url: 'https://www.adobe.com/acrobat/online/sign-pdf.html',
        focus: 'Study the transition from file processing to fillable and signable workflows.'
      }
    ],
    tools: [
      'PDF to Word',
      'PDF to Excel',
      'PDF to PowerPoint',
      'PDF to JPG',
      'PDF to PNG',
      'Word to PDF',
      'Excel to PDF',
      'PowerPoint to PDF',
      'JPG to PDF',
      'PNG to PDF',
      'Merge PDF',
      'Split PDF',
      'Compress PDF',
      'OCR PDF',
      'Reorder Pages',
      'Delete Pages',
      'Rotate Pages',
      'Fill and Sign',
      'E-Sign Request Builder',
      'Redact PDF'
    ]
  }
] as const;
