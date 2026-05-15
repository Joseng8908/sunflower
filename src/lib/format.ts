export function formatAmount(amount: number | null): string {
  if (amount === null) return '-'
  if (amount >= 100000000) return `${(amount / 100000000).toFixed(0)}억 원`
  if (amount >= 10000) return `${(amount / 10000).toFixed(0)}만 원`
  return `${amount.toLocaleString()}원`
}

export function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    scholarship: '장학금',
    housing: '주거',
    finance: '금융·자산',
    employment: '취업·창업',
    culture: '문화',
    health: '건강',
    other: '생활',
  }
  return map[cat] ?? cat
}

export function formatSourceType(src: string): string {
  const map: Record<string, string> = {
    government: '정부',
    private: '민간',
    ngo: '사단법인',
  }
  return map[src] ?? src
}
