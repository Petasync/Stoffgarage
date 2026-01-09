'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface CarScene3DProps {
  carType: string;
  coverColor: string;
  productLine: string;
}

function Car({ carType, coverColor, productLine }: CarScene3DProps) {
  const carRef = useRef<THREE.Group>(null);
  const coverRef = useRef<THREE.Mesh>(null);

  // Different car dimensions based on type
  const carDimensions = {
    sedan: { width: 4, height: 1.4, length: 2 },
    suv: { width: 4.2, height: 1.8, length: 2.2 },
    sportwagen: { width: 3.8, height: 1.2, length: 2 },
    kombi: { width: 4.5, height: 1.5, length: 2.3 },
    kleinwagen: { width: 3.5, height: 1.3, length: 1.8 },
  };

  const dims = carDimensions[carType as keyof typeof carDimensions] || carDimensions.sedan;

  // Cover opacity based on product line
  const coverOpacity = {
    klassisch: 0.6,
    praktisch: 0.7,
    premium: 0.8,
    exclusiv: 0.9,
  };

  const opacity = coverOpacity[productLine as keyof typeof coverOpacity] || 0.7;

  return (
    <group ref={carRef}>
      {/* Car Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[dims.width, dims.height, dims.length]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Car Windows */}
      <mesh position={[0, dims.height / 3, 0]}>
        <boxGeometry args={[dims.width * 0.6, dims.height * 0.5, dims.length * 0.9]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Car Cover */}
      <mesh ref={coverRef} position={[0, dims.height / 2 + 0.2, 0]}>
        <boxGeometry args={[dims.width + 0.2, dims.height + 0.4, dims.length + 0.2]} />
        <meshStandardMaterial
          color={coverColor}
          metalness={0.3}
          roughness={0.5}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wheels */}
      {[-1, 1].map((x, i) =>
        [-0.8, 0.8].map((z, j) => (
          <mesh
            key={`wheel-${i}-${j}`}
            position={[x * (dims.width / 2 - 0.3), -dims.height / 2, z * (dims.length / 2 - 0.3)]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function CarScene3D({ carType, coverColor, productLine }: CarScene3DProps) {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden neomorph">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 3, 6]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 5, -5]} intensity={0.5} color="#0ea5e9" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        <Environment preset="city" />

        <Car carType={carType} coverColor={coverColor} productLine={productLine} />

        {/* Ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0f172a" metalness={0.1} roughness={0.9} />
        </mesh>
      </Canvas>
    </div>
  );
}
