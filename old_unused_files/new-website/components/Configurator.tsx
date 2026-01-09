'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const CarScene3D = dynamic(() => import('./CarScene3D'), { ssr: false });

const carTypes = [
  { id: 'sedan', name: 'Limousine', icon: '🚗', priceMultiplier: 1.0 },
  { id: 'suv', name: 'SUV', icon: '🚙', priceMultiplier: 1.3 },
  { id: 'sportwagen', name: 'Sportwagen', icon: '🏎️', priceMultiplier: 1.2 },
  { id: 'kombi', name: 'Kombi', icon: '🚐', priceMultiplier: 1.25 },
  { id: 'kleinwagen', name: 'Kleinwagen', icon: '🚕', priceMultiplier: 0.8 },
];

const productLines = [
  { id: 'klassisch', name: 'Klassisch', basePrice: 89, color: '#64748b', features: ['Wasserabweisend', 'UV-beständig'] },
  { id: 'praktisch', name: 'Praktisch', basePrice: 129, color: '#0ea5e9', features: ['Wasserdicht', 'Extra UV-Schutz'] },
  { id: 'premium', name: 'Premium', basePrice: 199, color: '#f59e0b', features: ['Hagelschutz', 'Premium-Softfutter'] },
  { id: 'exclusiv', name: 'Exclusiv', basePrice: 299, color: '#d97706', features: ['Maßanfertigung', 'Alarm-System'] },
];

const coverColors = [
  { id: 'silber', name: 'Silber', hex: '#c0c0c0' },
  { id: 'schwarz', name: 'Schwarz', hex: '#1a1a1a' },
  { id: 'blau', name: 'Blau', hex: '#0ea5e9' },
  { id: 'grau', name: 'Grau', hex: '#64748b' },
  { id: 'gruen', name: 'Grün', hex: '#10b981' },
  { id: 'rot', name: 'Rot', hex: '#ef4444' },
];

const carSizes = [
  { id: 'xs', name: 'XS (bis 3.5m)', priceMultiplier: 0.8 },
  { id: 's', name: 'S (3.5-4.0m)', priceMultiplier: 0.9 },
  { id: 'm', name: 'M (4.0-4.5m)', priceMultiplier: 1.0 },
  { id: 'l', name: 'L (4.5-5.0m)', priceMultiplier: 1.15 },
  { id: 'xl', name: 'XL (über 5.0m)', priceMultiplier: 1.3 },
];

export default function Configurator() {
  const [selectedCarType, setSelectedCarType] = useState('sedan');
  const [selectedProductLine, setSelectedProductLine] = useState('praktisch');
  const [selectedColor, setSelectedColor] = useState('blau');
  const [selectedSize, setSelectedSize] = useState('m');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const currentProductLine = productLines.find((p) => p.id === selectedProductLine)!;
  const currentCarType = carTypes.find((c) => c.id === selectedCarType)!;
  const currentSize = carSizes.find((s) => s.id === selectedSize)!;
  const currentColor = coverColors.find((c) => c.id === selectedColor)!;

  const totalPrice = useMemo(() => {
    return Math.round(
      currentProductLine.basePrice *
        currentCarType.priceMultiplier *
        currentSize.priceMultiplier
    );
  }, [currentProductLine, currentCarType, currentSize]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* 3D Preview */}
      <motion.div
        className="order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="sticky top-24">
          <h3 className="text-2xl font-bold mb-4 gradient-text">Live-Vorschau</h3>
          <CarScene3D
            carType={selectedCarType}
            coverColor={currentColor.hex}
            productLine={selectedProductLine}
          />
          <div className="mt-4 glass-dark rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Ihre Konfiguration</p>
                <p className="text-lg font-bold">
                  {currentCarType.name} · {currentProductLine.name}
                </p>
                <p className="text-sm text-gray-400">
                  {currentSize.name} · {currentColor.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Preis</p>
                <p className="text-3xl font-bold gradient-text">{totalPrice}€</p>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {showPriceBreakdown ? 'Verbergen' : 'Details anzeigen'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showPriceBreakdown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-white/10 text-sm"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Produktlinie:</span>
                    <span>{currentProductLine.basePrice}€</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Fahrzeugtyp Faktor:</span>
                    <span>×{currentCarType.priceMultiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Größe Faktor:</span>
                    <span>×{currentSize.priceMultiplier}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Configuration Controls */}
      <motion.div
        className="order-1 lg:order-2 space-y-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Line Selection */}
        <div>
          <h3 className="text-xl font-bold mb-4">1. Wählen Sie Ihre Produktlinie</h3>
          <div className="grid grid-cols-2 gap-4">
            {productLines.map((line) => (
              <motion.button
                key={line.id}
                onClick={() => setSelectedProductLine(line.id)}
                className={`neomorph rounded-xl p-4 transition-all duration-300 ${
                  selectedProductLine === line.id
                    ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/50'
                    : 'hover:scale-105'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderLeft: selectedProductLine === line.id ? `4px solid ${line.color}` : 'none',
                }}
              >
                <div className="text-left">
                  <p className="font-bold mb-1" style={{ color: line.color }}>
                    {line.name}
                  </p>
                  <p className="text-2xl font-bold mb-2">ab {line.basePrice}€</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {line.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Car Type Selection */}
        <div>
          <h3 className="text-xl font-bold mb-4">2. Wählen Sie Ihren Fahrzeugtyp</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {carTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedCarType(type.id)}
                className={`neomorph rounded-xl p-4 text-center transition-all duration-300 ${
                  selectedCarType === type.id
                    ? 'ring-2 ring-primary-500'
                    : 'hover:scale-105'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <p className="text-xs font-semibold">{type.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-xl font-bold mb-4">3. Wählen Sie die Fahrzeuggröße</h3>
          <div className="space-y-2">
            {carSizes.map((size) => (
              <motion.button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`w-full glass-dark rounded-xl p-4 text-left transition-all duration-300 flex items-center justify-between ${
                  selectedSize === size.id
                    ? 'ring-2 ring-primary-500 bg-primary-500/10'
                    : 'hover:bg-white/5'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-semibold">{size.name}</span>
                {selectedSize === size.id && (
                  <span className="text-primary-400">✓</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-xl font-bold mb-4">4. Wählen Sie die Farbe</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {coverColors.map((color) => (
              <motion.button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`neomorph-inset rounded-xl p-3 transition-all duration-300 ${
                  selectedColor === color.id
                    ? 'ring-2 ring-primary-500'
                    : 'hover:scale-105'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-full aspect-square rounded-lg mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-xs font-semibold text-center">{color.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="w-full btn-3d bg-primary-600 hover:bg-primary-500 text-white font-bold py-6 px-8 rounded-xl text-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span>In den Warenkorb</span>
              <span className="text-2xl font-bold">{totalPrice}€</span>
            </div>
          </motion.button>

          <p className="text-center text-sm text-gray-400 mt-4">
            ✓ Kostenloser Versand ab 100€ · ✓ 30 Tage Rückgaberecht
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
