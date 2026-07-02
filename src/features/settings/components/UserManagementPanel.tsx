import { useState } from 'react'
import { AlertTriangle, Plus, Trash2, UserPlus } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Select } from '@/components/ui'
import { cleanupDemoData, signUpUser, usingSupabaseAuth } from '@/features/auth/api/authApi'
import type { UserRole } from '@/types'

const STAFF_ROLES: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'director', label: 'Director clínico' },
  { value: 'nutritionist', label: 'Nutricionista' },
  { value: 'assistant', label: 'Asistente' },
  { value: 'receptionist', label: 'Recepción' },
  { value: 'patient', label: 'Paciente (portal)' },
]

export function UserManagementPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<UserRole>('nutritionist')
  const [isDemo, setIsDemo] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!usingSupabaseAuth()) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Conecta Supabase (variables <code className="rounded bg-muted px-1">VITE_SUPABASE_*</code>) y ejecuta la migración SQL
          para crear usuarios reales. Mientras tanto, el login demo sigue activo.
        </CardContent>
      </Card>
    )
  }

  const handleCreate = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const result = await signUpUser({
        email,
        password,
        firstName,
        lastName,
        role,
        isDemo,
      })
      setMessage(result.message)
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al crear usuario')
    } finally {
      setLoading(false)
    }
  }

  const handleCleanup = async () => {
    if (!confirm('¿Eliminar TODOS los datos marcados como demo? Los usuarios reales (is_demo=false) se conservan.')) return
    setLoading(true)
    setError('')
    try {
      const msg = await cleanupDemoData()
      setMessage(msg)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error en limpieza')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Crear usuario
          </CardTitle>
          <CardDescription>
            Usuarios con <strong>is_demo = false</strong> se conservan al limpiar demos.
            Marca &quot;Usuario demo&quot; solo para pruebas temporales.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Apellido</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              {STAFF_ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </Select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isDemo} onChange={(e) => setIsDemo(e.target.checked)} />
              Usuario demo (se borra al limpiar)
            </label>
          </div>
          <div className="sm:col-span-2">
            <Button onClick={handleCreate} isLoading={loading} disabled={!email || password.length < 6}>
              <Plus className="h-4 w-4" />
              Crear usuario
            </Button>
          </div>
          {message && <p className="sm:col-span-2 text-sm text-success">{message}</p>}
          {error && <p className="sm:col-span-2 text-sm text-danger">{error}</p>}
        </CardContent>
      </Card>

      <Card className="border-warning/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Trash2 className="h-4 w-4" />
            Limpiar datos demo
          </CardTitle>
          <CardDescription>
            Elimina pacientes, mensajes, fotos y perfiles con <code>is_demo = true</code>.
            No afecta usuarios ni pacientes reales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleCleanup} isLoading={loading}>
            <AlertTriangle className="h-4 w-4" />
            Ejecutar limpieza demo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
