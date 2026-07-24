import SimplePage from "@/components/site/SimplePage";
import PageMeta from "@/components/site/PageMeta";
import researchImage from "@/assets/research.jpg";

export default function Privacy() {
  return <><PageMeta title="Privacy Notice" description="How TIJCEF collects, uses and protects personal information."/><SimplePage eyebrow="Governance" title="Privacy Notice" image={researchImage}><div className="prose prose-lg max-w-none"><p>TIJCEF collects only information needed to respond to enquiries, manage participation, review grant or TGIS submissions and improve our programmes.</p><h2>What we collect</h2><p>Information may include your name, contact details, organisation, form responses and technical information necessary for security. Do not submit sensitive personal data about children or vulnerable people through public forms.</p><h2>How we use information</h2><p>We use information for the purpose stated when it is collected, safeguarding, verification, programme administration and legal compliance. We do not sell personal information.</p><h2>Your choices</h2><p>You may request access, correction or deletion where applicable by emailing <a href="mailto:info@tijcef.org">info@tijcef.org</a>.</p><p><strong>Last updated:</strong> 24 July 2026.</p></div></SimplePage></>;
}
