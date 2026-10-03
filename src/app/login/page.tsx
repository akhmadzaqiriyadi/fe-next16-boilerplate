"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Harap isi email dan kata sandi");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login Berhasil", {
        description: `Selamat datang kembali, ${email}`,
      });
      // Redirect to admin if admin, otherwise user dashboard
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 1200);
  };

  const handleQuickLogin = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@forge.pos");
      setPassword("superadmin2026");
      toast.info("Kredensial Admin diisi", { description: "Klik Masuk untuk ke Dashboard Admin" });
    } else {
      setEmail("kasir@forge.pos");
      setPassword("kasirpass2026");
      toast.info("Kredensial User diisi", { description: "Klik Masuk untuk ke Dashboard User" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100">
      {/* Top Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-4 sm:p-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-4 w-4" /> Beranda
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Auth Container (Dead Center) */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 space-y-2 text-center">
            <div className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Masuk ke Akun Anda
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Sistem Point of Sale & Manajemen Inventaris Enterprise
            </p>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Kredensial Akun</CardTitle>
              <CardDescription>Masukkan email dan kata sandi yang terdaftar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Alamat Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    leftIcon={<Mail className="h-4 w-4" />}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Kata Sandi
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11.5px] font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Lupa Password?
                    </Link>
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    label="Ingat sesi saya selama 30 hari"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full gap-2"
                  isLoading={isLoading}
                >
                  Masuk ke Aplikasi <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Quick Demo Fills */}
              <div className="mt-5 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
                <p className="mb-2 text-center font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                  Demo Akses Cepat:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("admin")}
                    className="justify-center text-xs"
                  >
                    <ShieldCheck className="mr-1 h-3.5 w-3.5 text-emerald-500" /> Akun Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("user")}
                    className="justify-center text-xs"
                  >
                    <Zap className="mr-1 h-3.5 w-3.5 text-sky-500" /> Akun Kasir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Link to Register */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-zinc-900 hover:underline dark:text-white"
            >
              Daftar Toko Baru
            </Link>
          </p>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full py-4 text-center font-mono text-[11px] text-zinc-400">
        Forge POS & Enterprise Inventory © 2026. Zero-Dependency Security.
      </footer>
    </div>
  );
}
