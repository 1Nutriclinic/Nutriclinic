import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  remember: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Correo electrónico inválido'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
