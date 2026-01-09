'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = {
  produkte: [
    { label: 'Klassisch', href: '#klassisch' },
    { label: 'Praktisch', href: '#praktisch' },
    { label: 'Premium', href: '#premium' },
    { label: 'Exclusiv', href: '#exclusiv' },
  ],
  service: [
    { label: 'Konfigurator', href: '#konfigurator' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Versand', href: '#versand' },
    { label: 'Garantie', href: '#garantie' },
  ],
  unternehmen: [
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Kontakt', href: '#kontakt' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative container-custom py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="text-3xl font-bold gradient-text mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Stoffgarage
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium Autoabdeckungen mit innovativer 3D-Technologie. Schützen Sie Ihr
              Fahrzeug mit Stil und Qualität.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '▶️', label: 'YouTube', href: '#' },
              ].map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 glass hover:glass-dark rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIdx * 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="neomorph rounded-2xl p-6 md:p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Newsletter abonnieren
              </h3>
              <p className="text-gray-400">
                Erhalten Sie exklusive Angebote und Neuigkeiten direkt in Ihr Postfach.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Ihre E-Mail Adresse"
                className="flex-1 bg-dark-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <motion.button
                className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Anmelden
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Stoffgarage. Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link href="/agb" className="hover:text-primary-400 transition-colors">
                AGB
              </Link>
              <Link
                href="/widerruf"
                className="hover:text-primary-400 transition-colors"
              >
                Widerrufsrecht
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary-400 transition-colors"
              >
                Cookie-Einstellungen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
