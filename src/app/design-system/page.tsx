"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { toast } from "sonner";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Mail,
  Zap,
  Sliders,
  Palette,
  Type,
  Box,
  CheckSquare,
  Rows,
} from "lucide-react";

export default function DesignSystemPage() {
  const containerRef = useGsapReveal<HTMLDivElement>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(true);
  const [checkboxActive, setCheckboxActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("hardware");
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
    <div
      ref={containerRef}
      className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-emerald-500/20"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
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
        <section className="gsap-fade-up space-y-4">
          <Badge variant="outline" className="gap-1 font-mono">
            Pure In-House Engineering • GSAP Powered
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Design Tokens & UI Manual (No AI-Slop)
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Semua elemen UI dirancang custom tanpa elemen bawaan browser mentah. Warna solid matte dengan kontras tinggi,
            bebas dari gradien norak berulang, dan didukung mikro-interaksi halus GSAP.
          </p>
        </section>

        {/* 1. Color Palette Tokens */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Palette className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">1. Palet Warna Solid Matte</h2>
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
              <div className="h-16 rounded-xl bg-[#10b981] shadow-xs" />
              <p className="text-xs font-semibold">Solid Emerald</p>
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
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Box className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">2. Button Primitives (Solid Matte)</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Solid</Button>
            <Button variant="secondary">Secondary Muted</Button>
            <Button variant="outline">Outline Subtle</Button>
            <Button variant="ghost">Ghost Minimal</Button>
            <Button variant="danger">Destructive Danger</Button>
            <Button variant="accent" className="gap-2">
              <Zap className="h-4 w-4" /> Solid Emerald Accent
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

        {/* 3. Inputs, Select, Checkbox & Form Controls */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Sliders className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">3. Form Controls (Zero Native Browser HTML)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Input & Dropdown Select</CardTitle>
                <CardDescription>Custom search input dan select tanpa panah default browser yang kaku.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Cari SKU atau nama produk..."
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  options={[
                    { label: "Hardware POS & Printer", value: "hardware" },
                    { label: "Layanan Cloud & Subscription", value: "cloud" },
                    { label: "Perangkat Kasir Mobile", value: "mobile" },
                  ]}
                />
                <Textarea placeholder="Catatan pesanan kustom (custom order remarks)..." rows={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Checkbox & Interactive Controls</CardTitle>
                <CardDescription>Custom checkbox dengan icon centang, toggle switch, dan dialog modal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-3">
                  <Checkbox
                    id="tax-include"
                    checked={checkboxActive}
                    onCheckedChange={setCheckboxActive}
                    label="Termasuk PPN 11% Otomatis"
                  />
                  <Checkbox
                    id="print-auto"
                    checked={false}
                    onCheckedChange={() => {}}
                    label="Cetak struk kasir otomatis setelah pembayaran"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Auto-Sync POS</p>
                    <p className="text-xs text-zinc-500">Kirim state keranjang via WebSocket</p>
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

        {/* 4. Custom Table Component */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Rows className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">4. Custom Table Component (Zero Raw HTML Table)</h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">SKU-9921-TH</TableCell>
                <TableCell className="font-medium">Thermal Receipt Printer High-Speed</TableCell>
                <TableCell>Hardware POS</TableCell>
                <TableCell className="font-semibold">Rp 850.000</TableCell>
                <TableCell>
                  <Badge variant="success" dot>Aktif</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">SKU-8812-SC</TableCell>
                <TableCell className="font-medium">Barcode Scanner 2D Wireless</TableCell>
                <TableCell>Aksesoris</TableCell>
                <TableCell className="font-semibold">Rp 420.000</TableCell>
                <TableCell>
                  <Badge variant="success" dot>Aktif</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">SKU-1002-SR</TableCell>
                <TableCell className="font-medium">Kertas Thermal Roll 80x80 (Isi 10)</TableCell>
                <TableCell>Consumable</TableCell>
                <TableCell className="font-semibold">Rp 95.000</TableCell>
                <TableCell>
                  <Badge variant="warning" dot>Stok Tipis</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* 5. Surface Cards */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Box className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">5. Card Surfaces (Matte Elevation)</h2>
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
                <CardTitle className="text-base">Surface: Glass Overlay</CardTitle>
                <CardDescription>Backdrop blur dengan border halus tanpa bayangan pekat.</CardDescription>
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
            Ini adalah bukti bahwa seluruh elemen UI dibuat custom: tombol, modal, select, checkbox, textarea, dan table tanpa tampilan bawaan browser yang kaku.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Tutup
            </Button>
            <Button
              variant="accent"
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
