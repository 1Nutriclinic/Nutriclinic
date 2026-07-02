import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface TabsContextValue {
  value: string
  onChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
  return ctx
}

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const onChange = (next: string) => {
    setInternal(next)
    onValueChange?.(next)
  }

  return (
    <TabsContext.Provider value={{ value: current, onChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function TabsTrigger({ value, children, className, icon }: TabsTriggerProps) {
  const { value: active, onChange } = useTabsContext()
  const isActive = active === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onChange(value)}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
        className,
      )}
    >
      {icon}
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string
  children: ReactNode
  className?: string
}) {
  const { value: active } = useTabsContext()
  if (active !== value) return null

  return (
    <div role="tabpanel" className={cn('mt-4 animate-fade-in', className)}>
      {children}
    </div>
  )
}
