import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../lib/useInView';
import { useMotionTier } from '../../lib/motion';

/** Counts from 0 to `to` when visible. Shows the final value instantly when motion is off. */
const CountUp = ({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const tier = useMotionTier();
  const [value, setValue] = useState(tier === 'none' ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (tier === 'none') {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const d = tier === 'lite' ? duration / 2 : duration;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / d);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, tier, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
