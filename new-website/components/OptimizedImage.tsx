'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = '16/9',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Loading skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 shimmer bg-dark-800 rounded-lg" />
      )}

      {/* Actual image */}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-dark-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <span className="text-4xl mb-2 block">📷</span>
            <p className="text-sm">Bild konnte nicht geladen werden</p>
          </div>
        </div>
      )}
    </div>
  );
}
