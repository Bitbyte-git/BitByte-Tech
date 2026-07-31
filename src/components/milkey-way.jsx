// MilkyWay.jsx – React component version of milky_way_exact_dense.html
// Uses Tailwind CSS classes for full‑screen dark background.

import { useEffect, useRef } from "react";

const MilkyWay = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);
  const paramsRef = useRef({
    W: 0,
    H: 0,
    cx: 0,
    cy: 0,
    R: 0,
    stars: [],
    dust: [],
  });

  // ---------- utility helpers ----------
  const rand = (a, b) => a + Math.random() * (b - a);
  const randN = (mu, s) => {
    let u = 0,
      v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return mu + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  // ---------- setup & build ----------
  const setup = (canvas) => {
    const bounds = canvas.parentElement?.getBoundingClientRect();
    const width = Math.max(1, Math.floor(bounds?.width || canvas.clientWidth));
    const height = Math.max(
      1,
      Math.floor(bounds?.height || canvas.clientHeight),
    );
    canvas.width = width;
    canvas.height = height;
    paramsRef.current.W = canvas.width;
    paramsRef.current.H = canvas.height;
    paramsRef.current.cx = canvas.width / 2;
    paramsRef.current.cy = canvas.height / 2;
    paramsRef.current.R = Math.min(canvas.width, canvas.height) * 0.46;
  };

  const build = () => {
    const p = paramsRef.current;
    p.stars = [];
    p.dust = [];
    const scale = p.R;

    // ---- spiral arms (basic stars) ----
    for (let arm = 0; arm < 2; arm++) {
      const base = (arm / 2) * Math.PI * 2;
      for (let mirror = 0; mirror < 2; mirror++) {
        const bAngle = mirror === 0 ? base : base + Math.PI;
        for (let i = 0; i < 3200; i++) {
          const t = Math.pow(Math.random(), 0.55);
          const r = t * scale;
          const twist = t * Math.PI * 4.6;
          const spread = rand(0.05, 0.22) * (0.5 + t);
          const a = bAngle + twist + randN(0, spread);
          const noise = randN(0, r * 0.04);
          const sr = r + noise;
          const brightness = rand(0.35, 1.0) * (1 - t * 0.4);
          const size = rand(0.4, t < 0.25 ? 2.5 : 1.7);
          let color;
          const rng = Math.random();
          if (rng < 0.13) color = `rgba(160,195,255,${brightness})`;
          else if (rng < 0.26) color = `rgba(255,245,210,${brightness})`;
          else if (rng < 0.38) color = `rgba(255,210,140,${brightness})`;
          else if (rng < 0.46) color = `rgba(255,160,80,${brightness})`;
          else color = `rgba(210,225,255,${brightness})`;
          p.stars.push({
            r: sr,
            a,
            size,
            color,
            tw: Math.random() * Math.PI * 2,
            ts: rand(0.01, 0.04),
            type: "arm",
          });
        }
      }
    }

    // ---- core stars ----
    for (let i = 0; i < 1800; i++) {
      const r = Math.abs(randN(0, scale * 0.11));
      const a = rand(0, Math.PI * 2);
      const b = rand(0.5, 1.0);
      const rng = Math.random();
      let color;
      if (rng < 0.35) color = `rgba(255,245,200,${b})`;
      else if (rng < 0.6) color = `rgba(255,220,150,${b})`;
      else if (rng < 0.8) color = `rgba(255,190,100,${b})`;
      else color = `rgba(240,215,170,${b})`;
      p.stars.push({
        r,
        a,
        size: rand(0.4, 2.1),
        color,
        tw: Math.random() * Math.PI * 2,
        ts: rand(0.02, 0.07),
        type: "core",
      });
    }

    // ---- background stars ----
    for (let i = 0; i < 500; i++) {
      const r = rand(0, scale * 1.05);
      const a = rand(0, Math.PI * 2);
      const b = rand(0.08, 0.35);
      p.stars.push({
        r,
        a,
        size: rand(0.2, 0.9),
        color: `rgba(200,210,255,${b})`,
        tw: Math.random() * Math.PI * 2,
        ts: rand(0.003, 0.015),
        type: "bg",
      });
    }

    // ---- dust particles (used for faint glows) ----
    for (let arm = 0; arm < 2; arm++) {
      const base = (arm / 2) * Math.PI * 2;
      for (let mirror = 0; mirror < 2; mirror++) {
        const bAngle = mirror === 0 ? base : base + Math.PI;
        for (let i = 0; i < 240; i++) {
          const t = Math.pow(Math.random(), 0.6);
          const r = t * scale * rand(0.85, 1.05);
          const twist = t * Math.PI * 4.6;
          const spread = rand(0.12, 0.35) * (0.6 + t);
          const a = bAngle + twist + randN(0, spread);
          const alpha = rand(0.018, 0.06);
          const radius = rand(scale * 0.04, scale * 0.15);
          const hue = Math.random() < 0.5 ? "50,30,80" : "30,20,60";
          p.dust.push({ r, a, radius, alpha, hue });
        }
      }
    }
  };

  // ---------- projection helper ----------
  const project = (r, a, rot) => {
    const TILT = 0.18;
    return {
      x: Math.cos(a + rot) * r,
      y: Math.sin(a + rot) * r * TILT,
    };
  };

  // ---------- draw loop ----------
  const draw = (timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const p = paramsRef.current;
    const { W, H, cx, cy, R, stars, dust } = p;
    const angle = angleRef.current;

    ctx.clearRect(0, 0, W, H);

    ctx.save();
    ctx.translate(cx, cy);

    // ---- dust particles (glow) ----
    for (const d of dust) {
      const pt = project(d.r, d.a, angle);
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, d.radius);
      g.addColorStop(0, `rgba(${d.hue},${d.alpha * 2})`);
      g.addColorStop(0.5, `rgba(${d.hue},${d.alpha})`);
      g.addColorStop(1, `rgba(${d.hue},0)`);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, d.radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // ---- stars ----
    for (const s of stars) {
      s.tw += s.ts;
      const tf = 0.8 + 0.2 * Math.sin(s.tw);
      const sz = s.size * tf;
      const pt =
        s.type === "bg" ? project(s.r, s.a, 0) : project(s.r, s.a, angle);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, sz, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();

      // optional glow for larger stars
      if (sz > 1.2) {
        const gw = ctx.createRadialGradient(
          pt.x,
          pt.y,
          0,
          pt.x,
          pt.y,
          sz * 2.8,
        );
        const al = parseFloat(s.color.match(/[\d.]+\)$/)[0]) * 0.28;
        gw.addColorStop(0, s.color.replace(/[\d.]+\)$/, `${al})`));
        gw.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sz * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = gw;
        ctx.fill();
      }
    }

    // ---- central glow (core) ----
    const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.2);
    cg.addColorStop(0, "rgba(255, 255, 255, 1)");
    cg.addColorStop(0.08, "rgba(255, 255, 255, 1)");
    cg.addColorStop(0.22, "rgba(255, 255, 255, 1)");
    cg.addColorStop(0.5, "rgba(0,0,0,0)");
    cg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.save();
    ctx.scale(1, 0.18);
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();
    ctx.restore();

    // ---- inner core highlight ----
    const ci = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.05);
    ci.addColorStop(0, "rgba(255, 255, 255, 1)");
    ci.addColorStop(0.4, "rgba(255, 255, 255, 1)");
    ci.addColorStop(1, "rgba(255, 255, 255, 1)");
    ctx.save();
    ctx.scale(1, 0.18);
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.05, 0, Math.PI * 2);
    ctx.fillStyle = ci;
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // advance rotation & request next frame
    angleRef.current += 0.008;
    animationRef.current = requestAnimationFrame(draw);
  };

  // ---------- lifecycle ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // initial build
    setup(canvas);
    build();
    // start animation loop
    animationRef.current = requestAnimationFrame(draw);

    // handle resize
    const handleResize = () => {
      setup(canvas);
      build();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement || canvas);

    // cleanup on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default MilkyWay;
