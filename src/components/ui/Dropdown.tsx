import {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useClickOutside } from '@/hooks/useClickOutside'

interface DropdownProps {
  trigger: ReactElement<{ onClick?: () => void }>
  children: ReactNode
  align?: 'start' | 'end'
  className?: string
}

export function Dropdown({ trigger, children, align = 'end', className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setOpen(false), open)

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger, { onClick: () => setOpen((prev) => !prev) })
    : trigger

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerNode}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute top-full z-50 mt-2 min-w-[13rem] overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-elevated',
              align === 'end' ? 'right-0' : 'left-0',
              className,
            )}
            onClick={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  destructive?: boolean
}

export function DropdownItem({
  icon,
  destructive,
  className,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
        destructive ? 'text-danger hover:bg-danger/10' : 'text-foreground',
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {children}
    </button>
  )
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">{children}</div>
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-border" />
}
