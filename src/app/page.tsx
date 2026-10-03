import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";
import {
  Zap,
  Layers,
  ShieldCheck,
  Server,
  ArrowRight,
  GitBranch,
  Terminal,
  FolderTree,
} from "lucide-react";

const sampleProduct: Product = {
  id: "prod-1",
  sku: "POS-SKU-9921",
  name: "Thermal Receipt Printer High-Speed",
  price: 850000,
  stock: 24,
  category: "Hardware POS",
  status: "active",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-radial-[at_50%_0%] from-zinc-100 via-zinc-50 to-white text-zinc-900 dark:from-zinc-900 dark:via-zinc-950 dark:to-black dark:text-zinc-100 antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm sm:text-base">Next.js 16 Pro Boilerplate</span>
              <span className="ml-2 text-xs text-zinc-400 font-mono">v16.3.8</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" className="gap-1.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Turbopack Ready
            </Badge>
            <a
              href="https://github.com/akhmadzaqiriyadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5">
                <GitBranch className="h-3.5 w-3.5" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-zinc-500" />
            Industry Standard 2026 Feature-Driven Architecture
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-950 dark:text-white leading-[1.15]">
            Next.js 16 + React 19{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              High-Velocity Starter
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Boilerplate produksi modular yang dirancang untuk kecepatan tinggi, keamanan tipe data end-to-end,
            dan skalabilitas domain enterprise menggunakan <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Bun</strong> runtime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#structure">
              <Button size="lg" className="gap-2 shadow-md">
                Jelajahi Arsitektur <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Dokumentasi Next.js 16
              </Button>
            </a>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <section className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <FolderTree className="h-5 w-5" />
              </div>
              <CardTitle>Feature-Sliced Modules</CardTitle>
              <CardDescription>
                Bisnis logic terisolasi per domain di <code className="font-mono text-xs">src/features/*</code> (actions, hooks, services, types).
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <Server className="h-5 w-5" />
              </div>
              <CardTitle>Next.js 16 Server Actions</CardTitle>
              <CardDescription>
                Mutasi aman via React 19 Actions & directive <code className="font-mono text-xs">&quot;use server&quot;</code> tanpa boilerplate REST controller.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle>Strict Zod Env & Types</CardTitle>
              <CardDescription>
                Validasi environment variabel saat build-time menggunakan Zod di <code className="font-mono text-xs">src/env.ts</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Live Feature Demonstration */}
        <section id="structure" className="mt-20 space-y-8">
          <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Contoh Modul Fitur (<code className="text-emerald-500 font-mono text-xl">src/features/products</code>)</h2>
                <p className="text-sm text-zinc-500 mt-1">Komponen UI yang menggunakan domain model & badge reaktif.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 font-mono">
                  <Terminal className="h-3 w-3" />
                  bun run dev
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <ProductCard product={sampleProduct} />
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-200 font-mono text-xs overflow-x-auto shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                  <span>📂 Project Structure (2026 Standard)</span>
                  <span>Turbopack</span>
                </div>
                <pre className="mt-4 leading-relaxed">
{`src/
├── app/                  # Routing & Layouts ONLY
│   ├── (auth)/           # Route Group (Auth)
│   ├── (dashboard)/      # Route Group (Dashboard)
│   ├── error.tsx         # Global Client Error Boundary
│   ├── loading.tsx       # Root Suspense Skeleton
│   ├── not-found.tsx     # 404 Route
│   ├── layout.tsx        # HTML Root Layout
│   └── page.tsx          # Home Page Composition
├── components/ui/        # Reusable UI Primitives (Button, Card, Badge)
├── env.ts                # Type-Safe Zod Env Validation
├── features/             # Modular Domain Logic
│   └── products/
│       ├── actions/      # Next.js 16 "use server" Actions
│       ├── components/   # ProductCard, ProductList
│       ├── services/     # API/DB calls
│       └── types.ts      # Product interfaces
├── lib/
│   └── utils.ts          # cn() Tailwind Class Merger
└── services/
    └── api-client.ts     # Type-Safe Fetch Wrapper`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 py-8">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 text-xs text-zinc-500 gap-4">
          <p>© 2026 Akhmad Zaqi (Jack) Riyadi. Built with Bun & Next.js 16.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">Clean Architecture</span>
            <span>•</span>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">Zero-Config Turbopack</span>
            <span>•</span>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">React 19 Server Components</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
