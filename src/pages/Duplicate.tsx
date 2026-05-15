import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GitCompare, CheckCircle2, XCircle, Plus, X } from 'lucide-react'
import { findConflicts } from '@/lib/duplicate'
import benefitsData from '@/data/benefits.json'
import type { Benefit } from '@/types'

const benefits = benefitsData as Benefit[]

export function Duplicate() {
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showPicker, setShowPicker] = useState(false)

  const selected = benefits.filter((b) => selectedIds.includes(b.id))
  const conflicts = findConflicts(selectedIds, benefits)
  const conflictIds = new Set(conflicts.flatMap((c) => [c.benefitA.id, c.benefitB.id]))

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* header */}
      <div className="bg-white px-5 pt-header pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <GitCompare size={20} className="text-indigo-500" />
          <h1 className="text-lg font-bold text-gray-900">중복 수혜 분석</h1>
        </div>
        <p className="text-xs text-gray-400">신청하려는 혜택을 선택하면 충돌 여부를 확인해드려요</p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* selected benefits */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800">선택한 혜택 ({selected.length}개)</h2>
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-1 text-xs text-indigo-500 font-medium bg-indigo-50 px-3 py-1.5 rounded-full"
            >
              <Plus size={12} />
              추가
            </button>
          </div>

          {selected.length === 0 ? (
            <div
              className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer"
              onClick={() => setShowPicker(true)}
            >
              <Plus size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">혜택을 추가해 중복 여부를 확인하세요</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selected.map((b) => (
                <div
                  key={b.id}
                  className={`bg-white rounded-2xl p-4 flex items-center gap-3 border ${
                    conflictIds.has(b.id) ? 'border-red-200' : 'border-gray-100'
                  }`}
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/benefit/${b.id}`)}
                  >
                    <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.amountLabel}</p>
                  </div>
                  {conflictIds.has(b.id) ? (
                    <XCircle size={18} className="text-red-400 shrink-0" />
                  ) : (
                    <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  )}
                  <button onClick={() => toggle(b.id)} className="p-1">
                    <X size={14} className="text-gray-300" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* conflict results */}
        {selected.length >= 2 && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-3">분석 결과</h2>

            {conflicts.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <CheckCircle2 size={28} className="text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-green-700">충돌 없음!</p>
                <p className="text-sm text-green-600 mt-1">선택한 혜택들은 모두 함께 수혜 가능합니다</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conflicts.map((c, i) => (
                  <div key={i} className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-red-700">중복 수혜 불가</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 space-y-2">
                      {[c.benefitA, c.benefitB].map((b) => (
                        <div key={b.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-800">{b.title}</p>
                            <p className="text-xs text-gray-400">{b.amountLabel}</p>
                          </div>
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">중복불가</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-red-500 mt-2">{c.note}</p>
                  </div>
                ))}

                {/* alternative suggestions */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-indigo-700 mb-2">대신 추천</p>
                  <p className="text-xs text-indigo-500 mb-3">중복 없이 함께 신청할 수 있는 대안을 확인하세요</p>
                  <button
                    onClick={() => navigate('/for-you')}
                    className="w-full bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-xl"
                  >
                    다른 혜택 찾아보기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* picker modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPicker(false)} />
          <div className="relative bg-white w-full max-w-[430px] mx-auto rounded-t-3xl max-h-[70vh] overflow-hidden flex flex-col">
            <div className="px-5 pt-5 pb-3 border-b border-gray-100">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">혜택 선택</h3>
                <button onClick={() => setShowPicker(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 px-5 py-3">
              {benefits.map((b) => (
                <button
                  key={b.id}
                  onClick={() => toggle(b.id)}
                  className={`w-full text-left flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 ${
                    selectedIds.includes(b.id) ? 'opacity-100' : 'opacity-80'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedIds.includes(b.id)
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedIds.includes(b.id) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{b.title}</p>
                    <p className="text-xs text-gray-400">{b.amountLabel}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowPicker(false)}
                className="w-full bg-indigo-500 text-white font-semibold py-3.5 rounded-2xl"
              >
                완료 ({selectedIds.length}개 선택)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
