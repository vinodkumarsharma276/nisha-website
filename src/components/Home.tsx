import { ArrowRight, Download, Star, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); }, []);

  return (
    <section id="home" className="pt-32 pb-24 min-h-screen flex items-center relative overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(var(--ca-accent-400),.15),transparent_60%)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] ca-grid-bg" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="section-heading mb-6 text-slate-900 leading-tight">
              <span className="block text-slate-500 text-base font-medium mb-3 tracking-wide">Chartered Accountant</span>
              Nisha – Financial Expertise & Insight
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 mb-8">
              I help businesses establish robust financial controls, ensure compliance, and unlock strategic growth using disciplined audit and analytic frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="btn-primary shadow-sm">
                <span>View Services</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="btn-ghost">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              {[{icon:Star,label:'Years',value:'5+'},{icon:Users,label:'Clients',value:'100+'},{icon:Award,label:'Projects',value:'50+'}].map((s,i)=>(
                <div key={i} className="text-center">
                  <div className="text-2xl font-semibold text-slate-900 mb-1">{s.value}</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-accent-soft blur-2xl" />
              <div className="relative card p-6 w-72 h-72 flex items-center justify-center rounded-xl">
                <span className="text-accent text-lg font-medium">Professional Portrait</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mounted && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent-soft opacity-40 blur-2xl" />}
    </section>
  );
};

export default Home;
