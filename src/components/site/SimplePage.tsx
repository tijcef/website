import { ReactNode } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import Reveal from "@/components/site/Reveal";
import PageMeta from "@/components/site/PageMeta";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  children: ReactNode;
}

const PageHero = ({ eyebrow, title, subtitle, image }: Omit<Props, "children">) => (
  <section className="relative pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden text-primary-foreground">
    <div className="absolute inset-0">
      <img src={image} alt="" className="w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
    </div>
    <div className="container relative z-10">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">{eyebrow}</div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl text-balance mb-6">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">{subtitle}</p>}
      </Reveal>
    </div>
  </section>
);

const SimplePage = ({ eyebrow, title, subtitle, image, children }: Props) => (
  <SiteLayout>
    <PageMeta title={title} description={subtitle || `${title} — Tijwun Care and Empowerment Foundation.`} />
    <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} image={image} />
    <section className="py-20 md:py-28">
      <div className="container">{children}</div>
    </section>
  </SiteLayout>
);

export default SimplePage;
export { PageHero };
