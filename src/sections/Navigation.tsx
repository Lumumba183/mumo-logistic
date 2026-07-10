import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="bg-navy text-white py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <a href="mailto:mumofreightlogistics@gmail.com" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">mumofreightlogistics@gmail.com</span>
            </a>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+254702399319" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                <Phone className="w-3.5 h-3.5" /><span>0702 399 319</span>
              </a>
              <a href="tel:+254701086267" className="hidden sm:flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                <Phone className="w-3.5 h-3.5" /><span>0701 086 267</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`fixed left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg' : 'top-10 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/images/mumofreight-logo.jpg" alt="MumoFreight Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow" />
              <div className="hidden sm:block">
                <span className={`font-display font-bold text-lg lg:text-xl transition-colors ${isScrolled ? 'text-navy' : 'text-white'}`}>MumoFreight</span>
                <span className={`block text-[10px] lg:text-xs font-medium tracking-wider uppercase transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>Logistics Consultants</span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className={`font-medium text-sm transition-colors hover:text-accent ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>{link.label}</button>
              ))}
            </div>

            <div className="hidden lg:block">
              <button onClick={() => scrollTo('#quote')} className="mumo-btn text-sm">Get a Quote</button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <button className="absolute top-4 right-4 p-2" onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6 text-navy" /></button>
            <div className="mt-12 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left text-navy font-medium text-lg py-2 border-b border-gray-100 hover:text-accent transition-colors">{link.label}</button>
              ))}
              <button onClick={() => scrollTo('#quote')} className="mumo-btn mt-4">Get a Quote</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
