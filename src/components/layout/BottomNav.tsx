import { NavLink } from 'react-router-dom'
import { Home, Sparkles, GitCompare, User, Star } from 'lucide-react'

const NAV = [
  { to: '/home',      Icon: Home,       label: 'Home' },
  { to: '/for-you',   Icon: Sparkles,   label: 'For You' },
  { to: '/duplicate', Icon: GitCompare, label: '중복분석' },
  { to: '/profile',   Icon: User,       label: 'Profile' },
  { to: '/reviews',   Icon: Star,       label: 'Review' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 z-50 pb-safe rounded-b-[40px]">
      <div className="flex">
        {NAV.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-3 gap-[3px] transition-colors ${
                isActive ? 'text-indigo-500' : 'text-gray-400'
              }`
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-semibold">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
