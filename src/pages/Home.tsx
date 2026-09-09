import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Clock, Upload, FileText } from 'lucide-react'
import { getInvoices, getTaxOutlook, getTransactions, uploadInvoiceFile } from '../api/n8n'
import { Invoice, Transaction } from '../types'
import { ExplainTooltip } from '../components/ExplainTooltip'

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [outlook, setOutlook] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')

  useEffect(() => {
    getInvoices().then(setInvoices)
    getTaxOutlook().then(setOutlook)
    getTransactions().then(setTransactions)
  }, [])

  const payable = invoices.filter((i) => !i.paid).reduce((sum, i) => sum + i.amount, 0)
  const receivable = transactions.filter((t) => t.type === 'receivable').reduce((sum, t) => sum + t.amount, 0)
  const dueSoon = invoices.filter((i) => i.daysUntilDue <= 3 && !i.paid)
  const needsAttention = invoices.filter((i) => i.status !== 'cleared' && i.status !== 'pending-approval')

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <p className="mb-1 text-sm text-inksoft">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      <h1 className="mb-8 font-display text-2xl font-semibold leading-snug text-ink">
        You have {formatINR(payable)} payable across {invoices.length} invoices this month.
        {dueSoon.length > 0 && (
          <> {dueSoon.length} {dueSoon.length === 1 ? 'is' : 'are'} due within 3 days.</>
        )}{' '}
        {outlook && <>Your estimated tax position stands at {formatINR(outlook.gstPayable)}.</>}
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{formatINR(receivable)}</div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-inksoft">
            <Clock size={14} className="text-marigold" />
            Due within 3 days
          </div>
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">{dueSoon.length} invoices</div>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-line bg-surface p-5">
        <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-ink">
          <Upload size={15} className="text-teal" />
          Upload an invoice
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-inksoft hover:border-teal">
            <FileText size={15} className="text-inksoft/60" />
            <span className="truncate">
              {selectedFile ? selectedFile.name : 'Choose a file (.pdf, .png, .jpg)'}
            </span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {
                setSelectedFile(e.target.files?.[0] ?? null)
                setUploadMessage('')
              }}
              className="hidden"
            />
          </label>
          <button
            onClick={async () => {
              if (!selectedFile) return
              setUploading(true)
              setUploadMessage('')
              const result = await uploadInvoiceFile(selectedFile)
              setUploading(false)
              if (result.success) {
                setUploadMessage("Invoice submitted. It'll appear in Invoices within about 30 seconds.")
                setSelectedFile(null)
              } else {
                setUploadMessage('Upload failed. Please try again.')
              }
            }}
            disabled={!selectedFile || uploading}
            className="rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
        {uploadMessage && (
          <p className="mt-3 text-sm text-teal">{uploadMessage}</p>
        )}
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
