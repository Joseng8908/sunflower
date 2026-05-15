import { Home, Sparkles, GitCompare, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/home', icon: Home, label: '홈' },
  { to: '/for-you', icon: Sparkles, label: 'For You' },
  { to: '/duplicate', icon: GitCompare, label: '중복분석' },
  { to: '/profile', icon: User, label: '프로필' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50">
      <div className="flex">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2.5 gap-0.5 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-indigo-500' : 'text-gray-400'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
