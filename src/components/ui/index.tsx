import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import {
  GraduationCap, Home, Coins, Briefcase,
  Palette, HeartPulse, Sparkles,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Typography
───────────────────────────────────────────── */

/** 섹션 타이틀: DEADLINE SOON, FOR YOU 등 */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400', className)}>
      {children}
    </p>
  )
}

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-[17px] font-bold text-gray-900">{children}</h1>
}

/* ─────────────────────────────────────────────
   Badge
───────────────────────────────────────────── */

type BadgeVariant = 'urgent' | 'normal' | 'closed' | 'hot'

const badgeClass: Record<BadgeVariant, string> = {
  urgent: 'bg-red-100   text-red-500',
  normal: 'bg-indigo-100 text-indigo-500',
  closed: 'bg-gray-200  text-gray-500',
  hot:    'bg-orange-100 text-orange-500',
}

export function Badge({
  variant = 'normal', children, className,
}: { variant?: BadgeVariant; children: ReactNode; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center text-[10px] font-bold px-1.5 py-[4px] rounded-[4px] leading-none',
      badgeClass[variant], className
    )}>
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Chip (filter)
───────────────────────────────────────────── */

export function Chip({ active, children, onClick }: {
  active: boolean; children: ReactNode; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 text-[12px] font-semibold px-3 py-[7px] rounded-full leading-none transition-colors',
        active ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      )}
    >
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────
   CategoryIcon
───────────────────────────────────────────── */

export const catMeta: Record<string, { bg: string; color: string; Icon: typeof Sparkles }> = {
  scholarship: { bg: '#EEF2FF', color: '#6366f1', Icon: GraduationCap },
  housing:     { bg: '#F0FDF4', color: '#16a34a', Icon: Home },
  finance:     { bg: '#FFFBEB', color: '#d97706', Icon: Coins },
  employment:  { bg: '#FFF7ED', color: '#ea580c', Icon: Briefcase },
  culture:     { bg: '#FDF4FF', color: '#9333ea', Icon: Palette },
  health:      { bg: '#FFF0F6', color: '#db2777', Icon: HeartPulse },
  other:       { bg: '#F0F9FF', color: '#0284c7', Icon: Sparkles },
}

export function CategoryIcon({ category, size = 44 }: { category: string; size?: number }) {
  const meta = catMeta[category] ?? catMeta.other
  const Icon = meta.Icon
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: meta.bg }}
    >
      <Icon size={Math.round(size * 0.42)} color={meta.color} strokeWidth={1.8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Divider
───────────────────────────────────────────── */

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-gray-100', className)} />
}
