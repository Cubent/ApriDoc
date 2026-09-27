// Everything on the About page that names a real person or institution lives here.
// Add real entries only: the team and reviewer sections stay hidden while these are empty.

export type Person = {
  name: string;
  /** Credentials shown after the name, e.g. "MD" or "MD, MPH". */
  credentials?: string;
  /** Role at MedPrep Institute, e.g. "Founder" or "Physician reviewer". */
  role: string;
  /** Their school, hospital or program. */
  affiliation?: string;
  /** One or two sentences. */
  bio?: string;
  /** Path under /public, e.g. "/team/jane-doe.jpg". Initials are shown when omitted. */
  photo?: string;
  /** Public profile (LinkedIn, faculty page). */
  url?: string;
};

export type Partner = {
  name: string;
  detail?: string;
  /** How the relationship is described, e.g. "Built in collaboration with". */
  relationship: string;
  url?: string;
};

/** Schools, hospitals and programs MedPrep Institute works with. */
export const partners: Partner[] = [
  {
    name: "New York Medical College",
    detail: "St. Clare's & St. Mary's Internal Medicine Residency Program",
    relationship: 'Built in collaboration with',
  },
];

/** The people who build and run MedPrep Institute. */
// Photos: drop a file in apps/web/public/team/ named after the person, e.g. elena-marchetti.jpg
// (.jpg, .jpeg, .png or .webp). It is picked up automatically, no code change needed.
export const team: Person[] = [
  { name: 'Dr. Elena Marchetti', role: 'Chief of Medicine' },
  { name: 'Dr. James Okafor', role: 'Cardiology' },
  { name: 'Dr. Priya Raghunathan', role: 'Neurology' },
  { name: 'Dr. Lukas Bergmann', role: 'Orthopedic Surgery' },
];

/** Physicians who review the questions and explanations. */
export const reviewers: Person[] = [];

// Shown only by `pnpm dev`, so the design can be previewed. Never rendered in production.
export const sampleTeam: Person[] = [
  { name: 'Sample Name', credentials: 'MD', role: 'Founder', affiliation: 'Sample Medical School', bio: 'Two sentences about who they are and why they build MedPrep Institute.' },
  { name: 'Sample Name', credentials: 'MBBS', role: 'Head of Content', affiliation: 'Sample University', bio: 'Two sentences about who they are and what they own.' },
  { name: 'Sample Name', role: 'Engineering', affiliation: 'Sample Institute', bio: 'Two sentences about who they are and what they build.' },
];

export const sampleReviewers: Person[] = [
  { name: 'Sample Name', credentials: 'MD', role: 'Physician reviewer', affiliation: 'Sample Residency Program' },
  { name: 'Sample Name', credentials: 'MD, PhD', role: 'Physician reviewer', affiliation: 'Sample Hospital' },
  { name: 'Sample Name', credentials: 'DO', role: 'Physician reviewer', affiliation: 'Sample Medical Center' },
];
