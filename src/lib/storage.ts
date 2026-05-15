import type { UserProfile } from '@/types'

const PROFILE_KEY = 'hb_profile'
const BOOKMARKS_KEY = 'hb_bookmarks'
const APPLIED_KEY = 'hb_applied'

export const storage = {
  getProfile(): UserProfile | null {
    try {
      const raw = localStorage.getItem(PROFILE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  setProfile(profile: UserProfile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  },

  getBookmarks(): string[] {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  toggleBookmark(id: string): string[] {
    const current = storage.getBookmarks()
    const next = current.includes(id)
      ? current.filter((b) => b !== id)
      : [...current, id]
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next))
    return next
  },

  getApplied(): string[] {
    try {
      const raw = localStorage.getItem(APPLIED_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  toggleApplied(id: string): string[] {
    const current = storage.getApplied()
    const next = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id]
    localStorage.setItem(APPLIED_KEY, JSON.stringify(next))
    return next
  },
}
