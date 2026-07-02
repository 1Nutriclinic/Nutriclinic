import { useEffect, useState, type ReactNode } from 'react'
import { getSupabaseOrNull } from '@/lib/supabase'
import { restoreSession } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/store/authStore'

/** Restores Supabase session on app load and listens for auth changes. */
export function AuthBootstrap({ children }: { children: ReactNode }) {
  const setSession = useAuthStore((s) => s.setSession)
  const logout = useAuthStore((s) => s.logout)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      const session = await restoreSession()
      if (!mounted) return
      if (session) setSession(session)
      setReady(true)
    }

    init()

    const sb = getSupabaseOrNull()
    if (!sb) {
      setReady(true)
      return () => { mounted = false }
    }

    const { data: sub } = sb.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        logout()
        return
      }
      if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        const restored = await restoreSession()
        if (restored) setSession(restored)
      }
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [setSession, logout])

  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return children
}
