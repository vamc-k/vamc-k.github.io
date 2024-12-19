import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS } from "@/lib/constants";

function Project({ position, name, description, index, active, setActive }: any) {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Parallax effect
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      active === index ? 0 : Math.sin((state.clock.elapsedTime + index) / 2) * 0.5,
      0.1
    );
    
    // Rotation effect
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      active === index ? 0 : Math.sin((state.clock.elapsedTime + index) / 4) * 0.2,
      0.1
    );
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={() => setActive(index === active ? null : index)}
    >
      <boxGeometry args={[viewport.width / 5, viewport.height / 5, 0.1]} />
      <meshStandardMaterial color={active === index ? "#3b82f6" : "#64748b"} />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </mesh>
  );
}

function Scene() {
  const [active, setActive] = useState(null);
  const { viewport } = useThree();

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {PROJECTS.map((project, index) => (
        <Project
          key={project.title}
          position={[
            (index - (PROJECTS.length - 1) / 2) * (viewport.width / 4),
            0,
            0,
          ]}
          name={project.title}
          description={project.description}
          index={index}
          active={active}
          setActive={setActive}
        />
      ))}
    </>
  );
}

export function Portfolio3D() {
  return (
    <section id="portfolio-3d" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Interactive Portfolio</h2>
        <div className="w-full h-[60vh] bg-gray-900 rounded-lg overflow-hidden">
          <Canvas>
            <Scene />
          </Canvas>
        </div>
      </motion.div>
    </section>
  );
}
