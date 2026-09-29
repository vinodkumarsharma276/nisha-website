import { Send, Mail, MapPin, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Reveal from './ui/Reveal';

const topics = ['ITR filing', 'GST', 'Tax audit', 'Company registration', 'Tax notice', 'Something else'];

const inputClass =
  'w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [company, setCompany] = useState(''); // honeypot (real users never see/fill this)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot: if this hidden field is filled, it's almost certainly a bot.
    // Silently show success without storing anything.
    if (company.trim() !== '') {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      return;
    }

    if (!supabase) {
      setError('Sorry, the contact form is temporarily unavailable. Please email nishashrm75@gmail.com directly.');
      return;
    }

    setIsSubmitting(true);
    const { error: submitError } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    ]);
    setIsSubmitting(false);

    if (submitError) {
      console.error('Contact form submit failed:', submitError);
      setError('Something went wrong sending your message. Please try again, or email nishashrm75@gmail.com directly.');
      return;
    }

    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-paper py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />
      <div className="blob w-[480px] h-[480px] bg-accent/60 -top-40 -left-40" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 lg:gap-16">
        {/* Left: pitch + details */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 text-[#7fd1c3]">Get in touch</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-[42px] sm:text-[60px] leading-[1.02] tracking-[-0.025em]">
              Let's make tax season <em className="text-[#7fd1c3]">boring.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-paper/70 leading-relaxed max-w-md">
              Tell me a little about what you need. I'll reply within 24 hours with next steps and a clear quote.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10 space-y-5">
            <a href="mailto:nishashrm75@gmail.com" className="group flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Mail className="w-[18px] h-[18px] text-[#7fd1c3]" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-paper/50">Email</span>
                <span className="flex items-center gap-1 text-paper group-hover:text-[#7fd1c3] transition-colors">
                  nishashrm75@gmail.com <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-[18px] h-[18px] text-[#7fd1c3]" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-paper/50">Location</span>
                <span className="text-paper">Mayur Vihar Phase-3, Delhi</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Clock className="w-[18px] h-[18px] text-[#7fd1c3]" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-paper/50">Hours</span>
                <span className="text-paper">Mon–Fri 9am–6pm · Sat 9am–2pm</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={120} variant="scale" className="lg:col-span-7">
          <div className="rounded-[28px] bg-white text-ink p-6 sm:p-9 lg:p-10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-3xl text-ink mb-2">Message sent — thank you!</h3>
                <p className="text-ink-soft">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - hidden from humans; bots that fill it are ignored */}
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div>
                  <p className="text-sm font-medium text-ink mb-3">What can I help with?</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => {
                      const selected = formData.subject === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setFormData({ ...formData, subject: selected ? '' : t })}
                          aria-pressed={selected}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            selected ? 'bg-ink border-ink text-paper' : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                      Full name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1.5">
                    Subject
                  </label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} placeholder="e.g. ITR filing for FY 2025–26" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="A few lines about your situation — income type, business, deadlines…"
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-ink-soft">Your details are only used to reply to you.</p>
                  <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
                    {isSubmitting ? 'Sending…' : 'Send message'}
                    <Send className="arrow w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
