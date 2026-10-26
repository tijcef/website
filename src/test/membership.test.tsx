import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GrantHub from '../pages/GrantHub';
import { submitPublicForm } from '../lib/wordpress';
vi.mock('../lib/wordpress',()=>({submitPublicForm:vi.fn(),getGrants:vi.fn(),getGrantBySlug:vi.fn(),sanitizeWordPressHtml:(s:string)=>s}));
vi.mock('../components/site/SiteLayout',()=>({default:({children}:any)=><main>{children}</main>}));
afterEach(()=>{cleanup();vi.clearAllMocks()});
function fill(){fireEvent.change(screen.getByLabelText('Full name'),{target:{value:'Test Applicant'}});fireEvent.change(screen.getByLabelText('Email address'),{target:{value:'applicant@example.org'}});fireEvent.click(screen.getByRole('checkbox'));}
describe('Membership application',()=>{
 it('records an application through the backend and confirms review, not approval',async()=>{
 vi.mocked(submitPublicForm).mockResolvedValue({success:true});
 render(<MemoryRouter initialEntries={['/grants/membership']}><Routes><Route path="/grants/*" element={<GrantHub/>}/></Routes></MemoryRouter>); fill();fireEvent.click(screen.getByRole('button',{name:'Submit membership application'}));
 await screen.findByText(/not automatic membership approval/);
 expect(submitPublicForm).toHaveBeenCalledWith('inquiries',expect.objectContaining({kind:'membership',name:'Test Applicant',email:'applicant@example.org',consent:'yes'}));
 expect(screen.getByRole('button',{name:'Application received'})).toBeDisabled();
 });
 it('retains entered details and allows retry on service failure',async()=>{
 vi.mocked(submitPublicForm).mockRejectedValue(new Error('Service unavailable'));
 render(<MemoryRouter initialEntries={['/grants/membership']}><Routes><Route path="/grants/*" element={<GrantHub/>}/></Routes></MemoryRouter>); fill();fireEvent.click(screen.getByRole('button',{name:'Submit membership application'}));
 await screen.findByText('Service unavailable');
 expect(screen.getByLabelText('Full name')).toHaveValue('Test Applicant');
 await waitFor(()=>expect(screen.getByRole('button',{name:'Submit membership application'})).toBeEnabled());
 });
});
