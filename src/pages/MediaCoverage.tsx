import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Newspaper, RefreshCw, Search, ShieldCheck } from "lucide-react";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Input } from "@/components/ui/input";
import { getMediaCoverage, type MediaMention } from "@/lib/wordpress";
import researchImg from "@/assets/research.jpg";

const curatedMentions: MediaMention[] = [
  {
    id: "vanguard-2026",
    title: "Humanitarian Advocate Champions Grassroots Empowerment for Women & Youth in Nigeria",
    publisher: "Vanguard Nigeria",
    sourceUrl: "https://www.vanguardngr.com/2026/02/humanitarian-advocate-champions-grassroots-empowerment-for-women-youth-in-nigeria/",
    publishedOn: "2026-02-01",
    mentionType: "Press coverage",
    summary: "Coverage of TIJCEF's grassroots work with women and young people in Nigeria.",
    verified: true,
  },
  {
    id: "sun-2026",
    title: "Emmanuel Sunday Tijwun's Role in Promoting Women, Youth, Community Empowerment in Nigeria",
    publisher: "The Sun Nigeria",
    sourceUrl: "https://thesun.ng/emmanuel-sunday-tijwuns-role-in-promoting-women-youth-community-empowerment-in-nigeria/",
    publishedOn: "2026-02-06",
    mentionType: "Press coverage",
    summary: "A profile of TIJCEF's founder and the foundation's community empowerment approach.",
    verified: true,
  },
  {
    id: "independent-2026",
    title: "Tijwun Care and Empowerment Foundation in Collaboration with Lead the Girl Child Foundation",
    publisher: "Independent Nigeria",
    sourceUrl: "https://independent.ng/tijwun-care-and-empowerment-foundation-in-collaboration-with-lead-the-girl-child-foundation/",
    publishedOn: "",
    mentionType: "Press coverage",
    summary: "Coverage of a partnership supporting menstrual health, dignity and girl-child development.",
    verified: true,
  },
  {
    id: "un-sdg-platform",
    title: "Tijwun Care and Empowerment Foundation (TIJCEF)",
    publisher: "United Nations SDG Partnerships Platform",
    sourceUrl: "https://sdgs.un.org/partnerships/tijwun-care-and-empowerment-foundation-tijcef",
    publishedOn: "",
    mentionType: "Official listing",
    summary: "TIJCEF's public entry on the United Nations SDG Partnerships Platform.",
    verified: true,
  },
];

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-NG", { month: "long", year: "numeric" }).format(date);
};

export default function MediaCoverage() {
  const [tracked, setTracked] = useState<MediaMention[]>([]);
  const [query, setQuery] = useState("");
  const [syncState, setSyncState] = useState<"checking" | "current" | "fallback">("checking");

  useEffect(() => {
    let active = true;
    getMediaCoverage()
      .then((items) => {
        if (!active) return;
        setTracked(items);
        setSyncState("current");
      })
      .catch(() => active && setSyncState("fallback"));
    return () => {
      active = false;
    };
  }, []);

  const mentions = useMemo(() => {
    const merged = [...tracked, ...curatedMentions];
    const unique = new Map<string, MediaMention>();
    for (const item of merged) {
      const key = item.sourceUrl.replace(/\/$/, "").toLowerCase();
      if (!unique.has(key)) unique.set(key, item);
    }
    return Array.from(unique.values())
      .filter((item) => `${item.title} ${item.publisher} ${item.summary}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  }, [query, tracked]);

  return (
    <SimplePage
      eyebrow="Media and Mentions"
      title="Independent coverage, official listings and public references."
      subtitle="TIJCEF monitors exact-name mentions, reviews sources before publication and maintains one transparent record for funders, journalists and partners."
      metaDescription="Track verified media coverage, official listings and independent publications about TIJCEF and its community programmes."
      image={researchImg}
    >
      <Reveal>
        <section className="mb-12 rounded-2xl border bg-muted/50 p-6 md:p-8" aria-label="Publication monitoring status">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary"><RefreshCw className="h-5 w-5" /></div>
              <div>
                <h2 className="text-2xl">Publication monitoring is active</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The website's WordPress service checks daily for exact references to “TIJCEF” and “Tijwun Care and Empowerment Foundation”. New discoveries remain unpublished until reviewed by an authorised editor.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-background px-4 py-2 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              {syncState === "checking" ? "Checking tracker" : syncState === "current" ? "Tracker connected" : "Verified archive shown"}
            </div>
          </div>
        </section>
      </Reveal>

      <div className="relative mb-10 max-w-xl">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-12 pl-10" placeholder="Search title or publisher" aria-label="Search TIJCEF media coverage" />
      </div>

      <section aria-label="Verified TIJCEF media coverage" className="grid gap-6 md:grid-cols-2">
        {mentions.map((item, index) => (
          <Reveal key={String(item.id)} delay={index * 60}>
            <article className="flex h-full flex-col rounded-2xl border bg-card p-7 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Newspaper className="h-4 w-4" /> {item.mentionType}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="h-4 w-4" /> Reviewed</div>
              </div>
              <h2 className="mt-5 text-2xl leading-tight">{item.title}</h2>
              <div className="mt-3 text-sm font-semibold text-primary">{item.publisher}</div>
              {item.publishedOn && <div className="mt-1 text-xs text-muted-foreground">{formatDate(item.publishedOn)}</div>}
              {item.summary && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>}
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                Open original source <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          </Reveal>
        ))}
      </section>

      {mentions.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">No reviewed mention matches this search.</div>
      )}

      <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
        Know of a publication that is missing? Send the original link to <a className="font-semibold text-primary underline" href="mailto:info@tijcef.org?subject=Publication%20for%20TIJCEF%20media%20tracker">info@tijcef.org</a> for verification and inclusion.
      </p>
    </SimplePage>
  );
}
