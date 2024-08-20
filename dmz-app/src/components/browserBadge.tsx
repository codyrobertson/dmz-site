import React, { useEffect, useMemo } from 'react';
import useBrowserConditions from './browserConditions';
import { getBrowserIcon } from 'react-browser-icons';

const allowedBrowsers = ["Chrome", "Firefox", "Safari", "Opera", "Edge", "IE", "Brave", "Mobile Safari", "Samsung", "Chromium"] as const;
type BrowserType = typeof allowedBrowsers[number];

const BrowserBadge: React.FC = () => {
  const { browser, device } = useBrowserConditions();

  useEffect(() => {
    console.log(`Detected device: ${device}, browser: ${browser}`);
  }, [device, browser]);

  const BrowserIcon = useMemo(() => {
    if (!browser) return null;

    let browserType: BrowserType | undefined;

    if (allowedBrowsers.includes(browser as BrowserType)) {
      browserType = browser as BrowserType;
    } else if (browser.includes('Brave')) {
      browserType = 'Chromium';
    }

    if (!browserType) return null;

    try {
      const iconProps = {
        browser: browserType,
        className: 'h-5 w-5 mr-3',
        size: 20,
        bg: false,
      };

      const IconComponent = getBrowserIcon(iconProps);

      if (!IconComponent) {
        console.error(`No icon found for browser: ${browser}`);
        return null;
      }

      return IconComponent;
    } catch (error) {
      console.error(`Error getting browser icon for ${browser}: ${error}`);
      return null;
    }
  }, [browser]);

  return (
    <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white bg-gray-800 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700" role="alert">
      {BrowserIcon || <span className="h-5 w-5 mr-3">🌐</span>}
      <span>{device ? device : 'Unknown OS'} | {browser ? browser : "Unknown Browser"}</span>
    </div>
  );
};

export default BrowserBadge;
