import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <a href="#main-content" className="sr-only z-[100] rounded bg-white px-4 py-2 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
    <Header />
    <main id="main-content" className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default SiteLayout;
