"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { Mail, KeyRound, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100">
      {/* Top Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-4 sm:p-6">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Login
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Form Container (Dead Center) */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 space-y-2 text-center">
            <div className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Lupa Kata Sandi?
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Jangan khawatir, kami akan mengirimkan tautan pemulihan ke email Anda.
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
                <div className="space-y-4 py-2 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Email Dikirim ke:
                    </p>
                    <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {email}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    Gunakan kode OTP 6-digit di dalam email untuk memverifikasi identitas Anda dan
                    membuat kata sandi baru.
                  </p>

                  <div className="space-y-2 pt-2">
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

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full gap-2"
                    isLoading={isLoading}
                  >
                    Kirim Tautan & Kode OTP <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Footer Link to Login */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Ingat kata sandi Anda?{" "}
            <Link
              href="/login"
              className="font-semibold text-zinc-900 hover:underline dark:text-white"
            >
              Kembali ke Login
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
