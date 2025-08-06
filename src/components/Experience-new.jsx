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
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Professional Journey</span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Experience & Qualifications
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Over 5 years of professional experience in taxation, auditing, and business advisory services, backed by strong academic credentials.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-center">
            <div className="bg-white p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setSelectedTab('experience')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedTab === 'experience'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Work Experience
              </button>
              <button
                onClick={() => setSelectedTab('education')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedTab === 'education'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
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
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-slate-300 h-full"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'}`}>
                    <div className={`bg-white p-8 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      {/* Header */}
                      <div className={`flex items-start space-x-4 mb-6 ${index % 2 === 0 ? 'md:flex-row-reverse md:space-x-reverse md:text-right' : ''}`}>
                        <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                          <exp.icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.position}</h3>
                          <p className="text-lg text-slate-700 font-medium mb-2">{exp.company}</p>
                          <div className="flex items-center text-sm text-slate-600 mb-2 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.location}
                            </div>
                          </div>
                          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-800 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 mb-3">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
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
              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Educational Qualifications</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                        <qual.icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800 mb-1">{qual.degree}</h4>
                        <p className="text-slate-700 font-medium mb-1">{qual.institution}</p>
                        <p className="text-sm text-slate-600">{qual.year}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {qual.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Professional Certifications</h3>
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg border border-gray-200"
                    >
                      <Award className="w-5 h-5 text-slate-700" />
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
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Let's Work Together</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              With proven expertise and a track record of delivering results, I'm ready to help your business achieve its financial objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 bg-slate-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors duration-300">
                <span>Download Resume</span>
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 bg-white text-slate-800 px-8 py-3 rounded-lg font-medium border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
