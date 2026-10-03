"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  ShoppingCart,
  QrCode,
  CreditCard,
  Banknote,
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogOut,
  Receipt,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function UserDashboardPage() {
  const [cart, setCart] = React.useState<CartItem[]>([
    { id: "pos-scanner", name: "Barcode Scanner 2D Wireless", price: 420000, qty: 1 },
    { id: "pos-paper", name: "Kertas Thermal Roll 80x80", price: 95000, qty: 2 },
  ]);
  const [selectedSku, setSelectedSku] = React.useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<"qris" | "cash" | "debit">("qris");

  const skuCatalog = [
    { value: "pos-printer", label: "Thermal Receipt Printer 80mm", price: 850000 },
    { value: "pos-scanner", label: "Barcode Scanner 2D Wireless", price: 420000 },
    { value: "pos-drawer", label: "Cash Drawer Heavy Duty", price: 650000 },
    { value: "pos-paper", label: "Kertas Thermal Roll 80x80", price: 95000 },
    { value: "pos-stand", label: "Tablet POS Stand Aluminum", price: 320000 },
  ];

  const handleAddSku = (skuValue: string) => {
    setSelectedSku(skuValue);
    const product = skuCatalog.find((p) => p.value === skuValue);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.value);
      if (existing) {
        return prev.map((item) =>
          item.id === product.value ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.value, name: product.label, price: product.price, qty: 1 }];
    });
    toast.success("Produk Ditambahkan", { description: product.label });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  const handleCompletePayment = () => {
    setIsCheckoutOpen(false);
    setCart([]);
    toast.success("Pembayaran Berhasil Diterima!", {
      description: `Struk transaksi sebesar Rp ${total.toLocaleString("id-ID")} dicetak.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-emerald-500 dark:text-zinc-950">
            POS
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Kasir Terminal 01</h2>
            <p className="font-mono text-[11px] text-zinc-400">Shift Aktif • Budi Santoso</p>
          </div>
          <Badge variant="success" dot className="ml-2 hidden sm:inline-flex">
            Online
          </Badge>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="hidden gap-1.5 text-xs sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Mode Admin
            </Button>
          </Link>
          <Link href="/design-system">
            <Button variant="ghost" size="sm" className="hidden gap-1.5 text-xs sm:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" /> Design System
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Keluar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Cashier Workspace (Split View) */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* Left Side: Product Search & Quick Catalog (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pencarian Cepat & Barcode</CardTitle>
              <CardDescription>Cari nama SKU atau scan barcode produk langsung.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Combobox
                value={selectedSku}
                onChange={handleAddSku}
                placeholder="Pilih atau cari produk untuk ditambahkan ke kasir..."
                searchPlaceholder="Ketik nama atau SKU barang..."
                options={skuCatalog.map((p) => ({
                  value: p.value,
                  label: `${p.label} — Rp ${p.price.toLocaleString("id-ID")}`,
                }))}
              />
            </CardContent>
          </Card>

          {/* Quick Buttons Grid */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Katalog SKU Cepat (One-Click Add):
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skuCatalog.map((product) => (
                <button
                  key={product.value}
                  type="button"
                  onClick={() => handleAddSku(product.value)}
                  className="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-3.5 text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#121215] dark:hover:bg-zinc-900/80"
                >
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 transition-colors group-hover:text-emerald-500 dark:text-zinc-100">
                      {product.label}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-400">
                      SKU: {product.value.toUpperCase()}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 dark:border-zinc-800/60">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Plus className="h-3 w-3" /> Tambah
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Active Cart & Total Payment (5 Cols) */}
        <div className="lg:col-span-5">
          <Card className="sticky top-24 flex h-full flex-col">
            <CardHeader className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingCart className="h-4 w-4 text-emerald-500" /> Keranjang Kasir
                </CardTitle>
                <span className="text-xs font-medium text-zinc-500">{cart.length} item</span>
              </div>
            </CardHeader>

            {/* Cart Items List */}
            <CardContent className="max-h-96 flex-1 divide-y divide-zinc-100 overflow-y-auto p-4 dark:divide-zinc-800/60">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">
                  <ShoppingCart className="mx-auto mb-2 h-8 w-8 opacity-30" />
                  <p className="text-xs">Keranjang belanja masih kosong.</p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">Pilih produk di sebelah kiri.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-400">
                        Rp {item.price.toLocaleString("id-ID")} x {item.qty}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)}
                        title="Kurangi Jumlah"
                        aria-label="Kurangi Jumlah"
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)}
                        title="Tambah Jumlah"
                        aria-label="Tambah Jumlah"
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-mono text-xs font-bold">
                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>

            {/* Calculations & Checkout Button */}
            <div className="space-y-3 border-t border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-mono">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>PPN 11% (Otomatis)</span>
                  <span className="font-mono">Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 text-sm font-bold text-zinc-900 dark:border-zinc-800 dark:text-white">
                  <span>Total Tagihan</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Button
                variant="accent"
                className="w-full gap-2 text-sm font-bold"
                disabled={cart.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
              >
                Bayar Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Payment Processing Modal */}
      <Dialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Pilih Metode Pembayaran"
        description={`Selesaikan pembayaran transaksi sebesar Rp ${total.toLocaleString("id-ID")}`}
      >
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("qris")}
              className={`rounded-lg border p-3 text-center transition-all ${
                paymentMethod === "qris"
                  ? "border-emerald-500 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-400"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              }`}
            >
              <QrCode className="mx-auto mb-1 h-5 w-5" />
              <span className="text-xs">QRIS Dinamis</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`rounded-lg border p-3 text-center transition-all ${
                paymentMethod === "cash"
                  ? "border-emerald-500 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-400"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              }`}
            >
              <Banknote className="mx-auto mb-1 h-5 w-5" />
              <span className="text-xs">Tunai / Cash</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("debit")}
              className={`rounded-lg border p-3 text-center transition-all ${
                paymentMethod === "debit"
                  ? "border-emerald-500 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-400"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              }`}
            >
              <CreditCard className="mx-auto mb-1 h-5 w-5" />
              <span className="text-xs">Kartu Debit</span>
            </button>
          </div>

          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
            {paymentMethod === "qris" && (
              <div className="space-y-2">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-md border border-zinc-200 bg-white p-2">
                  <QrCode className="h-24 w-24 text-zinc-900" />
                </div>
                <p className="text-[11px] text-zinc-500">
                  Scan QRIS dari GoPay, OVO, BCA, atau Livin Mandiri
                </p>
              </div>
            )}
            {paymentMethod === "cash" && (
              <p className="text-xs text-zinc-500">
                Terima uang tunai dan buka laci kasir otomatis (*Cash Drawer Opening*).
              </p>
            )}
            {paymentMethod === "debit" && (
              <p className="text-xs text-zinc-500">
                Gesek atau masukkan kartu ke mesin EDC yang terhubung.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsCheckoutOpen(false)}>
              Batal
            </Button>
            <Button variant="accent" onClick={handleCompletePayment} className="gap-1.5 font-bold">
              <Receipt className="h-4 w-4" /> Cetak Struk & Selesaikan
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
