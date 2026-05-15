import { Landmark, ShieldAlert, Radio, Navigation, CheckCircle2, TrendingUp, AlertTriangle, FileText } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

export default function GovernmentCenter() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="bg-[image:var(--gradient-card)] border-b border-[var(--border-strong)] -mx-6 -mt-6 p-6 md:p-8 flex items-center justify-between shadow-inner relative overflow-hidden">
        <div className="relative z-10 w-full sm:w-auto">
          <div className="flex gap-2 items-center mb-2">
            <span className="px-2 py-0.5 bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded text-[9px] font-mono font-bold text-[var(--status-critical)] uppercase tracking-widest">RESTRICTED</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">STATUS: NORMAL</span>
          </div>
          <h1 className="text-3xl font-display text-white tracking-tight">Smart Logistics Command</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 tracking-wide">Public Infrastructure & Emergency Operations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Emergency Corridors" value="4 Active" change="1 under maintenance" changeType="down" colorVar="--status-success" subInfo="Green Channel Enabled" />
        <DataCard title="Border Clearances" value="142 Pending" change="Avg 45m delay" changeType="neutral" colorVar="--status-warning" subInfo="Customs & Excise" />
        <DataCard title="Regulatory Compliance" value="99.8%" change="All licenses valid" changeType="up" colorVar="--status-info" subInfo="Next audit: 12 days" />
        <DataCard title="Infrastructure Events" value="3 Alerts" change="Highway 44 blocked" changeType="down" colorVar="--status-critical" subInfo="Live traffic integration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--status-info)]" />
            Compliance & Documentation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">E-Way Bill Generation</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Live sync with NIC portal</p>
                  </div>
               </div>
               <span className="text-xs text-[var(--status-success)] font-mono">100% SUCCESS</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Vahan & Sarathi API Sync</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Driver & Vehicle verification</p>
                  </div>
               </div>
               <span className="text-xs text-[var(--status-success)] font-mono">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--status-warning-soft)] border border-[var(--status-warning)] rounded">
               <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--status-warning)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">GSTIN Reconciliation</p>
                    <p className="text-[10px] text-[var(--status-warning)]">Mismatch in 2 invoices</p>
                  </div>
               </div>
               <button className="text-xs font-bold bg-[var(--bg-surface)] text-[var(--status-warning)] px-2 py-1 rounded">RESOLVE</button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-[var(--status-critical)] opacity-5">
            <ShieldAlert className="w-48 h-48" />
          </div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2 relative z-10">
            <Radio className="w-5 h-5 text-[var(--status-critical)]" />
            Emergency Protocol Center
          </h3>
          <div className="space-y-4 relative z-10">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Direct link to state emergency response and disaster management systems for priority supply chains.
            </p>
            <button className="w-full py-3 bg-[var(--bg-input)] border border-[var(--status-critical)] text-[var(--status-critical)] hover:bg-[var(--status-critical)] hover:text-white transition-colors rounded-[var(--radius-md)] flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm">
               <Navigation className="w-4 h-4" /> Activate Disaster Relief Corridor
            </button>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-start gap-3 rounded">
               <TrendingUp className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
               <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                 <span className="font-medium">Medical Supply Priority:</span> Pre-approved green channels for oxygen and critical pharma enabled.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
