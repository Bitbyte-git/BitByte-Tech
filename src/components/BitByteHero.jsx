import { useEffect, useRef } from "react";

export default function BitByteHero() {
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const heroRef = useRef(null);
  const planetRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const el = heroRef.current;
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    const planet = planetRef.current;
    const backCtx = backCanvas?.getContext("2d");
    const frontCtx = frontCanvas?.getContext("2d");
    let ctx = backCtx;
    if (!el || !backCanvas || !frontCanvas || !planet || !backCtx || !frontCtx)
      return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion) {
      backCanvas.hidden = true;
      frontCanvas.hidden = true;
      return () => {
        backCanvas.hidden = false;
        frontCanvas.hidden = false;
      };
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let orbitCenterY = 0;
    let scale = 1;
    let time = 0;
    let lastFrameTime = 0;
    let frameId = 0;
    let resizeFrameId = 0;
    let isActive = false;
    const heroBounds = {
      left: 0,
      top: 0,
    };

    const resize = (nextWidth, nextHeight) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(nextWidth));
      height = Math.max(1, Math.round(nextHeight));
      centerX = width / 2;
      centerY = height / 2;
      orbitCenterY = centerY;
      scale = Math.min(1.45, Math.max(0.72, Math.min(width, height) / 620));
      [backCanvas, frontCanvas].forEach((canvas) => {
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });
      [backCtx, frontCtx].forEach((canvasCtx) => {
        canvasCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const scheduleResize = (nextWidth, nextHeight) => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = 0;
        resize(nextWidth, nextHeight);
      });
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const boxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      const nextWidth = boxSize?.inlineSize || entry.contentRect.width;
      const nextHeight = boxSize?.blockSize || entry.contentRect.height;
      heroBounds.left = entry.contentRect.left || heroBounds.left;
      heroBounds.top = entry.contentRect.top || heroBounds.top;
      scheduleResize(nextWidth, nextHeight);
    });
    resizeObserver.observe(el);

    const refreshHeroBounds = () => {
      const rect = el.getBoundingClientRect();
      heroBounds.left = rect.left;
      heroBounds.top = rect.top;
    };

    const onMove = (event) => {
      mouse.current = {
        x: event.clientX - heroBounds.left,
        y: event.clientY - heroBounds.top,
      };
    };

    const onLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    if (!coarsePointer) {
      el.addEventListener("mouseenter", refreshHeroBounds, { passive: true });
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
      const count = Math.max(
        4,
        Math.round(Math.sin(phi) * (isMobileViewport ? 40 : 56)),
      );

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

    const ringScale = isMobileViewport ? 0.72 : 1;
    const atomOrbit = {
      rx: 312 * ringScale,
      ry: 74 * ringScale,
    };
    const greenRing = {
      tiltX: 0.24,
      tiltZ: 0,
      orbitAngle: 0,
      speed: 0,
      phase: 0,
      color: "#9af75a",
      line: 1.05,
      alpha: 0.6,
      glow: 16,
      dash: [],
      nodeCount: 1,
      nodeSize: 5.8,
      frontZ: 10,
    };
    const rings = [
      {
        ...greenRing,
        ...atomOrbit,
        tiltZ: -0.58,
        alpha: 0.66,
        nodeCount: 2,
        nodePhase: 0,
      },

      {
        ...greenRing,
        ...atomOrbit,
        tiltZ: 0.58,
        nodePhase: Math.PI * 0.82,
        alpha: 0.58,
        nodeCount: 1,
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
        py: orbitCenterY + y3 * perspective * scale,
        sc: perspective * scale,
        z: z3,
      };
    };

    const projectRingPoint = (ring, ringAngle, pointAngle) => {
      let x = Math.cos(pointAngle) * ring.rx;
      let y = Math.sin(pointAngle) * ring.ry;
      let z = 0;
      [x, y, z] = rotX(x, y, z, ring.tiltX);
      [x, y, z] = rotZ(x, y, z, ring.tiltZ);
      [x, y, z] = rotY(x, y, z, ringAngle);
      return project(x, y, z);
    };

    const drawRing = (ring, layer = "back") => {
      const segments = 160;
      const angle = time * ring.speed + ring.phase;
      const isFrontLayer = layer === "front";
      let hasActiveSegment = false;

      ctx.save();
      ctx.beginPath();
      for (let index = 0; index <= segments; index += 1) {
        const a = (index / segments) * Math.PI * 2;
        const point = projectRingPoint(ring, angle, a);
        const shouldDraw = !isFrontLayer || point.z > ring.frontZ;

        if (!shouldDraw) {
          hasActiveSegment = false;
          continue;
        }

        if (!hasActiveSegment) {
          ctx.moveTo(point.px, point.py);
          hasActiveSegment = true;
        } else {
          ctx.lineTo(point.px, point.py);
        }
      }

      ctx.lineCap = "round";
      ctx.setLineDash(ring.dash.map((unit) => unit * scale));
      ctx.strokeStyle = ring.color;
      ctx.shadowColor = ring.color;
      ctx.shadowBlur = ring.glow * scale;
      ctx.lineWidth = ring.line * (isFrontLayer ? 4.2 : 3.6) * scale;
      ctx.globalAlpha = ring.alpha * (isFrontLayer ? 0.18 : 0.22);
      ctx.stroke();

      ctx.shadowBlur = ring.glow * (isFrontLayer ? 0.62 : 0.42) * scale;
      ctx.lineWidth = ring.line * (isFrontLayer ? 1.35 : 1.15) * scale;
      ctx.globalAlpha = ring.alpha * (isFrontLayer ? 1.08 : 1);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.lineWidth = Math.max(0.5, ring.line * 0.38 * scale);
      ctx.strokeStyle = "rgba(255,255,255,0.72)";
      ctx.globalAlpha = ring.alpha * (isFrontLayer ? 0.38 : 0.28);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
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

    const draw = (now = performance.now()) => {
      frameId = 0;
      if (!isActive) return;

      const delta = lastFrameTime
        ? Math.min(34, now - lastFrameTime) / 16.67
        : 1;
      lastFrameTime = now;
      time += 0.007 * delta;

      const planetFloat = Math.sin(time * 1.46) * 8 * scale;
      orbitCenterY = centerY + planetFloat;
      planet.style.transform = `translate3d(0, ${planetFloat}px, 0) rotate(${Math.sin(time * 0.72) * 1.4}deg)`;

      backCtx.clearRect(0, 0, width, height);
      frontCtx.clearRect(0, 0, width, height);
      ctx = backCtx;

      const ambient = ctx.createRadialGradient(
        centerX,
        orbitCenterY,
        0,
        centerX,
        orbitCenterY,
        radius * 1.25 * scale,
      );
      ambient.addColorStop(0, "rgba(0,55,28,0.22)");
      ambient.addColorStop(0.6, "rgba(0,28,14,0.09)");
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      rings.forEach((ring) => drawRing(ring, "back"));

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

      ctx = frontCtx;
      rings.forEach((ring) => drawRing(ring, "front"));

      rings.forEach((ring, ringIndex) => {
        const ringAngle = time * ring.speed + ring.phase;
        for (let index = 0; index < ring.nodeCount; index += 1) {
          const direction = ring.speed >= 0 ? 1 : -1;
          const pointAngle =
            direction * time * 0.72 +
            (index / ring.nodeCount) * Math.PI * 2 +
            ring.phase +
            ringIndex * 0.58;
          const point = projectRingPoint(ring, ringAngle, pointAngle);
          const size = ring.nodeSize * (ringIndex === 0 ? 1.08 : 1);
          ctx = point.z > ring.frontZ ? frontCtx : backCtx;
          drawGlowPoint(point.px, point.py, ring.color, size);
        }
      });

      frameId = requestAnimationFrame(draw);
    };

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting;
        if (isActive && !frameId) {
          lastFrameTime = 0;
          frameId = requestAnimationFrame(draw);
        }
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
      cancelAnimationFrame(resizeFrameId);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      if (!coarsePointer) {
        el.removeEventListener("mouseenter", refreshHeroBounds);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="bitbyte-hero-visual" aria-hidden="true">
      <canvas
        ref={backCanvasRef}
        className="bitbyte-hero-canvas bitbyte-hero-canvas-back"
      />
      <img
        ref={planetRef}
        src="/assets/optimized/planet-640.png"
        alt="Bit Byte Technologies digital planet illustration"
        className="bitbyte-center-planet"
        width="640"
        height="640"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <canvas
        ref={frontCanvasRef}
        className="bitbyte-hero-canvas bitbyte-hero-canvas-front"
      />
    </div>
  );
}
