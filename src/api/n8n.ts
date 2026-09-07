// -----------------------------------------------------------------------
// n8n integration layer
// -----------------------------------------------------------------------
// Every function below currently returns local mock data (from ../data/mockData)
// so the interface is fully browsable before the n8n backend exists.
//
// TO CONNECT TO REAL n8n WORKFLOWS:
// 1. In n8n, add a "Webhook" trigger node to the relevant workflow and
//    activate it. Copy the "Production URL" it gives you.
// 2. Paste that URL into the corresponding constant below (e.g. INVOICES_WEBHOOK_URL).
// 3. Replace the mock return statement in that function with a real fetch,
//    following the commented example inside getInvoices().
// -----------------------------------------------------------------------

import { invoices, vendors, transactions, cashFlowSeries, taxOutlook } from '../data/mockData'
import { Invoice, Vendor, Transaction, CashFlowPoint } from '../types'

// Replace these with your real n8n production webhook URLs once built.
const INVOICES_WEBHOOK_URL = ''
const VENDORS_WEBHOOK_URL = ''
const TAX_OUTLOOK_WEBHOOK_URL = ''
const CASH_FLOW_WEBHOOK_URL = ''
const APPROVE_INVOICE_WEBHOOK_URL = ''
const ADD_TRANSACTION_WEBHOOK_URL = ''

export async function getInvoices(): Promise<Invoice[]> {
  // Real version, once INVOICES_WEBHOOK_URL is set:
  //
  // const res = await fetch(INVOICES_WEBHOOK_URL)
  // if (!res.ok) throw new Error('Failed to load invoices')
  // return res.json()

  return new Promise((resolve) => setTimeout(() => resolve(invoices), 300))
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

export async function getTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => setTimeout(() => resolve(transactions), 300))
}

export async function approveInvoice(invoiceId: string): Promise<{ success: boolean }> {
  // Real version:
  // const res = await fetch(APPROVE_INVOICE_WEBHOOK_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ invoiceId }),
  // })
  // return res.json()

  console.log('[mock] approving invoice', invoiceId)
  return { success: true }
}

export async function addTransaction(tx: Omit<Transaction, 'id' | 'source'>): Promise<{ success: boolean }> {
  console.log('[mock] adding manual transaction', tx)
  return { success: true }
}
