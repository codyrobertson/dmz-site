import React from 'react';
import HeroText from './heroText';
import ShinyButton from './shinyButton';
import useBrowserConditions from './browserConditions';
import BrowserBadge from './browserBadge';
import Instructions from './Instructions';
import Balancer from 'react-wrap-balancer';

const MainContent: React.FC = () => {
  const { isMobile, device, browser } = useBrowserConditions();

  return (
    <section className="flex-grow background-image-stars flex items-center justify-center" style={{ backgroundImage: 'url(/images/Background.png)', minHeight: isMobile ? '70vh' : '90vh' }}>
      <div className={`py-8 px-4 mx-auto h-full max-w-screen-xl text-center lg:py-24 lg:px-12`}>
        <BrowserBadge />
        <HeroText />
        <div className={`flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 ${isMobile ? 'items-center px-6' : ''}`}>
          <ShinyButton text={isMobile ? "Add To Home Screen" : "Get Mobile Link"} className={isMobile ? "w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" : ""} />
        </div>
        <Instructions device={device} browser={browser} />
        <div className={`px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 ${isMobile ? 'flex flex-col items-center' : ''}`}>
          <Balancer>
            <span className="font-semibold text-gray-400 uppercase">FEATURED IN</span>
            <div className={`flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between ${isMobile ? 'flex-col' : ''}`}>
              <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-400 dark:hover:text-gray-400">
                <svg className="h-8" viewBox="0 0 132 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                </svg>
              </a>
            </div>
          </Balancer>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
