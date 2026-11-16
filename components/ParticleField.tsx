"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
};

const ACCENT = "255, 153, 0";
const NEUTRAL = "200, 200, 200";
const MAX_SPAWNED = 40;

/**
 * Interactive particle background. Sized to the viewport (not the page),
 * capped in density and pixel ratio, paused when the tab is hidden, and
 * drawn as a single static frame when the user prefers reduced motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let spawned = 0;
    let frame = 0;
    const mouse = { x: -9999, y: -9999 };

    const randomParticle = (accent: boolean, x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * width,
      y: y ?? Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.8,
      accent,
    });

    const resize = (reseed = true) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!reseed) return;
      const count = Math.min(90, Math.round((width * height) / 16000));
      particles = Array.from({ length: count }, (_, i) => randomParticle(i % 3 === 0));
      spawned = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(150, Math.max(90, width / 9));
      const linkDist2 = linkDist * linkDist;
      const mouseDist2 = 180 * 180;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const color = a.accent ? ACCENT : NEUTRAL;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (a.accent !== b.accent) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - d2 / linkDist2) * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const mx = a.x - mouse.x;
        const my = a.y - mouse.y;
        const md2 = mx * mx + my * my;
        if (md2 < mouseDist2) {
          ctx.strokeStyle = `rgba(${color}, ${(1 - md2 / mouseDist2) * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${color}, ${a.accent ? 0.9 : 0.55})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (motionQuery.matches || document.hidden) draw();
      else frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onClick = (e: MouseEvent) => {
      // Don't spawn when clicking links, buttons, or selecting text in cards.
      if ((e.target as HTMLElement).closest("a, button, .card")) return;
      const p = randomParticle(true, e.clientX, e.clientY);
      p.vx *= 3;
      p.vy *= 3;
      particles.push(p);
      if (++spawned > MAX_SPAWNED) {
        // Spawned particles sit at the end of the array; drop the oldest one.
        particles.splice(particles.length - spawned, 1);
        spawned--;
      }
      if (motionQuery.matches) draw();
    };
    const onResize = () => {
      // Mobile browsers resize the viewport height while scrolling (address
      // bar); only reseed when the width changes so the field doesn't jump.
      const widthChanged = window.innerWidth !== width;
      resize(widthChanged);
      if (!widthChanged) {
        for (const p of particles) p.y = Math.min(p.y, height);
      }
      start();
    };
    const onVisibility = () => start();

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
