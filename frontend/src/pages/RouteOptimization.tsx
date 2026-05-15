import { Map, Zap, CheckCircle2, Navigation2, Clock } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

export default function RouteOptimization() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">AI Route Optimizer</h1>
          <p className="text-sm text-[var(--text-secondary)]">Dynamic trajectory planning to mitigate traffic and fuel spend</p>
        </div>
        <div className="px-3 py-1 bg-[var(--status-info-soft)] border border-[var(--status-info)] rounded-full text-xs font-semibold text-[var(--status-info)] flex items-center gap-2 shadow-[var(--shadow-glow-accent)]">
          <Zap className="w-3 h-3 fill-current" /> Engine Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Panel */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Optimize New Route</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Origin</label>
              <input type="text" placeholder="e.g. Mumbai WH-02" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
            </div>
            
            <div className="relative pl-3 border-l-2 border-dashed border-[var(--border-strong)] ml-2 space-y-4 py-2">
              <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-[var(--border-strong)]" />
              <div className="absolute -left-[5px] bottom-5 w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
              
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Destination</label>
                <input type="text" placeholder="e.g. Pune Distribution Center" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
            </div>

            <div>
               <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Vehicle Type</label>
               <select className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] appearance-none">
                 <option>Heavy Truck (15-ton)</option>
                 <option>Medium Van (3-ton)</option>
                 <option>Auto-select based on capacity</option>
               </select>
            </div>

            <div className="pt-2">
              <button className="w-full py-2.5 bg-[image:var(--gradient-accent)] text-white font-semibold rounded-[var(--radius-md)] flex justify-center items-center gap-2 hover:brightness-110 shadow-[var(--shadow-glow-accent)] transition-all">
                <Zap className="w-4 h-4 fill-current" />
                Optimize Route
              </button>
            </div>
          </div>
        </div>

        {/* Right: Map & Results */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-[300px] w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden relative">
             <div className="absolute inset-0 bg-[#0a0a0a] bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=18.5204,73.8567&zoom=8&size=800x400&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x04050A&style=feature:landscape|element:geometry|color:0x0B1120&style=feature:road|element:geometry|color:0x1C2A40&path=color:0xc5a059|weight:3|19.0760,72.8777|18.5204,73.8567&key=YOUR_API_KEY_HERE')] bg-cover bg-center mix-blend-screen opacity-70" />
             <div className="absolute bottom-4 left-4 flex gap-2">
               <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded text-[10px] font-mono text-[var(--status-critical)]">Traffic: NH-48</span>
               <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded text-[10px] font-mono text-[var(--accent-primary)]">AI Route: Active</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* AI Recommended */}
             <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-lg)] p-4 relative shadow-[var(--shadow-glow-accent)]">
               <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-md uppercase tracking-wider">AI Recommended</div>
               <h4 className="text-[var(--text-primary)] font-medium mb-1">Route A: Optimized</h4>
               <p className="text-xs text-[var(--status-success)] mb-3 font-medium">Estimated 23% faster than standard</p>
               <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Distance</span><span className="font-mono text-[var(--text-primary)]">247 km</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Time</span><span className="font-mono text-[var(--text-primary)]">4h 23m</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Fuel Cost</span><span className="font-mono text-[var(--text-primary)]">₹1,840</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Tolls</span><span className="font-mono text-[var(--text-primary)]">₹340</span></div>
               </div>
               <button className="mt-4 w-full py-1.5 border border-[var(--accent-primary)] text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary-glow)] text-sm transition-colors">Apply Route</button>
             </div>

             {/* Alternative */}
             <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-4">
               <h4 className="text-[var(--text-primary)] font-medium mb-1">Route B: Fuel-Efficient</h4>
               <p className="text-xs text-[var(--text-muted)] mb-3 font-medium">Avoids tolls, 28 mins longer</p>
               <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Distance</span><span className="font-mono text-[var(--text-primary)]">271 km</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Time</span><span className="font-mono text-[var(--text-primary)]">4h 51m</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Fuel Cost</span><span className="font-mono text-[var(--status-success)]">₹1,620</span></div>
                 <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Tolls</span><span className="font-mono text-[var(--status-success)]">₹0</span></div>
               </div>
               <button className="mt-4 w-full py-1.5 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] text-sm transition-colors">Apply Route</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
