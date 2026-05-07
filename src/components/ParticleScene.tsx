'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#ffafbd'),
      new THREE.Color('#ffc2d1'),
      new THREE.Color('#fb6f92'),
      new THREE.Color('#d4af37'),
      new THREE.Color('#f9e272'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }
    return { positions, colors, sizes, speeds };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += particles.speeds[i] * 0.005;
      positions[i3] += Math.sin(time * particles.speeds[i] + i) * 0.002;
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 3;
      light.current.position.y = Math.cos(time * 0.3) * 2;
    }
  });

  return (
    <>
      <pointLight ref={light} color="#f4a0b5" intensity={2} distance={15} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </>
  );
}

function FloatingHearts({ count = 15 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      speed: Math.random() * 0.2 + 0.05,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.16 + 0.1,
      color: ['#ffafbd', '#fb6f92', '#ffc2d1'][Math.floor(Math.random() * 3)]
    }));
  }, [count]);

  return (
    <>
      {hearts.map((heart, i) => (
        <Heart key={i} {...heart} />
      ))}
    </>
  );
}

function Heart({ position, speed, rotation, scale, color }: any) {
  const ref = useRef<THREE.Group>(null);
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.bezierCurveTo(0, 0.5, -0.5, 1.1, -1.1, 0.5);
    shape.bezierCurveTo(-1.5, 0.1, -0.8, -0.6, 0, -1.2);
    shape.bezierCurveTo(0.8, -0.6, 1.5, 0.1, 1.1, 0.5);
    shape.bezierCurveTo(0.5, 1.1, 0, 0.5, 0, 0.5);
    return shape;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y += speed * 0.02;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    if (ref.current.position.y > 10) ref.current.position.y = -10;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <extrudeGeometry args={[heartShape, { depth: 0.4, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 5 }]} />
        <meshPhongMaterial color={color} shininess={100} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export default function ParticleScene() {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) return;
      originalWarn(...args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#fff" />
      <spotLight position={[-10, -10, 5]} angle={0.15} penumbra={1} intensity={0.5} color="#ffd4e5" />
      <FloatingParticles count={500} />
      <FloatingHearts count={25} />
    </Canvas>
  );
}
