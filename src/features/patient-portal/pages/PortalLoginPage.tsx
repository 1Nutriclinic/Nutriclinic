import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/authSchemas'
import { useLogin } from '@/features/auth/hooks/useAuth'
import { usingSupabaseAuth } from '@/features/auth/api/authApi'

export function PortalLoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  })

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values, {
      onSuccess: (data) => {
        if (data.user.role !== 'patient') {
          navigate('/dashboard', { replace: true })
        } else {
          navigate('/portal', { replace: true })
        }
      },
    })
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold">Portal del Paciente</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accede a tu plan, evolución y mensajes con tu nutricionista.
          </p>
        </div>

        {login.isError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Credenciales inválidas.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" leftIcon={<Mail className="h-4 w-4" />} error={!!errors.email} {...register('email')} />
            {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="pointer-events-auto">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              error={!!errors.password}
              {...register('password')}
            />
            {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" isLoading={login.isPending}>
            Entrar al portal
          </Button>
        </form>

        {!usingSupabaseAuth() && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Modo demo: cualquier email + contraseña 6+ caracteres.
          </p>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          ¿Eres del equipo clínico?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Acceso staff
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
