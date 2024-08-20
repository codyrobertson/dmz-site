import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faTelegramPlane, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faSms } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faTwitter, faTelegramPlane, faWhatsapp, faSms);

interface ShareOption {
  name: string;
  icon: IconDefinition; // Use IconDefinition type for FontAwesomeIcon
  url?: string; // Optional URL field in case you want to provide a custom URL
}

interface SocialShareProps {
  text: string;
  buttonColor?: string;
  hoverColor?: string;
  focusRingColor?: string;
  darkButtonColor?: string;
  darkHoverColor?: string;
  darkFocusRingColor?: string;
}

const generateShareUrl = (name: string, text: string) => {
  const encodedText = encodeURIComponent(text);
  switch (name) {
    case 'Twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}`;
    case 'SMS':
      return `sms:?body=${encodedText}`;
    case 'Telegram':
      return `https://telegram.me/share/url?text=${encodedText}`;
    case 'Whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedText}`;
    default:
      return '#';
  }
};

const SocialShare: React.FC<SocialShareProps> = ({
  text,
  buttonColor = 'bg-blue-700',
  hoverColor = 'hover:bg-blue-800',
  focusRingColor = 'focus:ring-blue-300',
  darkButtonColor = 'dark:bg-blue-600',
  darkHoverColor = 'dark:hover:bg-blue-700',
  darkFocusRingColor = 'dark:focus:ring-blue-800',
}) => {
  const [shareOptions, setShareOptions] = useState<ShareOption[]>([
    { name: 'Twitter', icon: faTwitter },
  ]);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const asianCountries = ['IN', 'CN', 'JP', 'KR', 'SG', 'TH', 'VN', 'MY', 'PH', 'ID'];

    const checkWhatsapp = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const { country_code } = data;

        if (asianCountries.includes(country_code) || navigator.userAgent.includes('WhatsApp')) {
          setShareOptions((prevOptions) => [
            ...prevOptions,
            { name: 'Whatsapp', icon: faWhatsapp },
          ]);
        } else if (isMobile) {
          setShareOptions((prevOptions) => [
            ...prevOptions,
            { name: 'SMS', icon: faSms },
          ]);
        } else {
          setShareOptions((prevOptions) => [
            ...prevOptions,
            { name: 'Telegram', icon: faTelegramPlane },
          ]);
        }
      } catch (error) {
        console.error('Error fetching IP data:', error);
        if (isMobile) {
          setShareOptions((prevOptions) => [
            ...prevOptions,
            { name: 'SMS', icon: faSms },
          ]);
        } else {
          setShareOptions((prevOptions) => [
            ...prevOptions,
            { name: 'Telegram', icon: faTelegramPlane },
          ]);
        }
      }
    };

    checkWhatsapp();
  }, []);

  // Ensure only one Telegram icon is added
  const uniqueShareOptions = shareOptions.filter(
    (option, index, self) => index === self.findIndex((o) => o.name === option.name)
  );

  return (
    <div className="flex space-x-2">
      {uniqueShareOptions.map((option) => (
        <a
          key={option.name}
          href={option.url || generateShareUrl(option.name, text)}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-white ${buttonColor} ${hoverColor} focus:ring-4 focus:outline-none ${focusRingColor} font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 ${darkButtonColor} ${darkHoverColor} ${darkFocusRingColor}`}
          aria-label={`Share on ${option.name}`}
        >
          <FontAwesomeIcon icon={option.icon} className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
