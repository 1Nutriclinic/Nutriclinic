import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { buttonVariants } from '@/components/ui'
import { cn } from '@/utils/cn'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-display text-8xl font-black text-primary/20">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-foreground">Página no encontrada</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        La ruta que buscas no existe o fue movida. Verifica la URL o vuelve al panel principal.
      </p>
      <Link to="/dashboard" className={cn(buttonVariants(), 'mt-6')}>
        <Home className="h-4 w-4" />
        Volver al Dashboard
      </Link>
    </div>
  )
}
