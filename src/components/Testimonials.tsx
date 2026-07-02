import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Nisha handled my ITR and GST filings perfectly. She explained everything clearly and helped me claim deductions I didn't know about. Saved me both time and money.",
    name: "Rohit Mehra",
    role: "Freelance Designer, Delhi",
    result: "₹38k extra refund",
  },
  {
    quote: "As a small business owner, GST compliance used to stress me out. Nisha set up proper processes and now everything is on autopilot. Highly professional and responsive.",
    name: "Priya Sharma",
    role: "Founder, Studio Kala",
    result: "Zero notices in 18 months",
  },
  {
    quote: "Nisha supported our company registration and ongoing tax filings. Her attention to detail is exceptional. We now use her for all compliance needs.",
    name: "Ankit & Meera",
    role: "Co-founders, Tech Startup",
    result: "On-time every quarter",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#f1f5f9]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Real People. Real Results.</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3">What Clients Say</h2>
          <p className="text-gray-600 max-w-lg mx-auto">Trusted by individuals and businesses for accurate, timely, and stress-free financial compliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Quote className="w-6 h-6 text-[#0e7490] mb-4" />
              <p className="text-[15px] text-gray-700 leading-relaxed flex-1 mb-6">“{t.quote}”</p>
              
              <div className="border-t pt-4 flex justify-between items-end">
                <div>
                  <div className="font-semibold text-[#0f172a]">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-[#0e7490] font-medium">Result</div>
                  <div className="text-sm font-semibold text-[#0f172a]">{t.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;