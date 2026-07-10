import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const regions = [
  'East Africa',
  'Southern Africa',
  'Middle East',
  'Europe',
  'Asia',
  'North America',
];

export default function GlobalReach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        mapRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const regionItems = regionsRef.current?.querySelectorAll('.region-item');
      if (regionItems) {
        gsap.fromTo(
          regionItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-navy text-white py-20 lg:py-32 overflow-hidden"
    >
      {/* Blueprint Background */}
      <div className="absolute inset-0 blueprint-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Heading */}
          <div ref={headingRef} className="lg:col-span-4">
            <span className="font-handwritten text-2xl text-blue-400 block mb-2">
              Connected Worldwide
            </span>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Global Reach
            </h2>
            <p className="mt-6 text-white/75 text-base leading-relaxed">
              A network of agents, ports, and hubs across major trade lanes—managed 
              from one point of contact.
            </p>

            {/* Regions List */}
            <div ref={regionsRef} className="mt-8 grid grid-cols-2 gap-3">
              {regions.map((region) => (
                <div
                  key={region}
                  className="region-item flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--mumo-accent)' }} />
                  <span className="text-sm font-medium">{region}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map Image */}
          <div ref={mapRef} className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden card-shadow">
              <img
                src="/images/map-world.jpg"
                alt="Global network map"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent" />
              
              {/* Floating Stats */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto flex flex-wrap gap-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" style={{ color: 'var(--mumo-accent)' }} />
                    <div>
                      <p className="font-display font-bold text-navy text-lg leading-none">6+</p>
                      <p className="text-xs text-gray-600">Regions Served</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--mumo-accent)' }} />
                    <div>
                      <p className="font-display font-bold text-navy text-lg leading-none">50+</p>
                      <p className="text-xs text-gray-600">Global Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
