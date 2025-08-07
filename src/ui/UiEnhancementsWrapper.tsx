import React, { useEffect, useState } from 'react';
import App from '../App';

const carouselImages: string[] = [
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=60',
  'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=60',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=60'
];

const UiEnhancementsWrapper: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => { document.documentElement.classList.remove('dark'); }, []);

  // Scroll progress + back to top
  useEffect(() => {
    const progressEl = document.getElementById('ca-scroll-progress');
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax-speed]'));
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressEl) progressEl.style.width = progress + '%';
      setShowTop(scrollTop > 400);
      // Parallax update
      if (parallaxNodes.length) {
        parallaxNodes.forEach(el => {
          const speed = parseFloat(el.dataset.parallaxSpeed || '0');
            const y = scrollTop * speed;
            el.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
        });
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Enhanced reveal animations (assign index for cascade)
  useEffect(() => {
    const containers = Array.from(document.querySelectorAll('.reveal-group')) as HTMLElement[];
    containers.forEach(group => {
      const children = Array.from(group.querySelectorAll(':scope > .reveal')) as HTMLElement[];
      children.forEach((c, i) => c.style.setProperty('--reveal-index', i.toString()));
    });

    const nodes = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Background carousel rotation
  useEffect(() => {
    const id = setInterval(() => {
      setActiveBg(i => (i + 1) % carouselImages.length);
    }, 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div id="ca-scroll-progress" />
      <div className="bg-carousel" aria-hidden="true">
        {carouselImages.map((src, i) => (
          <div
            key={src}
            className={`bg-carousel__layer ${i === activeBg ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
            data-parallax-speed={i === activeBg ? -0.02 : -0.01}
          />
        ))}
        <div className="bg-carousel__overlay" />
      </div>
      <App />
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`ca-backtotop ca-glass ca-shadow p-3 rounded-full text-slate-600 hover:scale-105 transition ${showTop ? 'visible' : ''}`}
      >
        ↑
      </button>
    </>
  );
};

export default UiEnhancementsWrapper;
