import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ServicesOverview from './sections/ServicesOverview';
import ServiceDetails from './sections/ServiceDetails';
import Stats from './sections/Stats';
import WhyChooseUs from './sections/WhyChooseUs';
import HowItWorks from './sections/HowItWorks';
import QuoteForm from './sections/QuoteForm';
import GlobalReach from './sections/GlobalReach';
import ContactFooter from './sections/ContactFooter';
import WhatsAppButton from './sections/WhatsAppButton';

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <ServicesOverview />
        <ServiceDetails />
        <WhyChooseUs />
        <HowItWorks />
        <QuoteForm />
        <GlobalReach />
        <ContactFooter />
      </main>
      <WhatsAppButton />
    </div>
  );
}
