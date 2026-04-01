import { ArrowRight, Star, Users, Award, Calculator, FileText, BarChart3, Shield, IndianRupee, BookOpen } from 'lucide-react';

const Home = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] pt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-4">
              CA Aspirant &amp; Accounting Specialist
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] mb-6 leading-tight">
              Hello, I'm <br />
              <span className="text-[#2a5a8f]">Nisha</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              A passionate accounting professional currently pursuing Chartered Accountancy.
              I specialize in tax filing, GST compliance, and financial management — helping
              businesses stay compliant and financially healthy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <button
                onClick={scrollToContact}
                className="bg-[#1e3a5f] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#16304d] transition-colors flex items-center justify-center gap-2"
              >
                Get a Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-1">
                  <Star className="w-4 h-4 text-[#c8a951] mr-1.5" />
                  <span className="text-2xl font-bold text-[#1e3a5f]">2+</span>
                </div>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-1">
                  <Users className="w-4 h-4 text-[#c8a951] mr-1.5" />
                  <span className="text-2xl font-bold text-[#1e3a5f]">100+</span>
                </div>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-1">
                  <Award className="w-4 h-4 text-[#c8a951] mr-1.5" />
                  <span className="text-2xl font-bold text-[#1e3a5f]">50+</span>
                </div>
                <p className="text-sm text-gray-500">Projects Done</p>
              </div>
            </div>
          </div>

          {/* Right Content - Icon Grid Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="grid grid-cols-3 gap-4 sm:gap-5">
              {[
                { icon: Calculator, label: 'Accounting', color: 'bg-blue-50 text-blue-600' },
                { icon: FileText, label: 'Tax Filing', color: 'bg-amber-50 text-amber-600' },
                { icon: BarChart3, label: 'Financial Analysis', color: 'bg-emerald-50 text-emerald-600' },
                { icon: IndianRupee, label: 'GST', color: 'bg-purple-50 text-purple-600' },
                { icon: Shield, label: 'Compliance', color: 'bg-red-50 text-red-600' },
                { icon: BookOpen, label: 'Audit', color: 'bg-teal-50 text-teal-600' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.color} w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                >
                  <item.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
