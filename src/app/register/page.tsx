"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  Store,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [storeName, setStoreName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Simple password strength calculator
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength();
  const strengthLabels = ["Sangat Lemah", "Lemah", "Cukup", "Kuat", "Sangat Aman"];
  const strengthColors = [
    "bg-zinc-200 dark:bg-zinc-800",
    "bg-rose-500",
    "bg-amber-500",
    "bg-sky-500",
    "bg-emerald-500",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !storeName || !email || !password || !confirmPassword) {
      toast.error("Harap isi semua kolom formulir");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok!");
      return;
    }
    if (!agreeTerms) {
      toast.error("Harap setujui Syarat & Ketentuan Layanan");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Pendaftaran Berhasil!", {
        description: "Kode OTP 6-digit telah dikirimkan ke email Anda.",
      });
      // Route to OTP verification page
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-4 sm:p-6 antialiased">
      {/* Top Header */}
      <header className="mx-auto w-full max-w-6xl flex items-center justify-between">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-xs">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Login
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-lg py-8">
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs mb-1">
            <Store className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">
              REGISTRASI TOKO BARU
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Mulai Gunakan Forge POS
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Daftarkan bisnis Anda dan dapatkan akses kasir multi-outlet instan
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Informasi Bisnis & Akun</CardTitle>
            <CardDescription>Semua data terenkripsi end-to-end dengan standar keamanan tinggi.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Nama Pemilik
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Budi Santoso"
                    leftIcon={<User className="h-4 w-4" />}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Nama Toko / Usaha
                  </label>
                  <Input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Kopi Nusantara POS"
                    leftIcon={<Store className="h-4 w-4" />}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Alamat Email Bisnis
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kopinusantara.id"
                  leftIcon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Kata Sandi
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter..."
                  leftIcon={<Lock className="h-4 w-4" />}
                  required
                />
                {password && (
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-4 gap-1 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-[2px] transition-colors ${
                            strength >= step ? strengthColors[strength] : "bg-zinc-200 dark:bg-zinc-800"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10.5px] font-mono text-zinc-500">
                      Kekuatan Sandi: <span className="font-semibold">{strengthLabels[strength]}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Konfirmasi Kata Sandi
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi..."
                  leftIcon={<ShieldCheck className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="pt-1">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={setAgreeTerms}
                  label="Saya menyetujui Syarat Layanan & Kebijakan Privasi Forge"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full gap-2" isLoading={isLoading}>
                Daftar & Kirim Kode OTP <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Link to Login */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-zinc-900 dark:text-white hover:underline"
          >
            Masuk Sekarang
          </Link>
        </p>
      </main>

      {/* Bottom Footer */}
      <footer className="mx-auto w-full max-w-6xl text-center py-2 text-[11px] text-zinc-400 font-mono">
        Forge POS & Enterprise Inventory © 2026. Zero-Dependency Security.
      </footer>
    </div>
  );
}
