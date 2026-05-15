import type { Benefit, UserProfile } from '@/types'

export function matchesBenefit(benefit: Benefit, profile: UserProfile): boolean {
  const e = benefit.eligibility
  if (e.minAge !== null && profile.age < e.minAge) return false
  if (e.maxAge !== null && profile.age > e.maxAge) return false
  if (e.regions !== null && !e.regions.includes(profile.regionSido)) return false
  if (e.schoolTypes !== null && !e.schoolTypes.includes(profile.schoolType)) return false
  if (e.incomeMax !== null && profile.incomeLevel !== null && profile.incomeLevel > e.incomeMax) return false
  if (e.employmentStatuses !== null && !e.employmentStatuses.includes(profile.employmentStatus)) return false
  return true
}

// 자격 조건 항목 중 충족 비율 (progressbar 용)
export function matchScore(benefit: Benefit, profile: UserProfile): number {
  const e = benefit.eligibility
  const checks = [
    e.minAge === null || profile.age >= e.minAge,
    e.maxAge === null || profile.age <= e.maxAge,
    e.regions === null || e.regions.includes(profile.regionSido),
    e.schoolTypes === null || e.schoolTypes.includes(profile.schoolType),
    e.incomeMax === null || profile.incomeLevel === null || profile.incomeLevel <= e.incomeMax,
    e.employmentStatuses === null || e.employmentStatuses.includes(profile.employmentStatus),
  ]
  const passed = checks.filter(Boolean).length
  return Math.round((passed / checks.length) * 100)
}

export function filterBenefits(benefits: Benefit[], profile: UserProfile): Benefit[] {
  return benefits.filter((b) => matchesBenefit(b, profile))
}
