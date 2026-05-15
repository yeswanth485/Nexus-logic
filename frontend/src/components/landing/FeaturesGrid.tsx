import { Package, LineChart, Truck, Map, Warehouse, BarChart4, ShieldAlert, Landmark, Leaf, Cpu, PieChart, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Package, title: "Real-Time Tracking", desc: "Live shipment and fleet visibility across your network" },
  { icon: LineChart, title: "Predictive Analytics", desc: "AI predicts delays, shortages, and disruptions" },
  { icon: Truck, title: "Fleet Intelligence", desc: "Driver analytics, fuel optimization, maintenance" },
  { icon: Map, title: "Route Optimization", desc: "AI-powered dynamic routing adapts to events" },
  { icon: Warehouse, title: "Warehouse Intel", desc: "Inventory heatmaps, congestion alerts" },
  { icon: BarChart4, title: "Demand Forecasting", desc: "ML-powered demand prediction with 94% accuracy" },
  { icon: ShieldAlert, title: "Risk Detection", desc: "Supplier risk scoring, geopolitical alerts" },
  { icon: Landmark, title: "Government Center", desc: "Public supply monitoring, city operations" },
  { icon: Leaf, title: "Sustainability", desc: "Carbon tracking, fuel efficiency, ESG" },
  { icon: Cpu, title: "AI Insights", desc: "Automated intelligence reports & actions" },
  { icon: PieChart, title: "Analytics & Reports", desc: "Custom dashboards, PDF exports, KPIs" },
  { icon: Layers, title: "Integrations", desc: "Connect any system: ERP, WMS, TMS, IoT" }
];

export function FeaturesGrid() {
  return (
    <section id="platform" className="py-24 bg-[var(--bg-base)] border-t border-[var(--border-subtle)] relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-[fade-up_0.6s_ease-out]">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">12 integrated intelligence modules.</h2>
          <p className="text-lg text-[var(--text-secondary)]">Every module powered by AI. Every decision backed by data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div 
                key={i} 
                className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-glow-accent)] transition-all hover:-translate-y-1 animate-[fade-up_0.4s_ease-out]"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="w-12 h-12 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-[var(--radius-md)] flex items-center justify-center mb-5 group-hover:bg-[var(--bg-hover)] group-hover:text-[var(--accent-primary)] text-[var(--text-primary)] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-medium text-lg text-[var(--text-primary)] mb-2">{feat.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{feat.desc}</p>
                <Link to="/auth/demo" className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] flex items-center gap-1 transition-colors">
                  Learn more &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
