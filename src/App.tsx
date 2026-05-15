import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Landing } from '@/pages/Landing'
import { Onboarding } from '@/pages/Onboarding'
import { Home } from '@/pages/Home'
import { ForYou } from '@/pages/ForYou'
import { Detail } from '@/pages/Detail'
import { Duplicate } from '@/pages/Duplicate'
import { Profile } from '@/pages/Profile'
import { Reviews } from '@/pages/Reviews'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route element={<AppShell />}>
          <Route path="/home" element={<Home />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/benefit/:id" element={<Detail />} />
          <Route path="/duplicate" element={<Duplicate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
