import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowUp } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const ref = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [miniForm, setMiniForm] = useState({ name: '', email: '', message: '' });
  const [miniSubmitted, setMiniSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contactRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(formRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleMiniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(miniForm).forEach(([k, v]) => fd.append(k, v));
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd as any).toString() });
      setMiniSubmitted(true);
    } catch (err) { console.error(err); }
  };

  const inputCls = "w-full bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-blue-400";

  return (
    <section ref={ref} id="contact" className="relative w-full section-navy text-white overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-15" />
      <div className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div ref={contactRef}>
              <span className="font-handwritten text-2xl text-blue-400 block mb-2">Get In Touch</span>
              <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Contact Us</h2>
              <p className="mt-4 text-white/70 text-base leading-relaxed max-w-md">
                Have a question about a shipment? We're here to help. Reach out to our team today.
              </p>
              <div className="mt-8 space-y-4">
                <a href="mailto:mumofreightlogistics@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}><Mail className="w-5 h-5 text-blue-400" /></div>
                  <div><p className="text-xs text-white/50 uppercase tracking-wider">Email</p><p className="font-medium group-hover:text-blue-300 transition-colors">mumofreightlogistics@gmail.com</p></div>
                </a>
                <a href="tel:+254702399319" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}><Phone className="w-5 h-5 text-blue-400" /></div>
                  <div><p className="text-xs text-white/50 uppercase tracking-wider">Maxwell Mumo</p><p className="font-medium group-hover:text-blue-300 transition-colors">0702 399 319</p></div>
                </a>
                <a href="tel:+254701086267" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}><Phone className="w-5 h-5 text-blue-400" /></div>
                  <div><p className="text-xs text-white/50 uppercase tracking-wider">Boniface Kakundi</p><p className="font-medium group-hover:text-blue-300 transition-colors">0701 086 267</p></div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,108,255,0.2)' }}><MapPin className="w-5 h-5 text-blue-400" /></div>
                  <div><p className="text-xs text-white/50 uppercase tracking-wider">Location</p><p className="font-medium">Nairobi, Kenya</p></div>
                </div>
              </div>
            </div>
            <div ref={formRef}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                <h3 className="font-display font-semibold text-white text-xl mb-1">Send a Message</h3>
                <p className="text-white/60 text-sm mb-6">Quick message? Fill this out and we'll respond promptly.</p>
                {miniSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-green-300 font-medium">Message sent successfully!</p>
                  </div>
                ) : (
                  <form onSubmit={handleMiniSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Your name" required value={miniForm.name} onChange={(e) => setMiniForm({ ...miniForm, name: e.target.value })} className={inputCls} />
                    <input type="email" name="email" placeholder="Your email" required value={miniForm.email} onChange={(e) => setMiniForm({ ...miniForm, email: e.target.value })} className={inputCls} />
                    <textarea name="message" rows={4} placeholder="Your message..." required value={miniForm.message} onChange={(e) => setMiniForm({ ...miniForm, message: e.target.value })} className={`${inputCls} resize-none`} />
                    <button type="submit" className="mumo-btn w-full">Send Message <Send className="ml-2 w-4 h-4" /></button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/mumofreight-logo.jpg" alt="MumoFreight Logo" className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <p className="font-display font-semibold text-white">MumoFreight</p>
                <p className="text-xs text-white/50">Logistics Consultants Limited</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#quote" className="hover:text-white transition-colors">Get Quote</a>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Scroll to top"><ArrowUp className="w-5 h-5" /></button>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>&copy; MumoFreight Logistics Consultants Limited. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
