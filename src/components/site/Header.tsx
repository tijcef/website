import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/tijcef-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pillars", label: "Our Pillars" },
  { to: "/programs", label: "Programs" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const onHero = pathname === "/" && !scrolled;

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
              TIJWUN CARE AND EMPOWERMENT  FOUNDATION
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                  onHero
                    ? "text-white/85 hover:text-white"
                    : "text-foreground/75 hover:text-foreground",
                  isActive && (onHero ? "text-white" : "text-primary")
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="donate" size="sm">
            <Link to="/donate">
              <Heart className="w-4 h-4" /> Donate
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={cn("lg:hidden p-2 rounded-md", onHero ? "text-white" : "text-foreground")}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
          <nav className="container py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-md text-base font-medium transition-colors",
                    isActive ? "bg-muted text-primary" : "text-foreground/80 hover:bg-muted"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
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
