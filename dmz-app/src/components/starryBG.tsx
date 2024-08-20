import React from 'react';

interface StarryBGProps {
  starsDensity: number;
  colors: string[];
  randomSeed: number;
  twinkleDuration: number;
  twinkleProbability: number;
  backgroundColor: string;
}

const generateBoxShadow = (n: number, colors: string[], randomSeed: number): string => {
  const random = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  let value = `${random(randomSeed) * 2000}px ${random(randomSeed + 1) * 2000}px ${colors[0]}`;
  for (let i = 2; i <= n; i++) {
    const color = colors[i % colors.length];
    value += `, ${random(randomSeed + i) * 2000}px ${random(randomSeed + i + 1) * 2000}px ${color}`;
  }

  return value;
};

const StarryBG: React.FC<StarryBGProps> = ({ starsDensity, colors, randomSeed, twinkleDuration, backgroundColor }) => {
  const smallStars = generateBoxShadow(starsDensity * 0.7, colors, randomSeed);
  const mediumStars = generateBoxShadow(starsDensity * 0.2, colors, randomSeed + 1000);
  const bigStars = generateBoxShadow(starsDensity * 0.1, colors, randomSeed + 2000);

  const starStyle = (boxShadow: string, size: number): React.CSSProperties => ({
    width: `${size}px`,
    height: `${size}px`,
    background: 'transparent',
    boxShadow,
    animation: `animStar ${twinkleDuration}s linear infinite`,
  });

  return (
    <div style={{ height: '100%', background: `radial-gradient(ellipse at bottom, ${backgroundColor} 0%, #090A0F 100%)`, overflow: 'hidden' }}>
      <div id="stars" style={starStyle(smallStars, 1)}></div>
      <div id="stars2" style={starStyle(mediumStars, 2)}></div>
      <div id="stars3" style={starStyle(bigStars, 3)}></div>
      <style>
        {`
          @keyframes animStar {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
        `}
      </style>
    </div>
  );
};

export default StarryBG;
