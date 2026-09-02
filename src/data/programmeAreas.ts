export const programmeAreas = [
  {
    slug: "dignity",
    title: "Dignity",
    name: "Health, Menstrual Dignity & WASH",
    shortDescription:
      "Improving health knowledge, menstrual wellbeing, sanitation, safety and access to essential support.",
    problem:
      "Adolescent girls, women and underserved households still face preventable barriers to reliable health information, menstrual support, safe sanitation and respectful care.",
    approach:
      "TIJCEF works through schools and communities to deliver practical health education, menstrual dignity support and WASH action designed around local needs.",
    activities: [
      "Menstrual health education",
      "Dignity support and referrals",
      "School and community WASH action",
      "Adolescent wellbeing sessions",
    ],
    sdgs: "SDGs 3, 5 & 6 - Health, Gender Equality and WASH",
  },
  {
    slug: "agency",
    title: "Agency",
    name: "Education, Skills & Leadership",
    shortDescription:
      "Equipping women, girls and young people with knowledge, practical skills, confidence and opportunities to lead.",
    problem:
      "Many young people and women are excluded from the learning, networks, confidence and decision-making opportunities that shape their futures.",
    approach:
      "TIJCEF combines learning, mentoring, practical skills and leadership experiences so participants can make informed choices and contribute to their communities.",
    activities: [
      "School takeover and STEM outreach",
      "Leadership and life-skills development",
      "Entrepreneurship and opportunity readiness",
      "Women and youth mentoring",
    ],
    sdgs: "SDGs 4, 5 & 8 - Education, Equality and Decent Work",
  },
  {
    slug: "resilience",
    title: "Resilience",
    name: "Climate Action & Stronger Communities",
    shortDescription:
      "Supporting environmental action, community sanitation, volunteerism and locally led responses to social and environmental risks.",
    problem:
      "Communities with the fewest resources often face the greatest pressure from environmental change, weak sanitation systems and economic shocks.",
    approach:
      "TIJCEF supports practical community service, climate awareness and local capacity that help people prepare, respond and recover together.",
    activities: [
      "Community sanitation service days",
      "Youth climate education",
      "Volunteer mobilisation and training",
      "Environmental awareness and restoration",
    ],
    sdgs: "SDGs 6, 11 & 13 - WASH, Communities and Climate Action",
  },
  {
    slug: "evidence",
    title: "Evidence",
    name: "Research, Learning & Advocacy",
    shortDescription:
      "Using community data, monitoring, geospatial analysis and lived experience to improve programmes and influence decisions.",
    problem:
      "Community programmes are weaker when decisions are made without reliable local data, participant voices, documented learning or transparent results.",
    approach:
      "TIJCEF gathers proportionate evidence, protects sensitive information, reviews delivery and turns learning into better programme design and responsible advocacy.",
    activities: [
      "Participatory and applied research",
      "Monitoring, evaluation and learning",
      "Geospatial and community analysis",
      "Reports, briefs and evidence-led advocacy",
    ],
    sdgs: "SDGs 16 & 17 - Accountable Institutions and Partnerships",
  },
] as const;

export const approvedImpact = {
  cumulativeReach: 3500,
  reach2026: 1200,
  programmeAreas: programmeAreas.length,
  statesWithActivities: 3,
} as const;

export const activityStates = ["Adamawa", "Katsina", "Taraba"] as const;

