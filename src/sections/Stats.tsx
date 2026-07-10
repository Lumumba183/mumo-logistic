import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Package, Users, Award } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Globe, value: 6, suffix: '+', label: 'Regions Covered' },
  { icon: Package, value: 500, suffix: '+', label: 'Shipments Handled' },
  { icon: Users, value: 50, suffix: '+', label: 'Global Partners' },
  { icon: Award, value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const inc = value / (2000 / 16);
    const t = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [active, value]);
  return <span className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--mumo-accent)' }}>{count}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: ref.current, start: 'top 70%', onEnter: () => setActive(true) });
      const items = ref.current?.querySelectorAll('.stat-item');
      if (items) gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none reverse' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-16 lg:py-20 section-navy">
      <div className="absolute inset-0 blueprint-bg opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="stat-item text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}>
                <s.icon className="w-6 h-6 text-blue-400" />
              </div>
              <Counter value={s.value} suffix={s.suffix} active={active} />
              <p className="mt-2 text-white/70 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
