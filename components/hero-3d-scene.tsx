"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { useRef } from "react"
import type * as THREE from "three"

function FloatingCoin({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#10b981" distort={0.3} speed={2} metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>

      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1.5}>
            <mesh position={[x, Math.sin(i) * 0.5, z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
            </mesh>
          </Float>
        )
      })}

      {/* Floating coins */}
      <FloatingCoin position={[-2, 2, 1]} color="#f59e0b" />
      <FloatingCoin position={[2, -1, -1]} color="#8b5cf6" />
      <FloatingCoin position={[1, 2, -2]} color="#ec4899" />
    </group>
  )
}

export function Hero3DScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <NetworkNodes />

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
