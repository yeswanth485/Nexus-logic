import { useState, useEffect } from "react";
import { Clock, MapPin, AlertTriangle, Truck, Zap, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export function LiveDashboardPreview() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] mx-auto bg-[var(--bg-surface)] rounded-[var(--radius-xl)] border border-[var(--border-strong)] shadow-[var(--shadow-elevated)] overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--status-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--status-success)]"></span>
          </span>
          <span className="text-xs font-mono font-medium text-[var(--status-success)]">LIVE</span>
          <span className="text-xs font-medium text-[var(--text-secondary)] ml-1">NEXUS LOGIX Operations Center</span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)]">{format(time, "HH:mm:ss")}</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Panel 1: Mini Map */}
        <div className="col-span-1 rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-subtle)] p-2 relative h-40 overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=4&size=400x400&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x000000&style=feature:landscape|element:geometry|color:0x111111&style=feature:road|element:geometry|color:0x333333&key=YOUR_API_KEY_HERE')] bg-cover bg-center mix-blend-screen grayscale" />
          
          {/* Mock dots on map */}
          <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[var(--status-success)] shadow-[0_0_8px_var(--status-success)] animate-[pulse-ring_2s_infinite]" />
          <div className="absolute top-[60%] left-[45%] w-2 h-2 rounded-full bg-[var(--status-warning)] shadow-[0_0_8px_var(--status-warning)] animate-[pulse-ring_2.5s_infinite]" />
          <div className="absolute top-[20%] left-[50%] w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-[pulse-ring_3s_infinite]" />
          <div className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-[var(--status-success)] shadow-[0_0_8px_var(--status-success)] animate-[pulse-ring_2s_infinite]" />
        </div>

        {/* Panel 2: KPI Column */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] p-3 border border-[rgba(14,165,233,0.2)] border-l-2 border-l-[var(--kpi-deliveries)]">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Shipments</div>
            <div className="text-xl font-display font-bold text-[var(--text-primary)]">1,247</div>
          </div>
          <div className="bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] p-3 border border-[rgba(34,197,94,0.2)] border-l-2 border-l-[var(--kpi-fleet)]">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Active Fleet</div>
            <div className="text-xl font-display font-bold text-[var(--text-primary)]">89</div>
          </div>
          <div className="bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] p-3 border border-[rgba(239,68,68,0.2)] border-l-2 border-l-[var(--kpi-delay)]">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Delayed</div>
            <div className="text-xl font-display font-bold text-[var(--status-critical)]">4</div>
          </div>
        </div>

        {/* Panel 3: Chart */}
        <div className="col-span-1 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 h-32 flex flex-col justify-end">
          <div className="flex items-end justify-between h-16 w-full gap-1 mt-auto">
            {[40, 60, 45, 80, 55, 90, 75].map((val, i) => (
              <div key={i} className="w-full bg-[var(--accent-primary)] rounded-t-sm opacity-80" style={{ height: `${val}%` }} />
            ))}
          </div>
        </div>

        {/* Panel 4: Alert Feed */}
        <div className="col-span-1 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 h-32 overflow-hidden flex flex-col gap-2">
          <div className="flex gap-2 items-start animate-[fade-up_0.3s_ease-out]">
            <AlertTriangle className="h-3 w-3 mt-0.5 text-[var(--status-warning)] shrink-0" />
            <p className="text-[10px] leading-tight text-[var(--text-secondary)]"><span className="text-[var(--text-primary)]">Route NX-041</span> — traffic delay predicted — 23 min ETA change</p>
          </div>
          <div className="flex gap-2 items-start animate-[fade-up_0.3s_ease-out_0.1s] fill-mode-both">
            <Zap className="h-3 w-3 mt-0.5 text-[var(--status-info)] shrink-0" />
            <p className="text-[10px] leading-tight text-[var(--text-secondary)]"><span className="text-[var(--text-primary)]">AI: Reroute TN-02</span> via NH-48 — save 31 min</p>
          </div>
          <div className="flex gap-2 items-start animate-[fade-up_0.3s_ease-out_0.2s] fill-mode-both">
            <CheckCircle className="h-3 w-3 mt-0.5 text-[var(--status-success)] shrink-0" />
            <p className="text-[10px] leading-tight text-[var(--text-secondary)]"><span className="text-[var(--text-primary)]">NXL-089234 delivered</span> — Chennai warehouse</p>
          </div>
        </div>
      </div>
    </div>
  );
}
