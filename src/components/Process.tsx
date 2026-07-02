import { Calendar, Search, FileCheck, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book & Understand',
    description: 'We start with a focused consultation. I learn about your business, income sources, goals, and pain points.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Review & Strategize',
    description: 'I analyze your current setup, identify opportunities for tax optimization, compliance gaps, and create a clear action plan.',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Execute & File',
    description: 'Accurate filing of ITR, GST returns, audits or registrations. All documentation handled with full transparency.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Support & Optimize',
    description: 'Year-round guidance, proactive planning, and quarterly check-ins so you never face surprises at tax time.',
  },
];

const Process = () => {
  return (
    <section className="py-16 lg:py-20 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Simple. Clear. Effective.</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">How I Work With You</h2>
          <p className="text-gray-600 max-w-md mx-auto">A transparent, step-by-step process used by hundreds of clients to stay compliant and stress-free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group bg-[#f1f5f9] rounded-2xl p-6 lg:p-7 border border-gray-100 hover:border-[#0e7490]/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-100 group-hover:bg-[#0e7490] group-hover:border-[#0f172a] transition-colors">
                  <step.icon className="w-6 h-6 text-[#0e7490] group-hover:text-white transition-colors" />
                </div>
                <span className="text-4xl font-bold text-gray-100 group-hover:text-[#e8e8e8] transition-colors">{step.number}</span>
              </div>

              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium text-[#0f172a] hover:text-[#0e7490] inline-flex items-center gap-1.5 transition-colors"
          >
            Ready to get started? <span className="underline">Let’s talk</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;