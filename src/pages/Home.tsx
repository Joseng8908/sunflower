import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronRight, CalendarClock } from 'lucide-react'
import { storage } from '@/lib/storage'
import { filterBenefits } from '@/lib/filter'
import { getDday } from '@/lib/dday'
import { SectionLabel, Badge, Chip } from '@/components/ui'
import { BenefitCard } from '@/components/benefit/BenefitCard'
import benefitsData from '@/data/benefits.json'
import type { Benefit, BenefitCategory } from '@/types'

const benefits = benefitsData as Benefit[]

const CATS: { key: BenefitCategory | 'all'; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'scholarship', label: '장학금' },
  { key: 'housing', label: '주거' },
  { key: 'finance', label: '금융' },
  { key: 'employment', label: '취업' },
]

export function Home() {
  const navigate = useNavigate()
  const profile = storage.getProfile()
  const [bookmarks, setBookmarks] = useState(storage.getBookmarks())
  const [activeCat, setActiveCat] = useState<BenefitCategory | 'all'>('all')

  const matched = profile ? filterBenefits(benefits, profile) : benefits

  const deadlineSoon = benefits
    .filter((b) => { const d = getDday(b.applicationEnd); return d !== null && d >= 0 && d <= 10 })
    .sort((a, b) => getDday(a.applicationEnd)! - getDday(b.applicationEnd)!)
    .slice(0, 3)

  const forYouList = matched
    .filter((b) => activeCat === 'all' || b.category === activeCat)
    .slice(0, 5)

  function toggle(id: string) { setBookmarks(storage.toggleBookmark(id)) }

  return (
    <div className="min-h-dvh bg-white pb-20">

      {/* ── 헤더 ── */}
      <div className="px-4 pt-14 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">안녕하세요,</p>
            <h1 className="text-[22px] font-bold text-gray-900">
              {profile?.name ?? '게스트'}님
            </h1>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center">
            <Bell size={20} className="text-gray-700" strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* ── 검색 ── */}
      <div className="px-4 pb-4">
        <button
          onClick={() => navigate('/for-you')}
          className="w-full flex items-center gap-2 bg-gray-100 rounded-xl px-3.5 py-2.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="text-[13px] text-gray-400">얻고 싶은 혜택이나 고민을 입력해보세요</span>
        </button>
      </div>

      {/* ── 프로필 미입력 배너 ── */}
      {!profile && (
        <div className="mx-4 mb-4 bg-indigo-50 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-[5px] shrink-0" />
            <p className="text-[12px] text-gray-700 leading-relaxed">
              세부 정보를 입력하면 더 잘 맞는<br />혜택을 찾아드려요
            </p>
          </div>
          <button
            onClick={() => navigate('/onboarding')}
            className="text-[13px] font-bold text-indigo-500 shrink-0 ml-3"
          >
            입력 →
          </button>
        </div>
      )}

      {/* ── 마감 임박 알림 ── */}
      {deadlineSoon.length > 0 && (
        <div className="mx-4 mb-5 bg-amber-50 rounded-xl px-3.5 py-2.5 flex items-center gap-2">
          <CalendarClock size={15} className="text-amber-600 shrink-0" />
          <p className="text-[12px] text-amber-800 font-semibold">
            마감 전! 놓치기 쉬운 혜택 {deadlineSoon.length}개
          </p>
        </div>
      )}

      {/* ── DEADLINE SOON ── */}
      {deadlineSoon.length > 0 && (
        <section className="px-4 mb-6">
          <SectionLabel className="mb-2">Deadline Soon</SectionLabel>
          <div className="space-y-2">
            {deadlineSoon.map((b) => {
              const d = getDday(b.applicationEnd)!
              return (
                <button
                  key={b.id}
                  onClick={() => navigate(`/benefit/${b.id}`)}
                  className="w-full flex items-center gap-3 bg-gray-50 rounded-xl px-3.5 py-3 text-left"
                >
                  <Badge variant={d <= 3 ? 'dday-urgent' : 'dday-normal'}>D-{d}</Badge>
                  <span className="flex-1 text-[13px] font-semibold text-gray-800">{b.title}</span>
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* ── FOR YOU ── */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>For You</SectionLabel>
          <button
            onClick={() => navigate('/for-you')}
            className="flex items-center gap-0.5 text-[11px] text-indigo-500 font-semibold"
          >
            전체보기 <ChevronRight size={12} />
          </button>
        </div>

        {/* 카테고리 칩 */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar mb-3">
          {CATS.map(({ key, label }) => (
            <Chip key={key} active={activeCat === key} onClick={() => setActiveCat(key)}>
              {label}
            </Chip>
          ))}
        </div>

        {/* 혜택 카드 */}
        <div className="space-y-2">
          {forYouList.length === 0
            ? <p className="text-center text-[13px] text-gray-400 py-8">해당하는 혜택이 없어요</p>
            : forYouList.map((b) => (
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

      {/* ── SIMILAR USERS PICK ── */}
      {profile && (
        <section className="px-4 mb-6">
          <SectionLabel className="mb-2">Similar Users Pick</SectionLabel>
          <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-2">
            {[
              `${profile.regionSido} ${profile.employmentStatus === 'student' ? '재학생' : '청년'} → 근로장학금 신청 많음`,
              `${profile.age}세 → 청년내일저축계좌 관심`,
            ].map((text) => (
              <p key={text} className="text-[12px] text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-300 mt-0.5">-</span>
                {text}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
