import { TrendingUp, Shield, DollarSign, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  summary: string;
  results: string[];
  duration: string;
  teamSize: string;
  industry: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: 'Financial Audit for Tech Startup',
    description: 'Comprehensive audit establishing control maturity and investor‑grade reporting for a scaling fintech startup.',
    summary: 'Implemented structured audit program across revenue recognition & regulatory compliance.',
    results: ['$2M cost efficiency identified', '95% reporting accuracy uplift', 'Clean audit opinion', 'Investor confidence increased'],
    duration: '6 months',
    teamSize: '5',
    industry: 'Fintech',
    technologies: ['SAP', 'Power BI', 'Advanced Excel', 'Tally'],
    icon: TrendingUp
  },
  {
    title: 'Tax Compliance – Multi‑State E‑commerce',
    description: 'End‑to‑end GST & direct tax compliance framework with automated cadence and variance tracking.',
    summary: 'Centralized filing workflow and analytics for 15 jurisdictions.',
    results: ['100% on‑time filings', '30% tax liability reduction', 'Zero notices', 'Consolidated compliance view'],
    duration: 'Ongoing (2+ yrs)',
    teamSize: '8',
    industry: 'E‑commerce',
    technologies: ['GST Portal', 'Income Tax Portal', 'Automation Scripts', 'Zoho Books'],
    icon: Shield
  },
  {
    title: 'Business Valuation for Acquisition',
    description: 'Independent valuation (DCF / comparables / asset basis) supporting $50M strategic acquisition.',
    summary: 'Triangulated value ranges & surfaced under‑utilised asset potential.',
    results: ['$50M transaction executed', '$8M hidden value surfaced', 'Risk profile clarified', 'Integration plan delivered'],
    duration: '4 months',
    teamSize: '12',
    industry: 'Manufacturing',
    technologies: ['Financial Models', 'Bloomberg', 'FactSet', 'Excel VBA'],
    icon: DollarSign
  },
  {
    title: 'Financial Restructuring & Recovery',
    description: 'Liquidity stabilization & capital structure re‑alignment for distressed retail chain.',
    summary: 'Negotiated creditor terms; instituted cash flow visibility and scenario modelling.',
    results: ['Bankruptcy averted', '40% debt reduction', 'Return to profitability <18m', '500+ jobs preserved'],
    duration: '8 months',
    teamSize: '15',
    industry: 'Retail',
    technologies: ['Cash Flow Modelling', 'Scenario Analysis', 'ERP Insights', 'Restructuring Playbooks'],
    icon: BarChart3
  }
];

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); }, []);

  return (
    <section id="projects" className="py-24 relative bg-[linear-gradient(to_bottom,rgba(var(--ca-bg),1),rgba(var(--ca-bg-alt),.65))]">
      <div className="absolute inset-0 ca-grid-bg opacity-[0.04]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-heading text-slate-900 mb-4">Selected Projects</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Representative engagements illustrating audit rigor, compliance architecture and value realization.</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.title} className="card p-6 rounded-xl flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-md bg-accent-soft flex items-center justify-center text-accent shrink-0"><p.icon className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-slate-800 leading-snug mb-1 text-sm">{p.title}</h3>
                  <div className="text-[11px] uppercase tracking-wide text-slate-500 flex gap-3">
                    <span>{p.industry}</span>
                    <span className="hidden sm:inline before:content-['•'] before:mx-2 before:text-slate-400" />
                    <span>{p.duration}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed line-clamp-3">{p.description}</p>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{p.summary}</p>
              <div className="mb-4">
                <h4 className="text-[11px] font-semibold tracking-wide text-slate-500 mb-2 uppercase">Key Outcomes</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {p.results.slice(0,3).map(r => <li key={r} className="pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:translate-x-[-50%]">{r}</li>)}
                  {p.results.length > 3 && <li className="pl-3 text-[10px] text-slate-400">+{p.results.length - 3} more</li>}
                </ul>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.slice(0,6).map(t => <span key={t} className="px-2 py-1 rounded bg-accent-soft text-accent text-[11px] font-medium">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="#contact" className="btn-primary text-sm">Discuss Your Requirement</a>
        </div>
      </div>
      {mounted && <div className="absolute bottom-0 left-0 right-0 h-28 bg-[radial-gradient(circle_at_50%_110%,rgba(var(--ca-accent-400),.25),transparent_70%)]" />}
    </section>
  );
};

export default Projects;
