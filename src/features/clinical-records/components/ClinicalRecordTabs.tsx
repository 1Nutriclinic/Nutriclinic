import {

  Activity,

  AlertCircle,

  CheckCircle2,

  Clock,

  FileText,

  Image,

  Pin,

  TrendingDown,

} from 'lucide-react'

import {

  Badge,

  Card,

  CardContent,

  CardHeader,

  CardTitle,

} from '@/components/ui'

import { EmptyState } from '@/components/common/EmptyState'

import { formatDate } from '@/utils/format'

import type { ClinicalRecord } from '../types'



function DataGrid({ children }: { children: React.ReactNode }) {

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>

}



function DataField({ label, value }: { label: string; value: string }) {

  return (

    <div className="rounded-lg border border-border bg-muted/20 px-4 py-3">

      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-medium text-foreground">{value || '—'}</p>

    </div>

  )

}



function StatusBadge({ status }: { status: 'normal' | 'high' | 'low' | 'active' | 'resolved' | 'signed' | 'pending' }) {

  const map = {

    normal: { variant: 'success' as const, label: 'Normal' },

    high: { variant: 'danger' as const, label: 'Alto' },

    low: { variant: 'warning' as const, label: 'Bajo' },

    active: { variant: 'default' as const, label: 'Activo' },

    resolved: { variant: 'success' as const, label: 'Resuelto' },

    signed: { variant: 'success' as const, label: 'Firmado' },

    pending: { variant: 'warning' as const, label: 'Pendiente' },

  }

  const meta = map[status]

  return <Badge variant={meta.variant}>{meta.label}</Badge>

}



export function InfoTab({ record }: { record: ClinicalRecord }) {

  const info = record.personalInfo

  return (

    <DataGrid>

      <DataField label="Tipo de sangre" value={info.bloodType ?? '—'} />

      <DataField label="Estado civil" value={info.maritalStatus ?? '—'} />

      <DataField label="Ocupación" value={info.occupation ?? '—'} />

      <DataField label="Seguro" value={info.insurance ?? '—'} />

      <DataField label="Dirección" value={info.address ?? '—'} />

      <DataField label="Contacto de emergencia" value={info.emergencyContact ?? '—'} />

      <DataField label="Tel. emergencia" value={info.emergencyPhone ?? '—'} />

      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 sm:col-span-2">

        <p className="text-xs font-medium text-muted-foreground">Alergias</p>

        <div className="mt-2 flex flex-wrap gap-1.5">

          {info.allergies.length > 0 ? (

            info.allergies.map((a) => (

              <Badge key={a} variant="danger">

                {a}

              </Badge>

            ))

          ) : (

            <span className="text-sm text-muted-foreground">Sin alergias registradas</span>

          )}

        </div>

      </div>

    </DataGrid>

  )

}



export function AntecedentsTab({ record }: { record: ClinicalRecord }) {

  const a = record.antecedents

  const sections = [

    { title: 'Personales', items: a.personal },

    { title: 'Familiares', items: a.family },

    { title: 'Quirúrgicos', items: a.surgical },

    { title: 'Medicamentos', items: a.medications },

  ]



  return (

    <div className="space-y-4">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {sections.map((s) => (

          <Card key={s.title}>

            <CardHeader className="pb-3">

              <CardTitle className="text-base">{s.title}</CardTitle>

            </CardHeader>

            <CardContent>

              {s.items.length > 0 ? (

                <ul className="space-y-2">

                  {s.items.map((item) => (

                    <li key={item} className="flex items-start gap-2 text-sm">

                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                      {item}

                    </li>

                  ))}

                </ul>

              ) : (

                <p className="text-sm text-muted-foreground">Sin registrar</p>

              )}

            </CardContent>

          </Card>

        ))}

      </div>

      <Card>

        <CardHeader className="pb-3">

          <CardTitle className="text-base">Hábitos de vida</CardTitle>

        </CardHeader>

        <CardContent>

          <p className="text-sm leading-relaxed text-foreground">{a.habits}</p>

        </CardContent>

      </Card>

    </div>

  )

}



