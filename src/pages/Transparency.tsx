import SimplePage from "@/components/site/SimplePage";
import PageMeta from "@/components/site/PageMeta";
import researchImage from "@/assets/research.jpg";

export default function Transparency() {
  return <><PageMeta title="Transparency and Accountability" description="TIJCEF governance, safeguarding and accountability commitments."/><SimplePage eyebrow="Accountability" title="Transparency" image={researchImage}><div className="prose prose-lg max-w-none"><p>TIJCEF is committed to responsible governance, accurate public claims, safeguarding and accountable use of resources.</p><h2>Our commitments</h2><ul><li>Publish programme figures only when supported by internal records.</li><li>Correct material errors clearly and promptly.</li><li>Protect children and vulnerable people in stories, photographs and geospatial data.</li><li>Disclose when an opportunity is third-party information rather than TIJCEF funding.</li><li>Maintain zero tolerance for sexual exploitation and abuse.</li></ul><h2>Documents</h2><p><a href="/TIJCEF_ANNUAL_REPORT_2025.pdf">2025 Annual Report</a> · <a href="/TIJCEF_PRESS_KIT.pdf">Press Kit</a></p><p>Questions or concerns may be sent to <a href="mailto:info@tijcef.org">info@tijcef.org</a>.</p></div></SimplePage></>;
}
