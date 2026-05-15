import { ShieldAlert, AlertCircle, Map, Target, Globe } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

export default function RiskCenter() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Supply Chain Risk Center</h1>
          <p className="text-sm text-[var(--text-secondary)]">Early warning system for anomalous behaviors and disruptions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Hero Score */}
        <div className="md:col-span-1 bg-[var(--status-warning-soft)] border border-[var(--status-warning)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-center items-center shadow-[var(--shadow-glow-accent)] relative overflow-hidden">
           <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-[var(--status-warning)] opacity-10" />
           <div className="text-sm uppercase tracking-widest text-[var(--status-warning)] font-bold mb-2">Overall Risk</div>
           <div className="text-6xl font-display font-bold text-[var(--text-primary)] drop-shadow-lg">34<span className="text-2xl text-[var(--text-secondary)]">/100</span></div>
           <div className="text-xs text-[var(--status-warning)] mt-2 font-medium">MEDIUM RISK LEVEL</div>
           <div className="text-[10px] text-[var(--text-secondary)] mt-1">↑ Increased from 28 last week</div>
        </div>

        {/* Sub Scores */}
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DataCard title="Supplier Risk" value="47" change="High" changeType="down" colorVar="--status-critical" subInfo="2 red-flagged suppliers" />
          <DataCard title="Geopolitical" value="22" change="Low" changeType="up" colorVar="--status-success" subInfo="Stable in operating regions" />
          <DataCard title="Weather" value="38" change="Medium" changeType="down" colorVar="--status-warning" subInfo="Cyclone warning active" />
          <DataCard title="Operational" value="29" change="Low" changeType="up" colorVar="--status-success" subInfo="Fleet performance optimal" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
           <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
             <AlertCircle className="w-5 h-5 text-[var(--status-critical)]" />
             Active Risk Alerts
             <span className="bg-[var(--status-critical-soft)] text-[var(--status-critical)] text-[10px] px-2 py-0.5 rounded-full ml-auto">2 Critical</span>
           </h3>

           {/* Critical Alert 1 */}
           <div className="p-4 border-l-4 border-[var(--status-critical)] bg-[var(--bg-hover)] rounded-r-[var(--radius-md)] relative">
             <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] uppercase font-bold text-[var(--status-critical)] tracking-wider">Type: Supplier</span>
               <span className="text-[10px] text-[var(--text-muted)]">2 hrs ago</span>
             </div>
             <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">Supplier #247 (Chen Electronics) — Financial distress signals detected</h4>
             <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">Credit rating downgraded. 3 missed delivery commitments. Lead times increased by 40% over historical baseline.</p>
             <div className="p-2 bg-[image:var(--gradient-card)] border border-[var(--border-strong)] rounded text-xs mb-3 text-[var(--accent-primary)] font-medium">
               🤖 AI: Activate backup supplier (Tata Electronics) — 14-day onboarding
             </div>
             <div className="flex gap-2">
               <button className="bg-[var(--status-critical)] text-white px-3 py-1.5 rounded text-xs font-semibold hover:brightness-110">Activate Backup</button>
               <button className="bg-[var(--bg-input)] text-[var(--text-secondary)] px-3 py-1.5 rounded text-xs font-medium hover:text-[var(--text-primary)]">Acknowledge</button>
             </div>
           </div>

           {/* Warning Alert 1 */}
           <div className="p-4 border-l-4 border-[var(--status-warning)] bg-[var(--bg-hover)] rounded-r-[var(--radius-md)] relative">
             <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] uppercase font-bold text-[var(--status-warning)] tracking-wider">Type: Weather</span>
               <span className="text-[10px] text-[var(--text-muted)]">5 hrs ago</span>
             </div>
             <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">Cyclone Biparjoy path models suggest coastal impact 72-96h</h4>
             <p className="text-xs text-[var(--text-secondary)] mb-3">8 active shipments on potential path. WH-03 Cochin in high-risk zone.</p>
             <button className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] px-3 py-1.5 rounded text-xs font-medium hover:bg-[var(--bg-elevated)]">View Affected Routes</button>
           </div>
        </div>

        <div className="space-y-6 flex flex-col">
          {/* Anomaly Feed */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex-1">
             <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2 text-sm">
               <Target className="w-4 h-4 text-[var(--accent-primary)]" />
               AI Anomaly Detection
             </h3>
             <ul className="space-y-4">
               <li className="flex gap-3 items-start border-b border-[var(--border-subtle)] pb-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--status-info)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed"><span className="font-semibold text-[var(--status-info)]">Unusual ETA variance:</span> Truck TN-04-CD-8821 experiencing 4x normal delay pattern without traffic justification.</p>
                    <button className="mt-2 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-wider font-bold">Investigate &rarr;</button>
                  </div>
               </li>
               <li className="flex gap-3 items-start border-b border-[var(--border-subtle)] pb-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--status-warning)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed"><span className="font-semibold text-[var(--status-warning)]">Drawdown spike:</span> Inventory depletion rate is 2.3x baseline for high-value electronics. Possible demand surge or shrinkage.</p>
                    <button className="mt-2 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-wider font-bold">Investigate &rarr;</button>
                  </div>
               </li>
               <li className="flex gap-3 items-start">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--status-critical)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed"><span className="font-semibold text-[var(--status-critical)]">Fuel consumption spike:</span> Vehicle MH-02-XY-3421 is 47% above average. Potential mechanical failure or theft.</p>
                    <button className="mt-2 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-wider font-bold">Investigate &rarr;</button>
                  </div>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
