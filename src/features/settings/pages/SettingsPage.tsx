import { useState } from 'react'
import {
  Bell,
  Globe,
  Lock,
  Palette,
  Save,
  Shield,
  User,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import { cn } from '@/utils/cn'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/store/authStore'
import { BRAND_COLORS, MOCK_NOTIFICATIONS, MOCK_ROLES } from '../data/mockSettings'
import { LANGUAGES, ROLE_LABELS, type SupportedLanguage } from '../types'
import { UserManagementPanel } from '../components/UserManagementPanel'

export function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)
  const { theme } = useTheme()

  const [language, setLanguage] = useState<SupportedLanguage>('es')
  const [brandColor, setBrandColor] = useState('#2563EB')
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [saved, setSaved] = useState(false)

  const handleSaveProfile = () => {
    updateUser({ firstName, lastName, email, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotification = (id: string, channel: 'email' | 'push' | 'whatsapp') => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [channel]: !n[channel] } : n)),
    )
  }

  return (
    <div>
      <PageHeader
        title="Configuración"
        description="Preferencias del sistema, roles, permisos, idioma y personalización."
        breadcrumbs={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Configuración' }]}
        actions={
          <Button size="sm" onClick={handleSaveProfile}>
            <Save className="h-4 w-4" />
            {saved ? 'Guardado' : 'Guardar cambios'}
          </Button>
        }
      />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Tabs defaultValue="profile">
          <TabsList className="mb-4 flex-wrap">
            <TabsTrigger value="profile" icon={<User className="h-4 w-4" />}>Perfil</TabsTrigger>
            <TabsTrigger value="users" icon={<Users className="h-4 w-4" />}>Usuarios</TabsTrigger>
            <TabsTrigger value="roles" icon={<Users className="h-4 w-4" />}>Roles</TabsTrigger>
            <TabsTrigger value="language" icon={<Globe className="h-4 w-4" />}>Idioma</TabsTrigger>
            <TabsTrigger value="branding" icon={<Palette className="h-4 w-4" />}>Marca</TabsTrigger>
            <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>Notificaciones</TabsTrigger>
            <TabsTrigger value="security" icon={<Lock className="h-4 w-4" />}>Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil y cuenta</CardTitle>
                <CardDescription>Información personal y datos de contacto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={`${firstName} ${lastName}`}
                    src={user?.avatarUrl}
                    size="xl"
                  />
                  <div>
                    <p className="font-semibold">{firstName} {lastName}</p>
                    <Badge variant="outline">{ROLE_LABELS[user?.role ?? 'nutritionist'] ?? user?.role}</Badge>
                    <p className="mt-1 text-sm text-muted-foreground">{user?.jobTitle ?? 'Profesional de salud'}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+51 999 000 000" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagementPanel />
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Roles y permisos</CardTitle>
                <CardDescription>Matriz de acceso por rol en la plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_ROLES.map((role) => (
                    <div key={role.role} className="rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.users} usuario{role.users !== 1 ? 's' : ''}</p>
                        </div>
                        <Button variant="outline" size="sm">Editar permisos</Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {role.permissions.map((p) => (
                          <Badge key={p} variant={p === '*' ? 'default' : 'secondary'} className="text-[10px]">
                            {p === '*' ? 'Acceso total' : p.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Idioma y región</CardTitle>
                <CardDescription>Multiidioma — interfaz y formatos regionales.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Object.entries(LANGUAGES) as [SupportedLanguage, string][]).map(([code, label]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-colors',
                        language === code ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-border hover:bg-muted/40',
                      )}
                    >
                      <p className="font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{code.toUpperCase()}</p>
                    </button>
                  ))}
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Zona horaria</Label>
                    <Input defaultValue="America/Lima (UTC-5)" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Formato de fecha</Label>
                    <Input defaultValue="DD/MM/YYYY" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Tema y marca</CardTitle>
                <CardDescription>Personalización visual de la clínica.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="font-medium">Modo claro / oscuro</p>
                    <p className="text-sm text-muted-foreground">Actual: {theme === 'dark' ? 'Oscuro' : 'Claro'}</p>
                  </div>
                  <ThemeToggle />
                </div>
                <div>
                  <Label className="mb-3 block">Color primario de marca</Label>
                  <div className="flex flex-wrap gap-3">
                    {BRAND_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setBrandColor(color)}
                        className={cn(
                          'h-10 w-10 rounded-full border-2 transition-transform hover:scale-110',
                          brandColor === color ? 'border-foreground scale-110' : 'border-transparent',
                        )}
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nombre comercial</Label>
                  <Input defaultValue="NutriClinic Perú" />
                </div>
                <div className="space-y-2">
                  <Label>Logo (URL)</Label>
                  <Input placeholder="https://…" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Canales de alerta por tipo de evento.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        {['Evento', 'Email', 'Push', 'WhatsApp'].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {notifications.map((n) => (
                        <tr key={n.id}>
                          <td className="px-4 py-3">
                            <p className="font-medium">{n.label}</p>
                            <p className="text-xs text-muted-foreground">{n.description}</p>
                          </td>
                          {(['email', 'push', 'whatsapp'] as const).map((ch) => (
                            <td key={ch} className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() => toggleNotification(n.id, ch)}
                                className={cn(
                                  'h-6 w-11 rounded-full transition-colors',
                                  n[ch] ? 'bg-primary' : 'bg-muted',
                                )}
                              >
                                <span
                                  className={cn(
                                    'block h-5 w-5 rounded-full bg-white shadow transition-transform',
                                    n[ch] ? 'translate-x-5' : 'translate-x-0.5',
                                  )}
                                />
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Contraseña
                  </CardTitle>
                  <CardDescription>Actualiza tu contraseña de acceso.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Contraseña actual</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nueva contraseña</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar contraseña</Label>
                    <Input type="password" />
                  </div>
                  <Button size="sm">Cambiar contraseña</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Autenticación 2FA
                  </CardTitle>
                  <CardDescription>Capa adicional de seguridad para tu cuenta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Google Authenticator o Authy</p>
                      </div>
                      <Badge variant="secondary">Desactivado</Badge>
                    </div>
                    <Button size="sm" className="mt-3" variant="outline">Activar 2FA</Button>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="font-medium">Sesiones activas</p>
                    <p className="mt-1 text-sm text-muted-foreground">1 sesión activa en este dispositivo</p>
                    <Button size="sm" className="mt-3" variant="outline">Cerrar otras sesiones</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
