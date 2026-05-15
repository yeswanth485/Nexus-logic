import { useState } from "react";
import { Map, Zap, CheckCircle2, Navigation2, Clock } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";

export default function RouteOptimization() {
  const { logAction } = useAppContext();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ origin: '', destination: '', vehicle: 'Auto-select based on capacity' });
  const [optimizing, setOptimizing] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(true);

  const [appliedRoute, setAppliedRoute] = useState<'A' | 'B' | null>(null);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination) {
      showToast('error', 'Required Fields', 'Please enter both origin and destination.');
      return;
    }
    setOptimizing(true);
    setResultsVisible(false);
    setAppliedRoute(null);
    await new Promise(r => setTimeout(r, 2000));
    setOptimizing(false);
    setResultsVisible(true);
    logAction('Routes', 'Route Optimized', `${formData.origin} to ${formData.destination}`, 'info');
    showToast('success', 'Optimization Complete', 'AI engine has generated 2 route options.');
  };

  const applyRoute = (route: 'A' | 'B') => {
    setAppliedRoute(route);
    logAction('Routes', 'Route Applied', `Applied Route ${route} for active shipment`, 'success');
    showToast('success', 'Route Active', `Route ${route} has been pushed to driver navigation.`);
  };

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
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5 h-fit">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Optimize New Route</h3>
          
          <form onSubmit={handleOptimize} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Origin</label>
              <input value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} type="text" placeholder="e.g. Mumbai WH-02" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
            </div>
            
            <div className="relative pl-3 border-l-2 border-dashed border-[var(--border-strong)] ml-2 space-y-4 py-2">
              <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-[var(--border-strong)]" />
              <div className="absolute -left-[5px] bottom-5 w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
              
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Destination</label>
                <input value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} type="text" placeholder="e.g. Pune Distribution Center" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
            </div>

            <div>
               <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Vehicle Type</label>
               <select value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] appearance-none">
                 <option>Heavy Truck (15-ton)</option>
                 <option>Medium Van (3-ton)</option>
                 <option>Auto-select based on capacity</option>
               </select>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={optimizing} className="w-full py-2.5 bg-[image:var(--gradient-accent)] text-white font-semibold rounded-[var(--radius-md)] flex justify-center items-center gap-2 hover:brightness-110 shadow-[var(--shadow-glow-accent)] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {optimizing ? <Spinner size="sm" /> : <><Zap className="w-4 h-4 fill-current" /> Optimize Route</>}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Map & Results */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-[300px] w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden relative flex items-center justify-center">
             {optimizing ? (
               <div className="flex flex-col items-center gap-3">
                 <Spinner size="lg" color="var(--accent-primary)" />
                 <p className="text-sm text-[var(--text-secondary)] animate-pulse">Running trajectory simulation models...</p>
               </div>
             ) : (
               <>
                 {/* Map Placeholder for deployment safety without real API keys */}
                 <div className="absolute inset-0 bg-[var(--bg-elevated)] flex items-center justify-center">
                   <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
                     <path d="M100,200 Q200,50 400,200 T700,200" fill="none" stroke="var(--accent-primary)" strokeWidth="4" strokeDasharray="8 8" />
                     <circle cx="100" cy="200" r="8" fill="var(--text-primary)" />
                     <circle cx="700" cy="200" r="8" fill="var(--accent-primary)" />
                   </svg>
                 </div>
                 
                 <div className="absolute bottom-4 left-4 flex gap-2">
                   <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded text-[10px] font-mono text-[var(--status-critical)]">Traffic: High (NH-48)</span>
                   <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded text-[10px] font-mono text-[var(--accent-primary)]">AI Route: Active</span>
                 </div>
               </>
             )}
          </div>

          {resultsVisible && !optimizing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fade-up_0.3s_ease-out]">
               {/* AI Recommended */}
               <div className={`border-2 rounded-[var(--radius-lg)] p-4 relative transition-colors ${appliedRoute === 'A' ? 'bg-[var(--bg-active)] border-[var(--status-success)]' : 'bg-[var(--bg-hover)] border-[var(--accent-primary)] shadow-[var(--shadow-glow-accent)]'}`}>
                 {appliedRoute === 'A' ? (
                    <div className="absolute top-0 right-0 bg-[var(--status-success)] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-md uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active</div>
                 ) : (
                    <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-md uppercase tracking-wider">AI Recommended</div>
                 )}
                 
                 <h4 className="text-[var(--text-primary)] font-medium mb-1">Route A: Optimized</h4>
                 <p className="text-xs text-[var(--status-success)] mb-3 font-medium">Estimated 23% faster than standard</p>
                 <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Distance</span><span className="font-mono text-[var(--text-primary)]">247 km</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Time</span><span className="font-mono text-[var(--text-primary)]">4h 23m</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Fuel Cost</span><span className="font-mono text-[var(--text-primary)]">₹1,840</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Tolls</span><span className="font-mono text-[var(--text-primary)]">₹340</span></div>
                 </div>
                 {!appliedRoute && (
                   <button onClick={() => applyRoute('A')} className="mt-4 w-full py-1.5 border border-[var(--accent-primary)] text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary-glow)] text-sm transition-colors">Apply Route</button>
                 )}
               </div>

               {/* Alternative */}
               <div className={`border rounded-[var(--radius-lg)] p-4 relative transition-colors ${appliedRoute === 'B' ? 'bg-[var(--bg-active)] border-[var(--status-success)]' : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'}`}>
                 {appliedRoute === 'B' && (
                    <div className="absolute top-0 right-0 bg-[var(--status-success)] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-md uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active</div>
                 )}
                 <h4 className="text-[var(--text-primary)] font-medium mb-1">Route B: Fuel-Efficient</h4>
                 <p className="text-xs text-[var(--text-muted)] mb-3 font-medium">Avoids tolls, 28 mins longer</p>
                 <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Distance</span><span className="font-mono text-[var(--text-primary)]">271 km</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Time</span><span className="font-mono text-[var(--text-primary)]">4h 51m</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Fuel Cost</span><span className="font-mono text-[var(--status-success)]">₹1,620</span></div>
                   <div><span className="block text-[10px] uppercase text-[var(--text-muted)]">Tolls</span><span className="font-mono text-[var(--status-success)]">₹0</span></div>
                 </div>
                 {!appliedRoute && (
                   <button onClick={() => applyRoute('B')} className="mt-4 w-full py-1.5 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] text-sm transition-colors">Apply Route</button>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
