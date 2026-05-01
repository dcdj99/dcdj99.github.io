import { useEffect, useRef } from "react";
import { useTheme } from "../../lib/theme";

type Dot = { x: number; y: number; vx: number; vy: number };

const DOTS = 60;
const LINK_DIST = 110;
const POINTER_DIST = 160;

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pointer = { x: -1000, y: -1000 };
    const dots: Dot[] = [];
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }

    function init() {
      dots.length = 0;
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      for (let i = 0; i < DOTS; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { pointer = { x: -1000, y: -1000 }; };

    function tick() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const inkColor = theme === "dark" ? "rgba(232,226,212," : "rgba(26,22,20,";
      const accent = theme === "dark" ? "rgba(217,119,87," : "rgba(180,83,58,";

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.25;
            ctx!.strokeStyle = `${inkColor}${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const d of dots) {
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_DIST) {
          const alpha = 1 - dist / POINTER_DIST;
          ctx!.strokeStyle = `${accent}${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.beginPath();
          ctx!.moveTo(d.x, d.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = `${inkColor}0.6)`;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
