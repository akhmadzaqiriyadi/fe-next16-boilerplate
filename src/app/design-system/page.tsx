"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sliders,
  Palette,
  Type,
  Box,
} from "lucide-react";

export default function DesignSystemPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleTestToast = () => {
    toast.success("Artisan Design System", {
      description: "Original pure in-house component tanpa dependency shadcn CLI!",
    });
  };

  const handleSimulateLoad = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      toast.info("Aksi Selesai", { description: "Loading state berhasil disimulasikan." });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-emerald-500/20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
                <ArrowLeft className="h-4 w-4" /> Beranda
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <span className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-500" /> Forge Design System (FDS)
            </span>
          </div>

          <Badge variant="success" dot>
            Zero-Dependency UI
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* Intro */}
        <section className="space-y-4">
          <Badge variant="outline" className="gap-1 font-mono">
            Pure In-House Engineering
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Design Tokens & UI Component Manual
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Sistem desain buatan tangan (*artisan*) tanpa pustaka UI pihak ketiga (tanpa shadcn CLI).
            Dirancang dengan estetika minimalis, kontras tinggi, micro-interaction halus, dan aturan ketat anti-AI slop.
          </p>
        </section>

        {/* 1. Color Palette Tokens */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Palette className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">1. Palet Warna & Token Semantik</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#09090b] border border-zinc-800 shadow-xs" />
              <p className="text-xs font-semibold">Obsidian Canvas</p>
              <p className="text-[11px] font-mono text-zinc-400">#09090b</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#121215] border border-zinc-800 shadow-xs" />
              <p className="text-xs font-semibold">Obsidian Surface</p>
              <p className="text-[11px] font-mono text-zinc-400">#121215</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#10b981] shadow-xs glow-emerald" />
              <p className="text-xs font-semibold">Brand Emerald</p>
              <p className="text-[11px] font-mono text-zinc-400">#10b981</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#38bdf8] shadow-xs" />
              <p className="text-xs font-semibold">Electric Cyan</p>
              <p className="text-[11px] font-mono text-zinc-400">#38bdf8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#fbbf24] shadow-xs" />
              <p className="text-xs font-semibold">Warm Amber</p>
              <p className="text-[11px] font-mono text-zinc-400">#fbbf24</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-[#fb7185] shadow-xs" />
              <p className="text-xs font-semibold">Rose Danger</p>
              <p className="text-[11px] font-mono text-zinc-400">#fb7185</p>
            </div>
          </div>
        </section>

        {/* 2. Button Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Box className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">2. Button Primitives</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Solid</Button>
            <Button variant="secondary">Secondary Muted</Button>
            <Button variant="outline">Outline Subtle</Button>
            <Button variant="ghost">Ghost Minimal</Button>
            <Button variant="danger">Destructive Danger</Button>
            <Button variant="glow" className="gap-2">
              <Zap className="h-4 w-4" /> Kinetic Glow
            </Button>
            <Button
              variant="primary"
              isLoading={btnLoading}
              onClick={handleSimulateLoad}
            >
              Simulate Loading
            </Button>
          </div>
        </section>

        {/* 3. Inputs & Form Controls */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Sliders className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">3. Input & Interactive Controls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Text Inputs</CardTitle>
                <CardDescription>Dengan prefix icon, focus ring emerald, dan validasi error.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Cari SKU atau nama produk..."
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <Input
                  type="email"
                  placeholder="developer@akhmadzaqiriyadi.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error="Format email tidak valid (contoh error)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Toggle Switch & Modal</CardTitle>
                <CardDescription>Interaksi micro-animation murni tanpa lib eksternal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Auto-Sync Realtime POS</p>
                    <p className="text-xs text-zinc-500">Sinkronisasi keranjang ke server Go</p>
                  </div>
                  <Switch checked={isSwitchActive} onCheckedChange={setIsSwitchActive} />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                    Buka Dialog Modal
                  </Button>
                  <Button variant="secondary" onClick={handleTestToast}>
                    Trigger Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. Badges & Status Indicators */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Type className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">4. Status Badges</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default Dark</Badge>
            <Badge variant="secondary">Secondary Muted</Badge>
            <Badge variant="success" dot>
              Active Running
            </Badge>
            <Badge variant="warning" dot>
              Pending Approval
            </Badge>
            <Badge variant="danger" dot>
              Critical Failure
            </Badge>
            <Badge variant="outline">Custom Outlined</Badge>
          </div>
        </section>

        {/* 5. Surface Cards */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Box className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">5. Card Surfaces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card surface="default">
              <CardHeader>
                <CardTitle className="text-base">Surface: Default</CardTitle>
                <CardDescription>Untuk panel data standar, dashboard widget, dan list item.</CardDescription>
              </CardHeader>
            </Card>

            <Card surface="glass">
              <CardHeader>
                <CardTitle className="text-base">Surface: Glass</CardTitle>
                <CardDescription>Backdrop blur dengan border halus untuk overlay dan floating menu.</CardDescription>
              </CardHeader>
            </Card>

            <Card surface="interactive">
              <CardHeader>
                <CardTitle className="text-base">Surface: Interactive</CardTitle>
                <CardDescription>Hover lift effect dan highlight border emerald saat kursor masuk.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* Interactive Pure Modal Demo */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Pure In-House Modal"
        description="Dibuat tanpa Radix UI atau headless lib eksternal. Mendukung tombol ESC dan backdrop click."
      >
        <div className="space-y-4 pt-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Ini adalah bukti bahwa kita bisa membuat komponen UI yang elegan, accessible, dan hemat bundle size tanpa harus bergantung pada ribuan baris library pihak ketiga.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Tutup
            </Button>
            <Button
              variant="glow"
              onClick={() => {
                setIsDialogOpen(false);
                toast.success("Aksi dikonfirmasi!");
              }}
            >
              Konfirmasi
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
