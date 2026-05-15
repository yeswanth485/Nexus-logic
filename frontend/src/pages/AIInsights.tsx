import { Cpu, Sparkles, Target, Zap, MessageSquare } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Nexus AI Core</h1>
          <p className="text-sm text-[var(--text-secondary)]">Autonomous intelligence recommendations and conversational data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-glow-accent)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 grayscale pointer-events-none">
                <Cpu className="w-32 h-32" />
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
                Strategic Recommendation
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
                Based on the last 30 days of shipment volume, predictive models indicate a 24% surge in demand for electronics across the southern corridor. Current warehouse capacity at WH-01 (Chennai) is insufficient.
              </p>
              
              <div className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded flex flex-col gap-2 p-4">
                 <h4 className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider mb-2">Suggested Actions</h4>
                 <div className="flex items-center justify-between bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-[var(--status-info)]" />
                      <span className="text-sm text-[var(--text-primary)] font-medium">Re-route 12 inbound electronics containers to WH-02 (Bengaluru)</span>
                    </div>
                    <button className="text-xs bg-[var(--accent-primary)] text-black px-3 py-1 rounded font-bold">Execute</button>
                 </div>
                 <div className="flex items-center justify-between bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-[var(--status-warning)]" />
                      <span className="text-sm text-[var(--text-primary)] font-medium">Auto-schedule 5 additional carriers for line-haul</span>
                    </div>
                    <button className="text-xs bg-[var(--accent-primary)] text-black px-3 py-1 rounded font-bold">Execute</button>
                 </div>
              </div>
           </div>

           <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--kpi-fleet)]" />
                Cost Optimization Ops
              </h3>
              <ul className="space-y-4">
                 <li className="flex justify-between items-center text-sm">
                   <span className="text-[var(--text-primary)]">Consolidate LTL shipments on Route 4A</span>
                   <span className="text-[var(--status-success)] font-medium">+ ₹2.4L est. savings</span>
                 </li>
                 <li className="flex justify-between items-center text-sm">
                   <span className="text-[var(--text-primary)]">Switch to alternative supplier for SKU-901</span>
                   <span className="text-[var(--status-success)] font-medium">- 1.2% cost reduction</span>
                 </li>
              </ul>
           </div>
        </div>

        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col h-[500px]">
           <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-2 bg-[var(--bg-elevated)]">
              <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">Logistics Copilot</h3>
           </div>
           <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-[var(--bg-hover)] border border-[var(--border-default)] p-3 rounded-lg rounded-tr-none ml-8 text-sm text-[var(--text-primary)]">
                What is the status of the Apollo delivery to Delhi?
              </div>
              <div className="bg-[image:var(--gradient-card)] border border-[var(--border-strong)] p-3 rounded-lg rounded-tl-none mr-8 text-sm text-[var(--text-secondary)]">
                The Apollo delivery (ID: NXL-089187) is currently delayed by 45 mins due to heavy traffic on NH-48. ETA is now 16:20. Driver has been notified.
              </div>
              <div className="bg-[var(--bg-hover)] border border-[var(--border-default)] p-3 rounded-lg rounded-tr-none ml-8 text-sm text-[var(--text-primary)]">
                Find an alternative route.
              </div>
              <div className="bg-[image:var(--gradient-card)] border border-[var(--accent-primary)] shadow-[var(--shadow-glow-accent)] p-3 rounded-lg rounded-tl-none mr-8 text-sm text-[var(--text-primary)]">
                I've optimized a new route via State Highway 10. It adds 12km but saves 55 mins. Shall I push this to the driver's nav system?
                <button className="mt-2 text-xs bg-[var(--accent-primary)] text-black px-3 py-1.5 rounded font-bold w-full uppercase tracking-wider hover:brightness-110 transition-all">Send to Driver</button>
              </div>
           </div>
           <div className="p-3 border-t border-[var(--border-subtle)]">
             <input type="text" placeholder="Ask AI anything..." className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
           </div>
        </div>
      </div>
    </div>
  );
}
