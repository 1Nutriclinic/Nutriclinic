import { useMutation } from '@tanstack/react-query'
import { login, requestPasswordReset } from '../api/authApi'
import { useAuthStore } from '@/store/authStore'
import type { LoginFormValues } from '../schemas/authSchemas'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: (values: LoginFormValues) => login(values),
    onSuccess: (data) => {
      setSession({ user: data.user, accessToken: data.accessToken })
    },
  })
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
  })
}
