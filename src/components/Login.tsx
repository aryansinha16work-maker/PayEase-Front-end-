import { useState } from 'react'
import { Role } from '../types'

const ROLES: Role[] = ['AP Clerk', 'Reviewer', 'Manager/Approver']

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selected, setSelected] = useState<Role>('AP Clerk')

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

        <label className="mb-1.5 block text-sm font-medium text-ink">Your role</label>
        <div className="mb-6 space-y-2">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={`w-full rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                selected === r
                  ? 'border-teal bg-teal/5 font-medium text-teal-deep'
                  : 'border-line text-inksoft hover:border-inksoft/40'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={() => onLogin(selected)}
          className="w-full rounded-md bg-teal py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-deep"
        >
          Sign in
        </button>

        <p className="mt-4 text-center text-xs text-inksoft">
          Demo build — role-based access, no password required
        </p>
      </div>
    </div>
  )
}
