import { Cpu, Zap, Activity, Clock, ShieldCheck, ArrowRight, ShieldAlert, AlertTriangle, TrendingUp, Navigation } from "lucide-react";

export function AIShowcase() {
  return (
    <section id="ai" className="py-24 bg-[var(--bg-base)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">AI that doesn't just show data — it acts on it.</h2>
          <p className="text-lg text-[var(--text-secondary)]">From prediction to recommendation to automation.</p>
        </div>

        {/* 3 Step Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 relative px-4">
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px bg-[var(--border-strong)] -translate-y-1/2 z-0"></div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] w-full text-center p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] z-10">
            <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">1. Collect</h3>
            <p className="text-xs text-[var(--text-secondary)]">Gather data from 50+ sources (GPS, ERP, weather, sensors)</p>
          </div>
          <ArrowRight className="md:hidden w-6 h-6 text-[var(--text-muted)]" />
          
          <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] w-full text-center p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-glow-accent)] z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-primary-glow)]" />
            <h3 className="font-display font-medium text-[var(--text-primary)] mb-2 relative z-10">2. Predict</h3>
            <p className="text-xs text-[var(--text-primary)] font-medium relative z-10">ML models identify risks 6-8 hours before they occur</p>
          </div>
          <ArrowRight className="md:hidden w-6 h-6 text-[var(--text-muted)]" />

          <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] w-full text-center p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] z-10">
            <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">3. Optimize</h3>
            <p className="text-xs text-[var(--text-secondary)]">AI recommends specific actions. Approve or auto-execute.</p>
          </div>
        </div>

        {/* 4 Capability Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 rounded-[var(--radius-xl)]">
            <Clock className="w-8 h-8 text-[var(--accent-primary)] mb-6" />
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-3">Predictive Delay Detection</h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">XGBoost model analyzes 140+ variables. Flags at-risk shipments 6-8 hours before delay.</p>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-active)] px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--status-success)] border border-[var(--border-subtle)]">
              <ShieldCheck className="w-4 h-4" /> 94% accuracy on historical data
            </div>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 rounded-[var(--radius-xl)]">
            <Navigation className="w-8 h-8 text-[var(--accent-primary)] mb-6" />
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-3">Dynamic Route Intelligence</h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">Prophet time-series + real-time traffic. Reroutes automatically when better path exists.</p>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-active)] px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--accent-primary)] border border-[var(--border-subtle)]">
              <Zap className="w-4 h-4" /> Avg 31 min saved per long-haul
            </div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 rounded-[var(--radius-xl)]">
            <Activity className="w-8 h-8 text-[var(--accent-primary)] mb-6" />
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-3">Demand Forecasting</h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">Seasonal ML model trained on 3 years of logistics data. Predicts demand spikes automatically.</p>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-active)] px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--status-success)] border border-[var(--border-subtle)]">
              <TrendingUp size={16} className="w-4 h-4" /> 31% reduction in stockout events
            </div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 rounded-[var(--radius-xl)]">
            <ShieldAlert className="w-8 h-8 text-[var(--accent-primary)] mb-6" />
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-3">Supplier Risk Scoring</h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">Multi-factor risk model: geopolitical index + weather data + financial signals + delivery history.</p>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-active)] px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--accent-primary)] border border-[var(--border-subtle)]">
              <AlertTriangle size={16} className="w-4 h-4" /> 89% disruptions detected 14d prior
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


