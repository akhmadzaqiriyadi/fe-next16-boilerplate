"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import {
  Mail,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Harap masukkan alamat email Anda");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success("Instruksi Terkirim", {
        description: `Tautan reset sandi dan kode OTP telah dikirim ke ${email}`,
      });
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

      {/* Main Form Container */}
      <main className="mx-auto w-full max-w-md py-8">
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs mb-1">
            <KeyRound className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">
              PEMULIHAN KATA SANDI
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Lupa Kata Sandi?
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Jangan khawatir, kami akan mengirimkan instruksi dan kode verifikasi ke email Anda.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Reset Keamanan</CardTitle>
            <CardDescription>
              {isSent
                ? "Email pemulihan telah dikirim. Silakan cek kotak masuk atau folder spam Anda."
                : "Masukkan alamat email yang terhubung dengan akun toko Anda."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSent ? (
              <div className="space-y-4 text-center py-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Email Dikirim ke:
                  </p>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {email}
                  </p>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Gunakan kode OTP 6-digit di dalam email untuk memverifikasi identitas Anda dan membuat kata sandi baru.
                </p>

                <div className="pt-2 space-y-2">
                  <Button
                    variant="primary"
                    className="w-full gap-2"
                    onClick={() => router.push(`/otp?email=${encodeURIComponent(email)}`)}
                  >
                    Verifikasi dengan Kode OTP <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setIsSent(false)}
                  >
                    Kirim Ulang Email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Alamat Email Terdaftar
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

                <Button type="submit" variant="primary" className="w-full gap-2" isLoading={isLoading}>
                  Kirim Tautan & Kode OTP <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer Link to Login */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Ingat kata sandi Anda?{" "}
          <Link
            href="/login"
            className="font-semibold text-zinc-900 dark:text-white hover:underline"
          >
            Kembali ke Login
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
