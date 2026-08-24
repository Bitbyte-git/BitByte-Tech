import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PAGE_LANGUAGE = 'en'
const STORAGE_KEY = 'bitbyte.googleTranslateLanguage'
const googleTranslateLanguages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
]
const supportedCodes = new Set(googleTranslateLanguages.map((language) => language.code))

function getSavedGoogleTranslateLanguage() {
  const params = new URLSearchParams(window.location.search)
  const requestedLanguage = params.get('lng') || params.get('lang')

  if (supportedCodes.has(requestedLanguage)) return requestedLanguage

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
  return supportedCodes.has(storedLanguage) ? storedLanguage : PAGE_LANGUAGE
}

function LanguageSwitcher({ compact = false }) {
  const [open, setOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [activeCode, setActiveCode] = useState(getSavedGoogleTranslateLanguage)
  const switcherRef = useRef(null)
  const activeLanguage = useMemo(
    () => googleTranslateLanguages.find((language) => language.code === activeCode) || googleTranslateLanguages[0],
    [activeCode],
  )

  useEffect(() => {
    if (getSavedGoogleTranslateLanguage() !== 'en') {
      import('../googleTranslate').then(({ bootGoogleTranslate }) => {
        bootGoogleTranslate()
      })
    }

    const syncActiveLanguage = (event) => {
      if (event.detail?.code) setActiveCode(event.detail.code)
    }

    window.addEventListener('bitbyte:languagechange', syncActiveLanguage)
    return () => window.removeEventListener('bitbyte:languagechange', syncActiveLanguage)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const closeOnOutsideClick = (event) => {
      if (!switcherRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const changeLanguage = useCallback((code) => {
    setOpen(false)
    setActiveCode(code)
    setIsPending(true)

    import('../googleTranslate').then(({ applyGoogleTranslateLanguage }) => (
      applyGoogleTranslateLanguage(code)
    ))
      .then((appliedCode) => setActiveCode(appliedCode))
      .catch(() => setActiveCode(getSavedGoogleTranslateLanguage()))
      .finally(() => setIsPending(false))
  }, [])

  return (
    <div className={`language-switcher notranslate ${compact ? 'compact' : ''}`} ref={switcherRef} translate="no">
      <button
        className="language-trigger"
        type="button"
        aria-label="Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="language-glyph" aria-hidden="true">A</span>
        <span>{activeLanguage.nativeName}</span>
        <span className="language-chevron" aria-hidden="true">⌄</span>
      </button>
      <div className={`language-menu ${open ? 'open' : ''}`} role="listbox" aria-label="Language">
        {googleTranslateLanguages.map((language) => (
          <button
            className={language.code === activeCode ? 'active' : ''}
            type="button"
            role="option"
            aria-selected={language.code === activeCode}
            aria-label={`Change language to ${language.label}`}
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            disabled={isPending}
          >
            <span>{language.nativeName}</span>
            <small>{language.label}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(LanguageSwitcher)
