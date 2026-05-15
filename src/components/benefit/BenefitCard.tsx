import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Benefit, UserProfile } from '@/types'
import { getDdayLabel, getDday } from '@/lib/dday'
import { matchScore } from '@/lib/filter'
import { formatCategory } from '@/lib/format'
import { Badge, CategoryIcon } from '@/components/ui'

interface Props {
  benefit: Benefit
  profile: UserProfile | null
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
}

export function BenefitCard({ benefit, profile, bookmarked, onToggleBookmark }: Props) {
  const navigate = useNavigate()
  const ddayLabel = getDdayLabel(benefit.applicationEnd)
  const ddayDiff = getDday(benefit.applicationEnd)
  const score = profile ? matchScore(benefit, profile) : null

  const ddayVariant =
    ddayDiff === null ? undefined :
    ddayDiff < 0 ? 'dday-closed' :
    ddayDiff <= 3 ? 'dday-urgent' : 'dday-normal'

  return (
    <div
      className="bg-white rounded-2xl p-3 shadow-[0_1px_8px_rgba(0,0,0,0.06)] cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/benefit/${benefit.id}`)}
    >
      <div className="flex items-center gap-3">
        <CategoryIcon category={benefit.category} size={44} />

        <div className="flex-1 min-w-0">
          {/* title row */}
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span className="text-[14px] font-semibold text-gray-900 leading-snug">{benefit.title}</span>
            {ddayLabel && ddayVariant && (
              <Badge variant={ddayVariant}>{ddayLabel}</Badge>
            )}
          </div>

          {/* meta */}
          <p className="text-[11px] text-gray-400 mb-1">{benefit.sourceOrg} · {formatCategory(benefit.category)}</p>

          {/* amount */}
          <p className="text-[13px] font-bold text-indigo-500">{benefit.amountLabel}</p>
        </div>

        {/* bookmark */}
        <button
          className="shrink-0 p-1.5 -mr-1"
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(benefit.id) }}
        >
          {bookmarked
            ? <BookmarkCheck size={16} className="text-indigo-400" />
            : <Bookmark size={16} className="text-gray-300" />
          }
        </button>
      </div>

      {/* match bar */}
      {score !== null && (
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${score}%` }} />
          </div>
          <span className="text-[11px] font-bold text-indigo-400 w-7 text-right">{score}%</span>
        </div>
      )}
    </div>
  )
}
