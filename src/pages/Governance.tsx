import SimplePage from "@/components/site/SimplePage";
import PageMeta from "@/components/site/PageMeta";
import researchImage from "@/assets/research.jpg";

function PolicyPage({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <><PageMeta title={title} description={description} /><SimplePage eyebrow="Governance and Accountability" title={title} image={researchImage}><div className="prose prose-lg max-w-4xl">{children}<p><strong>Contact:</strong> <a href="mailto:info@tijcef.org">info@tijcef.org</a></p><p><strong>Last reviewed:</strong> 25 July 2026.</p></div></SimplePage></>;
}

export function Safeguarding() {
  return <PolicyPage title="Safeguarding and PSEA" description="TIJCEF's public safeguarding and protection commitment."><p>TIJCEF maintains zero tolerance for sexual exploitation, abuse, harassment and harm to children or vulnerable adults in its work.</p><h2>Our commitments</h2><ul><li>Use safe recruitment and role-appropriate screening.</li><li>Obtain informed consent for participation, stories and images.</li><li>Limit access to sensitive personal and geospatial information.</li><li>Respond promptly to concerns without retaliation.</li><li>Refer urgent protection or criminal matters to appropriate services and authorities.</li></ul><h2>Reporting a concern</h2><p>Do not include unnecessary identifying details in an initial email. State that you have a safeguarding concern and provide a safe way for our focal person to contact you. If someone is in immediate danger, contact the appropriate emergency or protection service first.</p></PolicyPage>;
}

export function Complaints() {
  return <PolicyPage title="Complaints and Feedback" description="How to submit feedback or a complaint to TIJCEF."><p>Community members, participants, partners, volunteers and donors may raise concerns about TIJCEF conduct, services or decisions.</p><h2>How we respond</h2><ul><li>We acknowledge complaints and assess urgency and safeguarding risk.</li><li>We handle information on a need-to-know basis.</li><li>We aim to provide a fair response and explain available escalation options.</li><li>Retaliation against a person who raises a good-faith concern is prohibited.</li></ul><p>Send complaints with the subject “Confidential Complaint.” Anonymous information will be reviewed, although limited detail may restrict investigation.</p></PolicyPage>;
}

export function DonationPolicy() {
  return <PolicyPage title="Donation and Refund Policy" description="TIJCEF donation processing, restrictions and refund policy."><p>Donations support TIJCEF's charitable purposes and approved organisational costs. Restricted gifts are accepted only where TIJCEF can responsibly honour the restriction.</p><h2>Payment and receipts</h2><p>Online gifts are recorded only after payment-provider verification. Bank transfers are acknowledged after confirmation. Never send card details or passwords by email.</p><h2>Refunds</h2><p>Donations are generally final. TIJCEF may review a refund request involving duplication, processing error, unauthorised payment or another exceptional circumstance. Requests should include the transaction reference and be submitted promptly. Any refund is returned through the original payment channel where possible.</p><h2>No guarantee</h2><p>A donation does not purchase influence, guarantee a beneficiary outcome or create an entitlement to funding.</p></PolicyPage>;
}

export function Terms() {
  return <PolicyPage title="Website Terms of Use" description="Terms governing use of the TIJCEF website and Grant Hub."><p>This website provides information about TIJCEF, its programmes and third-party opportunities. By using it, you agree not to misuse its forms, data or services.</p><h2>Grant Hub</h2><p>Grant listings are informational. Applicants must verify eligibility, deadlines and terms on the funder's official website. TIJCEF does not guarantee awards and does not charge an application fee unless an approved TIJCEF service is clearly identified.</p><h2>Content</h2><p>TIJCEF may correct, update or remove content. External links are provided for convenience and do not constitute control or endorsement of every external statement.</p></PolicyPage>;
}

const governancePages = {
  safeguarding: Safeguarding,
  complaints: Complaints,
  "donation-policy": DonationPolicy,
  terms: Terms,
};

export default function Governance({ page }: { page: keyof typeof governancePages }) {
  const Component = governancePages[page];
  return <Component />;
}
