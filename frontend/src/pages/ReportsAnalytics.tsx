import { FileText, Download, BarChart2, Calendar } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

export default function ReportsAnalytics() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Reports & Analytics</h1>
          <p className="text-sm text-[var(--text-secondary)]">Custom BI dashboards and scheduled PDF exports</p>
        </div>
        <button className="bg-[image:var(--gradient-accent)] text-black px-4 py-2 rounded text-sm font-bold shadow-[var(--shadow-glow-accent)] hover:brightness-110 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
               <h3 className="font-semibold text-[var(--text-primary)] mb-4">Saved Dashboards</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] cursor-pointer transition-colors bg-[var(--bg-elevated)] group">
                     <BarChart2 className="w-6 h-6 text-[var(--accent-primary)] mb-3" />
                     <h4 className="font-medium text-[var(--text-primary)] mb-1">Q2 Fleet Performance</h4>
                     <p className="text-xs text-[var(--text-secondary)] mb-4">Metrics on fuel, idle time, and maintenance costs.</p>
                     <div className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] font-medium uppercase tracking-wider">Open Dashboard &rarr;</div>
                  </div>
                  <div className="p-4 border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] cursor-pointer transition-colors bg-[var(--bg-elevated)] group">
                     <BarChart2 className="w-6 h-6 text-[var(--accent-primary)] mb-3" />
                     <h4 className="font-medium text-[var(--text-primary)] mb-1">Supplier SLA Adherence</h4>
                     <p className="text-xs text-[var(--text-secondary)] mb-4">On-time delivery rates across top 50 suppliers.</p>
                     <div className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] font-medium uppercase tracking-wider">Open Dashboard &rarr;</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
               <h3 className="font-semibold text-[var(--text-primary)] mb-4">Recent Exports</h3>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
                     <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[var(--status-critical)]" />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">May_Fuel_Report.pdf</p>
                          <p className="text-[10px] text-[var(--text-muted)]">Generated 2h ago</p>
                        </div>
                     </div>
                     <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Download className="w-4 h-4"/></button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
                     <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[var(--status-success)]" />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">Q1_Emissions.csv</p>
                          <p className="text-[10px] text-[var(--text-muted)]">Generated Yesterday</p>
                        </div>
                     </div>
                     <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Download className="w-4 h-4"/></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
