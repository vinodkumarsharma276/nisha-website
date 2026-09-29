import { useEffect, useState, type RefObject } from 'react';

/** Becomes true (once) when the element scrolls into view. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = '0px 0px -10% 0px') {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}
