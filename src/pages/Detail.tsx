import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, Bookmark, BookmarkCheck, ExternalLink,
  Star, Calendar,
} from 'lucide-react'
import { storage } from '@/lib/storage'
import { getDdayLabel, getDdayColor } from '@/lib/dday'
import { formatCategory, formatSourceType } from '@/lib/format'
import benefitsData from '@/data/benefits.json'
import reviewsData from '@/data/reviews.json'
import type { Benefit, Review } from '@/types'

const benefits = benefitsData as Benefit[]
const reviews = reviewsData as Review[]

export function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const benefit = benefits.find((b) => b.id === id)
  const [bookmarks, setBookmarks] = useState(storage.getBookmarks())

  if (!benefit) {
    return (
      <div className="flex items-center justify-center min-h-dvh text-gray-400">
        혜택 정보를 찾을 수 없습니다
      </div>
    )
  }

  const benefitReviews = reviews.filter((r) => r.benefitId === id)
  const avgRating = benefitReviews.length
    ? benefitReviews.reduce((s, r) => s + r.rating, 0) / benefitReviews.length
    : null

  const ddayLabel = getDdayLabel(benefit.applicationEnd)
  const ddayColor = getDdayColor(benefit.applicationEnd)
  const isBookmarked = bookmarks.includes(benefit.id)

  function toggleBookmark() {
    setBookmarks(storage.toggleBookmark(benefit!.id))
  }

  const eligibility = benefit.eligibility
  const eligibilityItems = [
    eligibility.minAge !== null || eligibility.maxAge !== null
      ? `나이: ${eligibility.minAge ?? 0}~${eligibility.maxAge ?? 39}세`
      : null,
    eligibility.regions !== null ? `지역: ${eligibility.regions.join(', ')}` : '지역: 전국',
    eligibility.schoolTypes !== null
      ? `학교: ${eligibility.schoolTypes.map((s) =>
          ({ university: '4년제', college: '전문대', grad: '대학원', high_school: '고등학교', none: '해당없음' }[s])
        ).join(', ')}`
      : null,
    eligibility.incomeMax !== null ? `소득분위: ${eligibility.incomeMax}분위 이하` : null,
    eligibility.employmentStatuses !== null
      ? `대상: ${eligibility.employmentStatuses.map((s) =>
          ({ student: '재학생', job_seeker: '취준생', employed: '직장인', freelance: '프리랜서' }[s])
        ).join(', ')}`
      : null,
  ].filter(Boolean) as string[]

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* top nav */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={22} className="text-gray-700" />
        </button>
        <button onClick={toggleBookmark} className="p-1">
          {isBookmarked
            ? <BookmarkCheck size={22} className="text-indigo-500" />
            : <Bookmark size={22} className="text-gray-400" />
          }
        </button>
      </div>

      {/* hero */}
      <div className="bg-white px-5 pb-6 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
            {({ scholarship: '🎓', housing: '🏠', finance: '💰', employment: '💼', culture: '🎭', health: '💚', other: '✨' })[benefit.category]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">{formatSourceType(benefit.sourceType)} · {formatCategory(benefit.category)}</span>
              {ddayLabel && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ddayColor}`}>
                  {ddayLabel}
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 mt-1">{benefit.title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{benefit.sourceOrg}</p>
          </div>
        </div>

        <div className="mt-4 bg-indigo-50 rounded-2xl px-5 py-4">
          <p className="text-xs text-indigo-400 mb-1">지원 금액</p>
          <p className="text-2xl font-bold text-indigo-600">{benefit.amountLabel}</p>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* description */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="font-semibold text-gray-900 mb-2">지원 내용</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
        </div>

        {/* eligibility */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="font-semibold text-gray-900 mb-3">자격 조건</h2>
          <div className="space-y-2">
            {eligibilityItems.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* dates */}
        {(benefit.applicationStart || benefit.applicationEnd) && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="font-semibold text-gray-900 mb-3">신청 기간</h2>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400" />
              <span className="text-sm text-gray-600">
                {benefit.applicationStart ?? '상시'} ~ {benefit.applicationEnd ?? '상시'}
              </span>
            </div>
          </div>
        )}

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {benefit.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* reviews */}
        {benefitReviews.length > 0 && (
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">수혜 후기</h2>
              {avgRating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{avgRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {benefitReviews.map((r) => (
                <div key={r.id} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{r.author}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="sticky bottom-20 px-5 pb-4">
        <a
          href={benefit.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-indigo-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 active:bg-indigo-600 transition-colors"
        >
          신청하러 가기
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}
