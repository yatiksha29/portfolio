import { useEffect, useRef } from "react";

interface P { x: number; y: number; vx: number; vy: number }

export default function Network() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const x = c.getContext("2d")!;
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let w = 0, h = 0, raf = 0;
    let pts: P[] = [];
    const m = { x: -999, y: -999 };
    const frame = () => {
      x.clearRect(0, 0, w, h);
      const g = getComputedStyle(document.documentElement).getPropertyValue("--net").trim();
      for (const p of pts) {
        if (!rm) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        x.fillStyle = `rgba(${g},.6)`;
        x.beginPath(); x.arc(p.x, p.y, 1.6, 0, 6.3); x.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            x.strokeStyle = `rgba(${g},${0.24 * (1 - d / 130)})`;
            x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
          }
        }
        const d = Math.hypot(pts[i].x - m.x, pts[i].y - m.y);
        if (d < 170) {
          x.strokeStyle = `rgba(${g},${0.55 * (1 - d / 170)})`;
          x.beginPath(); x.moveTo(pts[i].x, pts[i].y); x.lineTo(m.x, m.y); x.stroke();
        }
      }
      if (!rm) raf = requestAnimationFrame(frame);
    };
    const size = () => {
      const r = devicePixelRatio || 1;
      w = innerWidth; h = innerHeight;
      c.width = w * r; c.height = h * r;
      x.setTransform(r, 0, 0, r, 0, 0);
      pts = Array.from({ length: Math.min(Math.round((w * h) / 17000), 90) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
      if (rm) frame();
    };
    const move = (e: PointerEvent) => { m.x = e.clientX; m.y = e.clientY; };
    addEventListener("resize", size);
    addEventListener("pointermove", move);
    size();
    if (!rm) frame();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); };
  }, []);
  return <canvas id="net" ref={ref} />;
}