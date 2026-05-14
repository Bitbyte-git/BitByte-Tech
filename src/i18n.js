import { useCallback } from 'react'
import defaultTranslations from './defaultTranslations'

function readPath(source, path) {
  return path.split('.').reduce((value, key) => {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      return value[key]
    }

    return undefined
  }, source)
}

function interpolate(value, options) {
  if (typeof value !== 'string' || !options) return value

  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => (
    Object.prototype.hasOwnProperty.call(options, key) ? String(options[key]) : ''
  ))
}

export function translate(key, fallbackOrOptions, maybeOptions) {
  const fallback = typeof fallbackOrOptions === 'string' ? fallbackOrOptions : key
  const options = typeof fallbackOrOptions === 'object' ? fallbackOrOptions : maybeOptions
  const value = readPath(defaultTranslations, key)

  if (value === undefined || value === null) {
    return fallback
  }

  return interpolate(value, options)
}

export function useTranslation() {
  const t = useCallback((key, fallbackOrOptions, maybeOptions) => (
    translate(key, fallbackOrOptions, maybeOptions)
  ), [])

  return { t }
}
