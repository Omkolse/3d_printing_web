import { useEffect, useRef } from "react";

interface FloatingCubeProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingCube = ({ size = 100, className = "", style }: FloatingCubeProps) => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let rotateX = 0;
    let rotateY = 0;

    const animate = () => {
      rotateX += 0.5;
      rotateY += 0.5;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={`perspective-card ${className}`} style={{ width: size, height: size, ...style }}>
      <div
        ref={cubeRef}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.1s linear",
        }}
      >
        {/* Cube faces */}
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/25 to-accent/25 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/25 to-accent/25 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 backdrop-blur-sm"
          style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
      </div>
    </div>
  );
};
