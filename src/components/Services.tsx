import { useState } from 'react';
import { ArrowRight, Check, Clock, FileText, Receipt, ShieldCheck, Building2, Plus } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const services = [
  {
    id: 'itr',
    title: 'Income Tax Returns',
    summary: 'Accurate ITR filing for salaried individuals, freelancers and businesses — with every eligible deduction claimed.',
    icon: FileText,
    features: ['Individual & business ITR filing', 'Tax planning & optimisation', 'Refund processing support', 'Assessments & appeals'],
    price: '₹1,500',
    priceNote: 'starting',
    duration: '2–3 business days',
  },
  {
    id: 'gst',
    title: 'GST Registration & Filing',
    summary: 'End-to-end GST compliance — registration, monthly or quarterly returns and input tax credit reconciliation.',
    icon: Receipt,
    features: ['GST registration & setup', 'Monthly / quarterly returns', 'Input tax credit optimisation', 'Ongoing compliance management'],
    price: '₹2,500',
    priceNote: 'per month',
    duration: 'Ongoing support',
  },
  {
    id: 'audit',
    title: 'Tax Audit',
    summary: 'Statutory tax audits and internal reviews that keep you compliant and surface savings you might be missing.',
    icon: ShieldCheck,
    features: ['Statutory tax audits', 'Internal tax reviews', 'Compliance assessment', 'Risk management'],
    price: '₹15,000',
    priceNote: 'starting',
    duration: '1–2 weeks',
  },
  {
    id: 'company',
    title: 'Company Registration',
    summary: 'Private limited, LLP and partnership incorporation with all documentation and post-registration compliance handled.',
    icon: Building2,
    features: ['Private limited company setup', 'LLP & partnership registration', 'Documentation & compliance', 'Post-registration support'],
    price: '₹8,000',
    priceNote: 'starting',
    duration: '7–10 business days',
  },
];

const Services = () => {
  const [open, setOpen] = useState<string>('itr');

  return (
    <section id="services" className="bg-sand/60 py-24 lg:py-32 border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Everything your taxes need, <em>in one place.</em>
              </>
            }
          />
          <Reveal delay={200} className="lg:max-w-sm">
            <p className="text-ink-soft leading-relaxed">
              Transparent starting prices, realistic timelines and complete compliance — so you can focus on your work, not the paperwork.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-ink/15">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={i * 80} className="border-b border-ink/15">
                <button
                  onClick={() => setOpen(isOpen ? '' : s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  className="group w-full text-left py-7 sm:py-9 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8"
                >
                  <span className="font-display text-sm sm:text-base text-ink-soft/70 tabular-nums w-7">0{i + 1}</span>
                  <span className="min-w-0">
                    <span
                      className={`block font-display text-[28px] sm:text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] transition-all duration-500 ${
                        isOpen ? 'text-accent' : 'text-ink group-hover:translate-x-2'
                      }`}
                    >
                      {s.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-4 sm:gap-6">
                    <span className="hidden md:block text-right">
                      <span className="block font-display text-2xl text-ink">{s.price}</span>
                      <span className="block text-xs text-ink-soft">{s.priceNote}</span>
                    </span>
                    <span
                      className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isOpen ? 'bg-ink border-ink text-paper rotate-45' : 'border-ink/20 text-ink group-hover:bg-ink group-hover:text-paper group-hover:border-ink'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </span>
                </button>

                <div id={`svc-${s.id}`} className={`acc-grid ${isOpen ? 'is-open' : ''}`}>
                  <div className="overflow-hidden">
                    <div className="pb-10 sm:pl-[60px] grid md:grid-cols-12 gap-8">
                      <div className="md:col-span-5">
                        <span className="w-12 h-12 rounded-2xl bg-white border border-line text-accent flex items-center justify-center mb-5">
                          <Icon className="w-6 h-6" />
                        </span>
                        <p className="text-[17px] leading-relaxed text-ink-soft">{s.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2 text-sm">
                          <span className="md:hidden inline-flex items-center rounded-full bg-white border border-line px-3 py-1.5 font-semibold text-ink">
                            {s.price} <span className="font-normal text-ink-soft ml-1">{s.priceNote}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line px-3 py-1.5 text-ink-soft">
                            <Clock className="w-3.5 h-3.5" /> {s.duration}
                          </span>
                        </div>
                      </div>
                      <div className="md:col-span-7 md:pl-8 md:border-l border-line flex flex-col">
                        <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-ink-soft mb-4">What's included</p>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 rounded-xl bg-white/80 border border-line px-4 py-3 text-[15px] text-ink">
                              <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" strokeWidth={2.5} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                          className="mt-6 self-start inline-flex items-center gap-2 text-[15px] font-semibold text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors"
                        >
                          Enquire about {s.title.toLowerCase()} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-sm text-ink-soft">
          Need something that isn't listed — bookkeeping, a tax notice, or advance-tax planning?{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-semibold text-ink underline underline-offset-4 hover:text-accent"
          >
            Just ask.
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
