import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
};

const SectionHeading = ({ eyebrow, title, intro, align = 'left', dark = false }: Props) => (
  <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
    <Reveal>
      <p className={`eyebrow mb-4 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-[#7fd1c3]' : ''}`}>{eyebrow}</p>
    </Reveal>
    <Reveal delay={80}>
      <h2 className={`font-display text-[34px] sm:text-5xl leading-[1.05] tracking-[-0.02em] ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
    </Reveal>
    {intro && (
      <Reveal delay={160}>
        <p className={`mt-5 text-[17px] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{intro}</p>
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
