import { Calendar, MapPin, Building2, Users, Award, TrendingUp } from 'lucide-react';

interface Experience {
  title:string; company:string; location:string; dates:string; responsibilities:string[]; achievements:string[]; teamSize?:string; technologies:string[];
}

const experiences: Experience[] = [
  { title:"Senior Auditor", company:"Deloitte", location:"Mumbai, India", dates:"Jan 2020 - Present", responsibilities:["Led audit engagements for financial services clients.","Mentored junior staff improving efficiency 40%","Presented audit findings to management","Implemented data-driven audit procedures"], achievements:["Promoted within 2 years","15+ successful engagements","100% client satisfaction","30% cycle time reduction"], teamSize:"8-12", technologies:["SAP","ACL","IDEA","Power BI","Advanced Excel","TeamMate"] },
  { title:"Audit Associate", company:"PwC", location:"Pune, India", dates:"Jan 2017 - Dec 2019", responsibilities:["Supported statutory & tax audits across sectors","Prepared financial statements & tax returns","Worked with Ind AS / IFRS standards","Performed control & risk assessments"], achievements:["Top performer ratings","Articleship distinction","CA finals first attempt","PwC Excellence Award 2019"], teamSize:"5-8", technologies:["Tally","SAP FICO","Excel","AuditFile","CaseWare"] },
  { title:"Audit Intern", company:"Ernst & Young (EY)", location:"Bangalore, India", dates:"May 2016 - Jul 2016", responsibilities:["Assisted with audit procedures & workpapers","Observed stakeholder communication","Supported senior staff in complex areas","Learned foundational audit software"], achievements:["Strong supervisor feedback","Ahead of deadlines","Practical software exposure","Built professional baseline"], teamSize:"3-5", technologies:["Excel","Word","EY Audit Platform","Basic SAP"] }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative bg-[linear-gradient(to_bottom,rgba(var(--ca-bg),1),rgba(var(--ca-bg-alt),.7))]">
      <div className="absolute inset-0 ca-grid-bg opacity-[0.04]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-heading text-slate-900 mb-4">Experience</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Progressive roles delivering audit quality, stakeholder assurance and process improvement.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
          <div className="space-y-10">
            {experiences.map((exp)=> (
              <div key={exp.title} className="relative lg:pl-16">
                <div className="hidden lg:block absolute left-[14px] top-3 w-3 h-3 rounded-full bg-accent ring-4 ring-accent-soft" />
                <div className="card p-8 rounded-2xl">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1 leading-snug">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-accent font-medium text-sm mb-2"><Building2 className="w-4 h-4" />{exp.company}</div>
                      <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-wide text-slate-500">
                        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent" />{exp.dates}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent" />{exp.location}</span>
                        {exp.teamSize && <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5 text-accent" />Team {exp.teamSize}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                      <Award className="w-4 h-4 text-accent" />
                      <span>{exp.achievements.length} Key Achievements</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent" />Responsibilities</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {exp.responsibilities.map(r=> <li key={r} className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:translate-x-[-50%]">{r}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-accent" />Achievements</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {exp.achievements.map(a=> <li key={a} className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:translate-x-[-50%]">{a}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(t=> <span key={t} className="px-3 py-1.5 rounded-md bg-accent-soft text-accent text-xs font-medium">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-16">
          <a href="#contact" className="btn-primary">Let's Connect</a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
