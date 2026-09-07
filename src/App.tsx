import { useState } from 'react'
import { Sidebar, Page } from './components/Sidebar'
import { Login } from './components/Login'
import { Home } from './pages/Home'
import { Invoices } from './pages/Invoices'
import { TaxOutlook } from './pages/TaxOutlook'
import { CashFlow } from './pages/CashFlow'
import { VendorWatchlist } from './pages/VendorWatchlist'
import { Advice } from './pages/Advice'
import { AddTransaction } from './pages/AddTransaction'
import { Role } from './types'

export default function App() {
  const [role, setRole] = useState<Role | null>(null)
  const [page, setPage] = useState<Page>('home')

  if (!role) {
    return <Login onLogin={setRole} />
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar active={page} onNavigate={setPage} role={role} onSignOut={() => setRole(null)} />
      <main className="flex-1 overflow-y-auto">
        {page === 'home' && <Home />}
        {page === 'invoices' && <Invoices />}
        {page === 'tax' && <TaxOutlook />}
        {page === 'cashflow' && <CashFlow />}
        {page === 'vendors' && <VendorWatchlist />}
        {page === 'advice' && <Advice />}
        {page === 'add' && <AddTransaction />}
      </main>
    </div>
  )
}
