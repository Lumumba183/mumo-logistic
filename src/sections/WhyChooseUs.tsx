import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Radar, FileCheck, BadgeDollarSign, Headphones } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Layers, title: 'One Partner, Many Modes', desc: 'Sea, air, road, and storage under one account. No more juggling multiple vendors.' },
  { icon: Radar, title: 'Real-Time Tracking', desc: 'Know where your cargo is—and when it arrives. Full visibility from pickup to delivery.' },
  { icon: FileCheck, title: 'Documentation Done Right', desc: 'Customs prep, compliance checks, and paperwork handled early to avoid delays.' },
  { icon: BadgeDollarSign, title: 'Transparent Pricing', desc: 'No surprise charges. Our quotes include what others hide—clear and upfront.' },
  { icon: Headphones, title: 'Support That Answers', desc: 'A dedicated operations contact, not a ticket queue. Real people, real solutions.' },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' } });
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) gsap.fromTo(cards, { x: 60, opacity: 0, rotate: -1 }, { x: 0, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="why-us" className="relative w-full section-light py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div ref={headingRef} className="lg:col-span-5">
            <span className="font-handwritten text-2xl block mb-2" style={{ color: 'var(--mumo-accent)' }}>Our Advantage</span>
            <h2 className="font-display font-bold text-navy leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Why MumoFreight</h2>
            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
              We don't just move cargo—we reduce delays, cut hidden costs, and keep your supply chain predictable.
            </p>
          </div>
          <div ref={cardsRef} className="lg:col-span-7 space-y-4">
            {benefits.map((b, i) => (
              <div key={b.title} className="benefit-card group bg-white rounded-2xl p-5 sm:p-6 card-shadow hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(59,108,255,0.1)' }}>
                    <b.icon className="w-6 h-6" style={{ color: 'var(--mumo-accent)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold" style={{ color: 'rgba(59,108,255,0.6)' }}>0{i + 1}</span>
                      <h3 className="font-display font-semibold text-navy text-lg">{b.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
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
