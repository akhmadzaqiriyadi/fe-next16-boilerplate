"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Sheet } from "@/components/ui/sheet";
import { Sidebar } from "@/components/ui/sidebar";
import { Tabs } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Zap,
  Sliders,
  Palette,
  Box,
  Rows,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Share2,
  Filter,
  Loader,
  Calendar,
  Layers,
  PanelRight,
  Info,
} from "lucide-react";

export default function DesignSystemPage() {
  const containerRef = useGsapReveal<HTMLDivElement>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(true);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("hardware");
  const [comboboxVal, setComboboxVal] = useState("pos-printer");
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());
  const [dateRange, setDateRange] = useState<DateRange>(() => ({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }));
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarActiveId, setSidebarActiveId] = useState("dashboard");
  const [liveSearch, setLiveSearch] = useState("");
  const debouncedSearch = useDebounce(liveSearch, 400);
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
      className="min-h-screen bg-zinc-50 text-zinc-900 antialiased selection:bg-emerald-500/20 dark:bg-[#09090b] dark:text-zinc-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="-ml-2 gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Beranda
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight">
              <Sparkles className="h-4 w-4 text-emerald-500" /> Forge Design System (FDS)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="success" dot>
              Zero-Dependency UI
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        {/* Intro */}
        <section className="gsap-fade-up space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            23 In-House Primitives & Design Tokens
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Design Tokens & Advanced Controls
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Struktur geometris tegas, palet solid matte, dropdown menu floating, searchable
            combobox, theme toggle dark/light, skeleton, dan custom checkbox yang sepenuhnya
            interaktif.
          </p>
        </section>

        {/* 1. Color Palette Tokens */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Palette className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">1. Palet Warna Solid Matte</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            <div className="space-y-2">
              <div className="h-16 rounded-md border border-zinc-800 bg-[#09090b] shadow-xs" />
              <p className="text-xs font-semibold">Obsidian Canvas</p>
              <p className="font-mono text-[11px] text-zinc-400">#09090b</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md border border-zinc-800 bg-[#121215] shadow-xs" />
              <p className="text-xs font-semibold">Obsidian Surface</p>
              <p className="font-mono text-[11px] text-zinc-400">#121215</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-[#10b981] shadow-xs" />
              <p className="text-xs font-semibold">Solid Emerald</p>
              <p className="font-mono text-[11px] text-zinc-400">#10b981</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-[#38bdf8] shadow-xs" />
              <p className="text-xs font-semibold">Electric Cyan</p>
              <p className="font-mono text-[11px] text-zinc-400">#38bdf8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-[#fbbf24] shadow-xs" />
              <p className="text-xs font-semibold">Warm Amber</p>
              <p className="font-mono text-[11px] text-zinc-400">#fbbf24</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-[#fb7185] shadow-xs" />
              <p className="text-xs font-semibold">Rose Danger</p>
              <p className="font-mono text-[11px] text-zinc-400">#fb7185</p>
            </div>
          </div>
        </section>

        {/* 2. Button Variants */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Box className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              2. Button Primitives (Solid Matte, No Pills)
            </h2>
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
            <Button variant="primary" isLoading={btnLoading} onClick={handleSimulateLoad}>
              Simulate Loading
            </Button>
          </div>
        </section>

        {/* 3. Inputs, Checkbox & Form Controls */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Sliders className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              3. Form Controls & Interactive Checkbox
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Input & Select</CardTitle>
                <CardDescription>
                  Custom search input dan select tanpa panah default browser yang kaku.
                </CardDescription>
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
                <CardDescription>
                  Custom checkbox interaktif (klik untuk mencoba centang!).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-3">
                  <Checkbox
                    id="tax-include"
                    checked={checkbox1}
                    onCheckedChange={(val) => {
                      setCheckbox1(val);
                      toast.info(`PPN 11%: ${val ? "Diaktifkan" : "Dinonaktifkan"}`);
                    }}
                    label="Termasuk PPN 11% Otomatis"
                  />
                  <Checkbox
                    id="print-auto"
                    checked={checkbox2}
                    onCheckedChange={(val) => {
                      setCheckbox2(val);
                      toast.info(`Cetak Otomatis: ${val ? "Aktif" : "Nonaktif"}`);
                    }}
                    label="Cetak struk kasir otomatis setelah pembayaran"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-zinc-800">
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

        {/* 4. Date & Time Pickers */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Calendar className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              4. Date Picker, Range (H-1 Safe) & Time Picker
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Single Date Picker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Single Date Picker</CardTitle>
                <CardDescription>
                  Kalender floating kustom dengan navigasi bulan dan zero native HTML.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DatePicker
                  value={selectedDate}
                  onChange={(d) => {
                    setSelectedDate(d);
                    if (d) toast.info(`Tanggal: ${d.toLocaleDateString("id-ID")}`);
                  }}
                  placeholder="Pilih tanggal..."
                />
                <div className="rounded-md border border-zinc-200 bg-zinc-100/70 p-3 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                  Tanggal:{" "}
                  <span className="font-bold text-emerald-500">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("id-ID", { dateStyle: "medium" })
                      : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Date Range Picker with H-1 Bug Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Date Range Picker (H-1 Safe)</CardTitle>
                <CardDescription>
                  Proteksi anti-bug range: klik tgl sebelum start otomatis me-reset start date.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DateRangePicker
                  value={dateRange}
                  onChange={(range) => {
                    setDateRange(range);
                    if (range.from && range.to) {
                      toast.success("Rentang tanggal valid");
                    }
                  }}
                  placeholder="Pilih periode..."
                />
                <div className="space-y-0.5 rounded-md border border-zinc-200 bg-zinc-100/70 p-3 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                  <div>
                    Dari:{" "}
                    <span className="font-bold text-emerald-500">
                      {dateRange.from ? dateRange.from.toLocaleDateString("id-ID") : "-"}
                    </span>
                  </div>
                  <div>
                    Sampai:{" "}
                    <span className="font-bold text-emerald-500">
                      {dateRange.to ? dateRange.to.toLocaleDateString("id-ID") : "(tgl akhir...)"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Picker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Time Picker (24H Format)</CardTitle>
                <CardDescription>
                  Selector jam & menit presisi dengan tampilan digital clock dan quick presets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TimePicker
                  value={selectedTime}
                  onChange={(t) => {
                    setSelectedTime(t);
                    if (t) toast.info(`Jam dipilih: ${t} WIB`);
                  }}
                  placeholder="Pilih jam (JJ:MM)..."
                />
                <div className="rounded-md border border-zinc-200 bg-zinc-100/70 p-3 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                  Jam Terpilih:{" "}
                  <span className="font-bold text-emerald-500">
                    {selectedTime ? `${selectedTime} WIB` : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Advanced Controls: Dropdown Menu, Combobox & Debounce */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Filter className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              5. Combobox, Dropdown Menu & Debounce Hook
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Combobox (Searchable Select) */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Combobox (Autocomplete)</CardTitle>
                  <CardDescription>
                    Searchable dropdown dengan live filter dan zero pill design.
                  </CardDescription>
                </div>
                {/* Dropdown Menu Trigger */}
                <DropdownMenu
                  trigger={
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  }
                  items={[
                    {
                      label: "Salin SKU",
                      icon: <Copy className="h-3.5 w-3.5" />,
                      shortcut: "⌘C",
                      onClick: () => toast.info("SKU tersalin ke clipboard"),
                    },
                    {
                      label: "Edit Kategori",
                      icon: <Edit className="h-3.5 w-3.5" />,
                      shortcut: "⌘E",
                      onClick: () => toast.info("Buka modal edit"),
                    },
                    "separator",
                    {
                      label: "Bagikan Produk",
                      icon: <Share2 className="h-3.5 w-3.5" />,
                      onClick: () => toast.success("Link terbagikan"),
                    },
                    "separator",
                    {
                      label: "Hapus Item",
                      icon: <Trash2 className="h-3.5 w-3.5" />,
                      destructive: true,
                      onClick: () => toast.error("Item dihapus"),
                    },
                  ]}
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <Combobox
                  value={comboboxVal}
                  onChange={setComboboxVal}
                  placeholder="Pilih SKU Produk POS..."
                  searchPlaceholder="Ketik untuk memfilter..."
                  options={[
                    { value: "pos-printer", label: "Thermal Receipt Printer 80mm (SKU-9921)" },
                    { value: "pos-scanner", label: "Barcode Scanner 2D Wireless (SKU-8812)" },
                    { value: "pos-drawer", label: "Cash Drawer Heavy Duty (SKU-7703)" },
                    { value: "pos-paper", label: "Kertas Thermal Roll 80x80 (SKU-1002)" },
                    { value: "pos-stand", label: "Tablet POS Stand Aluminum (SKU-4401)" },
                  ]}
                />
                <div className="rounded-md border border-zinc-200 bg-zinc-100/70 p-3 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                  Value Terpilih: <span className="font-bold text-emerald-500">{comboboxVal}</span>
                </div>
              </CardContent>
            </Card>

            {/* useDebounce Live Demonstration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">useDebounce Hook Demonstration</CardTitle>
                <CardDescription>
                  Mencegah spam network saat mengetik di pencarian. Debounce delay: 400ms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={liveSearch}
                  onChange={(e) => setLiveSearch(e.target.value)}
                  placeholder="Ketik cepat untuk menguji debounce..."
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="space-y-1 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                    <span className="text-zinc-400">State Langsung:</span>
                    <p className="truncate font-bold text-zinc-900 dark:text-zinc-100">
                      {liveSearch || "(kosong)"}
                    </p>
                  </div>
                  <div className="space-y-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                    <span className="text-emerald-500">Debounced Value:</span>
                    <p className="truncate font-bold text-emerald-600 dark:text-emerald-400">
                      {debouncedSearch || "(kosong)"}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  Query ke backend Go / database hanya akan dieksekusi saat user berhenti mengetik
                  400ms.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Skeleton & Loading Primitives */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Loader className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              6. Skeleton & Global Loading Components
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card Skeleton Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skeleton Placeholders</CardTitle>
                <CardDescription>
                  Shimmering placeholder untuk asynchronous data fetch state.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-1/2 rounded-md" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-20 w-full rounded-md" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-1/4 rounded-md" />
                    <Skeleton className="h-3 w-1/5 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spinner Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Loading Spinner Components</CardTitle>
                <CardDescription>Indikator proses latar belakang berbagai ukuran.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <Spinner size="sm" label="Memuat..." />
                  <Spinner size="md" label="Sinkronisasi POS..." />
                  <Spinner size="lg" />
                </div>
                <div className="flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold">Status Sync Background</p>
                    <p className="text-[11px] text-zinc-500">Mengecek koneksi ke backend Go</p>
                  </div>
                  <Spinner size="sm" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 7. Custom Table Component */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Rows className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              7. Custom Table Component (Zero Raw HTML Table)
            </h2>
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
                  <Badge variant="success" dot>
                    Aktif
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">SKU-8812-SC</TableCell>
                <TableCell className="font-medium">Barcode Scanner 2D Wireless</TableCell>
                <TableCell>Aksesoris</TableCell>
                <TableCell className="font-semibold">Rp 420.000</TableCell>
                <TableCell>
                  <Badge variant="success" dot>
                    Aktif
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs">SKU-1002-SR</TableCell>
                <TableCell className="font-medium">Kertas Thermal Roll 80x80 (Isi 10)</TableCell>
                <TableCell>Consumable</TableCell>
                <TableCell className="font-semibold">Rp 95.000</TableCell>
                <TableCell>
                  <Badge variant="warning" dot>
                    Stok Tipis
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* 8. Overlays, Drawers & Navigation Primitives */}
        <section className="gsap-fade-up space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <Layers className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              8. Overlays, Drawers & Navigation Primitives
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Sheet Drawer & Modal Triggers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Slide-Over Sheet & Modal Dialog</CardTitle>
                <CardDescription>
                  Drawer samping (Sheet) dan Modal dengan Backdrop blur terpadu serta animasi masuk
                  halus.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" onClick={() => setIsSheetOpen(true)} className="gap-2">
                    <PanelRight className="h-4 w-4" /> Buka Sheet Drawer (Kanan)
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(true)} className="gap-2">
                    <Layers className="h-4 w-4" /> Buka Modal Dialog
                  </Button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Kedua komponen menggunakan reusable{" "}
                  <code className="font-mono text-zinc-700 dark:text-zinc-300">Backdrop</code>{" "}
                  dengan{" "}
                  <code className="font-mono text-zinc-700 dark:text-zinc-300">
                    backdrop-blur-md
                  </code>
                  , body scroll lock otomatis, dan keyboard escape listener.
                </p>
              </CardContent>
            </Card>

            {/* Segmented Tabs & Tooltips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Segmented Tabs & Tooltip</CardTitle>
                <CardDescription>
                  Kontrol navigasi tab segmented dan micro-tooltip dengan sudut tajam non-pill.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium text-zinc-500">Segmented Control:</p>
                  <Tabs
                    value={activeTab}
                    onChange={setActiveTab}
                    items={[
                      { id: "overview", label: "Ringkasan", badge: "Live" },
                      { id: "analytics", label: "Analitik" },
                      { id: "logs", label: "Aktivitas", badge: 8 },
                    ]}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-zinc-500">Arahkan kursor:</span>
                  <Tooltip content="Tooltip tajam rounded-[4px] zero-pill">
                    <Button variant="secondary" size="xs" className="gap-1">
                      <Info className="h-3 w-3 text-emerald-500" /> Hover Me
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Navigation Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Collapsible Navigation Sidebar</CardTitle>
              <CardDescription>
                Sidebar dashboard responsif dengan toggle ciutkan (expand/collapse 240px ↔ 68px),
                badge counter, dan profil user.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950">
                <Sidebar
                  activeId={sidebarActiveId}
                  onSelectId={(id) => {
                    setSidebarActiveId(id);
                    toast.info(`Navigasi ke: ${id}`);
                  }}
                />
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold">
                    Halaman Konten: {sidebarActiveId.toUpperCase()}
                  </h4>
                  <p className="mt-1 max-w-sm text-xs text-zinc-500">
                    Coba klik tombol panah di kanan atas logo &quot;Forge POS&quot; untuk menguji
                    ciutkan / lebarkan sidebar secara mulus.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Interactive Slide-Over Sheet Drawer */}
      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Detail Transaksi Kasir"
        description="Panel drawer samping kanan dengan transisi slide mulus dan backdrop blur."
        size="md"
      >
        <div className="space-y-4">
          <div className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">ID Transaksi</span>
              <span className="font-mono font-semibold">TRX-2026-9912</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Waktu Pembayaran</span>
              <span className="font-mono">14:30:45 WIB</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Metode</span>
              <Badge variant="success">QRIS Dinamis</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
              Item Belanja:
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-800/60">
                <span>Thermal Printer 80mm x 1</span>
                <span className="font-mono font-semibold">Rp 850.000</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 py-1 dark:border-zinc-800/60">
                <span>Barcode Scanner 2D x 1</span>
                <span className="font-mono font-semibold">Rp 420.000</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={() => setIsSheetOpen(false)}>
              Tutup Drawer
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setIsSheetOpen(false);
                toast.success("Struk kasir dikirim ke printer");
              }}
            >
              Cetak Struk
            </Button>
          </div>
        </div>
      </Sheet>

      {/* Interactive Pure Modal Demo */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Pure In-House Modal"
        description="Dibuat tanpa Radix UI atau headless lib eksternal. Sudut terukur rapi tanpa kapsul/pill."
      >
        <div className="space-y-4 pt-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Seluruh kontrol (DatePicker, DateRangePicker, Combobox, Dropdown, Checkbox, Select,
            Skeleton, Spinner) dibuat dengan sudut geometris terukur (rounded-md / rounded-[4px]),
            zero native HTML, dan proteksi anti-bug range H-1.
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
