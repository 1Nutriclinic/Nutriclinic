import { z } from 'zod'

export const patientFormSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  documentId: z.string().min(6, 'Documento inválido'),
  birthDate: z.string().min(1, 'Fecha requerida'),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive', 'lead', 'discharged', 'abandoned']),
  programs: z.array(z.string()).min(1, 'Selecciona al menos un programa'),
  nutritionistId: z.string().min(1, 'Nutricionista requerido'),
  branchId: z.string().min(1, 'Sucursal requerida'),
})

export type PatientFormValues = z.infer<typeof patientFormSchema>
