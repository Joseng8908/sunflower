export function getDday(dateStr: string | null): number | null {
  if (!dateStr) return null
  const end = new Date(dateStr)
  end.setHours(23, 59, 59)
  const now = new Date()
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export function getDdayLabel(dateStr: string | null): string | null {
  const diff = getDday(dateStr)
  if (diff === null) return null
  if (diff < 0) return '마감'
  if (diff === 0) return 'D-day'
  return `D-${diff}`
}

export function getDdayColor(dateStr: string | null): string {
  const diff = getDday(dateStr)
  if (diff === null) return 'bg-gray-100 text-gray-500'
  if (diff < 0) return 'bg-gray-200 text-gray-500'
  if (diff <= 3) return 'bg-red-100 text-red-600'
  if (diff <= 7) return 'bg-orange-100 text-orange-600'
  return 'bg-indigo-100 text-indigo-600'
}
