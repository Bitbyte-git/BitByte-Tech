import { useEffect, useRef } from "react";

/**
 * AtomRings - A cinematic, animated atomic structure with glowing rings and particles.
 * Designed for the Founder section to represent innovation and technical depth.
 * Features high-end depth simulation, glowing particles, and smooth mouse interaction.
 */
export default function AtomRings() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.targetX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouse.current.targetY = (e.clientY - rect.top - height / 2) / (height / 2);
    };

    const onMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Ring configuration with premium aesthetics
    const rings = [
      {
        rx: 190,
        ry: 70,
        tiltX: Math.PI / 4,
        tiltZ: 0,
        speed: 0.004,
        color: "#a4ec70", // --green
        particleSize: 4.5,
        offset: 0,
      },
      {
        rx: 210,
        ry: 80,
        tiltX: -Math.PI / 4,
        tiltZ: Math.PI / 3,
        speed: 0.006,
        color: "#00a4ec", // --teal
        particleSize: 3.5,
        offset: Math.PI * 0.5,
      },
      {
        rx: 200,
        ry: 75,
        tiltX: Math.PI / 8,
        tiltZ: -Math.PI / 3,
        speed: 0.005,
        color: "#275ca5", // --blue
        particleSize: 5,
        offset: Math.PI,
      },
      {
        rx: 185,
        ry: 65,
        tiltX: Math.PI / 2,
        tiltZ: Math.PI / 6,
        speed: 0.008,
        color: "#8cd35b", // --green2
        particleSize: 3,
        offset: Math.PI * 1.5,
      },
    ];

    const rotateX = (x, y, z, angle) => [
      x,
      y * Math.cos(angle) - z * Math.sin(angle),
      y * Math.sin(angle) + z * Math.cos(angle),
    ];

    const rotateY = (x, y, z, angle) => [
      x * Math.cos(angle) + z * Math.sin(angle),
      y,
      -x * Math.sin(angle) + z * Math.cos(angle),
    ];

    const rotateZ = (x, y, z, angle) => [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle),
      z,
    ];

    const draw = () => {
      time += 0.008;
      
      // Smooth mouse transition
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.03;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.03;

      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Nucleus Breathing Glow
      const breath = Math.sin(time * 2) * 5;
      const nucleusGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 45 + breath);
      nucleusGlow.addColorStop(0, "rgba(164, 236, 112, 0.5)");
      nucleusGlow.addColorStop(0.4, "rgba(0, 164, 236, 0.15)");
      nucleusGlow.addColorStop(1, "transparent");
      ctx.fillStyle = nucleusGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45 + breath, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus Core
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#a4ec70";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Rings and Particles
      rings.forEach((ring) => {
        const segments = 120;
        const globalRotY = mouse.current.x * 0.4;
        const globalRotX = mouse.current.y * 0.4;
        const ringRotation = time * ring.speed * 8;

        // Draw Ring Path
        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          let x = Math.cos(theta) * ring.rx;
          let y = Math.sin(theta) * ring.ry;
          let z = 0;

          [x, y, z] = rotateX(x, y, z, ring.tiltX);
          [x, y, z] = rotateZ(x, y, z, ring.tiltZ);
          [x, y, z] = rotateY(x, y, z, ringRotation);
          [x, y, z] = rotateY(x, y, z, globalRotY);
          [x, y, z] = rotateX(x, y, z, globalRotX);

          // Simple depth fading for the ring path
          const alpha = 0.1 + ((z + 200) / 400) * 0.3;
          
          const px = centerX + x;
          const py = centerY + y;

          if (j === 0) ctx.moveTo(px, py);
          else {
            ctx.strokeStyle = ring.color;
            ctx.globalAlpha = alpha;
            ctx.lineTo(px, py);
          }
        }
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Electron / Particle
        const electronTheta = (time * ring.speed * 40) + ring.offset;
        let ex = Math.cos(electronTheta) * ring.rx;
        let ey = Math.sin(electronTheta) * ring.ry;
        let ez = 0;

        [ex, ey, ez] = rotateX(ex, ey, ez, ring.tiltX);
        [ex, ey, ez] = rotateZ(ex, ey, ez, ring.tiltZ);
        [ex, ey, ez] = rotateY(ex, ey, ez, ringRotation);
        [ex, ey, ez] = rotateY(ex, ey, ez, globalRotY);
        [ex, ey, ez] = rotateX(ex, ey, ez, globalRotX);

        const epx = centerX + ex;
        const epy = centerY + ey;
        
        // Depth factor (0 to 1)
        const depth = (ez + 250) / 500;
        const eAlpha = 0.3 + depth * 0.7;
        const eSize = ring.particleSize * (0.6 + depth * 0.8);

        ctx.globalAlpha = eAlpha;
        ctx.fillStyle = ring.color;
        
        // Glow effect for electron
        ctx.shadowBlur = 15 * depth;
        ctx.shadowColor = ring.color;
        
        ctx.beginPath();
        ctx.arc(epx, epy, eSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Extra inner glow for high-end look
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(epx, epy, eSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="atom-rings-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
