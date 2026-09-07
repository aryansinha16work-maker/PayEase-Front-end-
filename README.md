# PayEase — Frontend

Accounts Payable automation & tax outlook interface for Indian MSMEs.
Built as a React + TypeScript + Tailwind (Vite) project — the same stack Bolt.new generates natively.

## Import into Bolt

1. Push this project to a new GitHub repository (see the main setup guide you were given).
2. On the Bolt.new homepage, click the GitHub icon below the chat box and import that repository.
3. Bolt loads it as a live, editable project — click through the sidebar to preview every screen.

## Local development (optional)

```bash
npm install
npm run dev
```

## Connecting to your n8n backend

Every screen currently reads from mock data in `src/data/mockData.ts`, through the functions in
`src/api/n8n.ts`. Once your n8n workflows are built and their webhook URLs exist:

1. Open `src/api/n8n.ts`.
2. Paste each workflow's production webhook URL into the matching constant at the top of the file
   (`INVOICES_WEBHOOK_URL`, `TAX_OUTLOOK_WEBHOOK_URL`, etc).
3. In each function (e.g. `getInvoices`), replace the mock `setTimeout` return with the commented-out
   `fetch(...)` call above it.

No other file needs to change — every page already calls these functions, so swapping the data
source here updates the whole app.

## What's built

- **Home** — plain-language balance narrator + what needs attention
- **Invoices** — full invoice table with explainability tooltips and one-click resolve
- **Tax Outlook** — GST/TDS estimate with Confirmed vs Provisional split and a confidence indicator
- **Cash Flow** — six-week forecast chart against a safety threshold
- **Vendor Watchlist** — starred vendors with GSTIN/filing-compliance status
- **Advice** — plain-language tips generated from the live tax and cash flow data
- **Add Transaction** — manual entry for off-system payments/receipts
- **Role-based login** — AP Clerk / Reviewer / Manager-Approver (demo-level, no real auth)

## What's still mocked / not built

- Live GSTR-2B / GST portal integration (report scopes this as conceptual)
- WhatsApp reminder delivery (would be triggered from n8n, not this frontend)
- Real authentication (currently a role picker, not a secured login)
