import { ArrowRight, Star, Users, CheckCircle, Calculator, FileText, Receipt, Building2, Shield, BarChart3 } from 'lucide-react';

const Home = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBackground = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-[100dvh] flex items-center bg-gradient-to-br from-[#f1f5f9] to-[#e0e7ff] pt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
              <span className="w-2 h-2 bg-[#0e7490] rounded-full animate-pulse" />
              <span className="text-[#0e7490] font-semibold text-sm tracking-[1.5px] uppercase">CA Aspirant • Tax • GST • Compliance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0f172a] leading-[1.05] tracking-[-1.5px] mb-6">
              Reliable tax, GST<br className="hidden sm:block" /> &amp; accounting support<br className="hidden lg:block" /> you can trust.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              I help individuals and growing businesses with accurate ITR filing, GST compliance, tax planning, and company registrations — with clear pricing and personal attention.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-[#0f172a] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#0f172a] active:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0f172a]/20 hover:shadow-xl"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto border border-[#0f172a]/80 text-[#0f172a] hover:bg-[#0f172a] hover:text-white px-7 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                View Services
              </button>
              <button
                onClick={scrollToBackground}
                className="w-full sm:w-auto text-sm font-medium text-gray-600 hover:text-[#0f172a] px-3 py-3 transition-colors"
              >
                See my background
              </button>
            </div>

            {/* Trust Stats — inspired by top advisor sites */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-[#0f172a] mb-1">
                  <Star className="w-4 h-4 text-[#0e7490] mr-1.5" />
                  <span className="text-2xl font-bold">2+</span>
                </div>
                <p className="text-sm text-gray-500">Years Hands-On</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-[#0f172a] mb-1">
                  <Users className="w-4 h-4 text-[#0e7490] mr-1.5" />
                  <span className="text-2xl font-bold">100+</span>
                </div>
                <p className="text-sm text-gray-500">Clients Served</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-[#0f172a] mb-1">
                  <CheckCircle className="w-4 h-4 text-[#0e7490] mr-1.5" />
                  <span className="text-2xl font-bold">100%</span>
                </div>
                <p className="text-sm text-gray-500">Compliance Focus</p>
              </div>
            </div>
          </div>

          {/* Right: Relevant Visual - Core CA Services */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[420px]">
              <div className="text-center mb-4">
                <span className="inline-block text-xs font-semibold tracking-[2px] text-[#0e7490] uppercase">Core Expertise</span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: Calculator, label: 'Accounting', desc: 'Bookkeeping & reports' },
                  { icon: FileText, label: 'ITR Filing', desc: 'Individuals & business' },
                  { icon: Receipt, label: 'GST Services', desc: 'Registration & returns' },
                  { icon: Shield, label: 'Compliance', desc: 'Audits & regulations' },
                  { icon: Building2, label: 'Company Reg.', desc: 'Incorporation & setup' },
                  { icon: BarChart3, label: 'Tax Planning', desc: 'Optimization & savings' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="group bg-white border border-gray-100 hover:border-[#0e7490]/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all hover:shadow-sm"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#e0e7ff] group-hover:bg-[#0e7490] flex items-center justify-center mb-3 transition-colors">
                        <Icon className="w-5 h-5 text-[#0e7490] group-hover:text-white transition-colors" />
                      </div>
                      <div className="font-semibold text-[#0f172a] text-sm mb-0.5">{item.label}</div>
                      <div className="text-[11px] text-gray-500 leading-tight">{item.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-4 text-[11px] text-gray-500">
                Transparent pricing • Fast turnaround
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
