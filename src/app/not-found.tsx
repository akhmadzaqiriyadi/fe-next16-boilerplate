import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-zinc-950">
      <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-900 mb-6">
        <Compass className="h-10 w-10 text-zinc-500 animate-bounce" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        404 — Halaman Tidak Ditemukan
      </h2>
      <p className="mt-3 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        Rute yang kamu cari tidak tersedia di Next.js 16 App Router ini. Silakan kembali ke beranda.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button variant="default">Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
