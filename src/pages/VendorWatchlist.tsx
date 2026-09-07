import { useEffect, useState } from 'react'
import { Star, ShieldAlert, ShieldCheck } from 'lucide-react'
import { getVendors } from '../api/n8n'
import { Vendor } from '../types'

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function VendorWatchlist() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filter, setFilter] = useState<'all' | 'watchlisted'>('all')

  useEffect(() => {
    getVendors().then(setVendors)
  }, [])

  const shown = filter === 'watchlisted' ? vendors.filter((v) => v.watchlisted) : vendors

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Vendor Watchlist</h1>
      <p className="mb-6 text-sm text-inksoft">
        Flag key vendor relationships for closer tracking of GSTIN, bank details, and filing compliance.
      </p>

      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${filter === 'all' ? 'bg-teal text-white' : 'border border-line text-inksoft'}`}
        >
          All vendors
        </button>
        <button
          onClick={() => setFilter('watchlisted')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${filter === 'watchlisted' ? 'bg-teal text-white' : 'border border-line text-inksoft'}`}
        >
          Watchlisted only
        </button>
      </div>

      <div className="space-y-2">
        {shown.map((v) => (
          <div key={v.id} className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <Star size={16} className={v.watchlisted ? 'fill-marigold text-marigold' : 'text-line'} />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  {v.name}
                  {v.isMsme && <span className="rounded bg-teal/10 px-1.5 py-0.5 text-[10px] font-medium text-teal-deep">MSME · 45-day rule</span>}
                </div>
                <div className="text-xs text-inksoft">{v.gstin} · {v.category} · {formatINR(v.totalPurchaseFY)} FY spend</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {v.filingCompliant ? (
                <span className="flex items-center gap-1 text-teal-deep">
                  <ShieldCheck size={14} /> Filing up to date
                </span>
              ) : (
                <span className="flex items-center gap-1 text-brick">
                  <ShieldAlert size={14} /> Filing overdue — 206AB applies
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
