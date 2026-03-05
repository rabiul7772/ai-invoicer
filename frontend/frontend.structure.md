frontend/
│
├── public/
│
├── src/
│ ├── app.tsx # Root of the app
│ ├── main.tsx # ReactDOM render
│ │
│ ├── pages/ # All pages
│ │ ├── LoginPage.tsx
│ │ ├── DashboardPage.tsx
│ │ ├── InvoicesPage.tsx
│ │ └── ClientsPage.tsx
│ │
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # Buttons, Inputs, Modals, etc.
│ │ ├── layout/ # Header, Sidebar, Footer, ProtectedRoute
│ │ └── shared/ # Any shared components
│ │
│ ├── features/ # Feature-specific logic
│ │ ├── auth/
│ │ │ ├── api/
│ │ │ │ └── login.api.ts
│ │ │ ├── components/
│ │ │ │ └── LoginForm.tsx
│ │ │ ├── hooks/
│ │ │ │ └── useLogin.ts
│ │ │ ├── validation.ts
│ │ │ └── types.ts
│ │ │
│ │ ├── invoices/
│ │ │ ├── api/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── validation.ts
│ │ │ └── types.ts
│ │ │
│ │ ├── clients/
│ │ └── dashboard/
│ │
│ ├── hooks/ # Global custom hooks
│ ├── services/ # Axios instance, React Query client, AI service
│ │ ├── api.ts
│ │ ├── queryClient.ts
│ │ └── ai.service.ts
│ │
│ ├── lib/ # Utilities, constants, date helpers
│ │ ├── constants.ts
│ │ ├── date.ts
│ │ └── helpers.ts
│ │
│ ├── types/ # Global TypeScript types
│ ├── assets/ # Images, icons, fonts
│ └── styles/ # Tailwind globals, CSS imports
│
├── .env
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
