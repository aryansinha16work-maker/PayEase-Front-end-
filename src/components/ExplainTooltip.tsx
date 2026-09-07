import { useState } from 'react'
import { Info } from 'lucide-react'

export function ExplainTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="Why is this showing?"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-inksoft/40 text-inksoft hover:border-teal hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal/40"
      >
        <Info size={11} strokeWidth={2.5} />
      </button>
      {open && (
        <span className="absolute left-1/2 top-6 z-20 w-64 -translate-x-1/2 rounded-md border border-line bg-surface p-3 text-xs leading-relaxed text-ink shadow-lg">
          {text}
        </span>
      )}
    </span>
  )
}
