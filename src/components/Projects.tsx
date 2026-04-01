import { Calendar, Users, TrendingUp, Shield, DollarSign, BarChart3, CheckCircle } from 'lucide-react';
import type { ReactElement } from 'react';

interface Project {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  duration: string;
  teamSize: string;
  industry: string;
  technologies: string[];
  icon: ReactElement;
}

const projects: Project[] = [
  {
    title: "Financial Audit for Tech Startup",
    description: "Conducted a comprehensive financial audit for a fast-growing fintech startup, identifying key areas for cost optimization and ensuring regulatory compliance.",
    challenge: "The startup had rapid growth with complex revenue streams and needed to establish robust financial controls for investor confidence.",
    solution: "Implemented a comprehensive audit framework covering revenue recognition, internal controls, and compliance with RBI guidelines.",
    results: ["Identified $2M in cost savings", "Improved reporting accuracy by 95%", "Achieved clean audit opinion", "Enhanced investor confidence"],
    duration: "6 months",
    teamSize: "5 members",
    industry: "Financial Technology",
    technologies: ["SAP", "Advanced Excel", "Power BI", "Tally"],
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Tax Compliance for E-commerce Business",
    description: "Managed end-to-end tax compliance for a multi-state e-commerce business, including GST filings, income tax returns, and strategic tax planning.",
    challenge: "Complex multi-state operations with varying tax obligations across different jurisdictions and product categories.",
    solution: "Developed automated compliance workflows and implemented a centralized tax management system.",
    results: ["100% on-time filing record", "30% reduction in tax liability", "Zero compliance notices", "Streamlined 15-state operations"],
    duration: "Ongoing (2+ years)",
    teamSize: "8 members",
    industry: "E-commerce",
    technologies: ["GST Portal", "Income Tax Portal", "Zoho Books", "Custom Tax Software"],
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Business Valuation for Acquisition",
    description: "Performed a detailed business valuation for a mid-sized manufacturing company, providing crucial insights for a successful acquisition deal worth $50M.",
    challenge: "Complex asset structure with multiple subsidiaries and international operations requiring detailed due diligence.",
    solution: "Applied multiple valuation methodologies including DCF, comparable analysis, and asset-based approaches.",
    results: ["Successful $50M acquisition", "Identified hidden value worth $8M", "Risk mitigation strategies", "Post-acquisition integration plan"],
    duration: "4 months",
    teamSize: "12 members",
    industry: "Manufacturing",
    technologies: ["Financial Modeling", "Bloomberg Terminal", "FactSet", "Excel VBA"],
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    title: "Financial Restructuring & Recovery",
    description: "Led financial restructuring for a distressed retail chain, developing recovery strategies and negotiating with creditors to avoid bankruptcy.",
    challenge: "Company facing bankruptcy with high debt levels and declining revenues due to market disruption.",
    solution: "Comprehensive restructuring plan including debt renegotiation, operational improvements, and strategic partnerships.",
    results: ["Avoided bankruptcy", "Reduced debt by 40%", "Profitability in 18 months", "Preserved 500+ jobs"],
    duration: "8 months",
    teamSize: "15 members",
    industry: "Retail",
    technologies: ["Financial Modeling", "Scenario Analysis", "Cash Flow Management", "ERP Systems"],
    icon: <BarChart3 className="w-6 h-6" />
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-3">Case Studies</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a5f] mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of my most impactful work in financial consulting, auditing, and business transformation.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                  {/* Main Content */}
                  <div className="lg:w-2/3">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#f0f4f8] rounded-lg flex items-center justify-center mr-3 text-[#1e3a5f]">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#1e3a5f]">{project.title}</h3>
                        <p className="text-sm text-[#c8a951] font-medium">{project.industry}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{project.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#fef3f2] rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-red-800 mb-2">Challenge</h4>
                        <p className="text-sm text-gray-600">{project.challenge}</p>
                      </div>
                      <div className="bg-[#f0fdf4] rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-green-800 mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">{project.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">Key Results</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.results.map((result, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:w-1/3 space-y-4">
                    <div className="bg-[#f8fafc] rounded-lg p-5">
                      <h4 className="text-sm font-semibold text-[#1e3a5f] mb-4">Project Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500 mr-2">Duration:</span>
                          <span className="font-medium text-gray-700">{project.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500 mr-2">Team:</span>
                          <span className="font-medium text-gray-700">{project.teamSize}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f8fafc] rounded-lg p-5">
                      <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">Tools Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
