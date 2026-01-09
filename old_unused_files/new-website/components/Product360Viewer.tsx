'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Product360ViewerProps {
  productName: string;
  totalFrames?: number;
  productLine: string;
}

export default function Product360Viewer({
  productName,
  totalFrames = 36,
  productLine,
}: Product360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-180, 180]);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoRotating, totalFrames]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX.current;
    const newFrame = Math.floor((deltaX / 10) % totalFrames);
    setCurrentFrame((prev) => (prev + newFrame + totalFrames) % totalFrames);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const newFrame = Math.floor((deltaX / 10) % totalFrames);
    setCurrentFrame((prev) => (prev + newFrame + totalFrames) % totalFrames);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const productLineColors: Record<string, string> = {
    klassisch: '#64748b',
    praktisch: '#0ea5e9',
    premium: '#f59e0b',
    exclusiv: '#d97706',
  };

  const rotation = (currentFrame / totalFrames) * 360;

  return (
    <div className="space-y-6">
      {/* 360 Viewer Container */}
      <motion.div
        ref={containerRef}
        className="relative neomorph rounded-2xl overflow-hidden aspect-video cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        whileHover={{ scale: zoom === 1 ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${productLineColors[productLine]}20, transparent 70%)`,
          }}
        />

        {/* 3D Product Visualization (simulated) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <motion.div
            className="relative w-3/4 h-3/4"
            style={{ rotateY }}
            animate={{ rotateY: rotation }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {/* Main Product Shape */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${productLineColors[productLine]}40, ${productLineColors[productLine]}80)`,
                boxShadow: `0 20px 60px ${productLineColors[productLine]}40`,
              }}
            >
              {/* Surface details */}
              <div className="absolute inset-4 rounded-2xl glass-dark opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-xl glass opacity-20" />
            </div>

            {/* Highlights */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/30 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* 360° Badge */}
        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full flex items-center gap-2">
          <span className="text-primary-400 text-xl">🔄</span>
          <span className="font-semibold">360° Ansicht</span>
        </div>

        {/* Auto-rotate indicator */}
        {isAutoRotating && (
          <motion.div
            className="absolute top-4 right-4 glass px-4 py-2 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-sm text-gray-400">↻ Auto-Rotation</span>
          </motion.div>
        )}

        {/* Frame counter */}
        <div className="absolute bottom-4 left-4 glass-dark px-4 py-2 rounded-full">
          <span className="text-sm font-mono">
            {currentFrame + 1} / {totalFrames}
          </span>
        </div>

        {/* Instructions Overlay */}
        {!isDragging && isAutoRotating && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="glass-dark px-6 py-4 rounded-2xl text-center">
              <p className="text-sm mb-2">👆 Ziehen zum Drehen</p>
              <p className="text-xs text-gray-400">Oder warten Sie auf Auto-Rotation</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Zoom Controls */}
        <div className="glass-dark rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-3">Zoom</p>
          <div className="flex items-center gap-3">
            <motion.button
              className="w-10 h-10 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center transition-colors"
              onClick={() => setZoom(Math.max(1, zoom - 0.2))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              −
            </motion.button>
            <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500"
                style={{ width: `${(zoom - 1) * 100}%` }}
              />
            </div>
            <motion.button
              className="w-10 h-10 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center transition-colors"
              onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Rotation Controls */}
        <div className="glass-dark rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-3">Rotation</p>
          <div className="flex gap-2">
            <motion.button
              className="flex-1 bg-dark-700 hover:bg-dark-600 py-2 px-4 rounded-lg transition-colors"
              onClick={() => setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Links
            </motion.button>
            <motion.button
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                isAutoRotating
                  ? 'bg-primary-600 hover:bg-primary-500'
                  : 'bg-dark-700 hover:bg-dark-600'
              }`}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoRotating ? '⏸ Stopp' : '▶ Auto'}
            </motion.button>
            <motion.button
              className="flex-1 bg-dark-700 hover:bg-dark-600 py-2 px-4 rounded-lg transition-colors"
              onClick={() => setCurrentFrame((prev) => (prev + 1) % totalFrames)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rechts →
            </motion.button>
          </div>
        </div>

        {/* Quick Views */}
        <div className="glass-dark rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-3">Schnellansicht</p>
          <div className="grid grid-cols-4 gap-2">
            {[0, 9, 18, 27].map((frame) => (
              <motion.button
                key={frame}
                className={`aspect-square rounded-lg transition-all ${
                  currentFrame === frame
                    ? 'bg-primary-600'
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
                onClick={() => {
                  setCurrentFrame(frame);
                  setIsAutoRotating(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xs">{frame * 10}°</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🔍', label: 'Detailansicht', value: 'HD Qualität' },
          { icon: '🎨', label: 'Material', value: 'Premium Stoff' },
          { icon: '📏', label: 'Passform', value: 'Perfekt' },
          { icon: '💎', label: 'Verarbeitung', value: 'Hochwertig' },
        ].map((detail, idx) => (
          <motion.div
            key={idx}
            className="neomorph-inset rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-2xl mb-2">{detail.icon}</div>
            <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
            <p className="font-semibold text-sm">{detail.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
