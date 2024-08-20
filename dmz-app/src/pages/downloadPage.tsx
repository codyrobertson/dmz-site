import React from 'react';
import Header from '../components/header';
import MainContent from '../components/mainContent';
import Footer from '../components/footer';
import AppBanner from '../components/appBanner';

const DownloadPage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none">
        <AppBanner />
      </div>
      <div className="flex-none">
        <Header />
      </div>
      <div className="flex-none">
        <MainContent />
      </div>
      <div className="flex-grow">
        <Footer />
      </div>
    </div>
  );
};

export default DownloadPage;
