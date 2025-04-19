'use client';

import React, { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  density: number;
  angle: number;
}

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const density = 20;

    // Initialize canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create points
    const createPoints = () => {
      points = [];
      for (let x = 0; x < canvas.width + density; x += density) {
        for (let y = 0; y < canvas.height + density; y += density) {
          const angle = Math.random() * Math.PI * 2;
          points.push({
            x: x + (Math.random() * density * 0.5),
            y: y + (Math.random() * density * 0.5),
            baseX: x,
            baseY: y,
            density: Math.random() * 30 + 40,
            angle,
          });
        }
      }
    };

    createPoints();

    // Draw the lines
    const drawLines = () => {
      if (!ctx) return;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Calculate the distance to other points and draw lines
        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];

          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move points
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const angleChange = 0.02; // Reduced angle change
        point.angle += (Math.random() - 0.5) * angleChange;

        point.x = point.baseX + Math.cos(point.angle) * point.density;
        point.y = point.baseY + Math.sin(point.angle) * point.density;
      }

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default CanvasBackground;

    