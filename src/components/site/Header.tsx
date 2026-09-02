import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getNavigation,
  type NavigationItem,
} from "@/lib/wordpress";
import logo from "@/assets/tijcef-logo.webp";

const fallbackLinks: NavigationItem[] = [
  { id: "home", url: "/", label: "Home", children: [] },
  { id: "about", url: "/about", label: "About", children: [] },
  {
    id: "pillars",
    url: "/pillars",
    label: "Our Work",
    children: [
      { id: "dignity", url: "/pillars#dignity", label: "Health, Dignity & WASH", children: [] },
      { id: "agency", url: "/pillars#agency", label: "Education, Skills & Leadership", children: [] },
      { id: "resilience", url: "/pillars#resilience", label: "Climate & Community Resilience", children: [] },
      { id: "evidence", url: "/pillars#evidence", label: "Research, Learning & Advocacy", children: [] },
    ],
  },
  {
    id: "programs",
    url: "/programs",
    label: "Programmes",
    children: [
      { id: "current-programs", url: "/category/current-programs", label: "Current Programmes", children: [] },
      { id: "completed-projects", url: "/category/completed-projects", label: "Completed Projects", children: [] },
      { id: "impact-stories", url: "/category/impact-stories", label: "Impact Stories", children: [] },
    ],
  },
  { id: "impact", url: "/impact", label: "Impact", children: [] },
  {
    id: "grant-hub",
    url: "/grants",
    label: "Grant Hub",
    children: [
      { id: "all-opportunities", url: "/grants/opportunities", label: "All Opportunities", children: [] },
      { id: "grants", url: "/grants/grants", label: "Grants", children: [] },
      { id: "scholarships", url: "/grants/scholarships", label: "Scholarships", children: [] },
      { id: "fellowships", url: "/grants/fellowships", label: "Fellowships", children: [] },
      { id: "jobs", url: "/grants/jobs", label: "Jobs", children: [] },
      { id: "internships", url: "/grants/internships", label: "Internships", children: [] },
    ],
  },
  { id: "get-involved", url: "/get-involved", label: "Get Involved", children: [] },
  {
    id: "resources",
    url: "/resources",
    label: "Resources",
    children: [
      { id: "reports", url: "/category/reports-publications", label: "Reports & Publications", children: [] },
      { id: "media-coverage", url: "/media-coverage", label: "Media & Mentions", children: [] },
      { id: "toolkits", url: "/category/toolkits", label: "Toolkits", children: [] },
      { id: "gallery", url: "/category/gallery", label: "Gallery", children: [] },
    ],
  },
  { id: "contact", url: "/contact", label: "Contact", children: [] },
];

const NAVIGATION_CACHE_KEY = "tijcef-primary-navigation-v3";
const NAVIGATION_CACHE_MS = 5 * 60 * 1000;

const normalizeUrl = (url: string) => {
  if (!url) return "/";
  if (url.startsWith("/") || url.startsWith("#")) return url;
  try {
    const parsed = new URL(url, "https://www.tijcef.org");
    if (
      parsed.hostname === "tijcef.org" ||
      parsed.hostname === "www.tijcef.org" ||
      parsed.hostname === "studio.tijcef.org"
    ) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    return parsed.toString();
  } catch {
    return "/";
  }
};

const isExternal = (url: string) => /^https?:\/\//i.test(normalizeUrl(url));

