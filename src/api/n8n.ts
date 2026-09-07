// -----------------------------------------------------------------------
// n8n integration layer
// -----------------------------------------------------------------------
import { invoices, vendors, transactions, cashFlowSeries, taxOutlook } from '../data/mockData'
import { Invoice, Vendor, Transaction, CashFlowPoint } from '../types'
const INVOICES_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-invoices'
const VENDORS_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-vendors'
const TAX_OUTLOOK_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-tax-outlook'
const CASH_FLOW_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-cashflow'
const APPROVE_INVOICE_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-resolve-invoice'
const ADD_TRANSACTION_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-add-transaction'
const SETTLE_INVOICE_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-settle-invoice'
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
  try {
    const res = await fetch(VENDORS_WEBHOOK_URL)
    if (!res.ok) throw new Error('Failed to load vendors')
    return await res.json()
  } catch (err) {
    console.error('getVendors failed, falling back to mock data:', err)
    return vendors
  }
}
export async function getTaxOutlook() {
  try {
    const res = await fetch(TAX_OUTLOOK_WEBHOOK_URL)
    if (!res.ok) throw new Error('Failed to load tax outlook')
    return await res.json()
  } catch (err) {
    console.error('getTaxOutlook failed, falling back to mock data:', err)
    return taxOutlook
  }
}
export async function getCashFlow(): Promise<CashFlowPoint[]> {
  try {
    const res = await fetch(CASH_FLOW_WEBHOOK_URL)
    if (!res.ok) throw new Error('Failed to load cash flow')
    return await res.json()
  } catch (err) {
    console.error('getCashFlow failed, falling back to mock data:', err)
    return cashFlowSeries
  }
}
export async function settleInvoice(invoiceId: string): Promise<{ success: boolean }> {
  try {
    const res = await fetch(SETTLE_INVOICE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId }),
    })
    if (!res.ok) throw new Error('Failed to settle invoice')
    return await res.json()
  } catch (err) {
    console.error('settleInvoice failed:', err)
    return { success: false }
  }
}
export async function getTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => setTimeout(() => resolve(transactions), 300))
}
export async function approveInvoice(invoiceId: string): Promise<{ success: boolean }> {
  try {
    const res = await fetch(APPROVE_INVOICE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId }),
    })
    if (!res.ok) throw new Error('Failed to resolve invoice')
    return await res.json()
  } catch (err) {
    console.error('approveInvoice failed:', err)
    return { success: false }
  }
}
export async function addTransaction(tx: Omit<Transaction, 'id' | 'source'>): Promise<{ success: boolean }> {
  try {
    const res = await fetch(ADD_TRANSACTION_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    })
    if (!res.ok) throw new Error('Failed to add transaction')
    return await res.json()
  } catch (err) {
    console.error('addTransaction failed:', err)
    return { success: false }
  }
}
