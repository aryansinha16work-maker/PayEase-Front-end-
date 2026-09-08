import { useEffect, useState } from 'react'
import { getTaxOutlook } from '../api/n8n'
import { ExplainTooltip } from '../components/ExplainTooltip'
import { TaxOutlook as TaxOutlookType } from '../types'

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function TaxOutlook() {
  const [outlook, setOutlook] = useState<TaxOutlookType | null>(null)

  useEffect(() => {
    getTaxOutlook().then(setOutlook)
  }, [])

  if (!outlook) return null

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Tax Outlook</h1>
      <p className="mb-8 text-sm text-inksoft">
        An estimate for {outlook.period} — this is a planning figure, not a filing figure.
      </p>

      <div className="mb-6 rounded-lg border border-marigold/40 bg-marigold/5 px-4 py-3 text-sm text-ink">
        This is a non-statutory estimate for cash-flow planning. Confirm exact figures with your accountant before filing.
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center text-xs font-medium text-inksoft">
            GST payable (est.)
            <ExplainTooltip text="Sum of GST across all invoices processed so far this period, net of claimable input tax credit." />
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{formatINR(outlook.gstPayable)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center text-xs font-medium text-inksoft">
            TDS liability (est.)
            <ExplainTooltip text="Estimated tax to be deducted and deposited on payments to contractors and professionals this period, based on vendor category." />
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{formatINR(outlook.tdsLiability)}</div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-line bg-surface p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Confidence in this estimate</span>
          <span className="font-display text-lg font-semibold text-teal-deep">{outlook.confidencePct}%</span>
        </div>
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-teal" style={{ width: `${outlook.confidencePct}%` }} />
        </div>
        <p className="text-xs text-inksoft">
          {outlook.invoicesAccounted} of an expected {outlook.invoicesExpected} invoices for this period have been accounted for.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-line bg-surface p-4">
          <div className="mb-1 text-xs font-medium text-teal-deep">Confirmed</div>
          <div className="font-display text-lg font-semibold tabular-nums text-ink">{formatINR(outlook.gstConfirmed)}</div>
          <p className="mt-1 text-xs text-inksoft">Matched against vendor GSTR-2B filings.</p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-4">
          <div className="mb-1 text-xs font-medium text-marigold">Provisional</div>
          <div className="font-display text-lg font-semibold tabular-nums text-ink">{formatINR(outlook.gstProvisional)}</div>
          <p className="mt-1 text-xs text-inksoft">Recorded internally; vendor filing not yet confirmed.</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-1 font-display text-lg font-semibold text-ink">TDS Classification by Invoice</h2>
        <p className="mb-4 text-sm text-inksoft">Section applied to each invoice based on vendor category and filing status.</p>

        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-inksoft">
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Invoice #</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Section Applied</th>
                <th className="px-4 py-3 font-medium">Rate</th>
                <th className="px-4 py-3 font-medium">TDS Amount</th>
              </tr>
            </thead>
            <tbody>
              {(outlook.tdsBreakdown ?? []).map((row, idx) => (
                <tr key={idx} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{row.vendor}</td>
                  <td className="px-4 py-3 text-inksoft">{row.invoiceNumber}</td>
                  <td className="px-4 py-3 text-inksoft">{row.category}</td>
                  <td className="px-4 py-3 tabular-nums text-ink">{formatINR(row.amount)}</td>
                  <td className="px-4 py-3">
                    {row.category === 'Unclassified' ? (
                      <span className="rounded-full bg-line px-2.5 py-1 text-xs font-medium text-inksoft">{row.section}</span>
                    ) : row.section.includes('206AB') ? (
                      <span className="font-medium text-brick">{row.section}</span>
                    ) : (
                      <span className="text-ink">{row.section}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-inksoft">{row.ratePct}%</td>
                  <td className="px-4 py-3 tabular-nums text-ink">{formatINR(row.tdsAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
