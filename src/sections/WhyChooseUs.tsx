import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Radar, FileCheck, BadgeDollarSign, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Layers,
    title: 'One Partner, Many Modes',
    description: 'Sea, air, road, and storage under one account. No more juggling multiple vendors.',
  },
  {
    icon: Radar,
    title: 'Real-Time Tracking',
    description: 'Know where your cargo is—and when it arrives. Full visibility from pickup to delivery.',
  },
  {
    icon: FileCheck,
    title: 'Documentation Done Right',
    description: 'Customs prep, compliance checks, and paperwork handled early to avoid delays.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    description: 'No surprise charges. Our quotes include what others hide—clear and upfront.',
  },
  {
    icon: Headphones,
    title: 'Support That Answers',
    description: 'A dedicated operations contact, not a ticket queue. Real people, real solutions.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // Cards animation with stagger
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { x: 60, opacity: 0, rotate: -1 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Progress line animation
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative w-full bg-light py-20 lg:py-32 overflow-hidden"
    >
      {/* Blueprint Background */}
      <div className="absolute inset-0 blueprint-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: Heading */}
          <div ref={headingRef} className="lg:col-span-5">
            <span className="font-handwritten text-2xl text-accent block mb-2" style={{ color: 'var(--mumo-accent)' }}>
              Our Advantage
            </span>
            <h2
              className="font-display font-bold text-navy leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Why MumoFreight
            </h2>
            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
              We don't just move cargo—we reduce delays, cut hidden costs, 
              and keep your supply chain predictable.
            </p>

            {/* Progress Line (decorative) */}
            <div className="hidden lg:block mt-12 relative">
              <div className="w-0.5 h-48 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="w-full bg-accent rounded-full origin-top"
                  style={{ height: '100%', backgroundColor: 'var(--mumo-accent)' }}
                />
              </div>
            </div>
          </div>

          {/* Right: Benefit Cards */}
          <div ref={cardsRef} className="lg:col-span-7 space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="benefit-card group bg-white rounded-2xl p-5 sm:p-6 card-shadow hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(59, 108, 255, 0.1)' }}
                  >
                    <benefit.icon className="w-6 h-6" style={{ color: 'var(--mumo-accent)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-accent/60" style={{ color: 'rgba(59, 108, 255, 0.6)' }}>
                        0{index + 1}
                      </span>
                      <h3 className="font-display font-semibold text-navy text-lg">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
