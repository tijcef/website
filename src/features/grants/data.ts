export type Role = "guest" | "basic" | "verified" | "admin";
export type Membership = "basic" | "verified" | "pro" | "partner" | "admin";
export type VerificationStatus = "unverified" | "pending_review" | "verified" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: "individual" | "organization";
  role: Role;
  membership: Membership;
  verification: VerificationStatus;
  organization?: {
    name: string;
    country: string;
    sector: string;
    website?: string;
    description: string;
    documents: { name: string; type: string }[];
    submittedAt?: string;
  };
  savedGrants: string[];
  appliedGrants: string[];
}

export interface Grant {
  id: string;
  title: string;
  source: string;
  category: string;
  country: string;
  amountMin: number;
  amountMax: number;
  currency: string;
  deadline: string;
  eligibility: string[];
  description: string;
  link: string;
  featured?: boolean;
}

export const SECTORS = [
  "Health",
  "Climate",
  "Education",
  "Youth",
  "Agriculture",
  "Gender",
  "Technology",
  "Human Rights",
] as const;

export const GRANTS: Grant[] = [
  {
    id: "g1",
    title: "Youth4Climate Call for Solutions 2026",
    source: "UNDP & Italian Ministry of Environment",
    category: "Climate",
    country: "Global",
    amountMin: 10000,
    amountMax: 30000,
    currency: "USD",
    deadline: "2026-09-30",
    eligibility: [
      "Youth-led project (founders aged 18–35)",
      "Operating in one of 158 UNDP programme countries",
      "Project ready to be implemented or scaled",
    ],
    description:
      "The fourth edition of Youth4Climate offers funding and capacity-building to youth-led climate innovations across mitigation, adaptation, and just transition. Since 2023, the initiative has awarded USD 4M to 150 youth-led projects.",
    link: "https://www.youth4climate.info/",
    featured: true,
  },
  {
    id: "g2",
    title: "Youth Climate Justice Fund 2026 Open Call",
    source: "Youth Climate Justice Fund (YCJF)",
    category: "Youth",
    country: "Global South",
    amountMin: 5000,
    amountMax: 40000,
    currency: "USD",
    deadline: "2026-07-15",
    eligibility: [
      "Youth-led group (majority of leadership aged ≤35)",
      "Based in Global South regions (Africa, Asia-Pacific, LATAM, MENA)",
      "Climate justice or socio-environmental focus",
    ],
    description:
      "Core flexible funding for emerging youth-led climate justice movements. Local groups up to USD 20,000; national groups up to USD 40,000. Participatory, youth-led decision making.",
    link: "https://ycjf.org/how-to-apply",
    featured: true,
  },
  {
    id: "g3",
    title: "UNICEF Venture Fund — Climate & Health 2026",
    source: "UNICEF Office of Innovation",
    category: "Health",
    country: "Emerging markets",
    amountMin: 50000,
    amountMax: 100000,
    currency: "USD",
    deadline: "2026-08-31",
    eligibility: [
      "Registered startup in a UNICEF programme country",
      "Open-source frontier tech solution",
      "Working at climate × children's health intersection",
    ],
    description:
      "Equity-free investment for early-stage startups developing open-source frontier technologies (AI, drones, blockchain, sensors) addressing children's health risks driven by climate change.",
    link: "https://www.unicef.org/innovation/call-for-application-climate-and-health-2026",
    featured: true,
  },
  {
    id: "g4",
    title: "Youth Empowerment Fund 2026",
    source: "European Union & Global Youth Mobilization",
    category: "Youth",
    country: "Global",
    amountMin: 2500,
    amountMax: 7500,
    currency: "EUR",
    deadline: "2026-07-31",
    eligibility: [
      "Youth-led initiative (aged 14–35)",
      "Project advancing the Sustainable Development Goals",
      "Implemented at local/community level",
    ],
    description:
      "Direct financial support from the EU–GYM partnership for youth-led SDG initiatives. Micro-grants enable young people to lead solutions in their own communities.",
    link: "https://globalyouthmobilization.org/youth-led-solutions-open-call/",
  },
  {
    id: "g5",
    title: "Gender and Learning Evidence Fund — First Call",
    source: "Brink Foundation (funded by Gates Foundation)",
    category: "Education",
    country: "Africa",
    amountMin: 50000,
    amountMax: 250000,
    currency: "USD",
    deadline: "2026-06-05",
    eligibility: [
      "Organisation already implementing education or gender programmes in Africa",
      "Capacity to generate rigorous learning evidence",
      "Focus on improving learning outcomes while addressing gender gaps",
    ],
    description:
      "Grants for organisations integrating gender-responsive approaches into education delivery and producing implementation evidence on what works to close gender learning gaps.",
    link: "https://www.brink-foundation.org/issues/gender-and-learning-evidence-fund",
    featured: true,
  },
  {
    id: "g6",
    title: "RTIA Sub-Grants: Gender-Responsive Teacher PD",
    source: "VVOB – Regional Teachers Initiative for Africa",
    category: "Education",
    country: "Sub-Saharan Africa",
    amountMin: 30000,
    amountMax: 150000,
    currency: "EUR",
    deadline: "2026-06-30",
    eligibility: [
      "NGO or institution working on teacher professional development",
      "Operating in Sub-Saharan Africa",
      "Track record of gender-responsive pedagogy",
    ],
    description:
      "Sub-grants to scale gender-responsive teacher professional development models that strengthen public education systems and reduce gender inequalities in learning outcomes.",
    link: "https://www.vvob.org/en/programmes/regional-teachers-initiative-africa-rtia",
  },
  {
    id: "g7",
    title: "YECAP Climate Impact Micro Grants 2026",
    source: "Youth Empowerment in Climate Action Platform (UNDP, UNICEF, UN ESCAP, UNFCCC)",
    category: "Climate",
    country: "Asia-Pacific",
    amountMin: 500,
    amountMax: 2000,
    currency: "USD",
    deadline: "2026-06-20",
    eligibility: [
      "Youth-led initiative (aged 15–35)",
      "Based in Asia-Pacific region",
      "Climate adaptation, mitigation or advocacy focus",
    ],
    description:
      "Catalytic micro-grants for youth-led climate solutions across Asia and the Pacific. Designed to seed-fund grassroots projects with potential to scale.",
    link: "https://www.yecap-ap.org/grants",
  },
  {
    id: "g8",
    title: "Open Society Foundations — Civil Society Strengthening",
    source: "Open Society Foundations",
    category: "Human Rights",
    country: "Global",
    amountMin: 25000,
    amountMax: 150000,
    currency: "USD",
    deadline: "2026-12-31",
    eligibility: [
      "Registered civil society organisation",
      "Human rights, justice, or democratic participation mandate",
      "Demonstrated organisational capacity",
    ],
    description:
      "Grants to civil society organisations advancing human rights, accountability, equity, and democratic participation. Open Society accepts proposals on a rolling basis aligned with regional and thematic priorities.",
    link: "https://www.opensocietyfoundations.org/grants",
  },
];
