import React, { useEffect, useRef, useState } from "react";
import { addPropertyControls, ControlType } from "framer";

const generateStars = (count, size, seed, width, height) => {
  const stars = [];
  const random = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random() * width,
      y: random() * height,
      size,
      twinkleDelay: random() * 5,
    });
  }
  return stars;
};

const mulberry32 = (a) => () => {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function StarfieldComponent({
  backgroundColor,
  starColor,
  smallStarDensity,
  mediumStarDensity,
  largeStarDensity,
  randomSeed,
  glowEnabled,
  glowColor,
  glowIntensity,
}) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = dimensions.width;
    const height = dimensions.height;

    const smallStars = generateStars(
      smallStarDensity,
      1,
      randomSeed,
      width,
      height
    );
    const mediumStars = generateStars(
      mediumStarDensity,
      2,
      randomSeed + 1,
      width,
      height
    );
    const largeStars = generateStars(
      largeStarDensity,
      3,
      randomSeed + 2,
      width,
      height
    );
    const allStars = [...smallStars, ...mediumStars, ...largeStars];

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);
      allStars.forEach((star) => {
        ctx.fillStyle = starColor;
        ctx.shadowBlur = glowEnabled ? glowIntensity : 0;
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    drawStars();
  }, [
    backgroundColor,
    starColor,
    smallStarDensity,
    mediumStarDensity,
    largeStarDensity,
    randomSeed,
    glowEnabled,
    glowColor,
    glowIntensity,
    dimensions,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at bottom, ${backgroundColor} 0%, #090A0F 100%)`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {dimensions.width > 0 && (
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}

StarfieldComponent.defaultProps = {
  backgroundColor: "#1B2735",
  starColor: "#FFFFFF",
  smallStarDensity: 100,
  mediumStarDensity: 50,
  largeStarDensity: 25,
  randomSeed: 12345,
  glowEnabled: true,
  glowColor: "#FFFFFF",
  glowIntensity: 10,
};

addPropertyControls(StarfieldComponent, {
  backgroundColor: { type: ControlType.Color, title: "Background Color" },
  starColor: { type: ControlType.Color, title: "Star Color" },
  smallStarDensity: {
    type: ControlType.Number,
    title: "Small Star Density",
    min: 0,
    max: 1000,
    step: 10,
  },
  mediumStarDensity: {
    type: ControlType.Number,
    title: "Medium Star Density",
    min: 0,
    max: 500,
    step: 10,
  },
  largeStarDensity: {
    type: ControlType.Number,
    title: "Large Star Density",
    min: 0,
    max: 200,
    step: 10,
  },
  randomSeed: {
    type: ControlType.Number,
    title: "Random Seed",
    min: 0,
    max: 100000,
    step: 1,
  },
  glowEnabled: {
    type: ControlType.Boolean,
    title: "Glow Enabled",
    defaultValue: true,
  },
  glowColor: {
    type: ControlType.Color,
    title: "Glow Color",
    defaultValue: "#FFFFFF",
    hidden: (props) => !props.glowEnabled,
  },
  glowIntensity: {
    type: ControlType.Number,
    title: "Glow Intensity",
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 10,
    hidden: (props) => !props.glowEnabled,
  },
});

export default StarfieldComponent;
