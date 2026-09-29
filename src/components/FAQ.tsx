import { Plus } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const faqs = [
  {
    q: 'How much will my work cost?',
    a: 'Each service has a transparent starting price (for example, ITR filing from ₹1,500). The exact fee depends on the complexity of your case — you get a clear quote upfront after our first conversation, before any work starts.',
  },
  {
    q: 'What documents do I need for filing my ITR?',
    a: 'Usually your PAN and Aadhaar, Form 16 or salary slips, bank statements and interest certificates, proofs for deductions (80C, 80D and so on), capital-gains statements if you invest, and your AIS / Form 26AS.',
  },
  {
    q: 'What is the difference between GSTR-1 and GSTR-3B?',
    a: 'GSTR-1 reports the details of your outward supplies (your sales invoices). GSTR-3B is the summary return where you declare totals, claim input tax credit and actually pay the GST due. Both need to match — mismatches are a common trigger for notices.',
  },
  {
    q: 'I received a notice from the Income Tax department. Can you help?',
    a: 'Yes. Assessments and appeals are part of my income-tax work. Share the notice and I\'ll explain what it means, what is being asked, and how we should respond — and by when.',
  },
  {
    q: 'How quickly will you get back to me?',
    a: 'Every enquiry sent through the contact form gets a reply within 24 hours.',
  },
];

const FAQ = () => (
  <section id="faq" className="bg-paper py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <em>answered.</em>
            </>
          }
          intro="Can't find what you're looking for? Send a message — no question is too small."
        />
      </div>
      <div className="lg:col-span-8 border-t border-ink/15">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 70} className="border-b border-ink/15">
            <details className="group" open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6 sm:py-7">
                <span className="font-display text-[21px] sm:text-2xl leading-snug text-ink group-hover:text-accent transition-colors">{f.q}</span>
                <span className="acc-icon mt-0.5 w-9 h-9 shrink-0 rounded-full border border-ink/20 flex items-center justify-center text-ink">
                  <Plus className="w-4 h-4" />
                </span>
              </summary>
              <p className="acc-body pb-7 pr-12 text-[16.5px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
