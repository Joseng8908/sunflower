import { Star, Sparkles } from 'lucide-react'
import { SectionLabel } from '@/components/ui'
import reviewsData from '@/data/reviews.json'
import benefitsData from '@/data/benefits.json'
import type { Review, Benefit } from '@/types'

const reviews = reviewsData as Review[]
const benefits = benefitsData as Benefit[]

export function Reviews() {
  return (
    <div className="min-h-dvh bg-[#f5f5fa] pb-nav">
      <div className="px-5 pt-header pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-gray-900">혜바라기</h1>
        </div>
        <p className="text-[12px] text-gray-400 mt-0.5">실제 수혜자들의 생생한 후기</p>
      </div>

      <section className="px-5">
        <SectionLabel className="mb-3">Recent Reviews</SectionLabel>
        <div className="space-y-3">
          {reviews.map((r) => {
            const benefit = benefits.find((b) => b.id === r.benefitId)
            return (
              <div key={r.id} className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: 'var(--s1)' }}>
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
