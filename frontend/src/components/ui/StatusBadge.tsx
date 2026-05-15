import { cn } from "../../lib/utils";

type StatusType = "active" | "delayed" | "critical" | "idle" | "pending" | "optimized" | "delivered";

export function StatusBadge({ status, pulse = false }: { status: StatusType; pulse?: boolean }) {
  const getStyles = () => {
    switch (status) {
      case "active":
      case "optimized":
      case "delivered":
        return "bg-[var(--status-success-soft)] border-[var(--status-success)] text-[var(--status-success)]";
      case "delayed":
        return "bg-[var(--status-warning-soft)] border-[var(--status-warning)] text-[var(--status-warning)]";
      case "critical":
        return "bg-[var(--status-critical-soft)] border-[var(--status-critical)] text-[var(--status-critical)]";
      default:
        return "bg-[var(--bg-active)] border-[var(--text-muted)] text-[var(--text-muted)]";
    }
  };

  const getDotColor = () => {
    switch (status) {
      case "active":
      case "optimized":
      case "delivered":
        return "bg-[var(--status-success)]";
      case "delayed":
        return "bg-[var(--status-warning)]";
      case "critical":
        return "bg-[var(--status-critical)]";
      default:
        return "bg-[var(--text-muted)]";
    }
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-opacity-30 uppercase tracking-wider", getStyles())}>
      <span className={cn("w-1.5 h-1.5 rounded-full", getDotColor(), pulse && "animate-pulse")} />
      {status}
    </span>
  );
}
