import { useState } from 'react'
import { User, Lock, Eye, EyeOff, ScanLine, GitCompareArrows, Compass } from 'lucide-react'
import { Role } from '../types'

const ROLES: Role[] = ['AP Clerk', 'Reviewer', 'Manager/Approver']

const FEATURES = [
  { icon: ScanLine, text: 'Invoices read automatically the moment they arrive' },
  { icon: GitCompareArrows, text: 'Every invoice matched against its purchase order' },
  { icon: Compass, text: 'Live GST and TDS position, not just at month-end' },
]

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<Role>('AP Clerk')

  const canSubmit = username.trim().length > 0 && password.length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onLogin(role)
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-teal-deep p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal opacity-40" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-marigold opacity-20" />

        <div className="relative">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white font-display text-base font-bold text-teal-deep">
              P
            </div>
            <span className="font-display text-xl font-semibold">PayEase</span>
          </div>
        </div>

        <div className="relative">
          <h1 className="mb-4 font-display text-3xl font-semibold leading-snug">
            Accounts payable,<br />handled automatically.
          </h1>
          <p className="mb-8 max-w-sm text-sm text-white/80">
            Built for Indian MSMEs — invoice capture, PO matching, and tax visibility, all in one place.
          </p>
          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-white/15">
                  <Icon size={15} strokeWidth={2} />
                </div>
                <p className="text-sm text-white/90">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/50">© 2026 PayEase. Built for Indian MSMEs.</p>
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal font-display text-sm font-bold text-white">
              P
            </div>
            <span className="font-display text-lg font-semibold text-ink">PayEase</span>
          </div>

          <h2 className="mb-1 font-display text-2xl font-semibold text-ink">Welcome back</h2>
          <p className="mb-8 text-sm text-inksoft">Sign in to your business account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Username</label>
              <div className="relative">
                <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-inksoft/60" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. aryan.sinha"
                  className="w-full rounded-md border border-line py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-teal"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-inksoft/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-line py-2.5 pl-9 pr-9 text-sm text-ink outline-none focus:border-teal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-inksoft/60 hover:text-ink"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-md border border-line bg-surface py-2.5 px-3 text-sm text-ink outline-none focus:border-teal"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-md bg-teal py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
