import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'
import * as THREE from 'three'

// Component to load and display the point cloud
function PointCloud() {
  let points = null
  try {
    // Attempt to load the PCD file from the public assets folder
    points = useLoader(PCDLoader, '/assets/map.pcd')
    
    // Adjust point cloud for 2D top-down view
    if (points) {
      points.geometry.center()
      points.geometry.rotateX(-Math.PI / 2) // Rotate to lay flat
      points.scale.set(10, 10, 10)
      
      // Adjust point material for 2D view
      if (points.material) {
        points.material.size = 0.08
        points.material.color = new THREE.Color(0x333333)
      }
    }
  } catch (error) {
    console.warn("Failed to load map.pcd. Using synthetic fallback.", error)
  }

  if (points) {
    return <primitive object={points} position={[0, 0, 0]} />
  }

  // Fallback synthetic point cloud if file fails to load
  return <SyntheticPointCloud />
}

// Fallback just in case
function SyntheticPointCloud() {
  const pointsRef = useRef()
  const [geom] = useState(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const colors = []
    
    // Create a 2D warehouse floor plan with walls
    for (let i = 0; i < 30000; i++) {
      const x = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const y = 0 // Keep flat for 2D view
      
      // Create walls and obstacles
      let isWall = false
      if (Math.abs(x) > 18 || Math.abs(z) > 18) {
        isWall = true
      } else if ((Math.abs(x) < 8 && Math.abs(z - 10) < 2) || 
                 (Math.abs(z) < 8 && Math.abs(x - 10) < 2)) {
        isWall = true
      }
      
      if (isWall || Math.random() < 0.3) {
        vertices.push(x, y, z)
        // Dark color for walls/obstacles
        colors.push(0.2, 0.2, 0.2)
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geometry
  })

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// The Robot marker
function RobotMarker({ paused, estopActive }) {
  const groupRef = useRef()
  const state = useRef({ x: 0, z: 0, angle: 0, vx: 0.05, vz: 0 })

  useFrame((_, delta) => {
    if (!paused && !estopActive) {
      const s = state.current
      // Gentle wandering
      s.angle += Math.sin(Date.now() * 0.001) * 0.02
      s.vx = Math.cos(s.angle) * 3 * delta
      s.vz = Math.sin(s.angle) * 3 * delta
      s.x += s.vx
      s.z += s.vz

      // Bounding box bounce
      if (s.x > 15 || s.x < -15) { s.angle = Math.PI - s.angle; s.x = Math.max(-15, Math.min(15, s.x)) }
      if (s.z > 15 || s.z < -15) { s.angle = -s.angle; s.z = Math.max(-15, Math.min(15, s.z)) }

      if (groupRef.current) {
        groupRef.current.position.set(s.x, 0, s.z)
        groupRef.current.rotation.y = -s.angle
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Robot Body - flatter for 2D view */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Direction indicator (heading) */}
      <mesh position={[0, 0, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.5, 1, 3]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>
      {/* Selection ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.2, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Map floor grid and restricted zones
function MapEnvironment() {
  return (
    <group>
      <gridHelper args={[50, 50, '#555555', '#222222']} position={[0, -0.01, 0]} />
      {/* Restricted zone example */}
      <mesh position={[8, 0, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-10, 0, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 12]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function MapCanvas({ paused, estopActive }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#d4d4d4' }}>
      <Canvas 
        orthographic
        camera={{ position: [0, 50, 0], zoom: 15, up: [0, 0, -1], near: 0.1, far: 1000 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 20, 0]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <PointCloud />
        </Suspense>
        
        <MapEnvironment />
        <RobotMarker paused={paused} estopActive={estopActive} />
      </Canvas>
      
      {/* Vertical slider track (UI overlay) */}
      <div style={{
        position: 'absolute', top: '25%', left: 18, width: 4, height: '50%',
        background: 'rgba(255,255,255,0.12)', borderRadius: 2, zIndex: 1
      }}>
        <div style={{
          position: 'absolute', top: '55%', left: -5, width: 14, height: 14,
          background: '#333', borderRadius: '50%', border: '2px solid #fff'
        }} />
      </div>
    </div>
  )
}
