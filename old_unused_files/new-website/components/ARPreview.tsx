'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ARPreview() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('praktisch');
  const [showQR, setShowQR] = useState(false);

  const products = [
    { id: 'klassisch', name: 'Klassisch', color: '#64748b' },
    { id: 'praktisch', name: 'Praktisch', color: '#0ea5e9' },
    { id: 'premium', name: 'Premium', color: '#f59e0b' },
    { id: 'exclusiv', name: 'Exclusiv', color: '#d97706' },
  ];

  const handleStartAR = () => {
    // In production, this would launch the actual AR experience
    setIsARActive(true);
  };

  return (
    <div className="space-y-8">
      {/* AR Preview Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AR View */}
        <motion.div
          className="relative neomorph rounded-2xl overflow-hidden aspect-video"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* Camera Feed Simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900">
            {/* Grid overlay to simulate AR view */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-primary-500/30" />
                ))}
              </div>
            </div>

            {/* Simulated car with cover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isARActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative">
                {/* Car silhouette */}
                <div className="w-64 h-32 rounded-3xl bg-dark-700/50 backdrop-blur-sm border border-primary-500/50" />

                {/* AR Cover overlay */}
                <AnimatePresence>
                  {isARActive && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        backgroundColor:
                          products.find((p) => p.id === selectedProduct)?.color + '40',
                        border: `2px solid ${
                          products.find((p) => p.id === selectedProduct)?.color
                        }`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* AR UI Elements */}
            {isARActive && (
              <>
                {/* Corner markers */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                  <motion.div
                    key={corner}
                    className={`absolute w-8 h-8 border-2 border-primary-400 ${
                      corner.includes('top') ? 'top-4' : 'bottom-4'
                    } ${corner.includes('left') ? 'left-4' : 'right-4'} ${
                      corner.includes('top') && corner.includes('left')
                        ? 'border-b-0 border-r-0'
                        : ''
                    } ${
                      corner.includes('top') && corner.includes('right')
                        ? 'border-b-0 border-l-0'
                        : ''
                    } ${
                      corner.includes('bottom') && corner.includes('left')
                        ? 'border-t-0 border-r-0'
                        : ''
                    } ${
                      corner.includes('bottom') && corner.includes('right')
                        ? 'border-t-0 border-l-0'
                        : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                ))}

                {/* AR Info Display */}
                <motion.div
                  className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-sm font-semibold">
                    AR-Vorschau: {products.find((p) => p.id === selectedProduct)?.name}
                  </span>
                </motion.div>

                {/* Distance indicator */}
                <motion.div
                  className="absolute bottom-4 left-4 glass-dark px-3 py-2 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-xs text-gray-400">Abstand</p>
                  <p className="text-sm font-bold">2.5m</p>
                </motion.div>
              </>
            )}

            {/* AR Status */}
            <div className="absolute top-4 right-4">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                  isARActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isARActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                  }`}
                />
                <span className="text-xs font-semibold">
                  {isARActive ? 'AR Aktiv' : 'AR Bereit'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AR Controls */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              Augmented Reality Vorschau
            </h3>
            <p className="text-gray-400">
              Sehen Sie, wie die Autoabdeckung auf Ihrem Fahrzeug aussieht – direkt über Ihre
              Smartphone-Kamera.
            </p>
          </div>

          {/* Product Selection */}
          <div>
            <p className="text-sm text-gray-400 mb-3">Produktlinie wählen:</p>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <motion.button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product.id);
                    if (isARActive) {
                      // Restart AR animation
                      setIsARActive(false);
                      setTimeout(() => setIsARActive(true), 100);
                    }
                  }}
                  className={`neomorph rounded-xl p-4 transition-all ${
                    selectedProduct === product.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderLeft:
                      selectedProduct === product.id ? `4px solid ${product.color}` : 'none',
                  }}
                >
                  <div
                    className="w-full h-12 rounded-lg mb-2"
                    style={{ backgroundColor: product.color + '40' }}
                  />
                  <p className="font-semibold text-sm">{product.name}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* AR Actions */}
          <div className="space-y-3">
            <motion.button
              onClick={handleStartAR}
              className={`w-full btn-3d font-bold py-4 px-6 rounded-xl transition-all ${
                isARActive
                  ? 'bg-red-600 hover:bg-red-500'
                  : 'bg-primary-600 hover:bg-primary-500'
              } text-white`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isARActive ? '⏹ AR Stoppen' : '📱 AR Starten'}
            </motion.button>

            <motion.button
              onClick={() => setShowQR(!showQR)}
              className="w-full glass-dark hover:bg-white/5 font-semibold py-4 px-6 rounded-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📲 QR-Code für Mobile
            </motion.button>
          </div>

          {/* Features List */}
          <div className="neomorph-inset rounded-xl p-6">
            <p className="font-bold mb-3">AR Features:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                'Realistische 3D-Darstellung',
                'Echtzeit-Vorschau am eigenen Auto',
                'Verschiedene Farben testen',
                'Passform prüfen',
                'Screenshot-Funktion',
              ].map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-primary-400">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="neomorph rounded-2xl p-8 max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text text-center">
                Mobile AR-Erlebnis
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Scannen Sie den QR-Code mit Ihrem Smartphone, um die AR-Funktion zu nutzen.
              </p>

              {/* QR Code Placeholder */}
              <div className="bg-white p-6 rounded-xl mb-6">
                <div className="aspect-square bg-gradient-to-br from-dark-900 to-dark-700 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? 'bg-dark-900' : 'bg-white'
                        } rounded-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <p>📱 iOS: Kamera-App öffnen</p>
                <p>📱 Android: Google Lens verwenden</p>
              </div>

              <motion.button
                onClick={() => setShowQR(false)}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schließen
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Device Compatibility */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { icon: '📱', title: 'iOS & Android', desc: 'Kompatibel mit allen modernen Smartphones' },
          { icon: '🌐', title: 'Browser-basiert', desc: 'Keine App-Installation nötig' },
          { icon: '⚡', title: 'Schnell & Einfach', desc: 'AR-Vorschau in Sekunden starten' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="neomorph rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className="font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
