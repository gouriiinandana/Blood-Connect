import React, { useEffect, useRef } from 'react';

/**
 * ConnectPinsLogo
 * Two animated blood-drop / location pins connected by a pulsing arc.
 * Pure SVG — no Three.js needed, infinitely light and crisp at any size.
 */
const ConnectPinsLogo = ({ size = 44 }) => {
    const arcRef = useRef(null);
    const dot1 = useRef(null);
    const dot2 = useRef(null);

    useEffect(() => {
        let frame;
        let t = 0;
        const animate = () => {
            t += 0.04;
            // Pulsing opacity on the arc
            if (arcRef.current) {
                arcRef.current.style.opacity = 0.5 + 0.5 * Math.sin(t);
            }
            // Subtle scale pulse on pins
            const s1 = 1 + 0.06 * Math.sin(t);
            const s2 = 1 + 0.06 * Math.sin(t + Math.PI);
            if (dot1.current) dot1.current.setAttribute('transform', `translate(10, 8) scale(${s1})`);
            if (dot2.current) dot2.current.setAttribute('transform', `translate(34, 8) scale(${s2})`);
            frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
        >
            {/* Arc / connection line */}
            <path
                ref={arcRef}
                d="M10 22 Q22 8 34 22"
                stroke="#E82C2C"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                strokeLinecap="round"
                fill="none"
            />

            {/* Left pin */}
            <g ref={dot1} transform="translate(10, 8)">
                {/* Pin body */}
                <path
                    d="M0 -8 C-5 -8 -8 -4 -8 0 C-8 5.5 0 12 0 12 C0 12 8 5.5 8 0 C8 -4 5 -8 0 -8Z"
                    fill="#E82C2C"
                />
                {/* Pin inner circle */}
                <circle cx="0" cy="0" r="3" fill="white" />
            </g>

            {/* Right pin */}
            <g ref={dot2} transform="translate(34, 8)">
                <path
                    d="M0 -8 C-5 -8 -8 -4 -8 0 C-8 5.5 0 12 0 12 C0 12 8 5.5 8 0 C8 -4 5 -8 0 -8Z"
                    fill="#1565C0"
                />
                <circle cx="0" cy="0" r="3" fill="white" />
            </g>

            {/* Glow dots on the arc midpoint */}
            <circle cx="22" cy="14" r="2" fill="#E82C2C" opacity="0.3">
                <animate attributeName="r" values="2;3.5;2" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.2s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
};

export default ConnectPinsLogo;
