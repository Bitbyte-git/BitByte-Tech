import { useEffect, useRef } from "react";

export default function BitByteHero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const el = heroRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion) {
      cv.hidden = true;
      return () => {
        cv.hidden = false;
      };
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let scale = 1;
    let time = 0;
    let frameId = 0;
    let isActive = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = el.clientWidth;
      height = el.clientHeight;
      centerX = width / 2;
      centerY = height / 2;
      scale = Math.min(1.08, Math.max(0.72, Math.min(width, height) / 620));
      cv.width = Math.max(1, Math.floor(width * dpr));
      cv.height = Math.max(1, Math.floor(height * dpr));
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      mouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    if (!coarsePointer) {
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave);
    }

    const isMobileViewport = window.matchMedia("(max-width: 700px)").matches;
    const radius = isMobileViewport ? 190 : 220;
    const rowCount = isMobileViewport ? 17 : 22;
    const dots = [];

    for (let row = 0; row < rowCount; row += 1) {
      const phi = Math.PI * ((row + 0.5) / rowCount);
      const y3base = -Math.cos(phi) * radius;
      const r3 = Math.sin(phi) * radius;
      const count = Math.max(4, Math.round(Math.sin(phi) * (isMobileViewport ? 40 : 56)));

      for (let point = 0; point < count; point += 1) {
        const theta0 = (point / count) * Math.PI * 2 + row * 0.15;
        const frac = phi / Math.PI;
        dots.push({
          theta0,
          r3,
          y3base,
          color: [
            Math.round(frac * 55),
            Math.round(185 + frac * 70),
            Math.round(255 * (1 - frac * 0.72)),
          ],
          size: 0.85 + Math.sin(phi) * 0.9,
        });
      }
    }

    const rings = [
      {
        rx: 300,
        ry: 80,
        tiltX: 0.32,
        tiltZ: 0.05,
        speed: 0.004,
        phase: 0,
        color: "#4dff88",
        line: 0.9,
        alpha: 0.56,
      },
      {
        rx: 330,
        ry: 90,
        tiltX: -0.22,
        tiltZ: 0.45,
        speed: -0.003,
        phase: 2.1,
        color: "#00ddff",
        line: 0.75,
        alpha: 0.41,
      },
      {
        rx: 360,
        ry: 100,
        tiltX: 0.55,
        tiltZ: -0.25,
        speed: 0.0022,
        phase: 4.2,
        color: "#88ffcc",
        line: 0.6,
        alpha: 0.26,
      },
    ];

    const rotX = (x, y, z, angle) => [
      x,
      y * Math.cos(angle) - z * Math.sin(angle),
      y * Math.sin(angle) + z * Math.cos(angle),
    ];
    const rotY = (x, y, z, angle) => [
      x * Math.cos(angle) + z * Math.sin(angle),
      y,
      -x * Math.sin(angle) + z * Math.cos(angle),
    ];
    const rotZ = (x, y, z, angle) => [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle),
      z,
    ];

    const project = (x3, y3, z3) => {
      const fov = 640;
      const perspective = fov / (fov + z3 + 60);
      return {
        px: centerX + x3 * perspective * scale,
        py: centerY + y3 * perspective * scale,
        sc: perspective * scale,
        z: z3,
      };
    };

    const drawRing = (ring) => {
      const segments = 120;
      const angle = time * ring.speed + ring.phase;

      ctx.beginPath();
      for (let index = 0; index <= segments; index += 1) {
        const a = (index / segments) * Math.PI * 2;
        let x = Math.cos(a) * ring.rx;
        let y = Math.sin(a) * ring.ry;
        let z = 0;
        [x, y, z] = rotX(x, y, z, ring.tiltX);
        [x, y, z] = rotZ(x, y, z, ring.tiltZ);
        [x, y, z] = rotY(x, y, z, angle);
        const point = project(x, y, z);
        if (index === 0) ctx.moveTo(point.px, point.py);
        else ctx.lineTo(point.px, point.py);
      }

      ctx.strokeStyle = ring.color;
      ctx.lineWidth = ring.line * 2.8 * scale;
      ctx.globalAlpha = ring.alpha * 0.22;
      ctx.stroke();
      ctx.lineWidth = ring.line * scale;
      ctx.globalAlpha = ring.alpha;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawGlowPoint = (x, y, color, size) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4 * scale);
      glow.addColorStop(0, `${color}bb`);
      glow.addColorStop(0.3, `${color}44`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, size * 4 * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      frameId = 0;
      if (!isActive) return;

      time += 0.007;
      ctx.clearRect(0, 0, width, height);

      const ambient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 1.25 * scale,
      );
      ambient.addColorStop(0, "rgba(0,55,28,0.22)");
      ambient.addColorStop(0.6, "rgba(0,28,14,0.09)");
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      rings.forEach((ring) => drawRing(ring));

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const renderedDots = dots.map((dot) => {
        const theta = dot.theta0 + time * 0.22;
        const x3 = dot.r3 * Math.cos(theta);
        const y3 = dot.y3base;
        const z3 = dot.r3 * Math.sin(theta);
        const point = project(x3, y3, z3);
        const distance = Math.hypot(point.px - mx, point.py - my);
        let px = point.px;
        let py = point.py;
        let repel = 0;
        let glow = false;

        if (distance < 82) {
          repel = (82 - distance) / 82;
          glow = distance < 46;
          const angle = Math.atan2(point.py - my, point.px - mx);
          px += Math.cos(angle) * repel * 28;
          py += Math.sin(angle) * repel * 28;
        }

        const depth = (z3 + radius) / (2 * radius);
        return {
          px,
          py,
          size: Math.max(
            0.3,
            dot.size * point.sc * (glow ? 2.4 : 1 + repel * 1.3),
          ),
          alpha: Math.min(1, 0.22 + depth * 0.68 + (glow ? 0.5 : repel * 0.3)),
          color: dot.color,
          glow,
          repel,
          z: z3,
        };
      });

      renderedDots.sort((a, b) => a.z - b.z);
      renderedDots.forEach((dot) => {
        const [red, green, blue] = dot.color;
        ctx.beginPath();
        ctx.arc(dot.px, dot.py, dot.size, 0, Math.PI * 2);
        ctx.shadowBlur = dot.glow ? 12 : dot.repel > 0 ? 7 : 0;
        ctx.shadowColor = `rgb(${red},${green},${blue})`;
        ctx.fillStyle = `rgba(${red},${green},${blue},${dot.alpha})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      const mainRing = rings[0];
      const ringAngle = time * mainRing.speed + mainRing.phase;
      [
        [-mainRing.rx, 7],
        [mainRing.rx, 5],
      ].forEach(([targetX, size]) => {
        let x = targetX;
        let y = 0;
        let z = 0;
        [x, y, z] = rotX(x, y, z, mainRing.tiltX);
        [x, y, z] = rotZ(x, y, z, mainRing.tiltZ);
        [x, y, z] = rotY(x, y, z, ringAngle);
        const point = project(x, y, z);
        drawGlowPoint(point.px, point.py, "#7fffaa", size);
      });

      frameId = requestAnimationFrame(draw);
    };

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting;
        if (isActive && !frameId) frameId = requestAnimationFrame(draw);
        if (!isActive && frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { rootMargin: "180px 0px" },
    );
    viewportObserver.observe(el);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      if (!coarsePointer) {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="bitbyte-hero-visual" aria-hidden="true">
      <canvas ref={canvasRef} className="bitbyte-hero-canvas" />
      <img
        src="/assets/optimized/planet-640.png"
        alt=""
        className="bitbyte-center-planet"
        width="640"
        height="640"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
