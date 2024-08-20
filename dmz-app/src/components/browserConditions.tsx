import { useState, useEffect } from 'react';

interface BrowserConditions {
  isMobile: boolean;
  device: string;
  browser: string;
  os: string;
}

const useBrowserConditions = (): BrowserConditions => {
  const [isMobile, setIsMobile] = useState(false);
  const [device, setDevice] = useState('');
  const [browser, setBrowser] = useState('');
  const [os, setOs] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    console.log(`User agent: ${userAgent}`);

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
    
    if (isAndroid || isIOS) {
      setIsMobile(true);
      setDevice(isAndroid ? 'Android' : 'iOS');
      console.log(`Detected device: ${isAndroid ? 'Android' : 'iOS'}`);
    }

    if (/chrome|CriOS/i.test(userAgent)) {
      setBrowser('Chrome');
    } else if (/firefox/i.test(userAgent)) {
      setBrowser('Firefox');
    } else if (/safari/i.test(userAgent) && !/chrome|CriOS/i.test(userAgent)) {
      setBrowser('Safari');
    } else if (/opr|opera/i.test(userAgent)) {
      setBrowser('Opera');
    } else if (/edg/i.test(userAgent)) {
      setBrowser('Edge');
    } else if (/trident/i.test(userAgent)) {
      setBrowser('IE');
    } else if (/brave/i.test(userAgent)) {
      setBrowser('Brave');
    } else {
      setBrowser('Other');
    }

    if (/windows nt 10.0/i.test(userAgent)) {
      setOs('Windows 10');
    } else if (/windows nt 6.3/i.test(userAgent)) {
      setOs('Windows 8.1');
    } else if (/windows nt 6.2/i.test(userAgent)) {
      setOs('Windows 8');
    } else if (/windows nt 6.1/i.test(userAgent)) {
      setOs('Windows 7');
    } else if (/windows nt 6.0/i.test(userAgent)) {
      setOs('Windows Vista');
    } else if (/windows nt 5.1/i.test(userAgent)) {
      setOs('Windows XP');
    } else if (/macintosh|mac os x/i.test(userAgent)) {
      setOs('MacOS');
    } else if (/linux/i.test(userAgent)) {
      setOs('Linux');
    } else if (isAndroid) {
      setOs('Android');
    } else if (isIOS) {
      setOs('iOS');
    } else {
      setOs('Other');
    }

    console.log(`Detected browser: ${browser}`);
    console.log(`Detected OS: ${os}`);
  }, [browser, os]);

  return { isMobile, device, browser, os };
};

export default useBrowserConditions;
