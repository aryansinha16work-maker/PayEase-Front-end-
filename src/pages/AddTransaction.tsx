import { useState } from 'react'
import { addTransaction } from '../api/n8n'

export function AddTransaction() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'payable' | 'receivable'>('payable')
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description || !amount) return
    await addTransaction({
      description,
      amount: Number(amount),
      type,
      date: new Date().toISOString().slice(0, 10),
    })
    setSaved(true)
    setDescription('')
    setAmount('')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-lg px-8 py-10">
      <h1 className="mb-1 font-display text-xl font-semibold text-ink">Add Transaction</h1>
      <p className="mb-8 text-sm text-inksoft">
        Log something that happened off-system — a cash payment, an advance received — so your forecasts stay accurate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-surface p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Cash payment to courier"
            className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-teal"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Amount (₹)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="0"
            className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-teal"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType('payable')}
              className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${type === 'payable' ? 'border-brick bg-brick/5 text-brick' : 'border-line text-inksoft'}`}
            >
              Payable
            </button>
            <button
              type="button"
              onClick={() => setType('receivable')}
              className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${type === 'receivable' ? 'border-teal bg-teal/5 text-teal-deep' : 'border-line text-inksoft'}`}
            >
              Receivable
            </button>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-teal py-2.5 text-sm font-medium text-white hover:bg-teal-deep">
          Save transaction
        </button>

        {saved && <p className="text-center text-xs font-medium text-teal-deep">Transaction saved.</p>}
      </form>
    </div>
  )
}
