export const googleTranslateLanguages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
]

const PAGE_LANGUAGE = 'en'
const ELEMENT_ID = 'google_translate_element'
const SCRIPT_ID = 'google-translate-script'
const STORAGE_KEY = 'bitbyte.googleTranslateLanguage'
const TRANSLATE_COOKIE = 'googtrans'
const supportedCodes = new Set(googleTranslateLanguages.map((language) => language.code))

let translateLoader

function normalizeLanguage(languageCode) {
  return supportedCodes.has(languageCode) ? languageCode : PAGE_LANGUAGE
}

function dispatchLanguageChange(code) {
  window.dispatchEvent(new CustomEvent('bitbyte:languagechange', { detail: { code } }))
}

function ensureTranslateMount() {
  let mount = document.getElementById(ELEMENT_ID)

  if (!mount) {
    mount = document.createElement('div')
    mount.id = ELEMENT_ID
    mount.className = 'google-translate-engine'
    mount.setAttribute('aria-hidden', 'true')
    document.body.appendChild(mount)
  }

  return mount
}

function getCookieDomains() {
  const hostname = window.location.hostname
  const domains = [null]

  if (hostname && hostname !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    const rootDomain = hostname.split('.').slice(-2).join('.')
    domains.push(hostname)
    domains.push(`.${hostname}`)
    if (rootDomain !== hostname) domains.push(`.${rootDomain}`)
  }

  return domains
}

function writeTranslateCookie(code) {
  const value = `/${PAGE_LANGUAGE}/${code}`

  getCookieDomains().forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : ''
    document.cookie = `${TRANSLATE_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax${domainPart}`
  })
}

function clearTranslateCookie() {
  getCookieDomains().forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : ''
    document.cookie = `${TRANSLATE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`
  })
}

function persistLanguage(code) {
  const normalizedCode = normalizeLanguage(code)
  window.localStorage.setItem(STORAGE_KEY, normalizedCode)
  document.documentElement.lang = normalizedCode

  if (normalizedCode === PAGE_LANGUAGE) {
    clearTranslateCookie()
  } else {
    writeTranslateCookie(normalizedCode)
  }

  return normalizedCode
}

function findGoogleSelect() {
  return document.querySelector('.goog-te-combo')
}

function selectGoogleLanguage(code) {
  const combo = findGoogleSelect()
  if (!combo) return false

  const optionValue = Array.from(combo.options).some((option) => option.value === code) ? code : ''
  combo.value = optionValue
  combo.dispatchEvent(new Event('change', { bubbles: true }))
  return true
}

function waitForGoogleSelect() {
  return new Promise((resolve) => {
    let attempts = 0

    const check = () => {
      const combo = findGoogleSelect()
      attempts += 1

      if (combo || attempts >= 50) {
        resolve(combo)
        return
      }

      window.setTimeout(check, 100)
    }

    check()
  })
}

function initializeGoogleTranslate() {
  const mount = ensureTranslateMount()

  if (mount.dataset.initialized === 'true' || !window.google?.translate?.TranslateElement) {
    return
  }

  const targetLanguages = googleTranslateLanguages
    .map((language) => language.code)
    .filter((code) => code !== PAGE_LANGUAGE)
    .join(',')

  new window.google.translate.TranslateElement(
    {
      pageLanguage: PAGE_LANGUAGE,
      includedLanguages: targetLanguages,
      autoDisplay: false,
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    ELEMENT_ID,
  )

  mount.dataset.initialized = 'true'
}

export function getSavedGoogleTranslateLanguage() {
  if (typeof window === 'undefined') return PAGE_LANGUAGE

  const params = new URLSearchParams(window.location.search)
  const requestedLanguage = params.get('lng') || params.get('lang')

  if (supportedCodes.has(requestedLanguage)) {
    return requestedLanguage
  }

  return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY))
}

export function loadGoogleTranslate() {
  if (typeof window === 'undefined') return Promise.resolve(null)

  ensureTranslateMount()

  if (window.google?.translate?.TranslateElement) {
    initializeGoogleTranslate()
    return waitForGoogleSelect()
  }

  if (translateLoader) return translateLoader

  translateLoader = new Promise((resolve, reject) => {
    window.googleTranslateElementInit = () => {
      initializeGoogleTranslate()
      waitForGoogleSelect().then(resolve)
    }

    const existingScript = document.getElementById(SCRIPT_ID)

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        initializeGoogleTranslate()
        waitForGoogleSelect().then(resolve)
      })
      existingScript.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = reject
    document.body.appendChild(script)
  })

  return translateLoader
}

export async function applyGoogleTranslateLanguage(languageCode) {
  const code = persistLanguage(languageCode)

  if (code === PAGE_LANGUAGE) {
    selectGoogleLanguage(code)
    dispatchLanguageChange(code)

    if (document.documentElement.classList.contains('translated-ltr')) {
      window.setTimeout(() => window.location.reload(), 80)
    }

    return code
  }

  await loadGoogleTranslate()

  if (!selectGoogleLanguage(code)) {
    window.location.reload()
  }

  dispatchLanguageChange(code)
  return code
}

export function bootGoogleTranslate() {
  if (typeof window === 'undefined') return

  const code = persistLanguage(getSavedGoogleTranslateLanguage())

  loadGoogleTranslate()
    .then(() => {
      if (code !== PAGE_LANGUAGE) selectGoogleLanguage(code)
      dispatchLanguageChange(code)
    })
    .catch(() => {
      dispatchLanguageChange(code)
    })
}
