import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
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
