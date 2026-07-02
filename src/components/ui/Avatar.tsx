import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { getInitials } from '@/utils/format'

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy'
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
} as const

const statusColor = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  busy: 'bg-warning',
} as const

export function Avatar({ name, src, size = 'md', status, className, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className={cn('rounded-full object-cover ring-2 ring-background', sizeMap[size])}
          {...props}
        />
      ) : (
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-800 font-semibold text-primary-foreground ring-2 ring-background',
            sizeMap[size],
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background',
            statusColor[status],
          )}
        />
      )}
    </span>
  )
}
