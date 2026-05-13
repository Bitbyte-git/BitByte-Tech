import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'i18next', 'react-i18next'],
  },
  build: {
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 700,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/locales/')) {
            const localeName = id.match(/([^/]+)\.json$/)?.[1] || 'messages'
            return `locale-${localeName}`
          }
          if (id.includes('/src/components/WebDevelopment') || id.includes('/src/components/CustomWebApplications')) return 'services-web'
          if (id.includes('/src/components/DigitalMarketing') || id.includes('/src/components/BusinessAnalytics')) return 'services-growth'
          if (id.includes('/src/components/CareersPage')) return 'careers'
          if (id.includes('/src/components/Founder') || id.includes('/src/components/BitByteHero') || id.includes('/src/components/BitByteGlobe')) return 'cinematic'
          return undefined
        },
      },
    },
  },
})
