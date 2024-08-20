import React from 'react';
import SocialShare from './socialShare';

// Define the Header component
const Header: React.FC = () => {
  return (
    <header style={{ zIndex: 3 }}>
      <nav className="bg-black border-gray-200 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl sm:max-w-screen-xl">
          {/* Logo and link to the homepage */}
          <a href="https:/www.dmz.fun" className="flex items-center">
            <img src="/images/Logo.svg" className="mr-2 h-6 sm:mr-3 sm:h-7" alt="DMZ Logo" />
          </a>
          <div className="flex items-center lg:order-2">
            {/* SocialShare component with various props */}
            <SocialShare 
              text="Share" 
              buttonColor="bg-gray-200" 
              hoverColor="bg-gray-100" 
              focusRingColor="focus:ring-gray-300" 
              darkButtonColor="dark:bg-gray-600" 
              darkHoverColor="dark:hover:bg-gray-700" 
              darkFocusRingColor="dark:focus:ring-gray-800" 
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
