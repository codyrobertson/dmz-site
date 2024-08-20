import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => (
  <footer className="bg-dark-secondary shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-dark-secondary antialiased">
    <p className="mb-4 text-sm text-center text-gray-100 sm:mb-0">
      &copy; 2024 <a href="https://dmz.fun/" className="hover:underline" target="_blank" rel="noopener noreferrer">DMZ.FUN</a>. All rights reserved.
    </p>
    <div className="flex justify-center items-center space-x-1">
      <a href="#" data-tooltip-target="tooltip-twitter" className="inline-flex justify-center p-2 text-gray-100 rounded-lg cursor-pointer hover:text-gray-10 hover:bg-gray-600">
        <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
        <span className="sr-only">Twitter</span>
      </a>
      <div id="tooltip-twitter" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-semantic-neutral-0 bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
        Follow us on Twitter
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <a href="#" data-tooltip-target="tooltip-email" className="inline-flex justify-center p-2 text-gray-100 rounded-lg cursor-pointer hover:text-gray-10 hover:bg-gray-600">
        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
        <span className="sr-only">Email</span>
      </a>
      <div id="tooltip-email" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-semantic-neutral-0 bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
        Contact us via Email
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <a href="#" data-tooltip-target="tooltip-telegram" className="inline-flex justify-center p-2 text-gray-100 rounded-lg cursor-pointer hover:text-gray-10 hover:bg-gray-600">
        <FontAwesomeIcon icon={faTelegramPlane} className="w-4 h-4" />
        <span className="sr-only">Telegram</span>
      </a>
      <div id="tooltip-telegram" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-semantic-neutral-0 bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
        Join us on Telegram
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </footer>
);

export default Footer;
