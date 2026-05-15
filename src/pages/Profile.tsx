import { useNavigate } from 'react-router-dom'
import { User, Edit3, Bookmark, CheckSquare, ChevronRight, Sun } from 'lucide-react'
import { storage } from '@/lib/storage'
import benefitsData from '@/data/benefits.json'
import type { Benefit } from '@/types'

const benefits = benefitsData as Benefit[]

const SCHOOL_TYPE_LABEL: Record<string, string> = {
  university: '4년제 대학교',
  college: '전문대학',
  grad: '대학원',
  none: '해당 없음',
}

const EMPLOYMENT_LABEL: Record<string, string> = {
  student: '재학생',
  job_seeker: '취업준비생',
  employed: '직장인',
  freelance: '프리랜서',
}

export function Profile() {
  const navigate = useNavigate()
  const profile = storage.getProfile()
  const bookmarks = storage.getBookmarks()
  const applied = storage.getApplied()

  const bookmarkedBenefits = benefits.filter((b) => bookmarks.includes(b.id))
  const appliedBenefits = benefits.filter((b) => applied.includes(b.id))

  if (!profile) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <Sun size={40} className="text-indigo-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">프로필이 없어요</h2>
        <p className="text-sm text-gray-400 mb-6">정보를 입력하면 맞춤 혜택을 찾아드려요</p>
        <button
          onClick={() => navigate('/onboarding')}
          className="bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-2xl"
        >
          프로필 입력하기
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* header */}
      <div className="bg-white px-5 pt-header pb-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-bold text-gray-900">프로필</h1>
          <button
            onClick={() => navigate('/onboarding')}
            className="flex items-center gap-1 text-xs text-indigo-500 font-medium"
          >
            <Edit3 size={14} />
            수정
          </button>
        </div>

        {/* avatar + name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <User size={28} className="text-indigo-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{profile.name}</p>
            <p className="text-sm text-gray-400 mt-0.5">
              {profile.age}세 · {profile.regionSido}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* profile info */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="font-semibold text-gray-900 mb-3">내 정보</h2>
          <div className="space-y-2.5">
            {[
              { label: '나이', value: `${profile.age}세` },
              { label: '지역', value: profile.regionSido },
              { label: '학교 유형', value: SCHOOL_TYPE_LABEL[profile.schoolType] },
              { label: '현재 상황', value: EMPLOYMENT_LABEL[profile.employmentStatus] },
              { label: '소득분위', value: profile.incomeLevel !== null ? `${profile.incomeLevel}분위` : '미입력' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* bookmarks */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bookmark size={16} className="text-indigo-400" />
              <h2 className="font-semibold text-gray-900">북마크</h2>
            </div>
            <span className="text-xs text-gray-400">{bookmarkedBenefits.length}개</span>
          </div>
          {bookmarkedBenefits.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-3">북마크한 혜택이 없어요</p>
          ) : (
            <div className="space-y-2">
              {bookmarkedBenefits.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => navigate(`/benefit/${b.id}`)}
                  className="w-full flex items-center justify-between py-2"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{b.title}</p>
                    <p className="text-xs text-indigo-500">{b.amountLabel}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* applied */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare size={16} className="text-green-400" />
            <h2 className="font-semibold text-gray-900">신청 이력</h2>
          </div>
          {appliedBenefits.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-3">신청한 혜택이 없어요</p>
          ) : (
            <div className="space-y-2">
              {appliedBenefits.map((b) => (
                <div key={b.id} className="flex items-center justify-between py-2">
                  <p className="text-sm font-medium text-gray-800">{b.title}</p>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">신청완료</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.clear()
            navigate('/')
          }}
          className="w-full py-3.5 rounded-2xl border border-gray-200 text-sm text-gray-400 font-medium"
        >
          초기화
        </button>
      </div>
    </div>
  )
}
