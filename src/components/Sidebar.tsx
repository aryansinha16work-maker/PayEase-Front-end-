import { LayoutGrid, FileStack, Compass, TrendingUp, Star, MessageCircleQuestion, PlusCircle, LogOut } from 'lucide-react'
import { Role } from '../types'

export type Page = 'home' | 'invoices' | 'tax' | 'cashflow' | 'vendors' | 'advice' | 'add'

const NAV: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'invoices', label: 'Invoices', icon: FileStack },
  { id: 'tax', label: 'Tax Outlook', icon: Compass },
  { id: 'cashflow', label: 'Cash Flow', icon: TrendingUp },
  { id: 'vendors', label: 'Vendor Watchlist', icon: Star },
  { id: 'advice', label: 'Advice', icon: MessageCircleQuestion },
  { id: 'add', label: 'Add Transaction', icon: PlusCircle },
]

export function Sidebar({
  active,
  onNavigate,
  role,
  onSignOut,
}: {
  active: Page
  onNavigate: (p: Page) => void
  role: Role
  onSignOut: () => void
}) {
  return (
    <aside className="flex h-screen w-56 flex-col justify-between border-r border-line bg-surface px-4 py-6">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal font-display text-sm font-bold text-white">
            P
          </div>
          <span className="font-display text-lg font-semibold text-ink">PayEase</span>
        </div>

        <nav className="space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-teal/10 font-medium text-teal-deep'
                    : 'text-inksoft hover:bg-paper hover:text-ink'
                }`}
              >
                <Icon size={17} strokeWidth={2} />
                {label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-line pt-4">
        <div className="px-2 text-xs text-inksoft">Signed in as</div>
        <div className="px-2 pb-3 text-sm font-medium text-ink">{role}</div>
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-inksoft hover:bg-paper hover:text-brick"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
