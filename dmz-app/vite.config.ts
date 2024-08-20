import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'DMZ.FUN App',
        short_name: 'DMZ',
        description: 'Join DMZ.FUN to trade, swap, and launch memecoins effortlessly with friends. Discover top tokens and enjoy a seamless, secure trading experience on Solana. Available on mobile.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0B0C0E',
        theme_color: '#924FE8',
        icons: [
          {
            src: '/images/icons/android-icons/android-icon-512x512-48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/images/icons/android-icons/android-icon-512x512-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/images/icons/app-icons/icon-512x512-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/icons/apple-touch/apple-touch-icon-512x512-48.png',
            sizes: '48x48',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  server: {
    host: '0.0.0.0', // Listen on all addresses, including LAN
    port: 3000,      // You can change this to any port you prefer
  }
});
