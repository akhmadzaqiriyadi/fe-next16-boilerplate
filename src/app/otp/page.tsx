"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { ShieldCheck, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

export default function OtpPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-[#09090b]" />}>
      <OtpContent />
    </React.Suspense>
  );
}

function OtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "user@forge.pos";

  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = React.useState(59);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const canResend = timer === 0;

  // Countdown timer
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
      toast.info("Kode OTP berhasil ditempel");
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join("");
    if (fullCode.length < 6) {
      toast.error("Harap lengkapi 6 digit kode OTP");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Verifikasi Berhasil!", {
        description: "Akun Anda telah terotentikasi secara aman.",
      });
      router.push("/dashboard");
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(["", "", "", "", "", ""]);
    setTimer(59);
    inputRefs.current[0]?.focus();
    toast.info("Kode OTP Baru Terkirim", {
      description: `Periksa email Anda di ${emailParam}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100">
      {/* Top Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-4 sm:p-6">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-4 w-4" /> Batalkan
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Container (Dead Center) */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 space-y-2 text-center">
            <div className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Verifikasi Kode OTP
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Masukkan 6 digit kode verifikasi yang dikirimkan ke:
            </p>
            <p className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {emailParam}
            </p>
          </div>

          <Card>
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-base">Masukkan 6-Digit Kode</CardTitle>
              <CardDescription>
                Ketik digit angka atau tempel (*paste*) langsung ke kotak.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="h-12 w-11 rounded-md border border-zinc-200 bg-white text-center font-mono text-xl font-bold text-zinc-900 transition-all focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none sm:h-13 sm:w-12 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-white"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                {/* Countdown / Resend */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      <RotateCw className="h-3.5 w-3.5" /> Kirim Ulang Kode Sekarang
                    </button>
                  ) : (
                    <p className="font-mono text-xs text-zinc-400">
                      Kirim ulang kode dalam{" "}
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">
                        00:{String(timer).padStart(2, "0")}
                      </span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full gap-2"
                  isLoading={isLoading}
                  disabled={otp.join("").length < 6}
                >
                  Konfirmasi & Buka Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-5 border-t border-zinc-200/80 pt-4 text-center dark:border-zinc-800/80">
                <p className="text-[11px] text-zinc-400">
                  Tips demo: Masukkan sembarang 6 angka (contoh:{" "}
                  <code className="font-mono font-bold text-zinc-600 dark:text-zinc-300">
                    123456
                  </code>
                  ).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Change Email */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Salah alamat email?{" "}
            <Link
              href="/login"
              className="font-semibold text-zinc-900 hover:underline dark:text-white"
            >
              Ganti Email Lain
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
