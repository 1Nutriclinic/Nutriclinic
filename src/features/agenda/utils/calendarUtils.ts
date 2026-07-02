import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'
import { es } from 'date-fns/locale'

export {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
  es as dateFnsEs,
}

export function formatAgendaDate(date: Date, pattern = 'd MMM yyyy'): string {
  return format(date, pattern, { locale: es })
}

export function formatAgendaTime(iso: string): string {
  return format(parseISO(iso), 'HH:mm', { locale: es })
}

export function getWeekDays(base: Date): Date[] {
  const start = startOfWeek(base, { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end: addDays(start, 6) })
}

export function getMonthDays(base: Date): Date[] {
  const start = startOfWeek(startOfMonth(base), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(base), { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

export const HOUR_SLOTS = Array.from({ length: 12 }, (_, i) => i + 7) // 07:00 - 18:00
