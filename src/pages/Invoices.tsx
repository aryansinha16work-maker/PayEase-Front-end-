import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { getInvoices, approveInvoice, settleInvoice } from '../api/n8n'
import { Invoice, InvoiceStatus } from '../types'
import { ExplainTooltip } from '../components/ExplainTooltip'

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

const STATUS_STYLE: Record<InvoiceStatus, string> = {
  cleared: 'bg-teal/10 text-teal-deep',
  mismatch: 'bg-brick/10 text-brick',
  'missing-data': 'bg-brick/10 text-brick',
  duplicate: 'bg-brick/10 text-brick',
  'pending-approval': 'bg-marigold/15 text-marigold',
}

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    getInvoices().then(setInvoices)
  }, [])

  async function handleApprove(id: string) {
    await approveInvoice(id)
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'cleared' } : i)))
  }

  async function handleSettle(id: string) {
    await settleInvoice(id)
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, paid: true } : i)))
  }

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Invoices</h1>
      <p className="mb-8 text-sm text-inksoft">Every invoice captured this cycle, auto-matched against its PO and goods receipt.</p>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-inksoft">
              <th className="px-4 py-3 font-medium">Vendor</th>
              <th className="px-4 py-3 font-medium">Invoice #</th>
              <th className="px-4 py-3 font-medium">PO #</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center font-medium text-ink">
                    {inv.vendor}
                    {inv.isMsme && (
                      <span className="ml-2 rounded bg-teal/10 px-1.5 py-0.5 text-[10px] font-medium text-teal-deep">MSME</span>
                    )}
                    <ExplainTooltip text={inv.explanation} />
                  </div>
                </td>
                <td className="px-4 py-3 text-inksoft">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 text-inksoft">{inv.poNumber}</td>
                <td className="px-4 py-3 tabular-nums text-ink">{formatINR(inv.amount)}</td>
                <td className="px-4 py-3 text-inksoft">{inv.daysUntilDue}d</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLE[inv.status]}`}>
                    {inv.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {inv.status !== 'cleared' && (
                    <button
                      onClick={() => handleApprove(inv.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-ink hover:border-teal hover:text-teal-deep"
                    >
                      <CheckCircle2 size={13} />
                      Resolve
                    </button>
                  )}
                  {inv.status === 'cleared' && !inv.paid && (
                    <button
                      onClick={() => handleSettle(inv.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-ink hover:border-teal hover:text-teal-deep"
                    >
                      <CheckCircle2 size={13} />
                      Mark Paid
                    </button>
                  )}
                  {inv.status === 'cleared' && inv.paid && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-deep">
                      <CheckCircle2 size={13} />
                      Paid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
