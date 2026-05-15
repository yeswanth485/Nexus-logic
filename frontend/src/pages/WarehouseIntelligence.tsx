import { Warehouse, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

export default function WarehouseIntelligence() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Warehouse Intelligence</h1>
          <p className="text-sm text-[var(--text-secondary)]">Monitor and optimize space utilization locally</p>
        </div>
        <div className="flex bg-[var(--bg-input)] rounded-[var(--radius-md)] p-1 border border-[var(--border-default)]">
          <button className="px-3 py-1 bg-[var(--bg-active)] shadow-sm rounded text-sm text-[var(--text-primary)] font-medium">Chennai - WH-01</button>
          <button className="px-3 py-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded text-sm font-medium transition-colors">Mumbai - WH-02</button>
          <button className="px-3 py-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded text-sm font-medium transition-colors">All Sites</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Total Capacity" value="91.6%" change="Near full" changeType="up" colorVar="--status-warning" subInfo="41,200 / 45,000 units" />
        <DataCard title="Active SKUs" value="2,847" change="8 critical" changeType="down" colorVar="--status-critical" subInfo="34 low stock" />
        <DataCard title="Throughput Today" value="+158" change="Net in" changeType="up" colorVar="--kpi-warehouse" subInfo="1,247 in | 1,089 out" />
        <DataCard title="Staff Efficiency" value="94.2%" change="+2.1%" changeType="up" colorVar="--status-success" subInfo="Target: 90%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Floor Heatmap */}
         <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Floor Utilization Heatmap</h3>
            <div className="aspect-video bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-6 grid-rows-4 gap-2 w-full h-full p-4">
                  {/* Mock Heatmap Grid */}
                  {Array.from({ length: 24 }).map((_, i) => {
                     const isHigh = i === 5 || i === 11 || i === 17;
                     const isCrit = i === 15 || i === 16;
                     const bg = isCrit ? 'bg-[var(--status-critical)]' : isHigh ? 'bg-[var(--status-warning)]' : 'bg-[var(--accent-primary)]';
                     const opacity = isCrit ? 'opacity-80' : isHigh ? 'opacity-60' : `opacity-${Math.floor(Math.random() * 4 + 2) * 10}`;
                     return (
                       <div key={i} className={`${bg} ${opacity} rounded-sm border border-black/20 flex items-center justify-center transition-all hover:opacity-100 cursor-pointer`}>
                         <span className="text-[8px] text-white/50 font-mono">Z-{i+1}</span>
                       </div>
                     )
                  })}
                </div>
            </div>
            <div className="flex gap-4 mt-4 justify-center text-xs text-[var(--text-secondary)]">
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--accent-primary)] opacity-40 rounded-sm"></div> Optimal</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--status-warning)] opacity-60 rounded-sm"></div> Heavy</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--status-critical)] opacity-80 rounded-sm"></div> Critical/Overflow</span>
            </div>
         </div>

         {/* AI Insights & Alerts */}
         <div className="lg:col-span-1 space-y-6">
           <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-lg)] p-5 relative shadow-[var(--shadow-glow-accent)]">
               <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-[var(--radius-lg)] uppercase tracking-wider">AI Insight</div>
               <h3 className="font-medium text-[var(--text-primary)] mb-2">Space Consolidation</h3>
               <p className="text-sm text-[var(--text-secondary)] mb-4">Zones C3 and D4 can be consolidated. 12% space freed without capacity loss.</p>
               <button className="w-full py-2 bg-[image:var(--gradient-accent)] text-white text-sm font-semibold rounded-[var(--radius-md)] hover:brightness-110">Auto-Optimize Layout</button>
           </div>

           <div className="bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded-[var(--radius-lg)] p-5 relative">
               <AlertTriangle className="absolute right-4 top-4 text-[var(--status-critical)] opacity-30 h-10 w-10" />
               <h3 className="font-medium text-[var(--status-critical)] mb-2">Predicted Overflow</h3>
               <p className="text-sm text-[var(--text-secondary)] mb-4">Electronics zone at capacity in 2.8 days based on incoming shipments.</p>
               <button className="w-full py-2 bg-[var(--bg-surface)] border border-[var(--status-critical)] text-[var(--status-critical)] text-sm font-semibold rounded-[var(--radius-md)] hover:bg-[var(--status-critical)] hover:text-white transition-colors">Route to Alternative Zone</button>
           </div>
         </div>
      </div>
    </div>
  );
}
