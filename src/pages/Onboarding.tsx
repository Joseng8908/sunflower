import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, GraduationCap, BookOpen, Search, Briefcase, Laptop, Sparkles } from 'lucide-react'
import { storage } from '@/lib/storage'
import type { UserProfile, SchoolType, EmploymentStatus } from '@/types'

const SIDOS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']

const SCHOOL_TYPES: { value: SchoolType; label: string; Icon: React.FC<{size:number}> }[] = [
  { value: 'university', label: '4년제 대학교', Icon: ({size}) => <GraduationCap size={size} strokeWidth={1.8} /> },
  { value: 'college',    label: '2~3년제 대학',  Icon: ({size}) => <BookOpen      size={size} strokeWidth={1.8} /> },
  { value: 'grad',       label: '대학원',         Icon: ({size}) => <GraduationCap size={size} strokeWidth={1.8} /> },
  { value: 'none',       label: '해당 없음',       Icon: ({size}) => <Check         size={size} strokeWidth={1.8} /> },
]

const EMPLOYMENT_STATUSES: { value: EmploymentStatus; label: string; Icon: React.FC<{size:number}> }[] = [
  { value: 'student',    label: '재학생',          Icon: ({size}) => <BookOpen  size={size} strokeWidth={1.8} /> },
  { value: 'job_seeker', label: '취업준비생',       Icon: ({size}) => <Search    size={size} strokeWidth={1.8} /> },
  { value: 'employed',   label: '직장인',          Icon: ({size}) => <Briefcase size={size} strokeWidth={1.8} /> },
  { value: 'freelance',  label: '프리랜서/자영업',  Icon: ({size}) => <Laptop    size={size} strokeWidth={1.8} /> },
]

const TOTAL_STEPS = 3

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Partial<UserProfile>>({
    name: '',
    age: 22,
    regionSido: '',
    regionSigungu: '',
    schoolType: 'university',
    grade: 2,
    incomeLevel: null,
    employmentStatus: 'student',
  })

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    } else {
      storage.setProfile(form as UserProfile)
      navigate('/home')
    }
  }

  const canNext =
    step === 1
      ? !!form.name && form.name.length > 0 && !!form.regionSido
      : step === 2
      ? !!form.schoolType && !!form.employmentStatus
      : true

  return (
    <div className="min-h-dvh flex flex-col bg-[#f5f5fa]">
      {/* header */}
      <div className="bg-white px-5 pt-header pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="p-1 -ml-1">
              <ChevronLeft size={22} className="text-gray-600" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-gray-900">혜바라기</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < step ? 'bg-indigo-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">{step} / {TOTAL_STEPS} 단계</p>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 overflow-y-auto">
        {step === 1 && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: 'var(--s1)' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-1">기본 정보를 입력해주세요</h2>
            <p className="text-sm text-gray-400 mb-6">맞춤 혜택을 찾기 위해 필요합니다</p>

            <div className="space-y-5">
              {/* name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">이름 (닉네임)</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-indigo-400 bg-gray-50 transition-colors"
                />
              </div>

              {/* age */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">나이</label>
                <div className="flex items-center gap-4 bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3">
                  <button
                    onClick={() => update('age', Math.max(19, (form.age ?? 22) - 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600 active:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold text-indigo-500 flex-1 text-center">{form.age}세</span>
                  <button
                    onClick={() => update('age', Math.min(39, (form.age ?? 22) + 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600 active:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* region */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">거주 지역</label>
                <div className="grid grid-cols-4 gap-2">
                  {SIDOS.map((sido) => (
                    <button
                      key={sido}
                      onClick={() => update('regionSido', sido)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        form.regionSido === sido
                          ? 'bg-indigo-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]'
                          : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      {sido}
                    </button>
                  ))}
                </div>
              </div>

              {/* income (optional) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">소득분위</label>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">선택</span>
                </div>
                <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-4">
                  {form.incomeLevel === null ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-3">소득분위를 모르거나 건너뛰고 싶다면?</p>
                      <button
                        onClick={() => update('incomeLevel', 5)}
                        className="text-xs text-indigo-500 font-semibold border border-indigo-200 bg-indigo-50 px-4 py-2 rounded-xl"
                      >
                        직접 입력하기
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={form.incomeLevel}
                        onChange={(e) => update('incomeLevel', Number(e.target.value))}
                        className="w-full accent-indigo-500 mb-2"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">1분위 (최저)</span>
                        <span className="text-sm font-bold text-indigo-500">{form.incomeLevel}분위</span>
                        <span className="text-xs text-gray-400">10분위 (최고)</span>
                      </div>
                      <button
                        onClick={() => update('incomeLevel', null)}
                        className="w-full mt-2 text-xs text-gray-400 text-center"
                      >
                        모르겠어요 (건너뛰기)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: 'var(--s1)' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-1">학력 & 상황을 알려주세요</h2>
            <p className="text-sm text-gray-400 mb-6">더 정확한 혜택 매칭을 위해 필요합니다</p>

            <div className="space-y-5">
              {/* school type */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">학교 유형</label>
                <div className="grid grid-cols-2 gap-2">
                  {SCHOOL_TYPES.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => update('schoolType', value)}
                      className={`py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        form.schoolType === value
                          ? 'bg-indigo-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]'
                          : 'bg-white border-2 border-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon size={15} />{label}
                    </button>
                  ))}
                </div>
              </div>

              {/* grade */}
              {(form.schoolType === 'university' || form.schoolType === 'college') && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">학년</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((g) => (
                      <button
                        key={g}
                        onClick={() => update('grade', g)}
                        className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                          form.grade === g
                            ? 'bg-indigo-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]'
                            : 'bg-white border-2 border-gray-100 text-gray-600'
                        }`}
                      >
                        {g}학년
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* employment */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">현재 상황</label>
                <div className="space-y-2">
                  {EMPLOYMENT_STATUSES.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => update('employmentStatus', value)}
                      className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold text-left flex items-center justify-between transition-all ${
                        form.employmentStatus === value
                          ? 'bg-indigo-50 border-2 border-indigo-400 text-indigo-700'
                          : 'bg-white border-2 border-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={15} />{label}
                      </span>
                      {form.employmentStatus === value && (
                        <Check size={16} className="text-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center" style={{ boxShadow: 'var(--s1)' }}>
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Check size={40} className="text-indigo-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">완료!</h2>
            <p className="text-gray-500 text-sm mb-1">
              <span className="text-indigo-500 font-bold">{form.name}</span>님을 위한
            </p>
            <p className="text-gray-500 text-sm">맞춤 혜택을 찾아볼게요</p>

            <div className="mt-6 bg-indigo-50 rounded-2xl px-4 py-3 text-left w-full max-w-[240px]">
              <p className="text-xs text-indigo-400 mb-1.5">입력하신 정보</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">{form.regionSido} · {form.age}세</p>
                <p className="text-sm text-gray-700">
                  {SCHOOL_TYPES.find(s => s.value === form.schoolType)?.label}
                </p>
                {form.incomeLevel !== null && (
                  <p className="text-sm text-gray-700">소득 {form.incomeLevel}분위</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-safe pt-4 bg-white border-t border-gray-100" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
        <button
          onClick={handleNext}
          disabled={!canNext}
          className={`w-full font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-all ${
            canNext
              ? 'bg-indigo-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] active:bg-indigo-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === TOTAL_STEPS ? '혜택 찾아보기' : '다음'}
          {step < TOTAL_STEPS && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  )
}
