import type { Benefit, Conflict } from '@/types'

export function findConflicts(selectedIds: string[], benefits: Benefit[]): Conflict[] {
  const selected = benefits.filter((b) => selectedIds.includes(b.id))
  const conflicts: Conflict[] = []
  const seen = new Set<string>()

  for (const a of selected) {
    for (const bId of a.incompatibleWith) {
      const b = selected.find((x) => x.id === bId)
      if (!b) continue
      const key = [a.id, b.id].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      conflicts.push({
        benefitA: a,
        benefitB: b,
        note: `${a.title}와(과) ${b.title}은(는) 동시에 수혜할 수 없습니다.`,
      })
    }
  }
  return conflicts
}
