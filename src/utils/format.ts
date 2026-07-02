/**
 * Centralized formatting helpers so number/date/currency output stays
 * consistent across every module of the platform.
 */

const DEFAULT_LOCALE = 'es-PE'
const DEFAULT_CURRENCY = 'PEN'

export function formatCurrency(
  value: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number, locale: string = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCompactNumber(value: number, locale: string = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' },
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export function formatTime(date: Date | string | number, locale: string = DEFAULT_LOCALE): string {
  return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(
    new Date(date),
  )
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}
