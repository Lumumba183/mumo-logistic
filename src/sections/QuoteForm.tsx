import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, Ship, Plane, Truck, Warehouse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    mode: '',
    origin: '',
    destination: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
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
        imageRef.current,
        { x: 60, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data for Netlify
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modes = [
    { value: '', label: 'Select Mode', icon: null },
    { value: 'sea', label: 'Sea Freight', icon: Ship },
    { value: 'air', label: 'Air Freight', icon: Plane },
    { value: 'land', label: 'Land Transport', icon: Truck },
    { value: 'warehouse', label: 'Warehousing', icon: Warehouse },
  ];

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="relative w-full bg-light py-20 lg:py-32 overflow-hidden"
    >
      {/* Blueprint Background */}
      <div className="absolute inset-0 blueprint-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Form */}
          <div ref={formRef}>
            <span className="font-handwritten text-2xl block mb-2" style={{ color: 'var(--mumo-accent)' }}>
              Get Started
            </span>
            <h2
              className="font-display font-bold text-navy leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Request a Quote
            </h2>
            <div className="mt-2 w-20 h-1 rounded-full" style={{ backgroundColor: 'var(--mumo-accent)' }} />
            <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-md">
              Tell us what you're shipping. We'll reply with route options, 
              rates, and timing—usually within a few hours.
            </p>

            {isSubmitted ? (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-green-800 text-xl mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out. Our team will review your request 
                  and get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="mt-8 space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden">
                  <input name="bot-field" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+254..."
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode</label>
                    <select
                      name="mode"
                      value={formState.mode}
                      onChange={handleChange}
                      className="w-full"
                    >
                      {modes.map((mode) => (
                        <option key={mode.value} value={mode.value}>
                          {mode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Origin</label>
                    <input
                      type="text"
                      name="origin"
                      value={formState.origin}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formState.destination}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cargo Details</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe your cargo: type, weight, dimensions, special requirements..."
                    className="w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mumo-btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Quote Request
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  We keep your data confidential. Read our Privacy Policy.
                </p>
              </form>
            )}
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="hidden lg:block">
            <div className="sticky top-32 rounded-2xl overflow-hidden card-shadow aspect-[3/4]">
              <img
                src="/images/quote-image.jpg"
                alt="Logistics professional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white font-display font-semibold text-xl mb-2">
                  Need Help?
                </p>
                <p className="text-white/80 text-sm mb-4">
                  Our team is ready to assist you with your logistics needs.
                </p>
                <div className="flex flex-col gap-2 text-white/90 text-sm">
                  <a href="tel:+254702399319" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">📞</span>
                    0702 399 319
                  </a>
                  <a href="tel:+254701086267" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">📞</span>
                    0701 086 267
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
