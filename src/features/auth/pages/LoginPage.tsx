import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui'
import { loginSchema, type LoginFormValues } from '../schemas/authSchemas'
import { useLogin } from '../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'demo@nutriclinic.pro', password: '', remember: true },
  })

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values, {
      onSuccess: () => navigate('/dashboard', { replace: true }),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Bienvenido de nuevo
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ingresa tus credenciales para acceder a tu panel clínico.
        </p>
      </div>

      {login.isError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-5 flex items-center gap-2.5 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Credenciales inválidas. Verifica tu correo y contraseña.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@clinica.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="pointer-events-auto text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
        </div>

        <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            {...register('remember')}
          />
          Recordarme en este dispositivo
        </label>

        <Button type="submit" size="lg" className="w-full" isLoading={login.isPending}>
          {login.isPending ? 'Ingresando…' : 'Iniciar sesión'}
        </Button>
      </form>

      <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-center text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Demo:</span> usa{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">demo@nutriclinic.pro</code>{' '}
        y cualquier contraseña de 6+ caracteres.
      </div>
    </motion.div>
  )
}
