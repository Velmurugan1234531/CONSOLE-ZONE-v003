"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, useGLTF, Environment, ContactShadows, Html, Grid } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function ScanningLight() {
    const lightRef = useRef<THREE.SpotLight>(null);

    useFrame(({ clock }) => {
        if (lightRef.current) {
            // Move light up and down to simulate scanning
            const y = Math.sin(clock.getElapsedTime() * 2) * 3;
            lightRef.current.position.y = y;
            lightRef.current.target.position.y = 0;
            lightRef.current.target.updateMatrixWorld();
        }
    });

    return (
        <spotLight
            ref={lightRef}
            position={[0, 5, 2]}
            angle={0.5}
            penumbra={0.5}
            intensity={50}
            color="#A855F7"
            castShadow
            distance={10}
        />
    );
}

function ConsoleModel() {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/ps5body.glb");
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Idle rotation
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <primitive
                    object={scene}
                    ref={meshRef}
                    scale={15}
                    rotation={[0.2, -0.5, 0]}
                    position={[0, -1.5, 0]}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />
            </Float>

            {/* Holographic Status Labels */}
            <Html position={[2, 1, 0]} distanceFactor={10} zIndexRange={[100, 0]}>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-48"
                >
                    <div className="bg-black/80 backdrop-blur border border-[#A855F7]/50 p-3 rounded-lg text-xs font-mono text-[#A855F7]">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400">TARGET:</span>
                            <span className="font-bold text-white">PS5-CHASSIS</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400">STATUS:</span>
                            <span className="font-bold text-green-400">ONLINE</span>
                        </div>
                        <div className="h-0.5 w-full bg-[#A855F7]/30 mt-2 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#A855F7]"
                                animate={{ width: ["0%", "100%", "0%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>
                    <div className="h-px w-8 bg-[#A855F7] absolute top-1/2 -left-8" />
                </motion.div>
            </Html>

            <Html position={[-2, -1, 0]} distanceFactor={10} zIndexRange={[100, 0]}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="w-40 text-right"
                >
                    <div className="h-px w-8 bg-[#39ff14] absolute top-1/2 -right-8" />
                    <div className="bg-black/80 backdrop-blur border border-[#39ff14]/50 p-2 rounded-lg text-[10px] font-mono text-[#39ff14]">
                        <div>DIAGNOSTIC SCAN</div>
                        <div className="text-white font-bold text-lg">RUNNING...</div>
                    </div>
                </motion.div>
            </Html>
        </group>
    );
}

// Preload
useGLTF.preload("/models/ps5body.glb");

export default function RepairBayHero() {
    return (
        <div className="h-[60vh] md:h-[80vh] w-full relative z-10 -mt-20">
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />

                {/* Main Key Light */}
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={20} color="#ffffff" />

                {/* Rim Lights */}
                <pointLight position={[-10, 0, -5]} intensity={10} color="#06B6D4" distance={20} />
                <pointLight position={[5, -5, 5]} intensity={10} color="#A855F7" distance={20} />

                {/* Scanning Effect */}
                <ScanningLight />

                <ConsoleModel />

                {/* Floor Grid */}
                <Grid
                    position={[0, -3, 0]}
                    args={[20, 20]}
                    cellSize={0.5}
                    cellThickness={1}
                    cellColor="#333"
                    sectionSize={2}
                    sectionThickness={1.5}
                    sectionColor="#A855F7"
                    fadeDistance={15}
                    fadeStrength={1}
                />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
