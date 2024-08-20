import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import ReactDOM from 'react-dom';
import useBrowserConditions from './browserConditions';

interface ShinyButtonProps {
  text: string;
  className?: string;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ text, className }) => {
  const { isMobile } = useBrowserConditions();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("Add to Home Screen is not supported in this browser. Please use the browser's menu to add to home screen.");
    }
  };

  const handleClick = async () => {
    if (isMobile) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Check this out!',
            text: 'Visit this website',
            url: window.location.href,
          });
        } catch (err) {
          console.error('Error using Web Share API:', err);
        }
      } else {
        alert('Web Share API is not supported in your browser. Please try another browser or device.');
      }
    } else {
      // Show the QR code modal for desktop users
      showQRCodeModal();
    }

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration.active) {
          console.log('Service worker is active');
        }
      } catch (error) {
        console.error('Service Worker error', error);
      }
    }
  };

  const showQRCodeModal = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 flex items-center justify-center bg-black-900 bg-opacity-0 backdrop-blur-sm z-50 pointer-events-auto select-none transition-opacity duration-300';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg w-80 h-80 flex flex-col items-center justify-center transform transition-transform duration-300 scale-0">
        <h2 class="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Scan the QR Code</h2>
        <div id="qrcode" class="mb-4"></div>
        <button class="px-4 py-2 bg-purple-700 text-white rounded-lg" id="closeModal">Close</button>
      </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => {
      const modalContent = modal.querySelector('div');
      if (modalContent) {
        modalContent.classList.remove('scale-0');
        modalContent.classList.add('scale-100');
      }
      modal.classList.remove('bg-opacity-0');
      modal.classList.add('bg-opacity-70');
    }, 10);

    const qrCodeElement = document.getElementById('qrcode');
    if (qrCodeElement) {
      ReactDOM.render(
        <QRCode
          value={window.location.href}
          fgColor="#FFFFFF"
          bgColor="#1F2937"
          size={128}
          level="H"
        />,
        qrCodeElement
      );
    }

    const closeModalButton = document.getElementById('closeModal');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => {
        const modalContent = modal.querySelector('div');
        if (modalContent) {
          modalContent.classList.remove('scale-100');
          modalContent.classList.add('scale-0');
          modal.classList.remove('bg-opacity-70');
          modal.classList.add('bg-opacity-0');
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        }
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative group focus:outline-none text-white bg-purple-600 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-8 py-4 mb-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-900 overflow-hidden ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-out"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1.2s_infinite]"></div>
    </button>
  );
};

export default ShinyButton;
