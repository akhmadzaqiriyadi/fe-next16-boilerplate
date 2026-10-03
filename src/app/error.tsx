"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js 16 Runtime Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-zinc-950">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 dark:bg-red-950/30 mb-6 shadow-xs">
        <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        Terjadi Kesalahan Runtime
      </h2>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400 font-mono text-xs bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} variant="primary">
          Coba Lagi
        </Button>
      </div>
    </div>
  );
}
