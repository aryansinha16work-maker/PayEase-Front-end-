export type Role = 'AP Clerk' | 'Reviewer' | 'Manager/Approver'

export type InvoiceStatus = 'cleared' | 'mismatch' | 'missing-data' | 'duplicate' | 'pending-approval'

export interface Invoice {
  id: string
  vendor: string
  vendorId: string
  invoiceNumber: string
  amount: number
  gst: number
  dueDate: string
  poNumber: string
  status: InvoiceStatus
  explanation: string
  isMsme: boolean
  daysUntilDue: number
  paid: boolean
}

export interface Vendor {
  id: string
  name: string
  gstin: string
  category: 'Contractor' | 'Professional Services' | 'Goods Supplier'
  isMsme: boolean
  watchlisted: boolean
  totalPurchaseFY: number
  filingCompliant: boolean
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'payable' | 'receivable'
  date: string
  source: 'system' | 'manual'
}

export interface CashFlowPoint {
  week: string
  projected: number
  threshold: number
}

export interface TaxOutlook {
  period: string
  gstPayable: number
  gstConfirmed: number
  gstProvisional: number
  itcClaimable: number
  tdsLiability: number
  confidencePct: number
  invoicesAccounted: number
  invoicesExpected: number
  tdsBreakdown: Array<{
    vendor: string
    invoiceNumber: string
    category: string
    amount: number
    section: string
    ratePct: number
    tdsAmount: number
  }>
}
