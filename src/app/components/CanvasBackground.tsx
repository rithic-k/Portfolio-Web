'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Line {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  angle: number;
}

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Initialize canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Function to generate a random number within a range
    const random = (min: number, max: number): number => Math.random() * (max - min) + min;

    // Function to create initial lines
    const createLines = () => {
      const newLines: Line[] = [];
      for (let i = 0; i < 50; i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const dx = random(-0.5, 0.5);
        const dy = random(-0.5, 0.5);
        const length = random(20, 50);
        const angle = random(0, 2 * Math.PI);
        newLines.push({ x, y, dx, dy, length, angle });
      }
      setLines(newLines);
    };

    createLines();

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setLines(prevLines => {
        return prevLines.map(line => {
          let { x, y, dx, dy, length, angle } = line;

          // Update position
          x += dx;
          y += dy;

          // Bounce off edges
          if (x < 0 || x > canvas.width) dx *= -1;
          if (y < 0 || y > canvas.height) dy *= -1;

           // Slightly change direction randomly
           if (Math.random() < 0.01) {
            angle += random(-0.1, 0.1);
          }

          // Draw line
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();

          return { ...line, x, y, dx, dy, angle };
        });
      });
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
      }}
    />
  );
};

export default CanvasBackground;
