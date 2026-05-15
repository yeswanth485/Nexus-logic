import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DataCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  colorVar: string;
  subInfo: string;
}

export function DataCard({ title, value, change, changeType, colorVar, subInfo }: DataCardProps) {
  return (
    <div 
      className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] relative overflow-hidden"
      style={{ borderLeftColor: `var(${colorVar})`, borderLeftWidth: "4px" }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] select-none pointer-events-none transform translate-x-8 -translate-y-8" 
           style={{ background: `radial-gradient(circle, var(${colorVar}) 0%, transparent 70%)` }} 
      />
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase">{title}</h3>
      </div>
      
      <div className="flex items-end gap-3 mb-3">
        <div className="text-3xl font-display font-bold text-[var(--text-primary)] leading-none">{value}</div>
        <div className={cn(
          "flex items-center text-xs font-medium px-1.5 py-0.5 rounded",
          changeType === "up" && change.includes("-") ? "bg-[var(--status-success-soft)] text-[var(--status-success)]" :
          changeType === "up" ? "bg-[var(--status-success-soft)] text-[var(--status-success)]" :
          changeType === "down" && change.includes("-") ? "bg-[var(--status-success-soft)] text-[var(--status-success)]" :
          changeType === "down" ? "bg-[var(--status-critical-soft)] text-[var(--status-critical)]" :
          "bg-[var(--bg-active)] text-[var(--text-muted)]"
        )}>
          {changeType === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
          {changeType === "down" && <TrendingDown className="w-3 h-3 mr-1" />}
          {changeType === "neutral" && <Minus className="w-3 h-3 mr-1" />}
          {change}
        </div>
      </div>
      
      <div className="text-xs text-[var(--text-muted)] mt-auto pt-2 border-t border-[var(--border-subtle)]">
        {subInfo}
      </div>
    </div>
  );
}
