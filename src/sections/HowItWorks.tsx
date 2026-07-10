import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, Route, Ship, PackageCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardList,
    title: 'Book',
    description: 'Share shipment details with our team.',
    position: 'left-top',
  },
  {
    icon: Route,
    title: 'Plan',
    description: 'We choose routes & prepare documentation.',
    position: 'right-top',
  },
  {
    icon: Ship,
    title: 'Ship',
    description: 'Your cargo moves with real-time tracking.',
    position: 'left-bottom',
  },
  {
    icon: PackageCheck,
    title: 'Deliver',
    description: 'Customs clearance & final handover.',
    position: 'right-bottom',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Center image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Connector lines draw animation
      const paths = connectorsRef.current?.querySelectorAll('path');
      if (paths) {
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 200;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen w-full bg-navy text-white py-20 lg:py-32 overflow-hidden"
    >
      {/* Blueprint Background */}
      <div className="absolute inset-0 blueprint-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-handwritten text-2xl text-blue-400 block mb-2">
            Simple Process
          </span>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            How It Works
          </h2>
          <p className="mt-4 text-white/70 max-w-lg mx-auto">
            Four simple steps from booking to delivery. We handle the complexity so you don't have to.
          </p>
        </div>

        {/* Steps Layout */}
        <div className="relative">
          {/* SVG Connectors */}
          <svg
            ref={connectorsRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ zIndex: 1 }}
          >
            <path
              d="M 200 80 Q 350 80 400 150"
              fill="none"
              stroke="rgba(59, 108, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M 600 150 Q 650 80 800 80"
              fill="none"
              stroke="rgba(59, 108, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M 200 280 Q 350 280 400 210"
              fill="none"
              stroke="rgba(59, 108, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M 600 210 Q 650 280 800 280"
              fill="none"
              stroke="rgba(59, 108, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="step-item relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(59, 108, 255, 0.2)' }}
                    >
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <span
                      className="font-display font-bold text-4xl opacity-20"
                      style={{ color: 'var(--mumo-accent)' }}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-white text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-3 lg:hidden">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <PackageCheck className="w-3 h-3 text-accent" style={{ color: 'var(--mumo-accent)' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div ref={imageRef} className="mt-12 lg:mt-16 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden max-w-md w-full aspect-[3/4] lg:aspect-[4/3] card-shadow">
              <img
                src="/images/process-portrait.jpg"
                alt="Logistics professional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="text-white font-display font-semibold text-lg">
                  Your Cargo, Our Commitment
                </p>
                <button
                  onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-3 mumo-btn-primary text-sm"
                >
                  Get Your First Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
