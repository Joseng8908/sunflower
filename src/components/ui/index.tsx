import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

/* ── Typography ─────────────────────────────────────────────── */

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400', className)}>
      {children}
    </p>
  )
}

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-[18px] font-bold text-gray-900 leading-tight">{children}</h1>
}

/* ── Badge ──────────────────────────────────────────────────── */

type BadgeVariant = 'dday-urgent' | 'dday-normal' | 'dday-closed' | 'tag' | 'hot' | 'category'

const badgeStyles: Record<BadgeVariant, string> = {
  'dday-urgent': 'bg-red-100 text-red-500',
  'dday-normal': 'bg-indigo-100 text-indigo-500',
  'dday-closed': 'bg-gray-200 text-gray-500',
  'tag':         'bg-gray-100 text-gray-500',
  'hot':         'bg-orange-100 text-orange-500',
  'category':    'bg-indigo-50 text-indigo-400',
}

export function Badge({ variant = 'tag', children, className }: {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center text-[10px] font-bold px-1.5 py-[2px] rounded', badgeStyles[variant], className)}>
      {children}
    </span>
  )
}

/* ── Card ───────────────────────────────────────────────────── */

export function Card({ children, className, onClick }: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl p-3',
        'shadow-[0_1px_8px_rgba(0,0,0,0.06)]',
        onClick && 'cursor-pointer active:scale-[0.98] transition-transform',
        className
      )}
    >
      {children}
    </div>
  )
}

/* ── Chip (filter button) ───────────────────────────────────── */

export function Chip({ active, children, onClick }: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
        active ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
      )}
    >
      {children}
    </button>
  )
}

/* ── IconBox ────────────────────────────────────────────────── */

const catBg: Record<string, string> = {
  scholarship: '#EEF2FF', housing: '#F0FDF4', finance: '#FFFBEB',
  employment: '#FFF7ED', culture: '#FDF4FF', health: '#FFF0F3', other: '#F0F9FF',
}
const catEmoji: Record<string, string> = {
  scholarship: '🎓', housing: '🏠', finance: '💰',
  employment: '💼', culture: '🎭', health: '💚', other: '✨',
}

export function CategoryIcon({ category, size = 40 }: { category: string; size?: number }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: catBg[category] ?? '#F4F4F8', fontSize: size * 0.45 }}
    >
      {catEmoji[category] ?? '✨'}
    </div>
  )
}

export { catBg, catEmoji }
