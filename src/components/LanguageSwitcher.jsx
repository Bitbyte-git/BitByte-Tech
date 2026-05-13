import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { languages, loadLanguage } from '../i18n'

function LanguageSwitcher({ compact = false }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const switcherRef = useRef(null)
  const activeLanguage = useMemo(
    () => languages.find((language) => language.code === i18n.resolvedLanguage) || languages[0],
    [i18n.resolvedLanguage],
  )

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
    startTransition(() => {
      setOpen(false)
    })
    loadLanguage(code)
  }, [])

  return (
    <div className={`language-switcher ${compact ? 'compact' : ''}`} ref={switcherRef}>
      <button
        className="language-trigger"
        type="button"
        aria-label={t('language.label')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <i className="fa-solid fa-language" aria-hidden="true" />
        <span>{activeLanguage.nativeName}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </button>
      <div className={`language-menu ${open ? 'open' : ''}`} role="listbox" aria-label={t('language.label')}>
        {languages.map((language) => (
          <button
            className={language.code === activeLanguage.code ? 'active' : ''}
            type="button"
            role="option"
            aria-selected={language.code === activeLanguage.code}
            aria-label={t('language.changeTo', { language: language.label })}
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