export function ConsultationTab({ record }: { record: ClinicalRecord }) {

  if (record.consultations.length === 0) {

    return (

      <EmptyState

        icon={FileText}

        title="Sin consultas registradas"

        description="Las consultas aparecerán aquí cuando se registren atenciones."

      />

    )

  }



  return (

    <div className="space-y-3">

      {record.consultations.map((c) => (

        <Card key={c.id}>

          <CardContent className="p-5">

            <div className="flex flex-wrap items-start justify-between gap-2">

              <div>

                <p className="font-medium text-foreground">{c.type}</p>

                <p className="text-sm text-muted-foreground">{formatDate(c.date)} · {c.nutritionist}</p>

              </div>

              <Badge variant="secondary">{c.reason}</Badge>

            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground">{c.notes}</p>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



export function DiagnosisTab({ record }: { record: ClinicalRecord }) {

  if (record.diagnoses.length === 0) {

    return <EmptyState icon={AlertCircle} title="Sin diagnósticos" description="Registra el diagnóstico nutricional del paciente." />

  }



  return (

    <div className="space-y-3">

      {record.diagnoses.map((d, i) => (

        <Card key={`${d.code}-${i}`}>

          <CardContent className="flex items-start justify-between gap-4 p-5">

            <div>

              <div className="flex items-center gap-2">

                {d.code && <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{d.code}</code>}

                <StatusBadge status={d.status} />

              </div>

              <p className="mt-2 font-medium text-foreground">{d.description}</p>

              {d.notes && <p className="mt-1 text-sm text-muted-foreground">{d.notes}</p>}

            </div>

            <span className="shrink-0 text-xs text-muted-foreground">{formatDate(d.date)}</span>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



export function LaboratoryTab({ record }: { record: ClinicalRecord }) {

  if (record.labResults.length === 0) {

    return <EmptyState icon={Activity} title="Sin resultados de laboratorio" description="Importa o registra análisis clínicos." />

  }



  return (

    <div className="overflow-x-auto rounded-xl border border-border">

      <table className="w-full min-w-[640px] text-left text-sm">

        <thead className="border-b border-border bg-muted/40">

          <tr>

            {['Fecha', 'Examen', 'Resultado', 'Referencia', 'Estado'].map((h) => (

              <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">

                {h}

              </th>

            ))}

          </tr>

        </thead>

        <tbody className="divide-y divide-border">

          {record.labResults.map((l) => (

            <tr key={l.id} className="hover:bg-muted/20">

              <td className="px-4 py-3">{formatDate(l.date)}</td>

              <td className="px-4 py-3 font-medium">{l.test}</td>

              <td className="px-4 py-3">

                {l.value} <span className="text-muted-foreground">{l.unit}</span>

              </td>

              <td className="px-4 py-3 text-muted-foreground">{l.reference}</td>

              <td className="px-4 py-3">

                <StatusBadge status={l.status} />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}



export function AnthropometryTab({ record }: { record: ClinicalRecord }) {

  if (record.anthropometry.length === 0) {

    return <EmptyState icon={TrendingDown} title="Sin antropometría" description="Registra peso, talla e IMC del paciente." />

  }



  return (

    <div className="overflow-x-auto rounded-xl border border-border">

      <table className="w-full min-w-[720px] text-left text-sm">

        <thead className="border-b border-border bg-muted/40">

          <tr>

            {['Fecha', 'Peso (kg)', 'Talla (m)', 'IMC', 'Cintura', 'Cadera', 'Brazo'].map((h) => (

              <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">

                {h}

              </th>

            ))}

          </tr>

        </thead>

        <tbody className="divide-y divide-border">

          {record.anthropometry.map((a) => (

            <tr key={a.id} className="hover:bg-muted/20">

              <td className="px-4 py-3">{formatDate(a.date)}</td>

              <td className="px-4 py-3 font-medium">{a.weight}</td>

              <td className="px-4 py-3">{a.height}</td>

              <td className="px-4 py-3">

                <Badge variant={a.imc >= 30 ? 'danger' : a.imc >= 25 ? 'warning' : 'success'}>

                  {a.imc.toFixed(1)}

                </Badge>

              </td>

              <td className="px-4 py-3">{a.waist ?? '—'}</td>

              <td className="px-4 py-3">{a.hip ?? '—'}</td>

              <td className="px-4 py-3">{a.arm ?? '—'}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}



export function BioimpedanceTab({ record }: { record: ClinicalRecord }) {

  if (record.bioimpedance.length === 0) {

    return <EmptyState icon={Activity} title="Sin bioimpedancia" description="Conecta un dispositivo o registra manualmente." />

  }



  const latest = record.bioimpedance[0]!

  const kpis = [

    { label: 'Grasa corporal', value: `${latest.fatPercent}%` },

    { label: 'Masa muscular', value: `${latest.muscleMass} kg` },

    { label: 'Grasa visceral', value: String(latest.visceralFat) },

    { label: 'Agua corporal', value: `${latest.waterPercent}%` },

    { label: 'Edad metabólica', value: `${latest.metabolicAge} años` },

    { label: 'TMB', value: `${latest.bmr} kcal` },

  ]



  return (

    <div className="space-y-4">

      <DataGrid>

        {kpis.map((k) => (

          <DataField key={k.label} label={k.label} value={k.value} />

        ))}

      </DataGrid>

      <div className="overflow-x-auto rounded-xl border border-border">

        <table className="w-full text-left text-sm">

          <thead className="border-b border-border bg-muted/40">

            <tr>

              {['Fecha', 'Grasa %', 'Músculo', 'Visceral', 'Agua %', 'Edad metab.', 'TMB'].map((h) => (

                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">

                  {h}

                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-border">

            {record.bioimpedance.map((b) => (

              <tr key={b.id} className="hover:bg-muted/20">

                <td className="px-4 py-3">{formatDate(b.date)}</td>

                <td className="px-4 py-3">{b.fatPercent}%</td>

                <td className="px-4 py-3">{b.muscleMass} kg</td>

                <td className="px-4 py-3">{b.visceralFat}</td>

                <td className="px-4 py-3">{b.waterPercent}%</td>

                <td className="px-4 py-3">{b.metabolicAge}</td>

                <td className="px-4 py-3">{b.bmr}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}



export function PhotosTab({ record }: { record: ClinicalRecord }) {

  if (record.photos.length === 0) {

    return <EmptyState icon={Image} title="Sin fotografías" description="Sube fotos de progreso del paciente." />

  }



  return (

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

      {record.photos.map((ph) => (

        <div

          key={ph.id}

          className="group overflow-hidden rounded-xl border border-border bg-muted/30"

        >

          <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-muted to-muted/50">

            <Image className="h-10 w-10 text-muted-foreground/40" />

          </div>

          <div className="p-3">

            <p className="text-sm font-medium text-foreground">{ph.label}</p>

            <p className="text-xs text-muted-foreground">{formatDate(ph.date)}</p>

          </div>

        </div>

      ))}

    </div>

  )

}



export function DietTab({ record }: { record: ClinicalRecord }) {

  if (record.dietPlans.length === 0) {

    return <EmptyState icon={FileText} title="Sin planes alimenticios" description="Crea un plan de dieta para el paciente." />

  }



  return (

    <div className="space-y-3">

      {record.dietPlans.map((d) => (

        <Card key={d.id}>

          <CardContent className="p-5">

            <div className="flex items-start justify-between gap-2">

              <div>

                <p className="font-medium text-foreground">{d.name}</p>

                <p className="text-sm text-muted-foreground">{formatDate(d.date)}</p>

              </div>

              <Badge variant={d.status === 'active' ? 'success' : 'secondary'}>

                {d.status === 'active' ? 'Activo' : 'Archivado'}

              </Badge>

            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">

              <Macro label="Calorías" value={`${d.calories}`} unit="kcal" />

              <Macro label="Proteína" value={`${d.protein}`} unit="g" />

              <Macro label="Carbos" value={`${d.carbs}`} unit="g" />

              <Macro label="Grasa" value={`${d.fat}`} unit="g" />

            </div>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



function Macro({ label, value, unit }: { label: string; value: string; unit: string }) {

  return (

    <div className="rounded-lg bg-muted/40 px-3 py-2 text-center">

      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="font-display text-lg font-bold text-foreground">

        {value}

        <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>

      </p>

    </div>

  )

}



export function RecipesTab({ record }: { record: ClinicalRecord }) {

  if (record.recipes.length === 0) {

    return <EmptyState icon={FileText} title="Sin recetas asignadas" description="Asigna recetas desde la biblioteca de alimentos." />

  }



  return (

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

      {record.recipes.map((r) => (

        <Card key={r.id}>

          <CardContent className="p-4">

            <Badge variant="secondary" className="mb-2">

              {r.category}

            </Badge>

            <p className="font-medium text-foreground">{r.name}</p>

            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">

              <span>{r.calories} kcal</span>

              <span>·</span>

              <span className="flex items-center gap-1">

                <Clock className="h-3 w-3" />

                {r.prepTime}

              </span>

            </div>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



export function FollowUpTab({ record }: { record: ClinicalRecord }) {

  if (record.followUps.length === 0) {

    return <EmptyState icon={Activity} title="Sin seguimientos" description="Programa controles de seguimiento." />

  }



  return (

    <div className="space-y-3">

      {record.followUps.map((f) => (

        <Card key={f.id}>

          <CardContent className="p-5">

            <div className="flex items-start justify-between gap-2">

              <div>

                <p className="font-medium text-foreground">{f.type}</p>

                <p className="text-sm text-muted-foreground">{formatDate(f.date)}</p>

              </div>

              <div className="text-right">

                <p className="font-display text-2xl font-bold text-primary">{f.adherence}%</p>

                <p className="text-xs text-muted-foreground">Adherencia</p>

              </div>

            </div>

            <p className="mt-3 text-sm text-foreground">{f.notes}</p>

            {f.nextDate && (

              <p className="mt-2 text-xs text-muted-foreground">

                Próximo control: {formatDate(f.nextDate)}

              </p>

            )}

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



export function FilesTab({ record }: { record: ClinicalRecord }) {

  if (record.files.length === 0) {

    return <EmptyState icon={FileText} title="Sin archivos" description="Sube documentos, informes y estudios." />

  }



  return (

    <div className="space-y-2">

      {record.files.map((f) => (

        <div

          key={f.id}

          className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/30"

        >

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">

              <FileText className="h-5 w-5" />

            </div>

            <div>

              <p className="text-sm font-medium text-foreground">{f.name}</p>

              <p className="text-xs text-muted-foreground">

                {f.type} · {f.size} · {formatDate(f.uploadedAt)}

              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  )

}



export function ConsentsTab({ record }: { record: ClinicalRecord }) {

  return (

    <div className="space-y-3">

      {record.consents.map((c) => (

        <Card key={c.id}>

          <CardContent className="flex items-center justify-between gap-4 p-4">

            <div className="flex items-center gap-3">

              {c.status === 'signed' ? (

                <CheckCircle2 className="h-5 w-5 text-success" />

              ) : (

                <AlertCircle className="h-5 w-5 text-warning" />

              )}

              <div>

                <p className="text-sm font-medium text-foreground">{c.title}</p>

                {c.signedAt && (

                  <p className="text-xs text-muted-foreground">Firmado: {formatDate(c.signedAt)}</p>

                )}

              </div>

            </div>

            <StatusBadge status={c.status} />

          </CardContent>

        </Card>

      ))}

    </div>

  )

}



export function NotesTab({ record }: { record: ClinicalRecord }) {

  if (record.notes.length === 0) {

    return <EmptyState icon={FileText} title="Sin notas clínicas" description="Agrega notas de evolución y observaciones." />

  }



  return (

    <div className="space-y-3">

      {record.notes.map((n) => (

        <Card key={n.id} className={n.pinned ? 'border-primary/30 bg-primary/5' : ''}>

          <CardContent className="p-5">

            <div className="flex items-start justify-between gap-2">

              <div className="flex items-center gap-2">

                {n.pinned && <Pin className="h-4 w-4 text-primary" />}

                <p className="text-sm font-medium text-foreground">{n.author}</p>

              </div>

              <span className="text-xs text-muted-foreground">{formatDate(n.date)}</span>

            </div>

            <p className="mt-2 text-sm leading-relaxed text-foreground">{n.content}</p>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}


