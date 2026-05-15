import { useNavigate } from 'react-router-dom'
import { Sparkles, Search, Shield, Bell, ChevronRight } from 'lucide-react'

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-[#f5f5fa] overflow-hidden">

      {/* 상단: 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* Safe Area Top 적용: 
          기기의 상태바 높이만큼 띄우고(env), 그 아래로 추가 여백(pt-6)을 줬습니다.
        */}
        <nav className="pt-header px-5 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-[22px] font-bold text-gray-900">혜바라기</span>
        </nav>

        <div className="px-5 pt-6 pb-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: 'var(--s1)' }}>
            <h1 className="text-[22px] font-bold leading-[1.4] text-gray-900 mb-3">
              놓치고 있던 청년 혜택,<br />
              <span className="text-indigo-500">나에게 딱 맞게</span> 찾아드릴게요
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              3,000개 이상의 복지 정책 중에서<br />
              필요한 혜택만 AI가 꼼꼼히 골랐어요.
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="px-5 mb-10">
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Search, label: '나를 위한 맞춤 추천', desc: '나이, 지역, 소득에 딱 맞는 정책', color: 'bg-indigo-50 text-indigo-500' },
              { icon: Shield, label: '까다로운 중복 확인', desc: '함께 받을 수 없는 혜택을 걸러내요', color: 'bg-green-50 text-green-600' },
              { icon: Bell, label: '놓치지 않는 마감 알림', desc: 'D-Day 알림으로 신청 기한을 지켜드려요', color: 'bg-amber-50 text-amber-500' },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white" style={{ boxShadow: 'var(--s1)' }}>
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단: 버튼 고정 영역 */}
      <div
        className="px-5 pt-4 bg-white border-t border-gray-200"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
      >
        <div className="space-y-3">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-indigo-500 text-white font-bold py-4 rounded-2xl text-[16px] flex items-center justify-center gap-2 active:bg-indigo-600 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100"
          >
            1분 만에 내 혜택 확인하기
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-gray-50 text-gray-500 font-semibold py-3.5 rounded-2xl text-sm active:bg-gray-100 transition-colors"
          >
            서비스 먼저 둘러보기
          </button>
        </div>
      </div>
    </div>
  )
}