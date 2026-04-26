import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrb({ position, color, speed, distort, size }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const orbs = useMemo(() => [
    { position: [-6, 3, -10], color: "#7c3aed", speed: 1.5, distort: 0.4, size: 2.5 },
    { position: [8, -4, -12], color: "#6366f1", speed: 2, distort: 0.5, size: 3.5 },
    { position: [0, -6, -8], color: "#a855f7", speed: 1.2, distort: 0.3, size: 2.0 },
    { position: [10, 8, -15], color: "#818cf8", speed: 1.8, distort: 0.6, size: 4.0 },
    // A small gold-ish one
    { position: [-10, -5, -10], color: "#ffd700", speed: 2.5, distort: 0.2, size: 1.2 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      {orbs.map((orb, i) => (
        <AnimatedOrb key={i} {...orb} />
      ))}
      
      <Environment preset="night" />
    </>
  );
}

export default function InteractiveOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
