import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from '../../lib/useInView';

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** up (default) | left | right | scale */
  variant?: 'up' | 'left' | 'right' | 'scale';
};

/**
 * Fades/slides its children in when scrolled into view.
 * All the actual motion lives in CSS and is gated by <html data-motion>,
 * so on "none" devices the content is simply visible.
 */
const Reveal = ({ children, as: Tag = 'div', delay = 0, className = '', variant = 'up' }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
