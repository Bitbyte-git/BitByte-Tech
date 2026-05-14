import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  applyGoogleTranslateLanguage,
  bootGoogleTranslate,
  getSavedGoogleTranslateLanguage,
  googleTranslateLanguages,
} from '../googleTranslate'

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
      bootGoogleTranslate()
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

    applyGoogleTranslateLanguage(code)
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
        <i className="fa-solid fa-language" aria-hidden="true" />
        <span>{activeLanguage.nativeName}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
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
