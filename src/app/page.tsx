"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import {
  Zap,
  Layers,
  ShieldCheck,
  Server,
  ArrowRight,
  GitBranch,
  Terminal,
  FolderTree,
  Palette,
  Sparkles,
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
  const containerRef = useGsapReveal<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased"
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm sm:text-base">Next.js 16 Pro Boilerplate</span>
              <span className="ml-2 text-xs text-zinc-400 font-mono">v16.3.8</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/design-system">
              <Button variant="secondary" size="sm" className="gap-1.5 font-medium">
                <Palette className="h-3.5 w-3.5 text-emerald-500" />
                Design System
              </Button>
            </Link>
            <Badge variant="success" dot className="py-1">
              GSAP + Turbopack
            </Badge>
            <a
              href="https://github.com/akhmadzaqiriyadi/fe-next16-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5">
                <GitBranch className="h-3.5 w-3.5" />
                GitHub
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24 space-y-20">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="gsap-fade-up inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-[11px] font-medium text-zinc-700 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-zinc-500" />
            Solid Matte Swiss Aesthetic • No AI-Slop • Zero Native HTML
          </div>
          <h1 className="gsap-fade-up text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-950 dark:text-white leading-[1.15]">
            Next.js 16 + React 19{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              High-Velocity Starter
            </span>
          </h1>
          <p className="gsap-fade-up text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Arsitektur frontend modular bebas bloat, bebas gradien norak, ditenagai animasi presisi <strong className="font-semibold text-zinc-900 dark:text-zinc-100">GSAP</strong> dan <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Bun</strong> runtime.
          </p>

          <div className="gsap-fade-up flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/design-system">
              <Button variant="accent" size="lg" className="gap-2 shadow-xs">
                <Sparkles className="h-4 w-4" /> Living Design System
              </Button>
            </Link>
            <a href="#structure">
              <Button variant="secondary" size="lg" className="gap-2">
                Jelajahi Arsitektur <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <FolderTree className="h-5 w-5" />
              </div>
              <CardTitle>Feature-Sliced Modules</CardTitle>
              <CardDescription>
                Bisnis logic terisolasi per domain di <code className="font-mono text-xs">src/features/*</code> (actions, hooks, services, types).
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <Server className="h-5 w-5" />
              </div>
              <CardTitle>Next.js 16 Server Actions</CardTitle>
              <CardDescription>
                Mutasi aman via React 19 Actions & directive <code className="font-mono text-xs">&quot;use server&quot;</code> tanpa boilerplate REST controller.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle>Strict Zod Env & GSAP</CardTitle>
              <CardDescription>
                Validasi env compile-time dengan Zod dan micro-animation taktil 60 FPS menggunakan GSAP.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Live Feature Demonstration */}
        <section id="structure" className="space-y-8 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Contoh Modul Fitur (<code className="text-emerald-500 font-mono text-xl">src/features/products</code>)</h2>
              <p className="text-sm text-zinc-500 mt-1">Komponen UI yang menggunakan domain model, solid matte surface, dan badge reaktif.</p>
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

            <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-6 text-zinc-200 font-mono text-xs overflow-x-auto shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                <span>📂 Project Structure (2026 Standard)</span>
                <span>Turbopack</span>
              </div>
              <pre className="mt-4 leading-relaxed">
{`src/
├── app/                  # Routing & Layouts ONLY
│   ├── (auth)/           # Route Group (Auth)
│   ├── (dashboard)/      # Route Group (Dashboard)
│   ├── design-system/    # Living Styleguide
│   ├── error.tsx         # Global Client Error Boundary
│   ├── loading.tsx       # Root Suspense Skeleton
│   ├── not-found.tsx     # 404 Route
│   ├── layout.tsx        # HTML Root Layout
│   └── page.tsx          # Home Page Composition
├── components/ui/        # 100% IN-HOUSE ATOMIC PRIMITIVES
│   ├── button.tsx        # Solid Matte Buttons
│   ├── input.tsx         # Custom Inputs
│   ├── select.tsx        # Custom Dropdowns (Zero Native Select)
│   ├── checkbox.tsx      # Custom Checkboxes (Zero Native Checkbox)
│   ├── textarea.tsx      # Custom Textareas
│   ├── table.tsx         # Custom Tables
│   ├── dialog.tsx        # Pure Accessible Modal
│   ├── switch.tsx        # Accessible Toggle Pill
│   ├── badge.tsx         # Status Indicators
│   └── card.tsx          # Surface Tiers
├── hooks/
│   └── use-gsap-reveal.ts # GSAP Stagger Entrance Animations
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
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-[#09090b] py-8">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 text-xs text-zinc-500 gap-4">
          <p>© 2026 Akhmad Zaqi (Jack) Riyadi. Built with Bun & Next.js 16.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">Clean Architecture</span>
            <span>•</span>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">GSAP Animations</span>
            <span>•</span>
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300">Zero AI Slop</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
