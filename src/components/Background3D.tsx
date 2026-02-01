"use client";

import React, { useEffect, useRef, useState } from "react";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface Demon {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export default function Background3D() {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [demons, setDemons] = useState<Demon[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize balls
  useEffect(() => {
    const initialBalls: Ball[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 20 + 15,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][Math.floor(Math.random() * 6)]
    }));
    setBalls(initialBalls);

    const initialDemons: Demon[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 30 + 40,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5
    }));
    setDemons(initialDemons);
  }, []);

  // Animate balls
  useEffect(() => {
    const animate = () => {
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;

          const maxX = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const maxY = typeof window !== 'undefined' ? window.innerHeight : 1080;

          // Bounce off walls
          if (newX <= ball.size || newX >= maxX - ball.size) {
            newVx = -newVx;
            newX = Math.max(ball.size, Math.min(maxX - ball.size, newX));
          }
          if (newY <= ball.size || newY >= maxY - ball.size) {
            newVy = -newVy;
            newY = Math.max(ball.size, Math.min(maxY - ball.size, newY));
          }

          return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      setDemons(prevDemons =>
        prevDemons.map(demon => {
          let newX = demon.x + demon.vx;
          let newY = demon.y + demon.vy;
          let newVx = demon.vx;
          let newVy = demon.vy;
          let newRotation = demon.rotation + demon.rotationSpeed;

          const maxX = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const maxY = typeof window !== 'undefined' ? window.innerHeight : 1080;

          // Bounce off walls
          if (newX <= demon.size || newX >= maxX - demon.size) {
            newVx = -newVx;
            newX = Math.max(demon.size, Math.min(maxX - demon.size, newX));
          }
          if (newY <= demon.size || newY >= maxY - demon.size) {
            newVy = -newVy;
            newY = Math.max(demon.size, Math.min(maxY - demon.size, newY));
          }

          return { ...demon, x: newX, y: newY, vx: newVx, vy: newVy, rotation: newRotation };
        })
      );
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-pink-500/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Moving Balls */}
        {balls.map(ball => (
          <div
            key={ball.id}
            className="absolute rounded-full shadow-lg"
            style={{
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              backgroundColor: ball.color,
              transform: 'translate(-50%, -50%)',
              opacity: 0.7,
              boxShadow: `0 0 ${ball.size}px ${ball.color}`,
              transition: 'none'
            }}
          />
        ))}

        {/* Demons Playing */}
        {demons.map(demon => (
          <div
            key={demon.id}
            className="absolute"
            style={{
              left: `${demon.x}px`,
              top: `${demon.y}px`,
              width: `${demon.size}px`,
              height: `${demon.size}px`,
              transform: `translate(-50%, -50%) rotate(${demon.rotation}deg)`,
              transition: 'none'
            }}
          >
            {/* Demon body (red/purple circle) */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${demon.size}px`,
                height: `${demon.size}px`,
                background: 'radial-gradient(circle, #ff4757 0%, #c44569 50%, #6c5ce7 100%)',
                boxShadow: `0 0 ${demon.size * 0.5}px #ff4757`,
                opacity: 0.8
              }}
            />
            {/* Demon eyes */}
            <div
              className="absolute rounded-full bg-yellow-300"
              style={{
                width: `${demon.size * 0.15}px`,
                height: `${demon.size * 0.15}px`,
                left: `${demon.size * 0.3}px`,
                top: `${demon.size * 0.35}px`,
                boxShadow: `0 0 ${demon.size * 0.1}px #feca57`
              }}
            />
            <div
              className="absolute rounded-full bg-yellow-300"
              style={{
                width: `${demon.size * 0.15}px`,
                height: `${demon.size * 0.15}px`,
                right: `${demon.size * 0.3}px`,
                top: `${demon.size * 0.35}px`,
                boxShadow: `0 0 ${demon.size * 0.1}px #feca57`
              }}
            />
            {/* Demon mouth (smile) */}
            <div
              className="absolute"
              style={{
                width: `${demon.size * 0.4}px`,
                height: `${demon.size * 0.2}px`,
                left: '50%',
                top: `${demon.size * 0.55}px`,
                transform: 'translateX(-50%)',
                border: `3px solid #2f3542`,
                borderTop: 'none',
                borderRadius: `0 0 ${demon.size * 0.2}px ${demon.size * 0.2}px`
              }}
            />
            {/* Demon horns */}
            <div
              className="absolute bg-red-600"
              style={{
                width: `${demon.size * 0.15}px`,
                height: `${demon.size * 0.2}px`,
                left: `${demon.size * 0.25}px`,
                top: `${demon.size * 0.1}px`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: 'rotate(-20deg)'
              }}
            />
            <div
              className="absolute bg-red-600"
              style={{
                width: `${demon.size * 0.15}px`,
                height: `${demon.size * 0.2}px`,
                right: `${demon.size * 0.25}px`,
                top: `${demon.size * 0.1}px`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: 'rotate(20deg)'
              }}
            />
          </div>
        ))}

        {/* 3D Animated shapes (background orbs) */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            willChange: 'transform'
          }}
        ></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
}
