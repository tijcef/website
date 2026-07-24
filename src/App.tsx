import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Pillars from "./pages/Pillars.tsx";
import Programs from "./pages/Programs.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import Donate from "./pages/Donate.tsx";
import Resources from "./pages/Resources.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import PadAGirlToolkit from "./pages/PadAGirlToolkit.tsx";
import CommunityCircles from "./pages/CommunityCircles.tsx";
import MenstrualHealthResearch from "./pages/MenstrualHealthResearch.tsx";
import FacesOfEmpowerment from "./pages/FacesOfEmpowerment.tsx";
const TGIS = lazy(() => import("./pages/TGIS.tsx"));
const GrantHub = lazy(() => import("./pages/GrantHub.tsx"));
import Privacy from "./pages/Privacy.tsx";
import Transparency from "./pages/Transparency.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/tgis/*" element={<Suspense fallback={<div className="min-h-screen grid place-items-center">Loading TGIS…</div>}><TGIS /></Suspense>} />
          <Route path="/grants/*" element={<Suspense fallback={<div className="min-h-screen grid place-items-center">Loading Grant Hub…</div>}><GrantHub /></Suspense>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
