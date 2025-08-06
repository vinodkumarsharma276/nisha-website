import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Award, Users, MapPin, ExternalLink, GraduationCap, Building, TrendingUp, Shield } from 'lucide-react';

const experiences = [
  {
    company: "Senior Tax Consultant",
    position: "Independent Practice",
    duration: "2021 - Present",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Leading independent CA practice specializing in corporate tax planning, GST compliance, and business advisory services for diverse clientele.",
    achievements: [
      "Successfully managed 200+ client portfolios across various industries",
      "Achieved 98% client satisfaction rate with zero compliance issues", 
      "Implemented digital transformation strategies reducing processing time by 40%",
      "Established strategic partnerships with 5+ professional firms"
    ],
    icon: Building,
    skills: ["Corporate Tax", "GST Compliance", "Business Advisory", "Digital Transformation"]
  },
  {
    company: "Tax Manager",
    position: "ABC Chartered Accountants",
    duration: "2019 - 2021",
    location: "Mumbai, India", 
    type: "Full-time",
    description: "Managed complex tax compliance and advisory services for high-net-worth individuals and corporate clients, leading a team of junior accountants.",
    achievements: [
      "Led tax compliance for 50+ corporate clients with combined revenue of ₹500+ crores",
      "Reduced client tax liabilities by average 25% through strategic planning",
      "Mentored and trained 8 junior professionals in advanced tax practices",
      "Streamlined tax filing processes resulting in 30% efficiency improvement"
    ],
    icon: TrendingUp,
    skills: ["Team Leadership", "Tax Strategy", "Client Management", "Process Optimization"]
  },
  {
    company: "Assistant Manager - Audit",
    position: "XYZ & Associates",
    duration: "2018 - 2019",
    location: "Mumbai, India",
    type: "Full-time", 
    description: "Specialized in statutory audits, internal audits, and risk assessment for manufacturing and service sector companies.",
    achievements: [
      "Conducted comprehensive audits for 30+ companies across diverse sectors",
      "Identified and resolved critical financial control gaps saving clients ₹2+ crores",
      "Developed standardized audit procedures adopted firm-wide",
      "Maintained 100% audit completion rate within deadlines"
    ],
    icon: Shield,
    skills: ["Statutory Audit", "Risk Assessment", "Financial Controls", "Compliance Review"]
  }
];

const qualifications = [
  {
    degree: "Chartered Accountant (CA)",
    institution: "Institute of Chartered Accountants of India (ICAI)",
    year: "2018",
    description: "Completed comprehensive CA program covering taxation, auditing, financial management, and business laws.",
    icon: GraduationCap
  },
  {
    degree: "Bachelor of Commerce (B.Com)",
    institution: "University of Mumbai",
    year: "2015",
    description: "Specialized in Accounting and Finance with first-class honors. Active participant in academic competitions.",
    icon: Award
  }
];

const certifications = [
  "GST Practitioner Certificate",
  "Certified Information Systems Auditor (CISA)",
  "Advanced Excel & Financial Modeling",
  "Digital Marketing for Professionals"
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('experience');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/40">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-200/50 backdrop-blur-sm">
            <Briefcase className="w-4 h-4" />
            <span>Professional Journey</span>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-800 via-amber-700 to-yellow-800 bg-clip-text text-transparent mb-4">
            Experience & Qualifications
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Over 5 years of professional experience in taxation, auditing, and business advisory services, backed by strong academic credentials.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-orange-200/50 shadow-lg">
              <button
                onClick={() => setSelectedTab('experience')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedTab === 'experience'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                    : 'text-orange-700 hover:text-orange-800 hover:bg-orange-50/70'
                }`}
              >
                Work Experience
              </button>
              <button
                onClick={() => setSelectedTab('education')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedTab === 'education'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                    : 'text-orange-700 hover:text-orange-800 hover:bg-orange-50/70'
                }`}
              >
                Education & Certifications
              </button>
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        {selectedTab === 'experience' && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-orange-300 via-amber-300 to-yellow-300 h-full"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'}`}>
                    <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-200/50 hover:border-amber-300/70 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      {/* Background gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-amber-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Header */}
                      <div className={`flex items-start space-x-4 mb-6 relative z-10 ${index % 2 === 0 ? 'md:flex-row-reverse md:space-x-reverse md:text-right' : ''}`}>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200/50">
                          <exp.icon className="w-6 h-6 text-orange-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.position}</h3>
                          <p className="text-lg text-orange-700 font-medium mb-2">{exp.company}</p>
                          <div className="flex items-center text-sm text-slate-600 mb-2 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-amber-500" />
                              {exp.location}
                            </div>
                          </div>
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200/50">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6 relative z-10">
                        <h4 className="text-sm font-semibold text-orange-800 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="relative z-10">
                        <h4 className="text-sm font-semibold text-orange-800 mb-3">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200/50 backdrop-blur-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications */}
        {selectedTab === 'education' && (
          <div className="space-y-8">
            {/* Qualifications */}
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent mb-8 text-center">Educational Qualifications</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-200/50 hover:border-amber-300/70 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-amber-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-start space-x-4 mb-4 relative z-10">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200/50">
                        <qual.icon className="w-6 h-6 text-orange-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800 mb-1">{qual.degree}</h4>
                        <p className="text-orange-700 font-medium mb-1">{qual.institution}</p>
                        <p className="text-sm text-slate-600">{qual.year}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed relative z-10">
                      {qual.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent mb-8 text-center">Professional Certifications</h3>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-200/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-amber-50/20"></div>
                <div className="grid md:grid-cols-2 gap-4 relative z-10">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50/70 to-amber-50/70 rounded-lg border border-orange-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      <Award className="w-5 h-5 text-orange-600" />
                      <span className="text-slate-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-200/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/20 opacity-50"></div>
            
            <div className="relative z-10">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent mb-4">Let's Work Together</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                With proven expertise and a track record of delivering results, I'm ready to help your business achieve its financial objectives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                  <span>Download Resume</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center justify-center space-x-2 bg-white/80 text-orange-700 px-8 py-3 rounded-lg font-medium border-2 border-orange-200/70 hover:border-orange-300 hover:shadow-md hover:bg-orange-50/50 transition-all duration-300 backdrop-blur-sm">
                  <span>Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
