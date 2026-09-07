Replace the entire content of src/api/n8n.ts with this code exactly, don't change anything else:

// -----------------------------------------------------------------------
// n8n integration layer
// -----------------------------------------------------------------------
import { invoices, vendors, transactions, cashFlowSeries, taxOutlook } from '../data/mockData'
import { Invoice, Vendor, Transaction, CashFlowPoint } from '../types'

const INVOICES_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-invoices'
const VENDORS_WEBHOOK_URL = ''
const TAX_OUTLOOK_WEBHOOK_URL = ''
const CASH_FLOW_WEBHOOK_URL = ''
const APPROVE_INVOICE_WEBHOOK_URL = ''
const ADD_TRANSACTION_WEBHOOK_URL = ''

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const res = await fetch(INVOICES_WEBHOOK_URL)
    if (!res.ok) throw new Error('Failed to load invoices')
    return await res.json()
  } catch (err) {
    console.error('getInvoices failed, falling back to mock data:', err)
    return invoices
  }
}

export async function getVendors(): Promise<Vendor[]> {
  return new Promise((resolve) => setTimeout(() => resolve(vendors), 300))
}

export async function getTaxOutlook() {
  return new Promise((resolve) => setTimeout(() => resolve(taxOutlook), 300))
}

export async function getCashFlow(): Promise<CashFlowPoint[]> {
  return new Promise((resolve) => setTimeout(() => resolve(cashFlowSeries), 300))
}

export async function