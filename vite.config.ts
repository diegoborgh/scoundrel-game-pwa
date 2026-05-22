import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'assets/favicon.png',
        'assets/deck.webp',
        'assets/heart.webp',
        'assets/club-1.webp',
        'assets/club-2.webp',
        'assets/club-3.webp',
        'assets/spade-1.webp',
        'assets/spade-2.webp',
        'assets/spade-3.webp',
        'assets/diamond-1.webp',
        'assets/diamond-2.webp',
        'assets/diamond-3.webp',
      ],
      manifest: {
        name: 'Scoundrel — Dungeon Card Game',
        short_name: 'Scoundrel',
        description: 'A solo dungeon-crawling card game.',
        theme_color: '#0d0d0d',
        background_color: '#0d0d0d',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,ico,woff,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
