import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, Route, Ship, PackageCheck } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: ClipboardList, title: 'Book', desc: 'Share shipment details with our team.', num: '01' },
  { icon: Route, title: 'Plan', desc: 'We choose routes & prepare documentation.', num: '02' },
  { icon: Ship, title: 'Ship', desc: 'Your cargo moves with real-time tracking.', num: '03' },
  { icon: PackageCheck, title: 'Deliver', desc: 'Customs clearance & final handover.', num: '04' },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 65%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(imgRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 55%', toggleActions: 'play none none reverse' } });
      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      if (stepEls) gsap.fromTo(stepEls, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 45%', toggleActions: 'play none none reverse' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative min-h-screen w-full section-navy text-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-handwritten text-2xl text-blue-400 block mb-2">Simple Process</span>
          <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>How It Works</h2>
          <p className="mt-4 text-white/70 max-w-lg mx-auto">Four simple steps from booking to delivery. We handle the complexity so you don't have to.</p>
        </div>
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.title} className="step-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}>
                  <step.icon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="font-display font-bold text-4xl opacity-20" style={{ color: 'var(--mumo-accent)' }}>{step.num}</span>
              </div>
              <h3 className="font-display font-semibold text-white text-xl mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div ref={imgRef} className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden max-w-md w-full aspect-[4/3] card-shadow">
            <img src="/images/process-portrait.jpg" alt="Logistics professional" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-white font-display font-semibold text-lg">Your Cargo, Our Commitment</p>
              <button onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })} className="mt-3 mumo-btn text-sm">Get Your First Quote</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
