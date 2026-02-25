import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Erythrocytes = ({ count = 40 }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.05;
        groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => (
                <Float
                    key={i}
                    speed={1.5}
                    rotationIntensity={2}
                    floatIntensity={2}
                    position={[points[i * 3], points[i * 3 + 1], points[i * 3 + 2]]}
                >
                    <mesh>
                        <torusGeometry args={[0.2, 0.1, 16, 32]} />
                        <meshStandardMaterial
                            color="#C62828"
                            emissive="#8B0000"
                            emissiveIntensity={0.5}
                            roughness={0.2}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

export const BloodCellNetwork = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-slate-50 opacity-40">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Erythrocytes />
            </Canvas>
        </div>
    );
};

export const HeartHeroVisual = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(t * 2) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <div className="w-full h-48">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1.5} />
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#C62828"
                        wireframe
                        emissive="#C62828"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </Canvas>
        </div>
    );
};
