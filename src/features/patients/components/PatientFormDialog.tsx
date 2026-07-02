import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input, Label, Select } from '@/components/ui'

import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/Dialog'

import { PATIENT_STATUS_LIST } from '@/constants/patientStatus'

import { PROGRAM_LIST } from '@/constants/programs'

import type { ClinicalProgram, Patient } from '@/types'

import { BRANCHES, NUTRITIONISTS } from '../data/mockPatients'

import { patientFormSchema, type PatientFormValues } from '../schemas/patientSchemas'

import { usePatientsStore } from '../store/patientsStore'



interface PatientFormDialogProps {

  open: boolean

  onOpenChange: (open: boolean) => void

  patient?: Patient | null

}



function toFormValues(patient?: Patient | null): PatientFormValues {

  if (!patient) {

    return {

      firstName: '',

      lastName: '',

      documentId: '',

      birthDate: '',

      gender: 'female',

      email: '',

      phone: '',

      status: 'active',

      programs: [],

      nutritionistId: NUTRITIONISTS[0]!.id,

      branchId: BRANCHES[0]!.id,

    }

  }

  return {

    firstName: patient.firstName,

    lastName: patient.lastName,

    documentId: patient.documentId,

    birthDate: patient.birthDate,

    gender: patient.gender,

    email: patient.email ?? '',

    phone: patient.phone ?? '',

    status: patient.status,

    programs: patient.programs,

    nutritionistId: patient.nutritionistId,

    branchId: patient.branchId,

  }

}



export function PatientFormDialog({ open, onOpenChange, patient }: PatientFormDialogProps) {

  const addPatient = usePatientsStore((s) => s.addPatient)

  const updatePatient = usePatientsStore((s) => s.updatePatient)

  const isEdit = !!patient



  const {

    register,

    handleSubmit,

    reset,

    watch,

    setValue,

    formState: { errors, isSubmitting },

  } = useForm<PatientFormValues>({

    resolver: zodResolver(patientFormSchema),

    defaultValues: toFormValues(patient),

  })



  const selectedPrograms = watch('programs') ?? []



  useEffect(() => {

    if (open) reset(toFormValues(patient))

  }, [open, patient, reset])



  const toggleProgram = (key: ClinicalProgram) => {

    const next = selectedPrograms.includes(key)

      ? selectedPrograms.filter((p) => p !== key)

      : [...selectedPrograms, key]

    setValue('programs', next, { shouldValidate: true })

  }



  const onSubmit = (values: PatientFormValues) => {

    const nutritionist = NUTRITIONISTS.find((n) => n.id === values.nutritionistId)!

    const branch = BRANCHES.find((b) => b.id === values.branchId)!



    const payload = {

      ...values,

      email: values.email || undefined,

      programs: values.programs as ClinicalProgram[],

      nutritionistName: nutritionist.name,

      branchName: branch.name,

    }



    if (isEdit && patient) {

      updatePatient(patient.id, payload)

    } else {

      addPatient({

        id: `p-${Date.now()}`,

        ...payload,

        createdAt: new Date().toISOString(),

      })

    }

    onOpenChange(false)

  }



  return (

    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="max-w-2xl">

        <DialogHeader

          title={isEdit ? 'Editar paciente' : 'Nuevo paciente'}

          description={

            isEdit

              ? 'Actualiza la información del paciente en el sistema.'

              : 'Registra un nuevo paciente en la clínica.'

          }

          onClose={() => onOpenChange(false)}

        />

        <form onSubmit={handleSubmit(onSubmit)}>

          <DialogBody className="max-h-[60vh] space-y-4 overflow-y-auto">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="space-y-1.5">

                <Label htmlFor="firstName">Nombres</Label>

                <Input id="firstName" error={!!errors.firstName} {...register('firstName')} />

                {errors.firstName && (

                  <p className="text-xs text-danger">{errors.firstName.message}</p>

                )}

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="lastName">Apellidos</Label>

                <Input id="lastName" error={!!errors.lastName} {...register('lastName')} />

                {errors.lastName && (

                  <p className="text-xs text-danger">{errors.lastName.message}</p>

                )}

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="documentId">Documento</Label>

                <Input id="documentId" error={!!errors.documentId} {...register('documentId')} />

                {errors.documentId && (

                  <p className="text-xs text-danger">{errors.documentId.message}</p>

                )}

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="birthDate">Fecha de nacimiento</Label>

                <Input id="birthDate" type="date" error={!!errors.birthDate} {...register('birthDate')} />

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="gender">Género</Label>

                <Select id="gender" error={!!errors.gender} {...register('gender')}>

                  <option value="female">Femenino</option>

                  <option value="male">Masculino</option>

                  <option value="other">Otro</option>

                </Select>

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="status">Estado</Label>

                <Select id="status" {...register('status')}>

                  {PATIENT_STATUS_LIST.map((s) => (

                    <option key={s.value} value={s.value}>

                      {s.label}

                    </option>

                  ))}

                </Select>

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="email">Email</Label>

                <Input id="email" type="email" {...register('email')} />

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="phone">Teléfono</Label>

                <Input id="phone" {...register('phone')} />

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="nutritionistId">Nutricionista</Label>

                <Select id="nutritionistId" error={!!errors.nutritionistId} {...register('nutritionistId')}>

                  {NUTRITIONISTS.map((n) => (

                    <option key={n.id} value={n.id}>

                      {n.name}

                    </option>

                  ))}

                </Select>

              </div>

              <div className="space-y-1.5">

                <Label htmlFor="branchId">Sucursal</Label>

                <Select id="branchId" error={!!errors.branchId} {...register('branchId')}>

                  {BRANCHES.map((b) => (

                    <option key={b.id} value={b.id}>

                      {b.name}

                    </option>

                  ))}

                </Select>

              </div>

            </div>



            <div className="space-y-2">

              <Label>Programas clínicos</Label>

              <div className="flex flex-wrap gap-2">

                {PROGRAM_LIST.map((prog) => {

                  const active = selectedPrograms.includes(prog.key)

                  return (

                    <button

                      key={prog.key}

                      type="button"

                      onClick={() => toggleProgram(prog.key)}

                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${

                        active ? prog.className + ' ring-2 ring-primary/40' : 'bg-muted text-muted-foreground hover:bg-muted/80'

                      }`}

                    >

                      {prog.label}

                    </button>

                  )

                })}

              </div>

              {errors.programs && (

                <p className="text-xs text-danger">{errors.programs.message}</p>

              )}

            </div>

          </DialogBody>

          <DialogFooter>

            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>

              Cancelar

            </Button>

            <Button type="submit" isLoading={isSubmitting}>

              {isEdit ? 'Guardar cambios' : 'Registrar paciente'}

            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  )

}


