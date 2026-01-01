'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CarModel() {
  const meshRef = useRef<any>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Simplified car shape - will be replaced with actual 3D model later */}
      <boxGeometry args={[4, 1.5, 2]} />
      <meshStandardMaterial
        color="#0ea5e9"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
      {/* Car windows */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </mesh>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent opacity-50 animate-pulse" />

      {/* Parallax background layers */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"
      />

      {/* 3D Car Model */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[8, 3, 8]} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
          <Environment preset="city" />
          <CarModel />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="container-custom text-center">
          {/* Glassmorphism card */}
          <div className="glass-dark mx-auto max-w-4xl rounded-3xl p-8 md:p-12 lg:p-16">
            <h1 className="hero-title title-xl gradient-text mb-6">
              Premium Autoabdeckungen
            </h1>

            <p className="hero-subtitle mx-auto mb-8 max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-300 font-light">
              Erleben Sie Ihre perfekte Autoabdeckung in 3D. Konfigurieren Sie online,
              sehen Sie das Ergebnis in 360° und schützen Sie Ihr Fahrzeug mit Premium-Qualität.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="#konfigurator"
                className="btn-3d bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Jetzt konfigurieren
              </motion.a>

              <motion.a
                href="#produkte"
                className="glass hover:glass-dark text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Produkte ansehen
              </motion.a>
            </div>

            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🎨', title: '3D Konfigurator', desc: 'Visualisieren Sie Ihre Abdeckung' },
                { icon: '🔄', title: '360° Ansicht', desc: 'Aus allen Blickwinkeln' },
                { icon: '⭐', title: 'Premium Qualität', desc: 'Made in Germany' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="neomorph rounded-2xl p-6 card-hover"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-primary-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
