import { Calendar, MapPin, Building2 } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  type: string;
  location: string;
  locationType: string;
  dates: string;
  duration: string;
}

const experiences: Experience[] = [
  {
    title: "CA Article Assistant",
    company: "Akas & Associates",
    type: "Apprenticeship",
    location: "Kaushambi, Uttar Pradesh, India",
    locationType: "On-site",
    dates: "Aug 2024 - Present",
    duration: "1 yr 9 mos",
  },
  {
    title: "Articled Assistant",
    company: "V D Tiwari & Co",
    type: "Full-time",
    location: "Greater Delhi Area",
    locationType: "On-site",
    dates: "Aug 2023 - Sep 2024",
    duration: "1 yr 2 mos",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-3">Career</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a5f] mb-4">Work Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building expertise through hands-on experience at leading chartered accountancy firms.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-[29px] w-3 h-3 bg-[#1e3a5f] rounded-full border-2 border-white shadow hidden lg:block" style={{ top: '2rem' }}></div>

                {/* Card */}
                <div className="lg:ml-16 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 sm:p-6 lg:p-8">
                    <h3 className="text-xl font-semibold text-[#1e3a5f] mb-1">{exp.title}</h3>
                    <div className="flex items-center text-[#c8a951] font-medium mb-3">
                      <Building2 className="w-4 h-4 mr-2" />
                      {exp.company} <span className="mx-2 text-gray-300">·</span> <span className="text-gray-500 font-normal">{exp.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {exp.dates} · {exp.duration}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                        {exp.location} · {exp.locationType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
