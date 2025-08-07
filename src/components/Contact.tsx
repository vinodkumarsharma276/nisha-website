import { Send, Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const update = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData({...formData,[e.target.name]:e.target.value});
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(()=>{ setSent(false); setFormData({ name:'', email:'', subject:'', message:'' }); }, 2500); };

  return (
    <section id="contact" className="py-24 relative bg-[linear-gradient(to_bottom,rgba(var(--ca-bg),1),rgba(var(--ca-bg-alt),.75))]">
      <div className="absolute inset-0 ca-grid-bg opacity-[0.04]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-heading text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Discuss engagements, request proposals or clarify service scope – I respond within 24 hours.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-md bg-accent-soft flex items-center justify-center text-accent"><MessageCircle className="w-5 h-5" /></div>
              <h3 className="text-lg font-semibold text-slate-900">Send a Message</h3>
            </div>
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle className="w-8 h-8" /></div>
                <p className="font-medium text-slate-800 mb-1">Message sent</p>
                <p className="text-sm text-slate-500">Thank you – I will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium tracking-wide text-slate-500 mb-2 uppercase">Name *</label>
                    <input id="name" name="name" required value={formData.name} onChange={update} className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus-accent" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium tracking-wide text-slate-500 mb-2 uppercase">Email *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={update} className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus-accent" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium tracking-wide text-slate-500 mb-2 uppercase">Subject *</label>
                  <input id="subject" name="subject" required value={formData.subject} onChange={update} className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus-accent" placeholder="Topic" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium tracking-wide text-slate-500 mb-2 uppercase">Message *</label>
                  <textarea id="message" name="message" required rows={6} value={formData.message} onChange={update} className="w-full resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus-accent leading-relaxed" placeholder="How can I help?" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-sm"><Send className="w-4 h-4 mr-2" />Send</button>
              </form>
            )}
          </div>
          <div className="space-y-8">
            <div className="card p-8 rounded-2xl">
              <h3 className="font-semibold text-slate-900 mb-6">Contact Details</h3>
              <ul className="space-y-5 text-sm text-slate-600">
                <li className="flex items-start gap-4"><div className="w-9 h-9 rounded-md bg-accent-soft flex items-center justify-center text-accent"><Mail className="w-4 h-4" /></div><div><p className="font-medium text-slate-800">Email</p><p>nisha.ca@example.com</p></div></li>
                <li className="flex items-start gap-4"><div className="w-9 h-9 rounded-md bg-accent-soft flex items-center justify-center text-accent"><Phone className="w-4 h-4" /></div><div><p className="font-medium text-slate-800">Phone</p><p>+91 98765 43210</p></div></li>
                <li className="flex items-start gap-4"><div className="w-9 h-9 rounded-md bg-accent-soft flex items-center justify-center text-accent"><MapPin className="w-4 h-4" /></div><div><p className="font-medium text-slate-800">Location</p><p>Mumbai, Maharashtra, India</p></div></li>
                <li className="flex items-start gap-4"><div className="w-9 h-9 rounded-md bg-accent-soft flex items-center justify-center text-accent"><Clock className="w-4 h-4" /></div><div><p className="font-medium text-slate-800">Business Hours</p><p>Mon - Fri: 9:00 – 18:00</p><p className="text-xs text-slate-500">Sat: 9:00 – 14:00</p></div></li>
              </ul>
            </div>
            <div className="card p-8 rounded-2xl">
              <h3 className="font-semibold text-slate-900 mb-4">Services Snapshot</h3>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-600">
                {['Financial Auditing','Tax Planning','GST Compliance','Business Valuation','Consulting','Risk Assessment'].map(s=> <span key={s} className="flex items-center gap-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:inline-block">{s}</span>)}
              </div>
            </div>
            <div className="card p-4 rounded-2xl h-64 overflow-hidden">
              <div className="w-full h-full rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 text-xs">Map Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
