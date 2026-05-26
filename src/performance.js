const runWhenIdle = (task) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout: 2500 })
    return
  }

  window.setTimeout(task, 1200)
}

const loadStylesheet = (href, id) => {
  if (document.getElementById(id)) return

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

const loadScript = (src, id, onload) => {
  if (document.getElementById(id)) return

  const script = document.createElement('script')
  script.id = id
  script.src = src
  script.async = true
  script.onload = onload
  document.head.appendChild(script)
}

export function bootNonCriticalAssets() {
  const start = () => {
    runWhenIdle(() => {
      loadStylesheet(
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap',
        'google-fonts-css',
      )

      loadStylesheet(
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        'font-awesome-css',
      )

      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }

      loadScript(
        'https://www.googletagmanager.com/gtag/js?id=G-33BLH7DR40',
        'google-analytics',
        () => {
          window.gtag('js', new Date())
          window.gtag('config', 'G-33BLH7DR40')
        },
      )
    })
  }

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }
}
