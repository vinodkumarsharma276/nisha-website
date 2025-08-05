import { Calendar, MapPin, Building2, Users, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional meeting
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // City business
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Technology finance
];

interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
  achievements: string[];
  teamSize?: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Senior Auditor",
    company: "Deloitte",
    location: "Mumbai, India",
    dates: "Jan 2020 - Present",
    responsibilities: [
      "Led audit engagements for clients in the financial services industry with portfolios exceeding $500M",
      "Mentored and trained junior audit staff, improving team efficiency by 40%",
      "Presented audit findings to client management and audit committees",
      "Developed innovative audit procedures using data analytics and automation"
    ],
    achievements: [
      "Promoted to Senior Auditor within 2 years",
      "Led 15+ successful audit engagements",
      "Achieved 100% client satisfaction rating",
      "Implemented new audit software reducing audit time by 30%"
    ],
    teamSize: "8-12 members",
    technologies: ["SAP", "ACL", "IDEA", "Power BI", "Advanced Excel", "TeamMate"]
  },
  {
    title: "Audit Associate",
    company: "PwC",
    location: "Pune, India",
    dates: "Jan 2017 - Dec 2019",
    responsibilities: [
      "Assisted in statutory and tax audits for a diverse portfolio of clients across manufacturing and IT sectors",
      "Prepared comprehensive financial statements and tax returns",
      "Gained extensive experience in Indian Accounting Standards (Ind AS) and IFRS",
      "Conducted risk assessments and internal control evaluations"
    ],
    achievements: [
      "Consistently rated as top performer",
      "Completed articleship with distinction",
      "Passed CA final exams in first attempt",
      "Received PwC Excellence Award 2019"
    ],
    teamSize: "5-8 members",
    technologies: ["Tally", "SAP FICO", "Excel", "AuditFile", "CaseWare"]
  },
  {
    title: "Audit Intern",
    company: "Ernst & Young (EY)",
    location: "Bangalore, India",
    dates: "May 2016 - Jul 2016",
    responsibilities: [
      "Assisted with audit procedures and documentation for mid-market clients",
      "Gained exposure to the professional services environment and audit methodologies",
      "Participated in client meetings and learned stakeholder communication",
      "Supported senior team members in complex audit procedures"
    ],
    achievements: [
      "Received excellent feedback from supervisors",
      "Completed all assigned tasks ahead of deadlines",
      "Gained practical knowledge of audit software",
      "Built strong foundation for career in auditing"
    ],
    teamSize: "3-5 members",
    technologies: ["Excel", "Word", "EY Audit Software", "Basic SAP"]
  }
];

const Experience = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Rotate background images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="experience" 
      className="py-20 relative overflow-hidden min-h-screen"
    >
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <Building2 className="absolute top-32 left-16 w-16 h-16 text-blue-200/40 animate-float" />
        <Award className="absolute top-20 right-20 w-12 h-12 text-purple-200/40 animate-float delay-700" />
        <TrendingUp className="absolute bottom-32 left-24 w-14 h-14 text-green-200/40 animate-float delay-1000" />
        <Users className="absolute bottom-40 right-16 w-10 h-10 text-pink-200/40 animate-float delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-full text-purple-700 text-sm font-bold mb-6 backdrop-blur-lg">
            💼 Professional Journey
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 bg-clip-text text-transparent animate-fade-in-up delay-300">
            Work Experience
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500">
            A progressive journey through leading audit and financial consulting firms, building expertise in complex financial environments.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative animate-fade-in-up delay-700">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden lg:block rounded-full shadow-lg"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative animate-fade-in-left"
                style={{ animationDelay: `${index * 0.2 + 0.8}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white shadow-xl hidden lg:block animate-pulse"></div>
                
                {/* Experience Card */}
                <div className="lg:ml-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 group card-hover">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-xl font-bold text-purple-600 mb-4">
                          <Building2 className="w-6 h-6 mr-3" />
                          {exp.company}
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 text-gray-600">
                          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="font-medium">{exp.dates}</span>
                          </div>
                          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                            <span className="font-medium">{exp.location}</span>
                          </div>
                          {exp.teamSize && (
                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                              <Users className="w-5 h-5 mr-2 text-purple-500" />
                              <span className="font-medium">Team: {exp.teamSize}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Responsibilities */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50">
                        <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                          <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-3">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start text-gray-700 bg-white/60 rounded-xl p-3 border border-white/50">
                              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm leading-relaxed font-medium">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50">
                        <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                          <Award className="w-6 h-6 mr-3 text-purple-600" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-3 mb-8">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start text-gray-700 bg-white/60 rounded-xl p-3 border border-white/50">
                              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm leading-relaxed font-medium">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                          <h5 className="text-lg font-bold text-gray-700 mb-4">Tools & Technologies</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up delay-1000">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/50 max-w-3xl mx-auto shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Add Value to Your Organization?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Let's discuss how my experience can contribute to your company's financial success.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
