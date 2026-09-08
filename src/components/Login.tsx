import { useState } from 'react'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { Role } from '../types'

const ROLES: Role[] = ['AP Clerk', 'Reviewer', 'Manager/Approver']

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
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-8">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal font-display text-sm font-bold text-white">
            P
          </div>
          <span className="font-display text-lg font-semibold text-ink">PayEase</span>
        </div>
        <p className="mb-6 text-sm text-inksoft">Sign in to your business account</p>

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

        <p className="mt-4 text-center text-xs text-inksoft">
          Demo build — any username and password will work
        </p>
      </div>
    </div>
  )
}
