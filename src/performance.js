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

const loadGoogleTagManager = () => {
  if (document.getElementById('google-tag-manager')) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  loadScript(
    'https://www.googletagmanager.com/gtm.js?id=GTM-MF6FFG6C',
    'google-tag-manager',
  )
}

const loadMetaPixel = () => {
  if (window.fbq?.loaded) return

  window.fbq = function fbq() {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments)
  }
  if (!window._fbq) window._fbq = window.fbq
  window.fbq.push = window.fbq
  window.fbq.loaded = true
  window.fbq.version = '2.0'
  window.fbq.queue = []

  loadScript(
    'https://connect.facebook.net/en_US/fbevents.js',
    'meta-pixel',
    () => {
      window.fbq('init', '1533780781440843')
      window.fbq('track', 'PageView')
    },
  )
}

const loadGoogleMeasurement = () => {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  loadScript(
    'https://www.googletagmanager.com/gtag/js?id=AW-18194250314',
    'google-measurement',
    () => {
      window.gtag('js', new Date())
      window.gtag('config', 'AW-18194250314')
      window.gtag('config', 'G-33BLH7DR40')
      window.gtag('event', 'conversion', {
        send_to: 'AW-18194250314/i5ETCMLg37QcEMr02OND',
        value: 1.0,
        currency: 'INR',
      })
    },
  )
}

const runAfterFirstInteraction = (task) => {
  let completed = false

  const cleanup = () => {
    window.removeEventListener('pointerdown', run)
    window.removeEventListener('keydown', run)
    window.removeEventListener('scroll', run)
  }

  const run = () => {
    if (completed) return
    completed = true
    cleanup()
    runWhenIdle(task)
  }

  window.addEventListener('pointerdown', run, { once: true, passive: true })
  window.addEventListener('keydown', run, { once: true })
  window.addEventListener('scroll', run, { once: true, passive: true })
  window.setTimeout(run, 9000)
}

const runAfterPageSettles = (task) => {
  const schedule = () => runWhenIdle(task)

  if (document.readyState === 'complete') {
    window.setTimeout(schedule, 12000)
  } else {
    window.addEventListener('load', () => window.setTimeout(schedule, 12000), {
      once: true,
    })
  }
}

export function bootNonCriticalAssets() {
  const start = () => {
    runAfterPageSettles(() => {
      loadStylesheet(
        '/assets/vendor/fontawesome/css/all.min.css',
        'font-awesome-css',
      )
    })

    runAfterFirstInteraction(() => {
      loadGoogleTagManager()
      loadGoogleMeasurement()
      loadMetaPixel()
    })
  }

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }
}
