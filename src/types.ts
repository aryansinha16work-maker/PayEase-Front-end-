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
