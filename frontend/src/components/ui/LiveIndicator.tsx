export function LiveIndicator() {
  return (
    <div className="flex items-center gap-2 bg-[var(--bg-active)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--status-success)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--status-success)]"></span>
      </span>
      <span className="text-[10px] font-mono tracking-wider font-semibold text-[var(--status-success)] uppercase">Live</span>
    </div>
  );
}
