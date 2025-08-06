import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Award, ChevronRight, Building, Star } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80', // Financial charts (neutral)
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional businesswoman
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Female financial analyst
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional woman working
];

const experiences = [
  {
    title: "Senior Auditor",
    company: "Deloitte",
    location: "Mumbai, India",
    dates: "Jan 2020 - Present",
    duration: "4+ years",
    companyLogo: "D",
    responsibilities: [
      "Led audit engagements for clients in the financial services industry",
      "Mentored and trained junior audit staff",
      "Presented audit findings to client management and audit committees"
    ],
    achievements: [
      "Managed portfolio worth $50M+",
      "Improved audit efficiency by 25%",
      "Led team of 8 professionals"
    ],
    skills: ["Financial Auditing", "Team Leadership", "Client Relations", "Risk Assessment"],
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Article Assistant",
    company: "PwC",
    location: "Delhi, India",
    dates: "Jan 2017 - Dec 2019",
    duration: "3 years",
    companyLogo: "P",
    responsibilities: [
      "Assisted in statutory and tax audits for a diverse portfolio of clients",
      "Prepared financial statements and tax returns",
      "Gained experience in various accounting standards"
    ],
    achievements: [
      "Handled 50+ client engagements",
      "Achieved 98% accuracy rate",
      "Completed CA articleship with distinction"
    ],
    skills: ["Tax Compliance", "Financial Reporting", "IFRS", "Audit Procedures"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Intern",
    company: "EY",
    location: "Bangalore, India",
    dates: "May 2016 - Jul 2016",
    duration: "3 months",
    companyLogo: "E",
    responsibilities: [
      "Assisted with audit procedures and documentation",
      "Gained exposure to the professional services environment"
    ],
    achievements: [
      "Outstanding intern performance",
      "Completed advanced Excel certification",
      "Received mentorship award"
    ],
    skills: ["Audit Support", "Documentation", "Excel", "Professional Development"],
    color: "from-purple-500 to-indigo-600"
  }
];

const Experience = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);

  // Rotate background images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.experience-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden min-h-screen">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-10 w-6 h-6 text-yellow-400/40 animate-pulse" />
        <Award className="absolute top-40 right-20 w-8 h-8 text-blue-400/40 animate-bounce" />
        <Building className="absolute bottom-40 left-32 w-10 h-10 text-green-400/40 animate-pulse delay-1000" />
        <Users className="absolute bottom-20 right-40 w-7 h-7 text-purple-400/40 animate-bounce delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-600/30 rounded-full text-emerald-300 text-sm font-bold mb-6 backdrop-blur-lg">
            💼 Professional Journey
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
            Experience & Growth
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A decade of excellence in financial services, audit, and strategic consulting
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 h-full rounded-full"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-index={index}
                className={`experience-item relative ${
                  visibleItems.has(String(index)) 
                    ? 'animate-slide-in opacity-100' 
                    : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.3}s`
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full border-4 border-white shadow-lg z-10 animate-pulse"></div>

                {/* Content Card */}
                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`w-full lg:w-5/12 group cursor-pointer ${
                      index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                      activeCard === index ? 'transform scale-105 shadow-2xl' : ''
                    }`}>
                      {/* Company Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                            {exp.companyLogo}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-lg text-emerald-300 font-semibold">{exp.company}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 ${activeCard === index ? 'rotate-90' : ''}`} />
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                          <span>{exp.dates}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 text-green-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Users className="w-5 h-5 mr-2 text-purple-400" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="text-gray-300 flex items-start">
                              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-400" />
                          Key Achievements
                        </h4>
                        <div className="grid gap-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-center text-yellow-300 text-sm font-medium">
                              <Star className="w-4 h-4 mr-2 fill-current" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Skills Developed</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white border border-white/30 hover:bg-white/30 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                          {exp.duration}
                        </span>
                      </div>
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
