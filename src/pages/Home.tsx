import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react'
import { getInvoices, getTaxOutlook } from '../api/n8n'
import { Invoice } from '../types'
import { ExplainTooltip } from '../components/ExplainTooltip'

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [outlook, setOutlook] = useState<any>(null)

  useEffect(() => {
    getInvoices().then(setInvoices)
    getTaxOutlook().then(setOutlook)
  }, [])

  const payable = invoices.reduce((sum, i) => sum + i.amount, 0)
  const dueSoon = invoices.filter((i) => i.daysUntilDue <= 3)
  const needsAttention = invoices.filter((i) => i.status !== 'cleared' && i.status !== 'pending-approval')

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <p className="mb-1 text-sm text-inksoft">Tuesday, 8 September</p>
      <h1 className="mb-8 font-display text-2xl font-semibold leading-snug text-ink">
        You have {formatINR(payable)} payable across {invoices.length} invoices this month.
        {dueSoon.length > 0 && (
          <> {dueSoon.length} {dueSoon.length === 1 ? 'is' : 'are'} due within 3 days.</>
        )}{' '}
        {outlook && <>Your estimated tax position stands at {formatINR(outlook.gstPayable)}.</>}
      </h1>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-inksoft">
            <ArrowUpRight size={14} className="text-brick" />
            Payable this month
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{formatINR(payable)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-inksoft">
            <ArrowDownRight size={14} className="text-teal" />
            Receivable this month
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{formatINR(150000)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-inksoft">
            <Clock size={14} className="text-marigold" />
            Due within 3 days
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{dueSoon.length} invoices</div>
        </div>
      </div>

      {needsAttention.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-medium text-ink">Needs your attention</h2>
          <div className="space-y-2">
            {needsAttention.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3">
                <div>
                  <div className="flex items-center text-sm font-medium text-ink">
                    {inv.vendor}
                    <ExplainTooltip text={inv.explanation} />
                  </div>
                  <div className="text-xs text-inksoft">
                    {inv.invoiceNumber} · {formatINR(inv.amount)} · due in {inv.daysUntilDue}d
                  </div>
                </div>
                <span className="rounded-full bg-brick/10 px-2.5 py-1 text-xs font-medium capitalize text-brick">
                  {inv.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
