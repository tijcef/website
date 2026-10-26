import { useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Share2 } from "lucide-react";
import { publicationUrl } from "@/lib/share";

type SocialShareProps = {
  title: string;
  url?: string;
  className?: string;
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.73-1.7H17V2.42c-.31-.04-1.37-.13-2.61-.13-2.58 0-4.35 1.58-4.35 4.48V9.5H7.12V13h2.92v9h3.46Z" /></svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M12.04 2a9.84 9.84 0 0 0-8.47 14.84L2.05 22l5.29-1.39A9.97 9.97 0 0 0 12.04 22 9.99 9.99 0 0 0 22 12.01 9.98 9.98 0 0 0 12.04 2Zm0 18.31a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.14.83.84-3.06-.2-.32a8.28 8.28 0 1 1 7 3.88Zm4.55-6.2c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.12-.16.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.57-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.57.12.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.61 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" /></svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.98 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.44 4.05H6.6L17.8 19.84Z" /></svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.04 2.04 0 1 0 4.75 7.08 2.04 2.04 0 0 0 4.75 3ZM21 13.84c0-3.77-2.01-5.52-4.7-5.52-2.16 0-3.13 1.19-3.67 2.03V8.5H9.14V21h3.49v-6.19c0-1.63.31-3.2 2.33-3.2 1.99 0 2.01 1.86 2.01 3.3V21H21v-7.16Z" /></svg>
);

export default function SocialShare({ title, url, className = "" }: SocialShareProps) {
  const { pathname } = useLocation();
  const shareUrl = publicationUrl(url || pathname);
  const [canShare, setCanShare] = useState(false);
  const [message, setMessage] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const copyId = useId();
  useEffect(() => { setCanShare(typeof navigator.share === "function"); }, []);
  useEffect(() => { setMessage(""); setManualCopy(false); }, [shareUrl]);
  async function copyLink() {
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(shareUrl); setManualCopy(false); setMessage("Link copied."); }
    catch { setManualCopy(true); setMessage("Select and copy the publication link below."); }
  }
  async function share() {
    try { await navigator.share({title,url:shareUrl}); setMessage(""); }
    catch(error) { if (!(error instanceof DOMException && error.name === "AbortError")) setMessage("Sharing could not open. Use a social button or Copy Link."); }
  }
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <FacebookIcon /> },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: <WhatsAppIcon /> },
    { name: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, icon: <XIcon /> },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <LinkedInIcon /> },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} aria-label="Share this publication" data-publication-share="true">
      <span className="text-sm font-semibold text-foreground">Share this:</span>
      {links.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${item.name}`}
          title={`Share on ${item.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {item.icon}
        </a>
      ))}
      <button type="button" onClick={copyLink} className="inline-flex min-h-10 items-center gap-2 rounded-full border bg-background px-4 text-sm text-foreground hover:border-primary"><Copy className="h-4 w-4" aria-hidden="true"/>Copy Link</button>
      {canShare && <button type="button" onClick={share} className="inline-flex min-h-10 items-center gap-2 rounded-full border bg-background px-4 text-sm text-foreground hover:border-primary"><Share2 className="h-4 w-4" aria-hidden="true"/>More sharing options</button>}
      {message && <p role="status" className="w-full text-sm text-muted-foreground">{message}</p>}
      {manualCopy && <label htmlFor={copyId} className="w-full text-sm">Publication link<input id={copyId} readOnly value={shareUrl} onFocus={event=>event.currentTarget.select()} className="mt-2 block w-full rounded-md border bg-background p-3 text-foreground"/></label>}
    </div>
  );
}
