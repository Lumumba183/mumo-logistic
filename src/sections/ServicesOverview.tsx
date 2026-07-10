import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ship, Plane, Truck, Warehouse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cardsRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pills animation
      const pills = pillsRef.current?.querySelectorAll('.service-pill');
      if (pills) {
        gsap.fromTo(
          pills,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Ship, label: 'Sea Freight', image: '/images/service-sea.jpg' },
    { icon: Plane, label: 'Air Freight', image: '/images/service-air.jpg' },
    { icon: Truck, label: 'Land Transport', image: '/images/service-land.jpg' },
    { icon: Warehouse, label: 'Warehousing', image: '/images/service-warehouse.jpg' },
  ];

  const pills = [
    { icon: Ship, label: 'Sea Freight' },
    { icon: Plane, label: 'Air Freight' },
    { icon: Truck, label: 'Land Transport' },
    { icon: Warehouse, label: 'Warehousing' },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen w-full bg-navy text-white py-20 lg:py-32 overflow-hidden"
    >
      {/* Blueprint Background */}
      <div className="absolute inset-0 blueprint-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left: Text */}
          <div ref={headingRef}>
            <span className="text-accent font-handwritten text-2xl mb-2 block">What We Offer</span>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              Our Services
            </h2>
            <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed max-w-md">
              From port to door, we coordinate freight, documentation, customs, 
              and final-mile—so you don't have to. One partner for all your logistics needs.
            </p>

            {/* Service Pills */}
            <div ref={pillsRef} className="mt-8 flex flex-wrap gap-3">
              {pills.map((pill) => (
                <div
                  key={pill.label}
                  className="service-pill flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-default"
                >
                  <pill.icon className="w-4 h-4 text-accent" style={{ color: '#3B6CFF' }} />
                  <span className="text-sm font-medium">{pill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Service Cards Grid */}
          <div ref={cardsRef}>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.label}
                  className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <service.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-display font-semibold text-white text-sm">{service.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
