import React from 'react';
import DownloadPage from './pages/downloadPage';

function App() {
  React.useEffect(() => {
    // Register the service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }, []);

  return (
    <div className="App" style={{ height: '100vh' }}>
      <DownloadPage />
    </div>
  );
}

export default App;