import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const languages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
]

const STORAGE_KEY = 'bitbyte.language'

const loaders = {
  en: () => import('./locales/en.json'),
  ta: () => import('./locales/ta.json'),
  hi: () => import('./locales/hi.json'),
  te: () => import('./locales/te.json'),
  kn: () => import('./locales/kn.json'),
}

export function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en'

  const requested = new URLSearchParams(window.location.search).get('lng')
  if (requested && loaders[requested]) return requested

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && loaders[saved]) return saved

  const browserLanguage = window.navigator.language?.slice(0, 2)
  return loaders[browserLanguage] ? browserLanguage : 'en'
}

export async function loadLanguage(languageCode) {
  const code = loaders[languageCode] ? languageCode : 'en'

  if (!i18n.hasResourceBundle(code, 'translation')) {
    const messages = await loaders[code]()
    i18n.addResourceBundle(code, 'translation', messages.default, true, true)
  }

  await i18n.changeLanguage(code)

  if (typeof document !== 'undefined') {
    document.documentElement.lang = code
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, code)
  }

  return code
}

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  supportedLngs: languages.map((language) => language.code),
  resources: {},
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
})

export default i18n
