"use client";

import * as React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  DollarSign,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Download,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = React.useState("dashboard");
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [isAddSkuOpen, setIsAddSkuOpen] = React.useState(false);
  const [isExportOpen, setIsExportOpen] = React.useState(false);

  // New SKU form state
  const [newSkuName, setNewSkuName] = React.useState("");
  const [newSkuCategory, setNewSkuCategory] = React.useState("hardware");
  const [newSkuPrice, setNewSkuPrice] = React.useState("");

  const handleCreateSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkuName || !newSkuPrice) {
      toast.error("Harap lengkapi nama dan harga SKU");
      return;
    }
    setIsAddSkuOpen(false);
    toast.success("SKU Baru Tersimpan", {
      description: `${newSkuName} berhasil ditambahkan ke inventaris.`,
    });
    setNewSkuName("");
    setNewSkuPrice("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex antialiased">
      {/* Collapsible Sidebar */}
      <Sidebar
        activeId={activeMenu}
        onSelectId={(id) => {
          setActiveMenu(id);
          toast.info(`Navigasi: ${id}`);
        }}
        brandName="Forge Admin"
        user={{
          name: "Ahmad Zaqi",
          role: "Owner & Superadmin",
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-tight sm:text-base">
              Pusat Kendali Admin
            </span>
            <Badge variant="success" dot>
              Multi-Outlet Live
            </Badge>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 hidden sm:inline-flex">
                <ExternalLink className="h-3.5 w-3.5" /> Mode Kasir
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 hidden sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Design System
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <ThemeToggle />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top Actions & Date Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Ringkasan Penjualan & Inventaris
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Data real-time sinkronisasi cloud dengan outlet aktif.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-56">
                <DateRangePicker
                  value={dateRange}
                  onChange={(range) => {
                    setDateRange(range);
                    toast.info("Periode laporan diperbarui");
                  }}
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExportOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddSkuOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Tambah SKU
              </Button>
            </div>
          </div>

          {/* KPI Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">Total Omset (7 Hari)</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-mono font-bold mt-1">
                  Rp 148.520.000
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  <TrendingUp className="h-3.5 w-3.5" /> +18.4% <span className="text-zinc-400">vs minggu lalu</span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">Total Transaksi</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-mono font-bold mt-1">
                  1.842 <span className="text-sm font-sans font-normal text-zinc-400">struk</span>
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  <TrendingUp className="h-3.5 w-3.5" /> +12.1% <span className="text-zinc-400">volume naik</span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">Rata-rata Order (AOV)</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-mono font-bold mt-1">
                  Rp 80.630
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium pt-1">
                  <span className="text-zinc-400">Stabil per transaksi</span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">SKU Aktif di Katalog</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-mono font-bold mt-1">
                  342 <span className="text-sm font-sans font-normal text-zinc-400">produk</span>
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium pt-1">
                  <AlertTriangle className="h-3 w-3" /> 4 SKU stok kritis
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Aktivitas Transaksi Kasir Terkini</CardTitle>
                <CardDescription>Daftar pembayaran yang baru saja diselesaikan di terminal.</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">
                AUTO-REFRESH: 5s
              </Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Struk</TableHead>
                    <TableHead>Kasir / Terminal</TableHead>
                    <TableHead>Metode</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Total Tagihan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-bold">#TRX-9941</TableCell>
                    <TableCell className="font-medium">Kasir 01 (Budi)</TableCell>
                    <TableCell>QRIS Dinamis</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-400">14:48 WIB</TableCell>
                    <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">Rp 185.000</TableCell>
                    <TableCell><Badge variant="success">Lunas</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-bold">#TRX-9940</TableCell>
                    <TableCell className="font-medium">Kasir 02 (Siti)</TableCell>
                    <TableCell>Tunai / Cash</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-400">14:42 WIB</TableCell>
                    <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">Rp 45.000</TableCell>
                    <TableCell><Badge variant="success">Lunas</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-bold">#TRX-9939</TableCell>
                    <TableCell className="font-medium">Kasir 01 (Budi)</TableCell>
                    <TableCell>Kartu Debit EDC</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-400">14:35 WIB</TableCell>
                    <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">Rp 420.000</TableCell>
                    <TableCell><Badge variant="success">Lunas</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-bold">#TRX-9938</TableCell>
                    <TableCell className="font-medium">Kasir 03 (Doni)</TableCell>
                    <TableCell>Transfer Bank</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-400">14:20 WIB</TableCell>
                    <TableCell className="font-mono font-semibold text-zinc-600 dark:text-zinc-300">Rp 950.000</TableCell>
                    <TableCell><Badge variant="warning">Menunggu Konfirmasi</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Slide-Over Drawer: Tambah SKU Baru */}
      <Sheet
        isOpen={isAddSkuOpen}
        onClose={() => setIsAddSkuOpen(false)}
        title="Tambah Produk / SKU Baru"
        description="Daftarkan SKU baru ke katalog agar langsung tersedia di terminal kasir."
        size="md"
      >
        <form onSubmit={handleCreateSku} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Nama Produk / SKU</label>
            <Input
              value={newSkuName}
              onChange={(e) => setNewSkuName(e.target.value)}
              placeholder="Contoh: Barcode Scanner Wireless 2D"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Kategori Produk</label>
            <Select
              value={newSkuCategory}
              onValueChange={setNewSkuCategory}
              options={[
                { label: "Hardware POS & Perangkat", value: "hardware" },
                { label: "Kertas Roll & Consumables", value: "consumables" },
                { label: "Layanan Langganan Cloud", value: "subscription" },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Harga Jual (Rp)</label>
            <Input
              type="number"
              value={newSkuPrice}
              onChange={(e) => setNewSkuPrice(e.target.value)}
              placeholder="Contoh: 450000"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsAddSkuOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan SKU ke Katalog
            </Button>
          </div>
        </form>
      </Sheet>

      {/* Modal Dialog: Export Laporan */}
      <Dialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Export Laporan Penjualan"
        description="Unduh seluruh rekapitulasi data transaksi dalam format spreadsheet."
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Pilih format dokumen laporan keuangan yang diinginkan:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="justify-center"
              onClick={() => {
                setIsExportOpen(false);
                toast.success("Mengunduh Excel (.xlsx)...");
              }}
            >
              Microsoft Excel (.xlsx)
            </Button>
            <Button
              variant="outline"
              className="justify-center"
              onClick={() => {
                setIsExportOpen(false);
                toast.success("Mengunduh CSV (.csv)...");
              }}
            >
              Format CSV (.csv)
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
