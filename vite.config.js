import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createChatReply } from './server/chatCore.js'

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      resolve(body)
    })

    req.on('error', reject)
  })
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function bitbyteLocalChatApi() {
  return {
    name: 'bitbyte-local-chat-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST')
          sendJson(res, 405, { error: 'Method not allowed' })
          return
        }

        let message = ''

        try {
          const rawBody = await readRequestBody(req)
          const body = rawBody ? JSON.parse(rawBody) : {}
          message = typeof body.message === 'string' ? body.message.trim() : ''
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON body' })
          return
        }

        if (!message) {
          sendJson(res, 400, { error: 'Message is required' })
          return
        }

        try {
          const reply = await createChatReply(
            message,
            process.env.GROQ_API_KEY || env.GROQ_API_KEY,
          )
          sendJson(res, 200, { reply })
        } catch (error) {
          server.config.logger.error(`Groq local chat error: ${error.message}`)
          sendJson(res, 500, { error: 'Unable to generate a response right now' })
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), bitbyteLocalChatApi()],
  optimizeDeps: {
    include: ['react', 'react-dom'],
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
          if (id.includes('/src/i18n') || id.includes('/src/defaultTranslations')) return 'translations'
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/components/WebDevelopment') || id.includes('/src/components/CustomWebApplications')) return 'services-web'
          if (id.includes('/src/components/DigitalMarketing') || id.includes('/src/components/BusinessAnalytics')) return 'services-growth'
          if (id.includes('/src/components/CareersPage')) return 'careers'
          if (id.includes('/src/components/Founder') || id.includes('/src/components/BitByteHero')) return 'cinematic'
          return undefined
        },
      },
    },
  },
})
