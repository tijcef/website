import SocialShare from "@/components/site/SocialShare";
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PrerenderMetaContext } from '@/components/site/PageMeta';
import { RecentPostsContext } from '@/components/site/RecentWork';
const pages = import.meta.glob('./pages/*.tsx', { eager: true }) as Record<string, { default: React.ComponentType<any> }>;
const routes: Record<string, string> = {
 '/': 'Index', '/about': 'About', '/pillars': 'Pillars', '/programs': 'Programs',
 '/impact': 'Impact', '/media-coverage': 'MediaCoverage', '/get-involved': 'GetInvolved',
 '/donate': 'Donate', '/resources': 'Resources', '/contact': 'Contact', '/privacy': 'Privacy',
 '/transparency': 'Transparency', '/thank-you': 'ThankYou', '/verify': 'Verify',
 '/resources/pad-a-girl-toolkit': 'PadAGirlToolkit', '/resources/community-circles': 'CommunityCircles',
 '/resources/menstrual-health-taraba-adamawa': 'MenstrualHealthResearch',
 '/resources/faces-of-empowerment-2025': 'FacesOfEmpowerment',
};
export const staticPaths = [...Object.keys(routes), '/safeguarding', '/complaints', '/donation-policy', '/terms', '/accessibility', '/grants', '/grants/opportunities', '/grants/grants', '/grants/scholarships', '/grants/fellowships', '/grants/jobs', '/grants/internships', '/grants/membership', '/grants/about'];
export function render(path: string, recentPosts = []) {
 let meta: any;
 const routeElements = Object.entries(routes).map(([url, name]) => <Route key={url} path={url} element={createElement(pages[`./pages/${name}.tsx`].default)} />);
 for (const name of ['safeguarding', 'complaints', 'donation-policy', 'terms', 'accessibility']) routeElements.push(<Route key={name} path={`/${name}`} element={createElement(pages['./pages/Governance.tsx'].default, { page: name })} />);
 routeElements.push(<Route key="grants" path="/grants/*" element={createElement(pages['./pages/GrantHub.tsx'].default)} />);
 routeElements.push(<Route key="404" path="*" element={createElement(pages['./pages/NotFound.tsx'].default)} />);
 const html = renderToString(<PrerenderMetaContext.Provider value={value => { meta = value; }}><RecentPostsContext.Provider value={recentPosts}><QueryClientProvider client={new QueryClient()}><TooltipProvider><StaticRouter location={path}><Routes>{routeElements}</Routes></StaticRouter></TooltipProvider></QueryClientProvider></RecentPostsContext.Provider></PrerenderMetaContext.Provider>);
 return { html, meta };
}

export function renderShare(title: string, path: string) { return renderToString(<StaticRouter location={path}><SocialShare title={title} url={`https://www.tijcef.org${path}`}/></StaticRouter>); }
