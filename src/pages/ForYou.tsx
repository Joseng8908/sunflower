import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { X, Sparkles } from 'lucide-react'
import { storage } from '@/lib/storage'
import { filterBenefits, matchScore } from '@/lib/filter'
import { BenefitCard } from '@/components/benefit/BenefitCard'
import { Chip } from '@/components/ui'
import { formatCategory } from '@/lib/format'
import benefitsData from '@/data/benefits.json'
import type { Benefit, BenefitCategory } from '@/types'

const benefits = benefitsData as Benefit[]
const CATEGORIES: BenefitCategory[] = ['scholarship', 'housing', 'finance', 'employment', 'culture', 'health', 'other']
type SortKey = 'match' | 'dday' | 'amount'

export function ForYou() {
  const [searchParams] = useSearchParams()
  const profile = storage.getProfile()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<BenefitCategory | null>(
    (searchParams.get('category') as BenefitCategory) ?? null
  )
  const [sort, setSort] = useState<SortKey>('match')
  const [bookmarks, setBookmarks] = useState(storage.getBookmarks())

  const filtered = useMemo(() => {
    let list = profile ? filterBenefits(benefits, profile) : benefits
    if (cat) list = list.filter((b) => b.category === cat)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.includes(q))
      )
    }
    return [...list].sort((a, b) => {
      if (sort === 'match' && profile) return matchScore(b, profile) - matchScore(a, profile)
      if (sort === 'dday') {
        const da = a.applicationEnd ? new Date(a.applicationEnd).getTime() : Infinity
        const db = b.applicationEnd ? new Date(b.applicationEnd).getTime() : Infinity
        return da - db
      }
      return (b.maxAmount ?? 0) - (a.maxAmount ?? 0)
    })
  }, [query, cat, sort, profile])

  return (
    <div className="min-h-dvh bg-[#f5f5fa] pb-nav">
      {/* header */}
      <div className="px-5 pt-header pb-7 bg-[#f5f5fa] sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-gray-900">혜바라기</h1>
          </div>
          {profile && (
            <span className="text-[11px] bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-md font-semibold">
              {filtered.length}개
            </span>
          )}
        </div>

        {/* search */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-4">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="혜택 검색"
            className="flex-1 bg-transparent text-[13px] outline-none text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')}><X size={13} className="text-gray-400" /></button>
          )}
        </div>

        {/* category chips */}
        <div className="grid grid-cols-4 gap-1.5 pt-4">
          <Chip active={cat === null} onClick={() => setCat(null)}>전체</Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>
              {formatCategory(c)}
            </Chip>
          ))}
        </div>
      </div>

      {/* sort */}
      <div className="px-5 py-3 flex items-center gap-1.5 border-b border-gray-50">
        {(['match', 'dday', 'amount'] as SortKey[]).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
              sort === s ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'
            }`}
          >
            {s === 'match' ? '매칭순' : s === 'dday' ? '마감순' : '금액순'}
          </button>
        ))}
      </div>

      {/* list */}
      <div className="px-5 pt-4 space-y-3">
        {filtered.length === 0
          ? (
            <div className="text-center py-16">
              <p className="text-[13px] text-gray-400">조건에 맞는 혜택이 없습니다</p>
            </div>
          )
          : filtered.map((b) => (
            <BenefitCard
              key={b.id}
              benefit={b}
              profile={profile}
              bookmarked={bookmarks.includes(b.id)}
              onToggleBookmark={(id) => setBookmarks(storage.toggleBookmark(id))}
            />
          ))
        }
      </div>
    </div>
  )
}
