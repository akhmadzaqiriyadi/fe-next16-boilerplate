# Forge — Next.js 16 + React 19 Enterprise Boilerplate & POS Suite

An enterprise-grade, high-performance web boilerplate and point-of-sale (POS) cashier application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Bun**.

Crafted with a solid matte aesthetic, custom design tokens, GSAP micro-animations, and a complete suite of 23 hand-built UI primitives.

---

## ⚡ Tech Stack

| Layer                    | Technology                                                                  | Description                                                     |
| ------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Runtime & PM**         | [Bun](https://bun.sh) `^1.3.8`                                              | Ultra-fast JavaScript runtime, package manager, and test runner |
| **Framework**            | [Next.js](https://nextjs.org) `16.3.8`                                      | App Router, React Server Components (RSC), Turbopack            |
| **UI Library**           | [React](https://react.dev) `19.2.8`                                         | Latest React 19 with actions, transitions, and native metadata  |
| **Styling**              | [Tailwind CSS](https://tailwindcss.com) `^4.0.0`                            | CSS-first configuration, CSS custom property design tokens      |
| **Animations**           | [GSAP](https://gsap.com) `^3.15.0` + `@gsap/react`                          | High-fidelity entrance reveals and timeline animations          |
| **State Management**     | [Zustand](https://github.com/pmndrs/zustand) `^5.0`                         | Minimalist reactive state for cart, sidebar, and UI triggers    |
| **Data Fetching**        | [TanStack Query](https://tanstack.com/query) `^5.104`                       | Powerful async state caching and background synchronization     |
| **Forms & Validation**   | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)     | Type-safe form handling with schema validation                  |
| **Icons & Feedback**     | [Lucide React](https://lucide.dev) + [Sonner](https://sonner.emilkowal.ski) | Crisp SVG icons and lightweight toast notifications             |
| **Theme System**         | [next-themes](https://github.com/pacocoursey/next-themes)                   | Seamless light and obsidian dark mode with zero flash (FOUC)    |
| **Linting & Code Style** | [ESLint 9](https://eslint.org) + [Prettier 3](https://prettier.io)          | Strict React compiler linting and Tailwind class sorting        |

---

## 🚀 Quick Start

Ensure you have **[Bun](https://bun.sh)** installed on your machine.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/akhmadzaqiriyadi/fe-next16-boilerplate.git
cd fe-next16-boilerplate
bun install
```

### 2. Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) (or specified port) in your browser.

---

## 🛠️ CLI Scripts

All scripts are executed via `bun`:

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `bun run dev`          | Launch local Turbopack development server |
| `bun run build`        | Compile optimized production build        |
| `bun run start`        | Launch Next.js production server          |
| `bun run lint`         | Run ESLint across all files               |
| `bun run lint:fix`     | Automatically fix linting issues          |
| `bun run format`       | Format entire codebase using Prettier     |
| `bun run format:check` | Check code formatting compliance          |

---

## 📁 Project Architecture

Feature-Sliced architecture designed for clean separation of concerns and scaling:

```
fe-next16-boilerplate/
├── .agents/                 # Workspace agent rules & skills
├── public/                  # Static assets & icons
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, Error boundaries)
│   │   ├── admin/           # Enterprise merchant backoffice dashboard
│   │   ├── dashboard/       # Real-time POS Cashier terminal
│   │   ├── design-system/   # Living UI component playground
│   │   ├── forgot-password/ # Account recovery flow
│   │   ├── login/           # Authentication portal
│   │   ├── otp/             # 6-digit OTP verification screen
│   │   ├── register/        # Merchant onboarding & signup
│   │   ├── globals.css      # Design tokens (Light & Obsidian Dark palettes)
│   │   ├── layout.tsx       # Root layout with ThemeProvider & Sonner Toaster
│   │   └── page.tsx         # Landing page with GSAP hero reveals
│   ├── components/
│   │   └── ui/              # 23 bespoke design system primitives
│   ├── features/            # Domain-specific modules
│   │   ├── cart/            # Cart store, drawer, and receipt generator
│   │   └── products/        # Product grid, category filters, and search
│   ├── hooks/               # Custom reusable React 19 hooks
│   │   ├── use-debounce.ts  # Input debounce for search filtering
│   │   ├── use-gsap-reveal.ts # GSAP scroll-triggered entrance animations
│   │   └── use-presence.ts  # Clean mounting/unmounting exit transitions
│   ├── lib/                 # Core utilities
│   │   ├── date-utils.ts    # Date & time formatting helpers
│   │   └── utils.ts         # `cn` (clsx + tailwind-merge)
│   ├── services/            # API integration layer
│   │   └── api-client.ts    # Centralized HTTP request client
│   └── env.ts               # Validated client & server environment variables
├── .prettierrc              # Prettier config with Tailwind plugin
├── eslint.config.mjs        # ESLint 9 flat configuration
└── package.json             # Bun dependencies and scripts
```

---

## 🧭 Application Modules & Routes

### 1. 💳 Point-of-Sale (POS) Cashier Terminal (`/dashboard`)

- **Real-Time Product Catalog**: Category filtering, instant debounced search, and responsive product cards.
- **Dynamic Transaction Cart**:
  - Quantity control with optically centered `<Plus />` and `<Minus />` buttons.
  - Tabular-numbers typography (`tabular-nums font-mono`) to prevent price shifting.
  - Quick discount chips (0%, 5%, 10%, 15%).
  - One-click item removal and cart reset.
- **Printable Thermal Receipt**:
  - Generates itemized breakdown, tax computation, and order number (`INV-XXXXXX`).
  - Direct integration with `window.print()` using CSS `@media print` rules.

### 2. 🛡️ Enterprise Admin Console (`/admin`)

- **Compact Collapsible Navigation**:
  - Collapses smoothly to `68px` or expands to `256px`.
  - Icon-centered layout with zero horizontal overflow or clipping.
  - In-header panel toggle when open, footer/brand button when collapsed.
- **Merchant Metrics**: Revenue stats, order volume, live inventory stock trackers, and transaction history tables with status badges.

### 3. 🔐 Authentication Flow Suite

- Modern clean split-screen layout with subtle matte surface cards:
  - `/login`: Secure email/password login and quick social providers.
  - `/register`: Merchant onboarding registration.
  - `/forgot-password`: Email recovery link dispatcher.
  - `/otp`: Auto-focusing multi-input OTP verification with resend timer.

### 4. 🎨 Living Design System (`/design-system`)

- Interactive preview catalog covering all 23 components across states (default, hover, focus, disabled, active).
- Live Dark/Light theme testing.

### 5. 🌐 Landing Page (`/`)

- Showcase landing page equipped with GSAP-powered hero animations, feature highlights, live POS preview card, and pricing tiers.

---

## 🧩 In-House UI Component Primitives (`src/components/ui/`)

All 23 components are built in-house with zero dependence on heavy unstyled headless bloat:

| Component           | File                    | Key Features                                                                                              |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| **Button**          | `button.tsx`            | Variants: `default`, `secondary`, `outline`, `ghost`, `danger`, `link`. Multiple sizes.                   |
| **Input**           | `input.tsx`             | Icon prefixes, error states, and clean focus rings.                                                       |
| **Textarea**        | `textarea.tsx`          | Auto-resizing text fields with subtle borders.                                                            |
| **Checkbox**        | `checkbox.tsx`          | Accessible custom checkbox with smooth tick animation.                                                    |
| **Switch**          | `switch.tsx`            | Modern iOS-style toggle with smooth glide physics.                                                        |
| **Badge**           | `badge.tsx`             | Clean status tags: `default`, `secondary`, `success`, `warning`, `danger`, `outline`.                     |
| **Card**            | `card.tsx`              | Structured containers with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. |
| **Dialog**          | `dialog.tsx`            | Modal overlay with 240ms exit animation powered by `usePresence`.                                         |
| **Sheet**           | `sheet.tsx`             | Slide-out side drawer with smooth entry and exit transitions.                                             |
| **Backdrop**        | `backdrop.tsx`          | Blur scrim layer with fade-in and fade-out animations.                                                    |
| **DropdownMenu**    | `dropdown-menu.tsx`     | Positioned contextual popup menu with action items and dividers.                                          |
| **Select**          | `select.tsx`            | Fully styled custom select menu replacing native dropdowns.                                               |
| **Combobox**        | `combobox.tsx`          | Searchable filterable autocomplete input.                                                                 |
| **DatePicker**      | `date-picker.tsx`       | Calendar picker with year/month jump and custom selection.                                                |
| **DateRangePicker** | `date-range-picker.tsx` | Dual-date range picker for analytics and reports.                                                         |
| **TimePicker**      | `time-picker.tsx`       | Hour, minute, and period selector.                                                                        |
| **Table**           | `table.tsx`             | Clean data table styling with hoverable rows.                                                             |
| **Tabs**            | `tabs.tsx`              | Underline and pill tab bar navigation.                                                                    |
| **Tooltip**         | `tooltip.tsx`           | Instant informational hover popup.                                                                        |
| **Sidebar**         | `sidebar.tsx`           | Responsive collapsible navigation rail.                                                                   |
| **Skeleton**        | `skeleton.tsx`          | Shimmer placeholder loader for async layouts.                                                             |
| **Spinner**         | `spinner.tsx`           | Minimalist SVG rotating loading indicator.                                                                |
| **ThemeToggle**     | `theme-toggle.tsx`      | Light/Dark theme toggle button with smooth icon morph.                                                    |

---

## 🎨 Design Philosophy & Tokens

1. **Matte Solid Over Glassmorphism Gimmicks**:
   - High legibility, dark obsidian canvas (`#09090b`), clean surface layers (`#121215`), and crisp 1px borders (`rgba(255, 255, 255, 0.07)`).
2. **Restrained Border Radii**:
   - Modern enterprise aesthetic using `rounded-[4px]`, `rounded-md`, or `rounded-xl`. No bubble/capsule shapes.
3. **Typography**:
   - **Plus Jakarta Sans** for body copy and UI elements.
   - **Geist Mono** for numbers, currency, invoice codes, and tabular data.
4. **Motion with Intent**:
   - GSAP timelines for primary entrance reveals.
   - 200–260ms cubic-bezier transitions for dialogs, sheets, and dropdowns.

---

## 📜 License

Private repository — Proprietary. Created by [akhmadzaqiriyadi](https://github.com/akhmadzaqiriyadi).
