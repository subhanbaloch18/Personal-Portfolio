"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Scene() {
  const mainGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const rx = useRef(0);
  const ry = useRef(0);

  // Golden-ratio particle distribution on sphere surface
  const { positions, colors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const phi = (1 + Math.sqrt(5)) / 2;

    // Palette: #64ffda, #0070f3, #a855f7
    const palette = [
      [0.392, 1.0, 0.855],
      [0.0, 0.439, 0.953],
      [0.659, 0.333, 0.969],
    ];

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / phi;
      const phiAngle = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 1.5;
      pos[i * 3]     = r * Math.sin(phiAngle) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phiAngle);

      const frac = i / count;
      const c = frac < 0.65 ? palette[0] : frac < 0.85 ? palette[1] : palette[2];
      col[i * 3]     = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, []);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Spring-damped mouse follow
    rx.current += (mouse.y * 0.45 - rx.current) * 0.04;
    ry.current += (mouse.x * 0.45 - ry.current) * 0.04;

    // Main group: slow auto-rotation + mouse tilt
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = t * 0.14 + ry.current;
      mainGroupRef.current.rotation.x = rx.current;
    }

    // Orbital rings spin independently
    if (ring1Ref.current) ring1Ref.current.rotation.y = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * -0.33;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.6;

    // Core breathes
    if (coreRef.current) {
      const pulse = Math.sin(t * 2.2) * 0.28 + 1.0;
      coreRef.current.scale.setScalar(pulse);
    }
    if (coreGlowRef.current) {
      const glow = Math.sin(t * 2.2 + 0.5) * 0.4 + 0.6;
      (coreGlowRef.current.material as THREE.MeshBasicMaterial).opacity = glow * 0.18;
    }
  });

  return (
    <>
      {/* Main sphere group — wireframe + particles + core */}
      <group ref={mainGroupRef}>
        {/* Outer wireframe lattice */}
        <mesh>
          <sphereGeometry args={[1.5, 28, 28]} />
          <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.07} />
        </mesh>

        {/* Inner dark fill for depth */}
        <mesh>
          <sphereGeometry args={[1.47, 28, 28]} />
          <meshBasicMaterial color="#040c1a" transparent opacity={0.5} />
        </mesh>

        {/* Surface particle cloud */}
        <points geometry={particleGeo}>
          <pointsMaterial
            vertexColors
            size={0.022}
            sizeAttenuation
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </points>

        {/* Pulsing core orb */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#64ffda" />
        </mesh>

        {/* Core outer glow */}
        <mesh ref={coreGlowRef}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.1} />
        </mesh>
      </group>

      {/* Ring 1 — horizontal plane, cyan */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.92, 0.006, 2, 256]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.6} />
        </mesh>
        {/* Comet node on ring */}
        <mesh position={[1.92, 0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#64ffda" />
        </mesh>
      </group>

      {/* Ring 2 — tilted 60°, blue */}
      <group rotation={[Math.PI / 3, 0, 0.45]}>
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[2.14, 0.005, 2, 256]} />
            <meshBasicMaterial color="#0070f3" transparent opacity={0.52} />
          </mesh>
          <mesh position={[2.14, 0, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#0070f3" />
          </mesh>
        </group>
      </group>

      {/* Ring 3 — tilted -45°, purple */}
      <group rotation={[-Math.PI / 4, 0.3, -0.55]}>
        <group ref={ring3Ref}>
          <mesh>
            <torusGeometry args={[2.02, 0.005, 2, 256]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.48} />
          </mesh>
          <mesh position={[2.02, 0, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function SphereCanvas() {
  return (
    <div style={{ width: "440px", height: "440px", maxWidth: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
