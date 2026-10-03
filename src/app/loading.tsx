export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-white" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Memuat Next.js 16 Boilerplate...</p>
      </div>
    </div>
  );
}
