import { Star } from 'lucide-react'
import { SectionLabel } from '@/components/ui'
import reviewsData from '@/data/reviews.json'
import benefitsData from '@/data/benefits.json'
import type { Review, Benefit } from '@/types'

const reviews = reviewsData as Review[]
const benefits = benefitsData as Benefit[]

export function Reviews() {
  return (
    <div className="min-h-dvh bg-[#f5f5fa] pb-nav">
      <div className="px-4 pt-header pb-3">
        <h1 className="text-[22px] font-bold text-gray-900">수혜 후기</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">실제 수혜자들의 생생한 후기</p>
      </div>

      <section className="px-4">
        <SectionLabel className="mb-2.5">Recent Reviews</SectionLabel>
        <div className="space-y-2">
          {reviews.map((r) => {
            const benefit = benefits.find((b) => b.id === r.benefitId)
            return (
              <div key={r.id} className="bg-white rounded-2xl p-3 border border-gray-100" style={{ boxShadow: 'var(--s1)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{r.author}</span>
                </div>
                {benefit && (
                  <p className="text-[11px] font-semibold text-indigo-400 mb-1">{benefit.title}</p>
                )}
                <p className="text-[12px] text-gray-600 leading-relaxed">{r.content}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
