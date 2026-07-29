"use client";

import { useEffect, useRef } from "react";

const GOLD = "#a855f7";
const BLUE = "#7c3aed";

const CODE_LINES = [
  "import { Krevo } from '@krevo/core'",
  "const platform = await Krevo.build({",
  "  modules: ['crm', 'inventory'],",
  "  deploy: 'production',",
  "})",
  "await platform.sync()",
  "export default platform",
];

function strokeRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.stroke();
}

export function HeroWorkspaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let time = 0;
    let smoothMx = 0;
    let smoothMy = 0;
    let clickPulse = 0;
    let loadProgress = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      time += 16;

      const targetMx = mouseRef.current.active ? mouseRef.current.x : 0;
      const targetMy = mouseRef.current.active ? mouseRef.current.y : 0;
      smoothMx += (targetMx - smoothMx) * 0.06;
      smoothMy += (targetMy - smoothMy) * 0.06;

      const tiltX = smoothMx * 12;
      const tiltY = smoothMy * 10;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + tiltX;
      const cy = h / 2 + tiltY;

      // Laptop
      const laptopW = Math.min(w * 0.52, 320);
      const laptopH = laptopW * 0.62;
      const laptopX = cx - laptopW / 2 - w * 0.06;
      const laptopY = cy - laptopH / 2 + tiltY * 0.3;

      const screenH = laptopH * 0.72;
      const baseH = laptopH * 0.28;

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = GOLD;
      strokeRoundRect(ctx, laptopX, laptopY, laptopW, screenH, 6);

      // Screen inner (code editor)
      const pad = 10;
      const innerX = laptopX + pad;
      const innerY = laptopY + pad + 14;
      const innerW = laptopW - pad * 2;
      const innerH = screenH - pad * 2 - 14;

      ctx.strokeStyle = BLUE;
      ctx.globalAlpha = 0.5;
      strokeRoundRect(ctx, innerX, innerY, innerW, innerH, 3);
      ctx.globalAlpha = 1;

      // Window dots
      ctx.fillStyle = GOLD;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(laptopX + 16 + i * 10, laptopY + 10, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scrolling code
      const lineH = 14;
      const scroll = (time * 0.025) % (CODE_LINES.length * lineH + 20);
      ctx.font = "10px ui-monospace, monospace";
      CODE_LINES.forEach((line, i) => {
        const ly = innerY + 8 + i * lineH - scroll;
        if (ly > innerY && ly < innerY + innerH - 4) {
          ctx.fillStyle = i % 2 === 0 ? GOLD : BLUE;
          ctx.globalAlpha = 0.85;
          ctx.fillText(line, innerX + 8, ly);
          ctx.globalAlpha = 1;
        }
      });

      // Cursor blink in editor
      const blink = Math.floor(time / 500) % 2 === 0;
      if (blink) {
        ctx.fillStyle = GOLD;
        ctx.fillRect(innerX + 8, innerY + innerH - 22, 6, 10);
      }

      // Laptop base
      ctx.strokeStyle = GOLD;
      ctx.beginPath();
      ctx.moveTo(laptopX - 8, laptopY + screenH);
      ctx.lineTo(laptopX + laptopW + 8, laptopY + screenH);
      ctx.lineTo(laptopX + laptopW + 14, laptopY + screenH + baseH);
      ctx.lineTo(laptopX - 14, laptopY + screenH + baseH);
      ctx.closePath();
      ctx.stroke();

      // Browser window
      const browserW = Math.min(w * 0.38, 220);
      const browserH = browserW * 0.75;
      const browserX = cx + w * 0.08 + tiltX * 0.5;
      const browserY = cy - h * 0.22 + tiltY * 0.4;

      ctx.strokeStyle = BLUE;
      strokeRoundRect(ctx, browserX, browserY, browserW, browserH, 5);

      // Address bar
      ctx.strokeStyle = GOLD;
      ctx.globalAlpha = 0.6;
      strokeRoundRect(
        ctx,
        browserX + 10,
        browserY + 10,
        browserW - 20,
        16,
        3,
      );
      ctx.globalAlpha = 1;

      ctx.font = "8px ui-monospace, monospace";
      ctx.fillStyle = BLUE;
      ctx.fillText("krevo.app / loading...", browserX + 16, browserY + 21);

      // Loading bar
      loadProgress = (loadProgress + 0.004) % 1.05;
      const barW = browserW - 24;
      ctx.strokeStyle = GOLD;
      ctx.globalAlpha = 0.3;
      strokeRoundRect(ctx, browserX + 12, browserY + 36, barW, 6, 2);
      ctx.globalAlpha = 1;
      ctx.fillStyle = BLUE;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.roundRect(
        browserX + 12,
        browserY + 36,
        barW * Math.min(loadProgress, 1),
        6,
        2,
      );
      ctx.fill();
      ctx.globalAlpha = 1;

      // Browser content skeleton
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = i % 2 === 0 ? GOLD : BLUE;
        ctx.globalAlpha = 0.25 + loadProgress * 0.3;
        strokeRoundRect(
          ctx,
          browserX + 12,
          browserY + 52 + i * 22,
          browserW - 24 - i * 15,
          14,
          2,
        );
        ctx.globalAlpha = 1;
      }

      // Animated mouse cursor
      const cursorPathT = time * 0.0012;
      const cursorX =
        laptopX +
        laptopW * 0.5 +
        Math.sin(cursorPathT) * (laptopW * 0.35) +
        smoothMx * 25;
      const cursorY =
        laptopY +
        screenH * 0.55 +
        Math.cos(cursorPathT * 0.85) * (screenH * 0.25) +
        smoothMy * 20;

      if (Math.sin(cursorPathT * 4) > 0.92) clickPulse = 1;
      clickPulse = Math.max(0, clickPulse - 0.04);

      // Mouse body wireframe
      ctx.save();
      ctx.translate(cursorX, cursorY);
      ctx.rotate(-0.3 + smoothMx * 0.15);
      ctx.strokeStyle = clickPulse > 0.3 ? BLUE : GOLD;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 18);
      ctx.lineTo(5, 14);
      ctx.lineTo(9, 22);
      ctx.lineTo(12, 20);
      ctx.lineTo(8, 12);
      ctx.lineTo(14, 12);
      ctx.closePath();
      ctx.stroke();

      if (clickPulse > 0.2) {
        ctx.strokeStyle = BLUE;
        ctx.globalAlpha = clickPulse * 0.6;
        ctx.beginPath();
        ctx.arc(4, 10, 8 + (1 - clickPulse) * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();

      // Connection line laptop → browser
      ctx.strokeStyle = GOLD;
      ctx.globalAlpha = 0.2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(laptopX + laptopW, laptopY + screenH * 0.4);
      ctx.lineTo(browserX, browserY + browserH * 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-[280px] w-full sm:h-[360px] lg:h-[520px]"
      aria-hidden="true"
    />
  );
}
