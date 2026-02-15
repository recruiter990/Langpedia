'use client';

export default function BusinessFooter() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg text-text mb-4">Contatti</h3>
            <p className="text-text-light mb-2">
              <strong>Email:</strong>{' '}
              <a 
                href="mailto:xerosofro@outlook.com" 
                className="text-primary hover:underline"
              >
                xerosofro@outlook.com
              </a>
            </p>
            <p className="text-text-light">
              <strong>Orari:</strong> Lun-Ven 9:00-18:00
            </p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text mb-4">Servizi</h3>
            <ul className="space-y-2 text-text-light">
              <li><a href="#services" className="hover:text-primary transition-colors">SEO & Posizionamento</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Social Media Management</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Email Marketing</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Business Consulting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text mb-4">Seguici</h3>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/393444104395" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Business Services. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}







