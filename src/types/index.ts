export type SchoolType = 'university' | 'grad' | 'college' | 'high_school' | 'none'
export type EmploymentStatus = 'student' | 'job_seeker' | 'employed' | 'freelance'
export type BenefitCategory = 'scholarship' | 'housing' | 'finance' | 'employment' | 'culture' | 'health' | 'other'
export type SourceType = 'government' | 'private' | 'ngo'

export interface UserProfile {
  name: string
  age: number
  regionSido: string
  regionSigungu: string
  schoolType: SchoolType
  grade: number | null
  incomeLevel: number | null // 1~10 소득분위, null = 미입력
  employmentStatus: EmploymentStatus
}

export interface BenefitEligibility {
  minAge: number | null
  maxAge: number | null
  regions: string[] | null    // null = 전국
  schoolTypes: SchoolType[] | null
  incomeMax: number | null    // 최대 소득분위
  employmentStatuses: EmploymentStatus[] | null
}

export interface Benefit {
  id: string
  title: string
  description: string
  category: BenefitCategory
  sourceType: SourceType
  sourceOrg: string           // "국가장학재단", "서울시" 등
  maxAmount: number | null    // 원 단위
  amountLabel: string         // "연 최대 700만 원", "월 최대 20만 원"
  applicationStart: string | null
  applicationEnd: string | null
  applicationUrl: string
  eligibility: BenefitEligibility
  incompatibleWith: string[]  // benefit id 목록
  tags: string[]
}

export interface Review {
  id: string
  benefitId: string
  rating: 1 | 2 | 3 | 4 | 5
  content: string
  author: string
  date: string
}

export interface Conflict {
  benefitA: Benefit
  benefitB: Benefit
  note: string
}
