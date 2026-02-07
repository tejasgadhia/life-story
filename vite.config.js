import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // treemap, sunburst, network
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Exclude on-demand data chunks and dev artifacts from precache
        globIgnores: [
          'stats.html',
          'assets/19*-*.js',   // Year data chunks (1946-1999)
          'assets/20*-*.js',   // Year data chunks (2000-2012)
          'assets/january-*.js', 'assets/february-*.js', 'assets/march-*.js',
          'assets/april-*.js', 'assets/may-*.js', 'assets/june-*.js',
          'assets/july-*.js', 'assets/august-*.js', 'assets/september-*.js',
          'assets/october-*.js', 'assets/november-*.js', 'assets/december-*.js',
          'assets/heatmap-*.js',
        ],
        runtimeCaching: [
          {
            // Cache data chunks on first access (year data, birthday data, heatmap)
            urlPattern: /\/assets\/(19|20)\d{2}-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'life-story-year-data',
              expiration: {
                maxEntries: 70,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\/assets\/(january|february|march|april|may|june|july|august|september|october|november|december)-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'life-story-birthday-data',
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\/assets\/heatmap-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'life-story-heatmap',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      manifest: false,
    })
  ],
  base: '/life-story/'
})
