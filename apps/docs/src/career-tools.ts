export type CareerToolStatus = 'now' | 'next' | 'later';

export interface CareerToolTrack {
  slug: string;
  name: string;
  summary: string;
  tractionAngle: string;
  audience: readonly string[];
  mvp: readonly string[];
  status: CareerToolStatus;
}

export interface CareerRoleLandingPage {
  slug: string;
  role: string;
  angle: string;
}

export interface CareerLaunchPhase {
  name: string;
  summary: string;
  deliverables: readonly string[];
}

export const careerToolTracks: readonly CareerToolTrack[] = [
  {
    slug: 'ats-match-checker',
    name: 'ATS Match Checker',
    summary: 'Compare a resume against a pasted job description and surface overlap, gaps, and rewrite prompts.',
    tractionAngle: 'Strong search intent because applicants run it for every serious application.',
    audience: ['Students and freshers', 'Career switchers', 'Tech candidates'],
    mvp: ['Resume paste/upload', 'Job description paste', 'Match score', 'Missing keywords', 'Rewrite prompts'],
    status: 'now'
  },
  {
    slug: 'resume-bullet-rewriter',
    name: 'Resume Bullet Rewriter',
    summary: 'Turn weak task-based bullets into impact-driven bullets with metrics and action verbs.',
    tractionAngle: 'High shareability because before/after rewrites feel immediately valuable.',
    audience: ['Students and freshers', 'Operations candidates', 'Marketing candidates'],
    mvp: ['Bullet input', 'Impact rewrite', 'Metric prompts', 'Role-specific tone'],
    status: 'now'
  },
  {
    slug: 'role-resume-tailor',
    name: 'Role-Specific Resume Tailor',
    summary: 'Generate targeted resume variants for different job families without starting from scratch.',
    tractionAngle: 'Repeat usage for the same user across multiple job categories.',
    audience: ['Career switchers', 'Generalist professionals', 'Agency recruiters'],
    mvp: ['Target role select', 'Keyword reweighting', 'Section ordering suggestions', 'Version export'],
    status: 'now'
  },
  {
    slug: 'cover-letter-builder',
    name: 'Cover Letter Builder',
    summary: 'Draft a targeted cover letter from the resume and the selected job description.',
    tractionAngle: 'Bundles naturally with ATS matching and resume tailoring.',
    audience: ['Students and freshers', 'Corporate applicants', 'International applicants'],
    mvp: ['Resume input', 'Job description input', 'Draft letter', 'Short email version'],
    status: 'next'
  },
  {
    slug: 'linkedin-profile-review',
    name: 'LinkedIn Profile Review',
    summary: 'Score headline, summary, and experience sections against a target role.',
    tractionAngle: 'Useful top-of-funnel content upgrade for users who are not ready to upload a resume yet.',
    audience: ['Professionals with experience', 'Freelancers', 'Career switchers'],
    mvp: ['Headline review', 'About rewrite', 'Experience tightening', 'CTA suggestions'],
    status: 'next'
  },
  {
    slug: 'interview-question-generator',
    name: 'Interview Question Generator',
    summary: 'Create likely interview questions from the resume, target role, and job description.',
    tractionAngle: 'Keeps users engaged after the resume step instead of losing them to another product.',
    audience: ['Tech candidates', 'Sales candidates', 'Operations candidates'],
    mvp: ['Role question bank', 'Resume-based questions', 'Behavioral prompts', 'Follow-up questions'],
    status: 'next'
  },
  {
    slug: 'salary-offer-compare',
    name: 'Salary and Offer Compare',
    summary: 'Compare multiple offers with salary, equity, location, notice period, and take-home context.',
    tractionAngle: 'High-value use case that can support monetization later.',
    audience: ['Mid-career professionals', 'Senior hires', 'International applicants'],
    mvp: ['Offer input', 'Weighted score', 'Take-home comparison', 'Negotiation notes'],
    status: 'later'
  },
  {
    slug: 'application-tracker',
    name: 'Application Tracker',
    summary: 'Track saved jobs, interview rounds, follow-ups, and outcomes in one place.',
    tractionAngle: 'Retention layer that gives the category repeat daily or weekly usage.',
    audience: ['Active job seekers', 'Campus applicants', 'Agency recruiters'],
    mvp: ['Saved jobs', 'Stage tracking', 'Follow-up reminders', 'Outcome log'],
    status: 'later'
  }
] as const;

export const careerRoleLandingPages: readonly CareerRoleLandingPage[] = [
  {
    slug: 'software-engineer',
    role: 'Software Engineer',
    angle: 'Strong ATS and interview-prep demand with GitHub and project evidence.'
  },
  {
    slug: 'data-analyst',
    role: 'Data Analyst',
    angle: 'Resume keyword alignment around SQL, Excel, BI tools, and measurable business outcomes.'
  },
  {
    slug: 'cybersecurity-analyst',
    role: 'Cybersecurity Analyst',
    angle: 'High-signal niche with certs, incident response, and tooling keywords.'
  },
  {
    slug: 'product-manager',
    role: 'Product Manager',
    angle: 'Storytelling-heavy resumes benefit from impact rewrites and stakeholder framing.'
  },
  {
    slug: 'sales-executive',
    role: 'Sales Executive',
    angle: 'Easy to demonstrate wins through quota, pipeline, and conversion metrics.'
  },
  {
    slug: 'marketing-manager',
    role: 'Marketing Manager',
    angle: 'Campaign and ROI language translates well into measurable resume improvements.'
  },
  {
    slug: 'operations-manager',
    role: 'Operations Manager',
    angle: 'Process, efficiency, and cross-functional delivery make ATS and bullet tools useful.'
  },
  {
    slug: 'registered-nurse',
    role: 'Registered Nurse',
    angle: 'High-demand healthcare role with certifications, compliance, and shift-based experience framing.'
  }
] as const;

export const careerLaunchPhases: readonly CareerLaunchPhase[] = [
  {
    name: 'Phase 1: Job Application Core',
    summary: 'Launch the tools that directly improve an application within minutes.',
    deliverables: ['ATS Match Checker', 'Resume Bullet Rewriter', 'Role-Specific Resume Tailor', 'Role landing pages']
  },
  {
    name: 'Phase 2: Conversion Layer',
    summary: 'Add the features that turn improved resumes into stronger outreach and interview readiness.',
    deliverables: ['Cover Letter Builder', 'LinkedIn Profile Review', 'Interview Question Generator']
  },
  {
    name: 'Phase 3: Retention and Monetization',
    summary: 'Introduce the features people return to after they start applying seriously.',
    deliverables: ['Salary and Offer Compare', 'Application Tracker', 'Saved history and exports']
  }
] as const;

export const careerCoreWorkflow = [
  'Paste resume or upload text',
  'Paste a job description',
  'Get a match score and missing terms',
  'Rewrite weak bullets for that role',
  'Generate the matching cover letter and interview prep'
] as const;
