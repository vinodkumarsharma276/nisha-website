import { Award, CheckCircle } from 'lucide-react';

const Experience = () => {
  const capabilities = [
    "Hands-on ITR & Tax Audit experience at leading CA firms",
    "Practical GST registration, returns & compliance management",
    "Company incorporation and post-registration support",
    "Strong foundation in financial analysis and reporting",
    "Direct client handling and end-to-end filing processes",
  ];

  return (
    <section id="experience" className="py-16 lg:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Background</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-4">Trained at Top CA Firms</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            My articleship at Akas &amp; Associates and V D Tiwari &amp; Co gave me intensive, real-world training in taxation, audit, and compliance. This foundation means I bring battle-tested processes and attention to detail to every client engagement.
          </p>

          <div className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 text-left">
            <div className="flex items-center gap-2 mb-4 text-[#0f172a]">
              <Award className="w-5 h-5 text-[#0e7490]" />
              <span className="font-semibold">What this training means for you</span>
            </div>
            <ul className="grid gap-y-2.5 text-sm text-gray-700">
              {capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            For the complete professional timeline and details, feel free to ask during our consultation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
