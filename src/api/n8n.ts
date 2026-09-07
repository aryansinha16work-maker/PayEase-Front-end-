// -----------------------------------------------------------------------
// n8n integration layer
// -----------------------------------------------------------------------
import { invoices, vendors, transactions, cashFlowSeries, taxOutlook } from '../data/mockData'
import { Invoice, Vendor, Transaction, CashFlowPoint } from '../types'
const INVOICES_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-invoices'
const VENDORS_WEBHOOK_URL = ''
const TAX_OUTLOOK_WEBHOOK_URL = 'https://aryan1612.app.n8n.cloud/webhook/payease-tax-outlook'
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
  return new Promise((resolve) => setTimeout(() => resolve(cashFlowSeries), 300))
}
export async function getTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => setTimeout(() => resolve(transactions), 300))
}
export async function approveInvoice(invoiceId: string): Promise<{ success: boolean }> {
  console.log('[mock] approving invoice', invoiceId)
  return { success: true }
}
export async function addTransaction(tx: Omit<Transaction, 'id' | 'source'>): Promise<{ success: boolean }> {
  console.log('[mock] adding manual transaction', tx)
  return { success: true }
}
