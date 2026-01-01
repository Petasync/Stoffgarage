'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  productLine: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  carType: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Michael Schmidt',
    productLine: 'premium',
    rating: 5,
    date: '2025-11-15',
    verified: true,
    title: 'Absolut empfehlenswert!',
    content: 'Die Premium-Abdeckung hat alle Erwartungen übertroffen. Perfekte Passform für meinen BMW, wasserdicht und sehr hochwertig verarbeitet. Nach 6 Monaten immer noch wie neu!',
    carType: 'BMW 5er',
    avatar: '👨',
  },
  {
    id: 2,
    name: 'Sarah Müller',
    productLine: 'exclusiv',
    rating: 5,
    date: '2025-11-10',
    verified: true,
    title: 'Luxus pur - jeden Cent wert',
    content: 'Die Exclusiv-Linie ist einfach perfekt. Maßanfertigung passt millimetergenau auf meinen Mercedes. Das integrierte Alarmsystem gibt mir ein sicheres Gefühl. Top Qualität!',
    carType: 'Mercedes C-Klasse',
    avatar: '👩',
  },
  {
    id: 3,
    name: 'Thomas Weber',
    productLine: 'praktisch',
    rating: 4,
    date: '2025-11-05',
    verified: true,
    title: 'Sehr gutes Preis-Leistungs-Verhältnis',
    content: 'Nutze die Praktisch-Abdeckung seit 3 Monaten. Hält Wind und Wetter stand, UV-Schutz funktioniert einwandfrei. Ein Stern Abzug, weil die Befestigung etwas fummelig ist.',
    carType: 'VW Golf',
    avatar: '👨‍🦰',
  },
  {
    id: 4,
    name: 'Lisa Hoffmann',
    productLine: 'premium',
    rating: 5,
    date: '2025-10-28',
    verified: true,
    title: 'Hagelschutz hat sich bewährt',
    content: 'Letzten Monat hatten wir starken Hagel. Die Premium-Abdeckung hat mein Auto perfekt geschützt - kein einziger Schaden! Das Softfutter verhindert Kratzer. Absolute Kaufempfehlung!',
    carType: 'Audi A4',
    avatar: '👩‍🦱',
  },
  {
    id: 5,
    name: 'Jan Becker',
    productLine: 'klassisch',
    rating: 4,
    date: '2025-10-20',
    verified: true,
    title: 'Solider Grundschutz',
    content: 'Für den Preis absolut okay. Schützt mein Auto zuverlässig vor Staub und leichtem Regen. Für Outdoor-Parken im Winter würde ich aber eher Premium empfehlen.',
    carType: 'Opel Corsa',
    avatar: '👨‍🦲',
  },
  {
    id: 6,
    name: 'Anna Klein',
    productLine: 'praktisch',
    rating: 5,
    date: '2025-10-12',
    verified: true,
    title: 'Perfekt für Outdoor-Parken',
    content: 'Mein Auto steht draußen unter Bäumen. Die Praktisch-Abdeckung hält alles ab - Vogelkot, Blätter, Regen. Die reflektierenden Elemente sind nachts sehr praktisch!',
    carType: 'Ford Focus',
    avatar: '👩‍🦳',
  },
  {
    id: 7,
    name: 'Markus Schneider',
    productLine: 'exclusiv',
    rating: 5,
    date: '2025-10-05',
    verified: true,
    title: 'Premium-Qualität für Liebhaberfahrzeuge',
    content: 'Für meinen Porsche nur das Beste. Die Exclusiv-Abdeckung ist perfekt verarbeitet, das Luxus-Innenfutter schützt den Lack optimal. Die 10 Jahre Garantie überzeugt!',
    carType: 'Porsche 911',
    avatar: '👨‍💼',
  },
  {
    id: 8,
    name: 'Julia Wagner',
    productLine: 'premium',
    rating: 5,
    date: '2025-09-28',
    verified: true,
    title: 'Atmungsaktiv und schimmelfrei',
    content: 'Nach einem Jahr Nutzung immer noch top! Kein Schimmel, keine Feuchtigkeit unter der Abdeckung. Die Atmungsaktivität funktioniert wirklich. Sehr zufrieden!',
    carType: 'Tesla Model 3',
    avatar: '👩‍💻',
  },
];

const productLineColors: Record<string, string> = {
  klassisch: '#64748b',
  praktisch: '#0ea5e9',
  premium: '#f59e0b',
  exclusiv: '#d97706',
};

export default function Reviews() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReviews =
    selectedFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.productLine === selectedFilter);

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div>
      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Average Rating */}
        <div className="neomorph rounded-2xl p-8 text-center">
          <div className="text-6xl font-bold gradient-text mb-2">{averageRating}</div>
          <div className="flex justify-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= Math.round(Number(averageRating))
                    ? 'text-gold-500'
                    : 'text-gray-600'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-400">Durchschnitt aus {reviews.length} Bewertungen</p>
        </div>

        {/* Total Reviews */}
        <div className="neomorph rounded-2xl p-8 text-center">
          <div className="text-6xl font-bold gradient-text mb-2">{reviews.length}</div>
          <p className="text-gray-400 mb-3">Kundenbewertungen</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-400">
            <span>✓</span>
            <span>100% verifizierte Käufe</span>
          </div>
        </div>

        {/* Recommendation Rate */}
        <div className="neomorph rounded-2xl p-8 text-center">
          <div className="text-6xl font-bold gradient-text mb-2">98%</div>
          <p className="text-gray-400 mb-3">Weiterempfehlungsrate</p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary-400">
            <span>👍</span>
            <span>Würden wieder kaufen</span>
          </div>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={() => setSelectedFilter('all')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            selectedFilter === 'all'
              ? 'bg-primary-600 text-white'
              : 'glass-dark hover:bg-white/5'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Alle ({reviews.length})
        </motion.button>
        {['klassisch', 'praktisch', 'premium', 'exclusiv'].map((line) => {
          const count = reviews.filter((r) => r.productLine === line).length;
          return (
            <motion.button
              key={line}
              onClick={() => setSelectedFilter(line)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedFilter === line
                  ? 'text-white'
                  : 'glass-dark hover:bg-white/5'
              }`}
              style={{
                backgroundColor:
                  selectedFilter === line ? productLineColors[line] : undefined,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {line.charAt(0).toUpperCase() + line.slice(1)} ({count})
            </motion.button>
          );
        })}
      </motion.div>

      {/* Reviews Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFilter}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="neomorph rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{review.name}</p>
                      {review.verified && (
                        <span
                          className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full"
                          title="Verifizierter Kauf"
                        >
                          ✓ Verifiziert
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{review.carType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= review.rating ? 'text-gold-500' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </div>

              {/* Product Line Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{
                  backgroundColor: `${productLineColors[review.productLine]}20`,
                  color: productLineColors[review.productLine],
                }}
              >
                {review.productLine.charAt(0).toUpperCase() +
                  review.productLine.slice(1)}
              </div>

              {/* Review Content */}
              <h4 className="font-bold text-lg mb-2">{review.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Add Review CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="neomorph rounded-2xl p-8 inline-block">
          <p className="text-gray-400 mb-4">Haben Sie bereits eine Stoffgarage-Abdeckung?</p>
          <motion.button
            className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jetzt bewerten
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
