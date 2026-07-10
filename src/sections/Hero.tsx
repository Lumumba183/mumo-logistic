import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Ship, Plane, Truck, Warehouse } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      
      // Initial states
      if (headlineLines && headlineLines.length > 0) {
        gsap.set(headlineLines, { y: 28, opacity: 0 });
      }
      gsap.set(subRef.current, { y: 28, opacity: 0 });
      gsap.set(ctaRef.current, { y: 28, opacity: 0 });
      gsap.set(cardRef.current, { x: '10vw', opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      if (headlineLines && headlineLines.length > 0) {
        tl.to(headlineLines, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.3');
      }
      
      tl.to(subRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to(cardRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const serviceChips = [
    { icon: Ship, label: 'Sea Freight' },
    { icon: Plane, label: 'Air Freight' },
    { icon: Truck, label: 'Land Transport' },
    { icon: Warehouse, label: 'Warehousing' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-port.jpg"
          alt="Container port"
          className="w-full h-full object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(27, 42, 74, 0.65)' }}
        />
      </div>

      {/* Blueprint Pattern Overlay */}
      <div className="absolute inset-0 blueprint-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="max-w-xl">
            <h1
              ref={headlineRef}
              className="font-display font-bold text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              <span className="headline-line block">Global Logistics</span>
              <span className="headline-line block mt-2">Simplified for You</span>
            </h1>

            <p
              ref={subRef}
              className="mt-6 text-white/85 text-base sm:text-lg leading-relaxed max-w-md"
            >
              Sea, air, and land—coordinated on one platform with real-time 
              tracking and end-to-end support. Your cargo, our commitment.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={scrollToQuote}
                className="mumo-btn-primary group"
              >
                Get a Freight Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="px-6 py-3 rounded-xl font-medium text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Right: Info Card */}
          <div
            ref={cardRef}
            className="hidden lg:block"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 card-shadow max-w-sm ml-auto">
              <h3 className="font-display font-semibold text-navy text-lg mb-4">
                Our Services
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {serviceChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-default"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <chip.icon className="w-4.5 h-4.5 text-accent" style={{ color: 'var(--mumo-accent)' }} />
                    </div>
                    <span className="text-sm font-medium text-navy">{chip.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                From port to door, we coordinate freight, documentation, 
                customs, and final-mile delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
    </section>
  );
}