function DesktopSubmenuItem({ item }: { item: NavigationItem }) {
  const to = normalizeUrl(item.url);
  const hasChildren = item.children.length > 0;
  const className =
    "flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-primary";
  return (
    <div className="group/submenu relative">
      {isExternal(item.url) ? (
        <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
          {item.label}{hasChildren && <ChevronRight className="h-4 w-4" />}
        </a>
      ) : (
        <NavLink to={to} className={({ isActive }) => cn(className, isActive && "bg-muted text-primary")}>
          {item.label}{hasChildren && <ChevronRight className="h-4 w-4" />}
        </NavLink>
      )}
      {hasChildren && (
        <div className="invisible absolute left-full top-0 z-50 min-w-64 translate-x-2 pl-2 opacity-0 transition-all duration-200 group-hover/submenu:visible group-hover/submenu:translate-x-0 group-hover/submenu:opacity-100 group-focus-within/submenu:visible group-focus-within/submenu:translate-x-0 group-focus-within/submenu:opacity-100">
          <div className="rounded-xl border border-border/70 bg-background p-2 shadow-elegant">
            {item.children.map((child) => <DesktopSubmenuItem key={child.id} item={child} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSubmenuItem({
  item,
  expanded,
  toggle,
  depth = 0,
}: {
  item: NavigationItem;
  expanded: Set<string>;
  toggle: (id: string) => void;
  depth?: number;
}) {
  const to = normalizeUrl(item.url);
  const id = String(item.id);
  const hasChildren = item.children.length > 0;
  const isExpanded = expanded.has(id);
  const linkClassName = "flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary";
  return (
    <div style={{ marginLeft: `${Math.min(depth, 3) * 0.75}rem` }}>
      <div className="flex items-center">
        {isExternal(item.url) ? (
          <a href={to} target="_blank" rel="noopener noreferrer" className={linkClassName}>{item.label}</a>
        ) : (
          <NavLink to={to} className={({ isActive }) => cn(linkClassName, isActive && "bg-muted text-primary")}>{item.label}</NavLink>
        )}
        {hasChildren && (
          <button
            type="button"
            className="rounded-md p-2.5 text-foreground/70 hover:bg-muted"
            aria-label={`Show ${item.label} submenu`}
            aria-expanded={isExpanded}
            onClick={() => toggle(id)}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="border-l border-border pl-2">
          {item.children.map((child) => (
            <MobileSubmenuItem key={child.id} item={child} expanded={expanded} toggle={toggle} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function DesktopLink({
  item,
  onHero,
}: {
  item: NavigationItem;
  onHero: boolean;
}) {
  const to = normalizeUrl(item.url);
  const hasChildren = item.children.length > 0;
  const label = (
    <>
      {item.label}
      {hasChildren && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
    </>
  );

  return (
    <div className="group relative">
      {isExternal(item.url) ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            onHero ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground"
          )}
        >
          {label}
        </a>
      ) : (
        <NavLink
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              onHero ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground",
              isActive && (onHero ? "text-white" : "text-primary")
            )
          }
        >
          {label}
        </NavLink>
      )}

      {hasChildren && (
        <div className="invisible absolute left-0 top-full z-50 min-w-72 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="rounded-xl border border-border/70 bg-background p-2 text-foreground shadow-elegant">
            {item.children.map((child) => <DesktopSubmenuItem key={child.id} item={child} />)}
          </div>
        </div>
      )}
    </div>
  );
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [links, setLinks] = useState<NavigationItem[]>(fallbackLinks);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(new Set());
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(NAVIGATION_CACHE_KEY) || "null");
      if (cached?.expiresAt > Date.now() && Array.isArray(cached.items)) {
        setLinks(cached.items);
      }
    } catch {
      localStorage.removeItem(NAVIGATION_CACHE_KEY);
    }

    getNavigation()
      .then((items) => {
        setLinks(items);
        localStorage.setItem(
          NAVIGATION_CACHE_KEY,
          JSON.stringify({ items, expiresAt: Date.now() + NAVIGATION_CACHE_MS })
        );
      })
      .catch(() => {
        // The built-in navigation keeps the site usable while WordPress is unavailable.
      });
  }, []);

  const onHero = pathname === "/" && !scrolled;
  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "py-5",
        onHero && "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className={cn(
            "w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden",
            onHero ? "bg-white/95 shadow-lg" : "bg-white shadow-card"
          )}>
            <img src={logo} alt="TIJCEF logo" className="w-full h-full object-contain p-0.5" />
          </div>
          <div className="leading-tight">
            <div className={cn("font-display text-lg font-semibold tracking-tight", onHero ? "text-white" : "text-foreground")}>
              TIJCEF
            </div>
            <div className={cn("text-[9px] uppercase tracking-[0.12em]", onHero ? "text-white/70" : "text-muted-foreground")}>
              TIJWUN CARE AND EMPOWERMENT FOUNDATION
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((item) => (
            <DesktopLink key={item.id} item={item} onHero={onHero} />
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <Button asChild variant="donate" size="sm">
            <Link to="/donate">
              <Heart className="w-4 h-4" /> Donate
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={cn("xl:hidden p-2 rounded-md", onHero ? "text-white" : "text-foreground")}
          aria-label={open ? "Close main menu" : "Open main menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="xl:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
          <nav aria-label="Mobile navigation" className="container flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto py-6">
            {links.map((item) => {
              const to = normalizeUrl(item.url);
              const hasChildren = item.children.length > 0;
              const itemId = String(item.id);
              const isExpanded = expanded.has(itemId);
              return (
                <div key={item.id}>
                  <div className="flex items-center">
                    {isExternal(item.url) ? (
                      <a href={to} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-md px-4 py-3 text-base font-medium text-foreground/80 hover:bg-muted">
                        {item.label}
                      </a>
                    ) : (
                      <NavLink
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                          cn(
                            "flex-1 rounded-md px-4 py-3 text-base font-medium transition-colors",
                            isActive ? "bg-muted text-primary" : "text-foreground/80 hover:bg-muted"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                    {hasChildren && (
                      <button
                        type="button"
                        className="rounded-md p-3 text-foreground/70 hover:bg-muted"
                        aria-label={`Show ${item.label} submenu`}
                        aria-expanded={isExpanded}
                        onClick={() => toggleExpanded(itemId)}
                      >
                        <ChevronDown className={cn("h-5 w-5 transition-transform", isExpanded && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isExpanded && (
                    <div className="ml-4 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <MobileSubmenuItem key={child.id} item={child} expanded={expanded} toggle={toggleExpanded} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Button asChild variant="donate" className="mt-4">
              <Link to="/donate"><Heart className="w-4 h-4" /> Donate Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
