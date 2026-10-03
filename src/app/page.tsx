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
  ShieldCheck,
  Server,
  ArrowRight,
  Terminal,
  FolderTree,
  Palette,
  Sparkles,
  ShoppingCart,
  LayoutDashboard,
  Lock,
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
      className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100"
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight sm:text-base">
                Next.js 16 Pro Boilerplate
              </span>
              <span className="ml-2 font-mono text-xs text-zinc-400">v16.3.8</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="gap-1.5 font-medium">
                <ShoppingCart className="h-3.5 w-3.5 text-emerald-500" />
                Kasir
              </Button>
            </Link>
            <Link href="/admin" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="gap-1.5 font-medium">
                <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
                Admin
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="secondary" size="sm" className="gap-1.5 font-medium">
                <Palette className="h-3.5 w-3.5 text-zinc-500" />
                <span className="hidden md:inline">Design System</span>
                <span className="md:hidden">UI</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Masuk
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl space-y-24 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="gsap-fade-up inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Next.js 16.3.8 & React 19 Enterprise Foundation
          </div>
          <h1 className="gsap-fade-up text-4xl leading-[1.15] font-extrabold tracking-tight text-zinc-950 sm:text-6xl dark:text-white">
            Next.js 16 + React 19{" "}
            <span className="text-emerald-600 dark:text-emerald-400">High-Velocity Starter</span>
          </h1>
          <p className="gsap-fade-up mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Arsitektur frontend modular bebas bloat, bebas gradien norak, ditenagai animasi presisi{" "}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">GSAP</strong>, 23
            komponen in-house, dan{" "}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Bun</strong> runtime.
          </p>

          <div className="gsap-fade-up flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button variant="accent" size="lg" className="gap-2 shadow-xs">
                <ShoppingCart className="h-4 w-4" /> Buka Kasir POS
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="secondary" size="lg" className="gap-2">
                <LayoutDashboard className="h-4 w-4" /> Admin Control Hub
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="outline" size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" /> Design System
              </Button>
            </Link>
          </div>
        </div>

        {/* Ready-to-Use App Suite Showcase */}
        <section className="space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Enterprise Ready-to-Use Suite</h2>
            <p className="text-sm text-zinc-500">
              Aplikasi bisnis nyata yang dibangun dengan 100% komponen in-house dan tata letak
              presisi.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1: Kasir POS */}
            <Card className="gsap-fade-up flex flex-col justify-between">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <Badge variant="success">Production Ready</Badge>
                </div>
                <CardTitle className="text-lg">POS Kasir Terminal</CardTitle>
                <CardDescription>
                  Workspace kasir retail split-view: katalog SKU pencarian cepat, kalkulasi pajak &
                  diskon otomatis, dan modal pembayaran split tender (QRIS & Tunai).
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/dashboard">
                  <Button variant="outline" className="group w-full justify-between">
                    <span>Akses Kasir POS</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Card 2: Admin Dashboard */}
            <Card className="gsap-fade-up flex flex-col justify-between">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">Enterprise</Badge>
                </div>
                <CardTitle className="text-lg">Admin Control Hub</CardTitle>
                <CardDescription>
                  Dashboard analitik dengan sidebar collapsible (240px↔68px), filter DateRangePicker
                  terproteksi, slide-over drawer tambah produk, dan tabel audit transaksi.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/admin">
                  <Button variant="outline" className="group w-full justify-between">
                    <span>Akses Admin Hub</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Card 3: Auth Suite */}
            <Card className="gsap-fade-up flex flex-col justify-between">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-500/10 text-zinc-900 dark:text-zinc-100">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Badge variant="outline">Complete Flow</Badge>
                </div>
                <CardTitle className="text-lg">Auth & Identity Suite</CardTitle>
                <CardDescription>
                  Paket otentikasi lengkap yang simetris & dead-center: Login cepat, Register meter
                  sandi 4-tier, Lupa Password pemulihan, dan input 6-digit OTP reaktif.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Register
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/forgot-password">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-zinc-500">
                      Lupa Sandi
                    </Button>
                  </Link>
                  <Link href="/otp">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-zinc-500">
                      6-Digit OTP
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <FolderTree className="h-5 w-5" />
              </div>
              <CardTitle>Feature-Sliced Modules</CardTitle>
              <CardDescription>
                Bisnis logic terisolasi per domain di{" "}
                <code className="font-mono text-xs">src/features/*</code> (actions, hooks, services,
                types).
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <Server className="h-5 w-5" />
              </div>
              <CardTitle>Next.js 16 Server Actions</CardTitle>
              <CardDescription>
                Mutasi aman via React 19 Actions & directive{" "}
                <code className="font-mono text-xs">&quot;use server&quot;</code> tanpa boilerplate
                REST controller.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="gsap-fade-up">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle>Strict Zod Env & GSAP</CardTitle>
              <CardDescription>
                Validasi env compile-time dengan Zod dan micro-animation taktil 60 FPS menggunakan
                GSAP.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Live Feature Demonstration */}
        <section
          id="structure"
          className="space-y-8 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/80"
        >
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Contoh Modul Fitur (
                <code className="font-mono text-xl text-emerald-500">src/features/products</code>)
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Komponen UI yang menggunakan domain model, solid matte surface, dan badge reaktif.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 font-mono">
                <Terminal className="h-3 w-3" />
                bun run dev
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <ProductCard product={sampleProduct} />
            </div>

            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#121215] p-6 font-mono text-xs text-zinc-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
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
      <footer className="mt-24 border-t border-zinc-200/80 bg-white py-8 dark:border-zinc-800/80 dark:bg-[#09090b]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row">
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
