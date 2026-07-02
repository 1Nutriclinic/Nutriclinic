interface TooltipEntry {
  dataKey?: string | number
  name?: string | number
  value?: number | string
  color?: string
  payload?: { fill?: string }
}

interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: TooltipEntry[]
}

/** Themed tooltip shared by every recharts chart in the dashboard. */
export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-elevated">
      {label !== undefined && (
        <p className="mb-1 font-semibold text-foreground">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`${String(entry.dataKey)}-${index}`} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color ?? entry.payload?.fill }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
