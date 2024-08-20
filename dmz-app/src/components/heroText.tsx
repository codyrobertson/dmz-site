import React from 'react';
import useBrowserConditions from './browserConditions';
import Balancer from 'react-wrap-balancer';

const HeroText: React.FC = () => {
  const { isMobile } = useBrowserConditions();

  const gradientStyle = {
    background: 'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(171, 163, 192) 43.0372%, rgb(183, 138, 241) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <div className="text-center px-4">
      {isMobile ? (
        <>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-none text-gray-50 md:text-5xl lg:text-6xl dark:text-[rgba(255,255,255,1)]" style={gradientStyle}>
            <Balancer>Add DMZ To Your Home Screen</Balancer>
          </h1>
          <p className="mb-8 text-lg font-normal text-[rgba(158,162,173,1)] lg:text-xl sm:px-16 xl:px-48 dark:text-[rgba(158,162,173,1)]">
            <Balancer>Follow the prompts below and tap the button to get started</Balancer>
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-4 text-4xl font-medium tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-[rgba(255,255,255,1)]" style={gradientStyle}>
            <Balancer>DMZ Is Best Experienced On Mobile</Balancer>
          </h1>
          <p className="mb-8 text-lg font-normal text-[rgba(158,162,173,1)] lg:text-xl sm:px-16 xl:px-48 dark:text-[rgba(158,162,173,1)]">
            <Balancer>
              It looks like you're on a desktop or tablet. 
              <br />
              To use DMZ, please switch to your mobile device.
            </Balancer>
          </p>
        </>
      )}
    </div>
  );
};

export default HeroText;
