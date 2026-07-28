import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index.tsx";
const About = lazy(() => import("./pages/About.tsx"));
const Pillars = lazy(() => import("./pages/Pillars.tsx"));
const Programs = lazy(() => import("./pages/Programs.tsx"));
const GetInvolved = lazy(() => import("./pages/GetInvolved.tsx"));
const Donate = lazy(() => import("./pages/Donate.tsx"));
const Resources = lazy(() => import("./pages/Resources.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const PadAGirlToolkit = lazy(() => import("./pages/PadAGirlToolkit.tsx"));
const CommunityCircles = lazy(() => import("./pages/CommunityCircles.tsx"));
const MenstrualHealthResearch = lazy(() => import("./pages/MenstrualHealthResearch.tsx"));
const FacesOfEmpowerment = lazy(() => import("./pages/FacesOfEmpowerment.tsx"));
const GrantHub = lazy(() => import("./pages/GrantHub.tsx"));
const Category = lazy(() => import("./pages/Category.tsx"));
const Post = lazy(() => import("./pages/Post.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Transparency = lazy(() => import("./pages/Transparency.tsx"));
const Governance = lazy(() => import("./pages/Governance.tsx"));

const queryClient = new QueryClient();

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const loading = (
  <div className="grid min-h-screen place-items-center bg-background" role="status">
    <span className="text-sm font-semibold text-muted-foreground">Loading TIJCEF…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteEffects />
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/resources/pad-a-girl-toolkit" element={<PadAGirlToolkit />} />
            <Route path="/resources/community-circles" element={<CommunityCircles />} />
            <Route path="/resources/menstrual-health-taraba-adamawa" element={<MenstrualHealthResearch />} />
            <Route path="/resources/faces-of-empowerment-2025" element={<FacesOfEmpowerment />} />
            <Route path="/grants/*" element={<GrantHub />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/safeguarding" element={<Governance page="safeguarding" />} />
            <Route path="/complaints" element={<Governance page="complaints" />} />
            <Route path="/donation-policy" element={<Governance page="donation-policy" />} />
            <Route path="/terms" element={<Governance page="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
