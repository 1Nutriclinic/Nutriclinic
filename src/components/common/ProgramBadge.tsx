import { cn } from '@/utils/cn'
import { PROGRAMS } from '@/constants/programs'
import type { ClinicalProgram } from '@/types'

export function ProgramBadge({
  program,
  className,
}: {
  program: ClinicalProgram
  className?: string
}) {
  const meta = PROGRAMS[program]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  )
}
