'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  image?: string;
  color: string;
  index: number;
}

export default function ProductCard({
  title,
  description,
  price,
  features,
  color,
  index,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card */}
      <motion.div
        className="neomorph rounded-3xl overflow-hidden h-full"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image placeholder with gradient */}
        <div
          className="relative h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"
            animate={{ opacity: isHovered ? 0.5 : 0.8 }}
            transition={{ duration: 0.3 }}
          />

          {/* 360° Badge */}
          <motion.div
            className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-sm font-semibold"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            🔄 360° Ansicht
          </motion.div>

          {/* Product visualization placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-48 h-32 rounded-2xl opacity-30"
              style={{ backgroundColor: color }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotateY: isHovered ? 15 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color }}>
            {title}
          </h3>

          <p className="text-gray-400 mb-4">{description}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold gradient-text">{price}</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <span className="text-primary-400 mt-1">✓</span>
                <span className="text-gray-300 text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Konfigurieren
            </motion.button>

            <motion.button
              className="glass hover:glass-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Details
            </motion.button>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: isHovered ? `0 0 40px ${color}40` : 'none',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
