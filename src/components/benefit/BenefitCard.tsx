import { useNavigate } from 'react-router-dom'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import type { Benefit, UserProfile } from '@/types'
import { getDday, getDdayLabel } from '@/lib/dday'
import { matchScore } from '@/lib/filter'
import { Badge, CategoryIcon } from '@/components/ui'

interface Props {
  benefit: Benefit
  profile: UserProfile | null
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
}

export function BenefitCard({ benefit, profile, bookmarked, onToggleBookmark }: Props) {
  const navigate = useNavigate()
  const dday  = getDday(benefit.applicationEnd)
  const label = getDdayLabel(benefit.applicationEnd)
  const score = profile ? matchScore(benefit, profile) : null

  const ddayVariant =
    dday === null ? undefined :
    dday < 0      ? 'closed' :
    dday <= 3     ? 'urgent' : 'normal'

  const isHot = score !== null && score >= 88 && (dday === null || dday > 10)
  const activeBadgeVariant = isHot && ddayVariant === undefined ? 'hot' : ddayVariant
  const activeBadgeLabel   = isHot && ddayVariant === undefined ? 'HOT' : label

  return (
    <div
      className="bg-white rounded-2xl px-4 pt-4 pb-3.5 border border-gray-100 cursor-pointer active:bg-gray-50 transition-colors overflow-hidden"
      style={{ boxShadow: 'var(--s1)' }}
      onClick={() => navigate(`/benefit/${benefit.id}`)}
    >
      {/* icon + title row */}
      <div className="flex items-center gap-2.5">
        <CategoryIcon category={benefit.category} size={40} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[13px] font-semibold text-gray-900 truncate flex-1 min-w-0">
              {benefit.title}
            </span>
            {activeBadgeLabel && activeBadgeVariant && (
              <Badge variant={activeBadgeVariant} className="shrink-0">{activeBadgeLabel}</Badge>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate">
            {benefit.amountLabel} · {benefit.sourceOrg}
          </p>

          {/* progress bar — 텍스트 영역 안에서만 */}
          {score !== null && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-400"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 shrink-0 w-8 text-right">
                {score}%
              </span>
            </div>
          )}
        </div>

        <button
          className="shrink-0 p-1 -mr-0.5"
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(benefit.id) }}
        >
          {bookmarked
            ? <BookmarkCheck size={14} className="text-indigo-400" />
            : <Bookmark size={14} className="text-gray-300" />}
        </button>
      </div>
    </div>
  )
}
