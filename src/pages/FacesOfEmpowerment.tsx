import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import f1 from "@/assets/faces/faces-1.png";
import f2 from "@/assets/faces/faces-2.png";
import f3 from "@/assets/faces/faces-3.png";
import f4 from "@/assets/faces/faces-4.png";
import f5 from "@/assets/faces/faces-5.png";

const photos = [
  { src: f1, caption: "Pad-A-Girl distribution  girls celebrating menstrual dignity kits." },
  { src: f2, caption: "School outreach  TIJCEF team engaging students in a health session." },
  { src: f3, caption: "Classroom dialogue  girls actively participating in a learning circle." },
  { src: f4, caption: "TIJCEF team with a community partner during an empowerment event." },
  { src: f5, caption: "Youth and community members at a TIJCEF capacity-building session." },
];

const FacesOfEmpowerment = () => (
  <SimplePage
    eyebrow="Gallery"
    title="Faces of Empowerment 2025"
    subtitle="Portraits and stories from across our programs  girls, youth, and communities at the heart of TIJCEF's work."
    image={f3}
  >
    <div className="grid md:grid-cols-2 gap-8">
      {photos.map((p, i) => (
        <Reveal key={i} delay={i * 80}>
          <figure className="rounded-2xl overflow-hidden bg-card border border-border shadow-card">
            <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-72 md:h-96 object-cover" />
            <figcaption className="p-5 text-sm text-muted-foreground leading-relaxed">{p.caption}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </SimplePage>
);

export default FacesOfEmpowerment;
