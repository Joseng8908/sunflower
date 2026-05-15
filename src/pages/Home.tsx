import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronRight, Sparkles } from 'lucide-react'
import { storage } from '@/lib/storage'
import { filterBenefits } from '@/lib/filter'
import { getDday } from '@/lib/dday'
import { SectionLabel, Chip } from '@/components/ui'
import { BenefitCard } from '@/components/benefit/BenefitCard'
import benefitsData from '@/data/benefits.json'
import type { Benefit, BenefitCategory } from '@/types'

const ALL = benefitsData as Benefit[]

const CATS: { key: BenefitCategory | 'all'; label: string }[] = [
  { key: 'all',        label: '전체' },
  { key: 'scholarship',label: '장학금' },
  { key: 'housing',    label: '주거' },
  { key: 'finance',    label: '금융' },
  { key: 'employment', label: '취업' },
]

export function Home() {
  const navigate = useNavigate()
  const profile  = storage.getProfile()
  const [bookmarks, setBookmarks] = useState(storage.getBookmarks())
  const [cat, setCat] = useState<BenefitCategory | 'all'>('all')

  const matched = profile ? filterBenefits(ALL, profile) : ALL

  const deadlineSoon = ALL
    .filter((b) => { const d = getDday(b.applicationEnd); return d !== null && d >= 0 && d <= 10 })
    .sort((a, b) => getDday(a.applicationEnd)! - getDday(b.applicationEnd)!)
    .slice(0, 3)

  const forYou = matched
    .filter((b) => cat === 'all' || b.category === cat)
    .slice(0, 5)

  const schoolBenefits = profile && (profile.schoolType === 'university' || profile.schoolType === 'college' || profile.schoolType === 'grad')
    ? matched.filter((b) => b.category === 'scholarship').slice(0, 2)
    : []

  function toggle(id: string) { setBookmarks(storage.toggleBookmark(id)) }

  return (
    <div className="min-h-dvh bg-[#f5f5fa] pb-nav">

      {/* ── 헤더 ── */}
      <div className="px-5 pt-header pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-gray-900 leading-tight">혜바라기</h1>
          </div>
          <button className="relative w-8 h-8 flex items-center justify-center">
            <Bell size={19} className="text-gray-600" strokeWidth={1.8} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* ── 프로필 미입력 ── */}
      {!profile && (
        <div className="mx-5 mb-5 bg-indigo-50 rounded-xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-[5px] shrink-0" />
            <p className="text-[12px] text-gray-600 leading-relaxed">
              세부 정보를 입력하면 더 잘 맞는<br />혜택을 찾아드려요
            </p>
          </div>
          <button
            onClick={() => navigate('/onboarding')}
            className="text-[13px] font-bold text-indigo-500 shrink-0 ml-4"
          >
            입력 →
          </button>
        </div>
      )}

      {/* ── DEADLINE SOON ── */}
      {deadlineSoon.length > 0 && (
        <section className="px-5 pt-6 pb-8">
          <SectionLabel className="mb-3">Deadline Soon</SectionLabel>
          <div className="space-y-3">
            {deadlineSoon.map((b) => (
              <BenefitCard
                key={b.id}
                benefit={b}
                profile={profile}
                bookmarked={bookmarks.includes(b.id)}
                onToggleBookmark={toggle}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── 학교 혜택 ── */}
      {schoolBenefits.length > 0 && (
        <section className="px-5 pt-6 pb-8">
          <SectionLabel className="mb-3">학교 혜택</SectionLabel>
          <div className="space-y-3">
            {schoolBenefits.map((b) => (
              <BenefitCard
                key={b.id}
                benefit={b}
                profile={profile}
                bookmarked={bookmarks.includes(b.id)}
                onToggleBookmark={toggle}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── FOR YOU ── */}
      <section className="px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>For You</SectionLabel>
          <button
            onClick={() => navigate('/for-you')}
            className="flex items-center gap-0.5 text-[11px] font-semibold text-indigo-500"
          >
            전체보기 <ChevronRight size={11} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 py-4">
          {CATS.map(({ key, label }) => (
            <Chip key={key} active={cat === key} onClick={() => setCat(key)}>
              {label}
            </Chip>
          ))}
        </div>

        <div className="space-y-3">
          {forYou.length === 0
            ? <p className="text-center text-[13px] text-gray-400 py-8">해당 혜택이 없습니다</p>
            : forYou.map((b) => (
              <BenefitCard
                key={b.id}
                benefit={b}
                profile={profile}
                bookmarked={bookmarks.includes(b.id)}
                onToggleBookmark={toggle}
              />
            ))
          }
        </div>
      </section>

    </div>
  )
}
