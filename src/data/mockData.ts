import { Invoice, Vendor, Transaction, CashFlowPoint } from '../types'

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Shree Ganesh Steel Traders', gstin: '27ABCDE1234F1Z5', category: 'Goods Supplier', isMsme: true, watchlisted: true, totalPurchaseFY: 4200000, filingCompliant: true },
  { id: 'v2', name: 'Kotak Legal Associates', gstin: '27PQRSX5678G1Z2', category: 'Professional Services', isMsme: false, watchlisted: true, totalPurchaseFY: 480000, filingCompliant: true },
  { id: 'v3', name: 'Rane Fabrication Works', gstin: '27LMNOQ9988H1Z9', category: 'Contractor', isMsme: true, watchlisted: false, totalPurchaseFY: 1150000, filingCompliant: false },
  { id: 'v4', name: 'Bright Path Consulting', gstin: '27WXYZT4321K1Z6', category: 'Professional Services', isMsme: false, watchlisted: false, totalPurchaseFY: 260000, filingCompliant: true },
  { id: 'v5', name: 'Om Sai Packaging', gstin: '27HIJKL7766M1Z3', category: 'Goods Supplier', isMsme: true, watchlisted: true, totalPurchaseFY: 890000, filingCompliant: true },
]

export const invoices: Invoice[] = [
  { id: 'i1', vendor: 'Shree Ganesh Steel Traders', vendorId: 'v1', invoiceNumber: 'SGST-3341', amount: 118000, gst: 18000, dueDate: '2026-09-12', poNumber: 'PO-2291', status: 'cleared', explanation: 'Matched PO and goods receipt automatically. GSTR-2B confirmed.', isMsme: true, daysUntilDue: 5, paid: false },
  { id: 'i2', vendor: 'Rane Fabrication Works', vendorId: 'v3', invoiceNumber: 'RFW-118', amount: 56000, gst: 8542, dueDate: '2026-09-09', poNumber: 'PO-2287', status: 'mismatch', explanation: 'Invoice amount is ₹4,000 higher than the matching PO. Needs review before approval.', isMsme: true, daysUntilDue: 2, paid: false },
  { id: 'i3', vendor: 'Kotak Legal Associates', vendorId: 'v2', invoiceNumber: 'KLA-092', amount: 47200, gst: 7200, dueDate: '2026-09-20', poNumber: 'PO-2299', status: 'pending-approval', explanation: 'Waiting on Manager sign-off — routed after professional-fee threshold check.', isMsme: false, daysUntilDue: 13, paid: false },
  { id: 'i4', vendor: 'Om Sai Packaging', vendorId: 'v5', invoiceNumber: 'OSP-771', amount: 32000, gst: 4881, dueDate: '2026-09-08', poNumber: 'PO-2302', status: 'missing-data', explanation: 'PO number on the invoice does not match any open PO. Flagged for manual lookup.', isMsme: true, daysUntilDue: 1, paid: false },
  { id: 'i5', vendor: 'Bright Path Consulting', vendorId: 'v4', invoiceNumber: 'BPC-045', amount: 47200, gst: 7200, dueDate: '2026-09-11', poNumber: 'PO-2296', status: 'duplicate', explanation: 'Same vendor, amount and invoice date as invoice BPC-044 processed last week.', isMsme: false, daysUntilDue: 4, paid: false },
  { id: 'i6', vendor: 'Shree Ganesh Steel Traders', vendorId: 'v1', invoiceNumber: 'SGST-3355', amount: 212400, gst: 32400, dueDate: '2026-09-25', poNumber: 'PO-2308', status: 'cleared', explanation: 'Matched PO and goods receipt automatically. GSTR-2B provisional — vendor filing pending.', isMsme: true, daysUntilDue: 18, paid: false },
]

export const transactions: Transaction[] = [
  { id: 't1', description: 'Cash payment — local courier', amount: 3200, type: 'payable', date: '2026-09-05', source: 'manual' },
  { id: 't2', description: 'Advance received — Nimbus Retail', amount: 150000, type: 'receivable', date: '2026-09-04', source: 'manual' },
]

export const cashFlowSeries: CashFlowPoint[] = [
  { week: 'Wk 1', projected: 640000, threshold: 400000 },
  { week: 'Wk 2', projected: 512000, threshold: 400000 },
  { week: 'Wk 3', projected: 398000, threshold: 400000 },
  { week: 'Wk 4', projected: 455000, threshold: 400000 },
  { week: 'Wk 5', projected: 610000, threshold: 400000 },
  { week: 'Wk 6', projected: 588000, threshold: 400000 },
]

export const taxOutlook = {
  period: 'September 2026 (month-to-date)',
  gstPayable: 96420,
  gstConfirmed: 75210,
  gstProvisional: 21210,
  itcClaimable: 61840,
  tdsLiability: 18640,
  confidencePct: 78,
  invoicesAccounted: 23,
  invoicesExpected: 29,
}
