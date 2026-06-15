"use client";

import { useEffect, useRef } from "react";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 40,
  particleColor = "#60a5fa",
  className,
}: SparklesProps) {
  var canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; fadeDir: number }> = [];
    var animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      particles = [];
      var count = Math.floor((canvas!.width * canvas!.height) / (10000 / particleDensity));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: minSize + Math.random() * (maxSize - minSize),
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random(),
          fadeDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.008;

        if (p.opacity <= 0.1) p.fadeDir = 1;
        if (p.opacity >= 1) p.fadeDir = -1;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", function() { resize(); init(); });

    return function() {
      cancelAnimationFrame(animId);
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ background: background }}
      className={"absolute inset-0 h-full w-full " + (className || "")}
    />
  );
}
