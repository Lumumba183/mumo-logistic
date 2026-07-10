import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Using a generic WhatsApp link format - client can update with their number
  const whatsappNumber = '254702399319';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  );
}
