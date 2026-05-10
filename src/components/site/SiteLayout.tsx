import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default SiteLayout;
