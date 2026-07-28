import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Page Not Found"
        description="The requested TIJCEF page could not be found."
        noIndex
      />
      <main className="grid min-h-[75vh] place-items-center bg-muted/40 px-6 pb-16 pt-32">
        <div className="max-w-xl text-center">
          <div className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Error 404</div>
          <h1 className="mt-4 text-5xl md:text-6xl">This page could not be found.</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
            The address may have changed, or the page may no longer be available.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/">Return home</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Contact TIJCEF</Link></Button>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
};

export default NotFound;
