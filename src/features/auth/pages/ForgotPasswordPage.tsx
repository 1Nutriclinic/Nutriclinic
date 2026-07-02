import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Button, buttonVariants, Input, Label } from '@/components/ui'
import { cn } from '@/utils/cn'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schemas/authSchemas'
import { usePasswordReset } from '../hooks/useAuth'

export function ForgotPasswordPage() {
  const reset = usePasswordReset()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = (values: ForgotPasswordFormValues) => reset.mutate(values.email)

  if (reset.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-success/12 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">Revisa tu correo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enviamos un enlace de recuperación a{' '}
          <span className="font-medium text-foreground">{getValues('email')}</span>.
        </p>
        <Link
          to="/login"
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-6 w-full')}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a iniciar sesión
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Link
        to="/login"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        Recuperar contraseña
      </h1>
      <p className="mt-2 text-muted-foreground">
        Ingresa tu correo y te enviaremos instrucciones para restablecer tu acceso.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
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

        <Button type="submit" size="lg" className="w-full" isLoading={reset.isPending}>
          Enviar enlace de recuperación
        </Button>
      </form>
    </motion.div>
  )
}
