'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BusinessFooter from '@/components/BusinessFooter';

export default function BusinessPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'social-media',
      title: 'Gestione Social Media',
      icon: '📱',
      description: 'Crescita organica e coinvolgimento sui principali social network',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      bullets: [
        'Strategia content marketing',
        'Pianificazione editoriale',
        'Community management',
        'Analytics e report mensili',
      ],
    },
    {
      id: 'seo',
      title: 'SEO & Posizionamento Google',
      icon: '🔍',
      description: 'Porta il tuo business in prima pagina su Google e attira clienti che ti cercano attivamente ogni giorno',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      bullets: [
        'Ottimizzazione SEO locale',
        'Keyword research settoriale',
        'Google My Business avanzato',
        'Link building strategico',
        'Content SEO (blog ottimizzati)',
        'Report mensile posizionamento',
      ],
      badge: 'Crescita Organica',
    },
    {
      id: 'cold-email',
      title: 'Cold Email Marketing',
      icon: '📧',
      description: 'Campagne email efficaci per acquisire nuovi clienti',
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&h=600&fit=crop',
      bullets: [
        'Email personalizzate',
        'Automazione campagne',
        'A/B testing',
        'Analytics dettagliati',
      ],
    },
    {
      id: 'delivery',
      title: 'Setup Delivery Online',
      icon: '🚚',
      description: 'Configurazione completa piattaforme delivery per ristoranti',
      image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&h=600&fit=crop',
      bullets: [
        'Integrazione Just Eat, Deliveroo, Uber Eats',
        'Gestione ordini centralizzata',
        'Ottimizzazione menu',
        'Supporto tecnico',
      ],
    },
    {
      id: 'gmb',
      title: 'Google My Business',
      icon: '📍',
      description: 'Ottimizzazione presenza locale su Google',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      bullets: [
        'Setup completo profilo',
        'Gestione recensioni',
        'Post e aggiornamenti',
        'Analytics locali',
      ],
    },
    {
      id: 'content',
      title: 'Content Creation',
      icon: '🎬',
      description: 'Contenuti professionali per i tuoi canali',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      bullets: [
        'Foto e video professionali',
        'Grafica e design',
        'Copywriting',
        'Editing video',
      ],
    },
    {
      id: 'consulting',
      title: 'Business Consulting',
      icon: '💼',
      description: 'Consulenza strategica per la crescita del tuo business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      bullets: [
        'Analisi business',
        'Strategia crescita',
        'Piano marketing',
        'Consulenza personalizzata',
      ],
    },
    {
      id: 'scraping',
      title: 'Market Data Scraping',
      icon: '📊',
      description: 'Raccolta e analisi dati di mercato',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      bullets: [
        'Web scraping professionale',
        'Analisi competitor',
        'Report dati',
        'Dashboard personalizzati',
      ],
    },
    {
      id: 'monitoring',
      title: 'Shop & Product Price Monitoring',
      icon: '💰',
      description: 'Monitoraggio prezzi e competitor',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      bullets: [
        'Tracking prezzi automatico',
        'Alert cambiamenti',
        'Analisi competitor',
        'Report settimanali',
      ],
    },
    {
      id: 'metrics',
      title: 'Business Growth Metrics',
      icon: '📈',
      description: 'Dashboard e metriche per monitorare la crescita',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      bullets: [
        'Dashboard personalizzati',
        'KPI tracking',
        'Report automatici',
        'Analisi trend',
      ],
    },
    {
      id: 'intelligence',
      title: 'Regional Market Intelligence',
      icon: '🗺️',
      description: 'Analisi e insights sul mercato regionale',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop',
      bullets: [
        'Analisi geografica',
        'Market research',
        'Competitor mapping',
        'Report regionali',
      ],
    },
  ];

  const stats = [
    { value: 15, suffix: '+', label: 'Clienti Soddisfatti' },
    { value: 180, suffix: '%', label: 'Crescita Media Vendite' },
    { value: 850, suffix: 'K+', label: 'Impressioni Social' },
    { value: 35, suffix: 'K+', label: 'Email Inviate' },
  ];

  const AnimatedCounter = ({ value, suffix, label, isVisible }: { value: number; suffix: string; label: string; isVisible: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <div>
        <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
          {count}{suffix}
        </div>
        <div className="text-white/90">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <h1 className="text-2xl font-heading font-bold text-text">Business Services</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="#services" className="text-text-light hover:text-primary transition-colors">
                Servizi
              </Link>
              <Link href="#contact" className="text-text-light hover:text-primary transition-colors">
                Contatti
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6">
          Crescita Digitale per il Tuo Business
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Risultati Misurabili
          </span>
        </h1>
        <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
          Servizi digitali professionali per far crescere il tuo business online
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Richiedi Consulenza Gratuita
          </Link>
          <Link
            href="#services"
            className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/5 transition-all"
          >
            Scopri i Servizi
          </Link>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section 
        ref={statsRef}
        className="bg-gradient-to-r from-primary to-secondary text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isVisible={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-text text-center mb-12">
          I Nostri Servizi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {service.badge && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {service.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-heading font-bold text-text mb-2">
                  {service.title}
                </h3>
                <p className="text-text-light mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start text-sm text-text-light">
                      <span className="text-primary mr-2">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`#contact?service=${service.id}`}
                  className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Scopri di più
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-text text-center mb-8">
            Strumenti Professionali Che Utilizziamo
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-4xl font-bold">Instagram</div>
            <div className="text-4xl font-bold">Meta Business</div>
            <div className="text-4xl font-bold">Google Analytics</div>
            <div className="text-4xl font-bold">Mailchimp</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-text text-center mb-8">
          Contattaci
        </h2>
        <ContactForm />
      </section>

      {/* Footer */}
      <BusinessFooter />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/393444104395?text=Ciao!%20Vorrei%20informazioni%20sui%20vostri%20servizi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 animate-pulse"
        aria-label="Contattaci su WhatsApp"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.369 1.262.59 1.694.755.712.27 1.36.232 1.871.141.571-.099 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setFormData((prev) => ({ ...prev, service: service || '' }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using EmailJS approach (you'll need to set up EmailJS)
      // For now, using a simple fetch to a serverless function
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to_email: 'xerosofro@outlook.com',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">
            Nome *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-text mb-2">
            Telefono
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-text mb-2">
            Servizio di Interesse
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, service: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Seleziona un servizio</option>
            <option value="social-media">Gestione Social Media</option>
            <option value="seo">SEO & Posizionamento Google</option>
            <option value="cold-email">Cold Email Marketing</option>
            <option value="delivery">Setup Delivery Online</option>
            <option value="gmb">Google My Business</option>
            <option value="content">Content Creation</option>
            <option value="consulting">Business Consulting</option>
            <option value="scraping">Market Data Scraping</option>
            <option value="monitoring">Shop & Product Price Monitoring</option>
            <option value="metrics">Business Growth Metrics</option>
            <option value="intelligence">Regional Market Intelligence</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-semibold text-text mb-2">
          Messaggio *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
      </button>
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          Grazie! Ti contatteremo entro 24 ore.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          Errore nell'invio. Per favore riprova o contattaci direttamente.
        </div>
      )}
    </form>
  );
}

