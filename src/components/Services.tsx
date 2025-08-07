import { useState, useEffect } from 'react';
import { FileText, Shield, Receipt, Building, CheckCircle, ArrowRight } from 'lucide-react';

const services = [
  { id:'itr', title:'Income Tax Return (ITR)', desc:'Comprehensive ITR filing for individuals & businesses with optimization guidance.', icon:FileText, features:['Individual & Business Filing','Tax Planning','Refund Support','Assessment & Appeals'], price:'From ₹1,500', duration:'2-3 days' },
  { id:'tax-audit', title:'Tax Audit', desc:'Regulatory compliant tax audits identifying optimization opportunities.', icon:Shield, features:['Statutory Audits','Internal Reviews','Compliance Assessment','Risk Management'], price:'From ₹15,000', duration:'1-2 weeks' },
  { id:'gst', title:'GST Filing', desc:'End‑to‑end GST compliance & return filing with ITC optimization.', icon:Receipt, features:['Registration','Monthly/Quarterly Returns','ITC Optimization','Compliance Mgmt'], price:'From ₹2,500/mo', duration:'Ongoing' },
  { id:'company-reg', title:'Company Registration', desc:'Complete incorporation with legal compliance & documentation.', icon:Building, features:['Pvt Ltd / LLP','Documentation','Compliance Setup','Post‑Registration Support'], price:'From ₹8,000', duration:'7-10 days' }
];

const Services = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); }, []);

  return (
    <section id="services" className="py-24 relative bg-[linear-gradient(to_bottom,rgba(var(--ca-bg),1),rgba(var(--ca-bg-alt),.6))]">
      <div className="absolute inset-0 ca-grid-bg opacity-[0.04]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-heading text-slate-900 mb-4">Professional Services</h2>
          <p className="text-slate-600 leading-relaxed">Focused, compliant and scalable financial & compliance solutions for growing organizations.</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {services.map((s)=> (
            <div key={s.id} className="card p-6 flex flex-col rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-accent-soft flex items-center justify-center text-accent"><s.icon className="w-5 h-5" /></div>
                <h3 className="font-semibold text-slate-800 text-sm tracking-tight">{s.title}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 flex-1 leading-relaxed">{s.desc}</p>
              <ul className="space-y-1 text-xs text-slate-500 mb-4">
                {s.features.slice(0,3).map(f=> <li key={f} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-accent" />{f}</li>)}
                {s.features.length>3 && <li className="ml-5 text-[11px] text-slate-400">+{s.features.length-3} more</li>}
              </ul>
              <div className="flex justify-between items-center text-[11px] uppercase tracking-wide text-slate-500 mb-4">
                <span>{s.price}</span><span>{s.duration}</span>
              </div>
              <button className="btn-primary w-full text-sm justify-center"><span>Get Started</span><ArrowRight className="w-4 h-4 ml-1" /></button>
            </div>
          ))}
        </div>
        <div className="card p-10 rounded-2xl text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Need a tailored engagement?</h3>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">I can assemble a bespoke compliance and finance support stack aligned to your operational maturity.</p>
          <a href="#contact" className="btn-ghost text-accent border-accent hover:bg-accent-soft">Discuss Requirements</a>
        </div>
      </div>
      {mounted && <div className="absolute bottom-0 left-0 right-0 h-24 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--ca-accent-400),.25),transparent_70%)]" />}
    </section>
  );
};

export default Services;
