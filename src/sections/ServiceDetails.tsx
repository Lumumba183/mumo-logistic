import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ship, Plane, Truck, Warehouse, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  icon: React.ElementType;
  chipLabel: string;
  caption: string;
  layout: 'left-text' | 'right-text';
  bg: 'light' | 'dark';
}

const services: ServiceData[] = [
  {
    id: 'sea-freight',
    title: 'Sea Freight',
    description: 'FCL and LCL shipping with transparent rates, reliable schedules, and customs support at origin and destination. We handle container booking, documentation, and port coordination.',
    cta: 'View Sea Services',
    image: '/images/service-sea.jpg',
    icon: Ship,
    chipLabel: 'Sea Freight',
    caption: 'Global vessel network',
    layout: 'left-text',
    bg: 'light',
  },
  {
    id: 'air-freight',
    title: 'Air Freight',
    description: 'Time-critical cargo handled with priority booking, clearance prep, and door-to-door coordination. Perfect for urgent shipments and high-value goods.',
    cta: 'Request Air Rates',
    image: '/images/service-air.jpg',
    icon: Plane,
    chipLabel: 'Air Freight',
    caption: 'Fast, reliable lift',
    layout: 'right-text',
    bg: 'dark',
  },
  {
    id: 'land-transport',
    title: 'Land Transport',
    description: 'Full truckload, part load, and specialized haulage with route optimization and real-time updates. Covering East Africa and beyond with our trusted network.',
    cta: 'Plan a Route',
    image: '/images/service-land.jpg',
    icon: Truck,
    chipLabel: 'Land Transport',
    caption: 'Road & rail coverage',
    layout: 'left-text',
    bg: 'light',
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    description: 'Short-term and long-term storage with inventory visibility, kitting, and scheduled distribution. Secure facilities with modern management systems.',
    cta: 'Check Availability',
    image: '/images/service-warehouse.jpg',
    icon: Warehouse,
    chipLabel: 'Warehousing',
    caption: 'Stock under control',
    layout: 'right-text',
    bg: 'dark',
  },
];

function ServiceSection({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textFrom = service.layout === 'left-text' ? { x: -80, opacity: 0 } : { x: 80, opacity: 0 };
      const imageFrom = service.layout === 'left-text' ? { x: 80, opacity: 0 } : { x: -80, opacity: 0 };

      gsap.fromTo(textRef.current, textFrom, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.fromTo(imageRef.current, imageFrom, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.fromTo(chipRef.current, { y: -20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [service.layout]);

  const isDark = service.bg === 'dark';
  const textOrder = service.layout === 'left-text' ? 'lg:order-1' : 'lg:order-2';
  const imageOrder = service.layout === 'left-text' ? 'lg:order-2' : 'lg:order-1';

  return (
    <section
      ref={sectionRef}
      id={service.id}
      className={`relative min-h-[80vh] w-full py-20 lg:py-32 overflow-hidden ${isDark ? 'bg-navy text-white' : 'bg-light text-navy'}`}
    >
      {/* Blueprint Background */}
      <div className={`absolute inset-0 blueprint-bg ${isDark ? 'opacity-15' : 'opacity-30'}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Block */}
          <div ref={textRef} className={textOrder}>
            <span className={`font-handwritten text-2xl mb-2 block ${isDark ? 'text-blue-400' : 'text-accent'}`} style={{ color: isDark ? '#6B9AFF' : 'var(--mumo-accent)' }}>
              {service.caption}
            </span>
            <h2
              className={`font-display font-bold leading-tight ${isDark ? 'text-white' : 'text-navy'}`}
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              {service.title}
            </h2>
            <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-md ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
              {service.description}
            </p>
            <button
              onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}
              className={`mt-8 inline-flex items-center gap-2 font-medium group ${isDark ? 'text-accent hover:text-blue-400' : 'text-accent hover:text-blue-700'}`}
              style={{ color: 'var(--mumo-accent)' }}
            >
              {service.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Block */}
          <div ref={imageRef} className={imageOrder}>
            <div className="relative rounded-2xl overflow-hidden card-shadow aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {/* Chip Label */}
              <div
                ref={chipRef}
                className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm"
              >
                <service.icon className="w-4 h-4" style={{ color: 'var(--mumo-accent)' }} />
                <span className="text-sm font-semibold text-navy">{service.chipLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetails() {
  return (
    <>
      {services.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}
    </>
  );
}
