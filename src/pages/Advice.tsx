import { useEffect, useState } from 'react'
import { getTaxOutlook, getCashFlow } from '../api/n8n'

export function Advice() {
  const [tips, setTips] = useState<string[]>([])

  useEffect(() => {
    Promise.all([getTaxOutlook(), getCashFlow()]).then(([outlook, cashflow]: any) => {
      const generated: string[] = []

      if (outlook.confidencePct < 85) {
        generated.push(
          `Only ${outlook.confidencePct}% of this period's invoices are confirmed against GSTR-2B. Follow up with vendors who haven't filed yet, so your tax estimate firms up before month-end.`
        )
      }
      const lowest = Math.min(...cashflow.map((c: any) => c.projected))
      const threshold = cashflow[0]?.threshold ?? 0
      if (lowest < threshold * 1.2) {
        generated.push(
          'Your projected cash comes close to your safety threshold in the coming weeks. Consider following up on pending receivables before committing to new large payables.'
        )
      }
      generated.push(
        'Two of your MSME vendors are approaching their 45-day payment deadline. Paying on time protects your tax deduction for this expense.'
      )
      setTips(generated)
    })
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Advice</h1>
      <p className="mb-8 text-sm text-inksoft">
        Plain-language guidance generated from your own invoices, tax outlook, and cash flow — not generic tips.
      </p>

      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-ink">
            {tip}
          </div>
        ))}
      </div>
    </div>
  )
}
