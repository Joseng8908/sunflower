import { useNavigate } from 'react-router-dom'
import { Sparkles, Search, Shield, Bell } from 'lucide-react'

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col">
      {/* hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 px-6 pt-16 pb-12 text-white">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={24} className="text-indigo-200" strokeWidth={1.8} />
          <span className="text-2xl font-bold tracking-tight">혜바라기</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3">
          놓치고 있던 청년 혜택을<br />나에게 맞게 찾아보세요
        </h1>
        <p className="text-indigo-200 text-sm leading-relaxed">
          3,000개 이상의 정책 중 내 조건에 맞는 혜택만 AI가 골라드립니다
        </p>
      </div>

      {/* features */}
      <div className="px-6 py-8 flex-1">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Search, label: '맞춤 추천', desc: '나이·지역·소득 기반' },
            { icon: Shield, label: '중복 방지', desc: '혜택 충돌 자동 감지' },
            { icon: Bell, label: '마감 알림', desc: 'D-day 실시간 표시' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-3 text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon size={18} className="text-indigo-500" />
              </div>
              <p className="text-xs font-semibold text-gray-800">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-2xl p-4 mb-6">
          <p className="text-xs text-indigo-600 font-medium mb-1">알고 계셨나요?</p>
          <p className="text-sm text-gray-700">
            청년 1인이 생애 받을 수 있는 혜택은 최대 <strong className="text-indigo-600">5,000만 원</strong>입니다.
            하지만 하위 소득집단 인지율은 30% 이하입니다.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-indigo-500 text-white font-semibold py-4 rounded-2xl text-base active:bg-indigo-600 transition-colors"
        >
          내 혜택 찾아보기
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-gray-100 text-gray-600 font-medium py-3.5 rounded-2xl text-sm active:bg-gray-200 transition-colors"
        >
          둘러보기
        </button>
      </div>
    </div>
  )
}
