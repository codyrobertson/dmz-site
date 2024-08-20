import React from 'react';
import useBrowserConditions from './browserConditions';

import React from 'react';
import useBrowserConditions from '../hooks/useBrowserConditions';

const WebShareAPI: React.FC = () => {
  const { isMobile } = useBrowserConditions();

  const handleShareClick = async () => {
    if (isMobile) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Add to Home Screen',
            url: window.location.href,
          });
        } catch (err) {
          console.error('Error using Web Share API:', err);
        }
      } else {
        alert('Web Share API is not supported in your browser.');
      }
    } else {
      alert('This feature is only available on mobile devices.');
    }

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (!registration.active) {
          if (navigator.share) {
            try {
              await navigator.share({
                title: 'Add to Home Screen',
                url: window.location.href,
              });
            } catch (err) {
              console.error('Error using Web Share API:', err);
            }
          } else {
            alert('Web Share API is not supported in your browser.');
          }
        }
      } catch (error) {
        console.error('Service Worker error', error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShareClick}
      className="relative group focus:outline-none text-white bg-purple-600 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-8 py-4 mb-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-900 overflow-hidden"
    >
      <span className="relative z-10">Share</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-out"></div>
    </button>
  );
};

export default WebShareAPI;