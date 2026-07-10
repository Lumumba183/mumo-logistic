import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ship, Plane, Truck, Warehouse, ArrowRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 'sea-freight', title: 'Sea Freight', desc: 'FCL and LCL shipping with transparent rates, reliable schedules, and customs support at origin and destination. We handle container booking, documentation, and port coordination.', cta: 'View Sea Services', image: '/images/service-sea.jpg', icon: Ship, chip: 'Sea Freight', caption: 'Global vessel network', layout: 'left' as const, bg: 'light' as const },
  { id: 'air-freight', title: 'Air Freight', desc: 'Time-critical cargo handled with priority booking, clearance prep, and door-to-door coordination. Perfect for urgent shipments and high-value goods.', cta: 'Request Air Rates', image: '/images/service-air.jpg', icon: Plane, chip: 'Air Freight', caption: 'Fast, reliable lift', layout: 'right' as const, bg: 'dark' as const },
  { id: 'land-transport', title: 'Land Transport', desc: 'Full truckload, part load, and specialized haulage with route optimization and real-time updates. Covering East Africa and beyond with our trusted network.', cta: 'Plan a Route', image: '/images/service-land.jpg', icon: Truck, chip: 'Land Transport', caption: 'Road & rail coverage', layout: 'left' as const, bg: 'light' as const },
  { id: 'warehousing', title: 'Warehousing', desc: 'Short-term and long-term storage with inventory visibility, kitting, and scheduled distribution. Secure facilities with modern management systems.', cta: 'Check Availability', image: '/images/service-warehouse.jpg', icon: Warehouse, chip: 'Warehousing', caption: 'Stock under control', layout: 'right' as const, bg: 'dark' as const },
];

function ServiceSection({ svc }: { svc: typeof services[0] }) {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textFrom = svc.layout === 'left' ? { x: -80, opacity: 0 } : { x: 80, opacity: 0 };
      const imgFrom = svc.layout === 'left' ? { x: 80, opacity: 0 } : { x: -80, opacity: 0 };
      gsap.fromTo(textRef.current, textFrom, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 65%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(imgRef.current, imgFrom, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(chipRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 55%', toggleActions: 'play none none reverse' } });
    }, ref);
    return () => ctx.revert();
  }, [svc.layout]);

  const isDark = svc.bg === 'dark';
  const tOrder = svc.layout === 'left' ? 'lg:order-1' : 'lg:order-2';
  const iOrder = svc.layout === 'left' ? 'lg:order-2' : 'lg:order-1';

  return (
    <section ref={ref} id={svc.id} className={`relative min-h-[80vh] w-full py-20 lg:py-32 overflow-hidden ${isDark ? 'section-navy text-white' : 'section-light text-navy'}`}>
      <div className={`absolute inset-0 blueprint-bg ${isDark ? 'opacity-15' : 'opacity-30'}`} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={textRef} className={tOrder}>
            <span className={`font-handwritten text-2xl mb-2 block ${isDark ? 'text-blue-400' : 'text-accent'}`} style={{ color: isDark ? '#6B9AFF' : 'var(--mumo-accent)' }}>{svc.caption}</span>
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{svc.title}</h2>
            <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-md ${isDark ? 'text-white/75' : 'text-gray-600'}`}>{svc.desc}</p>
            <button onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 inline-flex items-center gap-2 font-medium group" style={{ color: 'var(--mumo-accent)' }}>
              {svc.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div ref={imgRef} className={iOrder}>
            <div className="relative rounded-2xl overflow-hidden card-shadow aspect-[4/3]">
              <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
              <div ref={chipRef} className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                <svc.icon className="w-4 h-4" style={{ color: 'var(--mumo-accent)' }} />
                <span className="text-sm font-semibold text-navy">{svc.chip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetails() {
  return <>{services.map((s) => <ServiceSection key={s.id} svc={s} />)}</>;
}
