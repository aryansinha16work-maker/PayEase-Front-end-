import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts'
import { getCashFlow } from '../api/n8n'
import { CashFlowPoint } from '../types'

function formatINR(n: number) {
  return '₹' + (n / 1000).toFixed(0) + 'k'
}

export function CashFlow() {
  const [data, setData] = useState<CashFlowPoint[]>([])

  useEffect(() => {
    getCashFlow().then(setData)
  }, [])

  const lowestPoint = data.length ? Math.min(...data.map((d) => d.projected)) : 0
  const threshold = data[0]?.threshold ?? 0
  const isTight = lowestPoint < threshold * 1.15

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Cash Flow Forecast</h1>
      <p className="mb-8 text-sm text-inksoft">
        A conservative, six-week projection against your fixed-cost safety threshold.
      </p>

      {isTight && (
        <div className="mb-6 rounded-lg border border-brick/40 bg-brick/5 px-4 py-3 text-sm text-ink">
          Projected cash dips close to your safety threshold in Week 3. Consider following up on pending receivables.
        </div>
      )}

      <div className="rounded-lg border border-line bg-surface p-5">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#DEDACE" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#4A5750' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatINR} tick={{ fontSize: 12, fill: '#4A5750' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => '₹' + v.toLocaleString('en-IN')} />
            <ReferenceLine y={threshold} stroke="#B0483B" strokeDasharray="4 4" label={{ value: 'Safety threshold', fontSize: 11, fill: '#B0483B', position: 'insideTopLeft' }} />
            <Line type="monotone" dataKey="projected" stroke="#1F6F5C" strokeWidth={2.5} dot={{ r: 4, fill: '#1F6F5C' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-inksoft">
        This forecast uses a deliberately pessimistic model — it assumes receivables arrive on their latest likely date and payables leave on their earliest.
      </p>
    </div>
  )
}
